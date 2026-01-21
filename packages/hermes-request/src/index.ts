import { appendSearchParamsToUrl, BerryRequest, normalizeRequestConfig } from "@berry/request";

const request = new BerryRequest({
  baseURL: "/mock",
});

request.beforeRequest((config) => {
  config.url = appendSearchParamsToUrl(config.url, config.params);
  config = normalizeRequestConfig(config);
  return config;
});

request.afterRequest(
  async (response) => {
    let result;
    if (response.headers.get("content-type")?.includes("application/json")) {
      result = await response.json();
    } else if (response.headers.get("content-type")?.includes("text/plain")) {
      result = await response.text();
    }
    if (response.status === 200) {
      return result;
    }
  },
  (error) => {
    console.log("捕获错误", error);
  },
);

export default request;
