import { rmSync } from "node:fs";
import { join } from "node:path";

const distDir = join(process.cwd(), "dist");

for (const directory of ["client", "server"]) {
  rmSync(join(distDir, directory), { force: true, recursive: true });
}
