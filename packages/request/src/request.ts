import {
  AfterCb,
  BeforeCb,
  BerryInitOption,
  BerryRequestConfig,
  BerryResponse,
  OnError,
  OnFinally,
  RequestMethod,
} from "./types";
import { joinBaseURL } from "./utils/join-base-url";
import { setAbortController } from "./utils/set-abort-controller";
import { createRequestByMethod, METHODS } from "./utils/create-method-request";

export class BerryRequest {
  private beforeCbs: [BeforeCb, OnError?, OnFinally?][] = [];
  private afterCbs: [AfterCb, OnError?, OnFinally?][] = [];
  config: BerryInitOption;

  // @ts-ignore
  get: RequestMethod;
  // @ts-ignore
  head: RequestMethod;
  // @ts-ignore
  options: RequestMethod;

  // @ts-ignore
  post: RequestMethod;
  // @ts-ignore
  put: RequestMethod;
  // @ts-ignore
  delete: RequestMethod;
  // @ts-ignore
  patch: RequestMethod;

  constructor(config?: BerryInitOption) {
    config = config || {};
    if (!config.baseURL) {
      config.baseURL = "";
    }

    this.config = config;
    joinBaseURL(this);
    setAbortController(this);

    for (const method of METHODS) {
      this[method] = createRequestByMethod(method);
    }
  }

  beforeRequest(then: BeforeCb, error?: OnError, end?: OnFinally) {
    this.beforeCbs.push([then, error, end]);
  }

  afterRequest(then: AfterCb, error?: OnError, end?: OnFinally) {
    this.afterCbs.push([then, error, end]);
  }

  normalizeRequestParams(url: string | BerryRequestConfig, config?: BerryRequestConfig) {
    config = config || ({} as BerryRequestConfig);
    if (typeof url === "string") {
      config.url = url;
    } else {
      config = url;
    }
    if (!config.method) {
      config.method = "get";
    }
    return config;
  }

  async request<T = BerryResponse>(url: string, config?: BerryRequestConfig): Promise<T>;
  async request<T = BerryResponse>(config: BerryRequestConfig): Promise<T>;

  request<T = BerryResponse>(url: string | BerryRequestConfig, config?: BerryRequestConfig) {
    let conf = this.normalizeRequestParams(url, config);
    let response: BerryResponse | undefined;
    let run: (config: BerryRequestConfig) => Promise<T>;
    let promise = new Promise((resolve: any) => {
      run = resolve;
    });
    const f = [
      [
        async (conf_: BerryRequestConfig) => {
          conf = conf_;
          const res = await fetch(conf.url!, conf as RequestInit);
          (res as BerryResponse).config = conf;
          response = res as BerryResponse;
          return response;
        },
      ],
    ];

    // @ts-ignore
    const all = [...this.beforeCbs, ...f, ...this.afterCbs] as [any, any, any][];
    const finallyList: OnFinally[] = [];

    return new Promise<T>((resolve) => {
      for (const [resolve, reject, finallyFn] of all) {
        promise = promise.then(resolve, reject);
        finallyFn && finallyList.push(finallyFn);
      }
      let newResponse: T | undefined;
      promise
        .then((res) => {
          newResponse = res as T;
          return newResponse;
        })
        .finally(() => {
          finallyList.forEach((fn) => fn(conf, response));
          resolve(newResponse as T);
        });

      run!(conf);
    });
  }
}

export type BerryRequestInstance = InstanceType<typeof BerryRequest>;
