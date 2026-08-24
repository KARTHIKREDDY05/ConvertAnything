import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const distDir = join(process.cwd(), "dist");
const clientDir = join(distDir, "client");
const serverEntry = join(distDir, "server", "index.js");
const hostingSource = join(process.cwd(), ".openai", "hosting.json");
const hostingTarget = join(distDir, ".openai", "hosting.json");

mkdirSync(dirname(serverEntry), { recursive: true });
mkdirSync(clientDir, { recursive: true });
mkdirSync(dirname(hostingTarget), { recursive: true });

cpSync(hostingSource, hostingTarget);

for (const entry of readdirSync(distDir, { withFileTypes: true })) {
  if ([".openai", "client", "server"].includes(entry.name)) {
    continue;
  }

  cpSync(join(distDir, entry.name), join(clientDir, entry.name), {
    recursive: true,
  });
}

if (!existsSync(join(clientDir, "index.html"))) {
  throw new Error("Expected exported homepage at dist/client/index.html");
}

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
