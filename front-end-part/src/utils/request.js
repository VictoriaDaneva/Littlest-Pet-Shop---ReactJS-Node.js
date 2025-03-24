const request = async (method, url, data, options = {}) => {
  options.method = method;

  if (!options.headers) {
    options.headers = {};
  }

  if (data && method !== "GET" && method !== "DELETE") {
    options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
    };
  }

  console.log(`🔍 ${method} Request to ${url}`, options);

  const response = await fetch(url, options);
  const responseContentType = response.headers.get("Content-Type");

  if (!responseContentType) {
    return;
  }

  const result = await response.json();
  return result;
};

export default {
  get: request.bind(null, "GET"),
  post: request.bind(null, "POST"),
  put: request.bind(null, "PUT"),
  delete: (url, options = {}) => request("DELETE", url, null, options),
};
