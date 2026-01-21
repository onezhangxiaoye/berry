import { BerryRequestInstance } from "../request";
import { BerryRequestConfig } from "../types";

export function setAbortController(berry: BerryRequestInstance) {
  berry.beforeRequest(
    (config) => {
      const timeout = config?.timeout || berry.config.timeout;

      if (!config?.signal && timeout) {
        const controller = new AbortController();

        config.signal = controller.signal;
        config.timeoutId = setTimeout(() => controller.abort(), timeout);
      }
      return config;
    },
    undefined,
    (options: BerryRequestConfig) => {
      clearTimeout(options.timeoutId);
    },
  );
}
