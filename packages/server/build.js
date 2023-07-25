import esbuild from "esbuild";















const buildOptions = {
  entryPoints: ["src/index.ts"],
  outdir: "./build",
  bundle: true,
  format: "esm",
  packages: "external",
  sourcemap: true,
  platform: "node",
  target: "es2020",
};














