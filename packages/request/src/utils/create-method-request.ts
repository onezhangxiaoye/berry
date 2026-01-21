import { BerryRequestConfig, BerryResponse } from "../types";
import { BerryRequestInstance } from "../request";

export const HTTP_READ_METHODS = ["get", "head", "options"] as const;
export const HTTP_WRITE_METHODS = ["post", "put", "delete", "patch"] as const;
export const METHODS = [...HTTP_READ_METHODS, ...HTTP_WRITE_METHODS] as const;

export type Methods = (typeof METHODS)[number];

export const createRequestByMethod = (method: Methods) => {
  return function <T = BerryResponse>(
    this: BerryRequestInstance,
    url: string,
    body?: RequestInit["body"] | Record<string, any>,
    config?: BerryRequestConfig,
  ) {
    config = config || {};
    config.url = url;
    config.method = method;

    if (HTTP_READ_METHODS.includes(method as any) && body) {
      config.params = body as Record<string, any>;
    } else if (body) {
      config.body = body as RequestInit["body"];
    }
    return this.request<T>(config);
  };
};
