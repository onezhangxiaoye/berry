/**
 * 将对象格式的查询参数转换为 URLSearchParams 实例
 * @param params 待转换的查询参数对象（支持基础类型、数组，不支持嵌套对象）
 * @returns URLSearchParams 实例（参数为空时返回 undefined）
 */
export const convertObjectToSearchParams = (params?: Record<string, any>) => {
  if (!params) {
    return;
  }

  const urlencoded = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      for (const v of value) {
        urlencoded.append(key, v);
      }
    } else if (value === null || value === undefined) {
    } else if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") {
      urlencoded.append(key, String(value));
    } else {
      throw new Error("objToURLSearchParams 不支持嵌套对象");
    }
  });
  return urlencoded;
};

/**
 * 将查询参数对象追加到 URL 末尾，生成带查询字符串的完整 URL
 * @param url 基础 URL（不能为空）
 * @param params 待拼接的查询参数对象
 * @returns 带查询字符串的完整 URL
 */
export const appendSearchParamsToUrl = (url?: string, params?: Record<string, any>) => {
  if (url === undefined || url === null) {
    throw new Error("joinQueryToURL 不支持 url 为空");
  }
  if (params) {
    const urlencoded = convertObjectToSearchParams(params);
    if (urlencoded) {
      url = url + "?" + urlencoded;
    }
  }
  return url;
};
