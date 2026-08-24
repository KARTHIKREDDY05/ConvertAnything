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
  fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
`,
);
