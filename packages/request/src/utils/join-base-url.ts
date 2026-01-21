import { BerryRequestInstance } from "../request";

export function joinBaseURL(berry: BerryRequestInstance) {
  berry.beforeRequest((config) => {
    config.url = (berry.config.baseURL ?? "") + (config.url ?? "");
    return config;
  });
}
