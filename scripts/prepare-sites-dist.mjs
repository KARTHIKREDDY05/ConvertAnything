import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const distDir = join(process.cwd(), "dist");
const serverEntry = join(distDir, "server", "index.js");
const hostingSource = join(process.cwd(), ".openai", "hosting.json");
const hostingTarget = join(distDir, ".openai", "hosting.json");

mkdirSync(dirname(serverEntry), { recursive: true });
mkdirSync(dirname(hostingTarget), { recursive: true });

cpSync(hostingSource, hostingTarget);

writeFileSync(
  serverEntry,
  `export default {
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
`,
);
