export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const candidates = [
      url.pathname,
      url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname + "/index.html",
      url.pathname + ".html",
    ];

    for (const pathname of candidates) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = pathname;
      const response = await env.ASSETS.fetch(new Request(assetUrl, request));
      if (response.status !== 404) {
        return response;
      }
    }

    return env.ASSETS.fetch(request);
  },
};
