import { BerryRequestConfig } from "../types";

const isPlainObject = (obj: any) => Object.prototype.toString.call(obj) === "[object Object]";

export const normalizeRequestConfig = (config: BerryRequestConfig) => {
  const headers = (config.headers = config.headers || {}) as Record<string, string>;
  if (isPlainObject(config.body)) {
    config.body = JSON.stringify(config.body);
    headers["Content-Type"] = "application/json";
  }
  return config;
};
