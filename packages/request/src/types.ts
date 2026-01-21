import { BerryRequestInstance } from "./request";

export * from "./request";

export interface BerryInitOption {
  timeout?: number;
  baseURL?: string;
}

export type BerryRequestConfig = RequestInit & {
  url?: string;
  params?: Record<string, any>;
  timeout?: number;
  timeoutId?: number;
};

export type BerryResponse = Response & {
  config: BerryRequestConfig;
};

export type BeforeCb = (data: BerryRequestConfig) => BerryRequestConfig | Promise<BerryRequestConfig>;
export type AfterCb = (data: BerryResponse) => any | Promise<any>;
export type OnError = (error?: Error) => void;
export type OnFinally = (config: BerryRequestConfig, response?: BerryResponse) => void;

export type RequestMethod = <T = BerryResponse>(
  this: BerryRequestInstance,
  url: string,
  body?: Record<string, any>,
  config?: BerryRequestConfig,
) => Promise<T>;
