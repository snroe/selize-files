import { build } from "bun";
import fg from "fast-glob";
import { rm } from 'node:fs/promises';

const cleanDist = async (config: { outDir: string }) => {
  const { outDir = 'lib' } = config;

  const files = await fg([`${outDir}/**/*`, `${outDir}/**/.*`], {
    onlyFiles: false,
    markDirectories: true,
    dot: true,
  });

  for (const file of files.sort((a, b) => b.length - a.length)) {
    await rm(file, { recursive: true, force: true });
  }

  console.log(`Cleared output directory: ${outDir}`);
}

const bunBuild = async (config: { outDir: string }) => {
  const { outDir = 'lib' } = config;

  const entryPoints = fg.sync([
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/**/*.d.ts",
    "!src/**/*.test.ts"
  ]);

  if (entryPoints.length === 0) {
    console.error("No .ts files found.");
    process.exit(1);
  }

  /**
   * Bun config
   */
  const result = await build({
    root: 'src',
    entrypoints: entryPoints,
    outdir: outDir,
    naming: "[dir]/[name].[ext]",
    minify: false,
    splitting: true,
    target: "node",
    format: "esm",
    sourcemap: "none",
  });

  if (result.success) {
    console.log("bun build successful");
  } else {
    console.error("bun build failed");
    for (const message of result.logs) {
      console.error(message);
    }
  }
}

const main = async (outDir: string) => {
  await cleanDist({ outDir });
  await bunBuild({ outDir })

};

main("lib").catch(error => {
  console.error(error);
  process.exit(1);
});