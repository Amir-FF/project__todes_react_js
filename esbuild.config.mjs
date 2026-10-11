import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import fs from "node:fs";

const isWatch = process.argv.includes("--watch");
const isProd = process.argv.includes("--prod");

fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist", { recursive: true });
fs.copyFileSync("public/index.html", "dist/index.html");

const options = {
  entryPoints: {
    "js/bundle": "src/main.jsx",
    "css/style": "src/styles/main.scss",
  },
  outdir: "dist",
  outbase: "src",
  assetNames: "[dir]/[name]-[hash]",
  bundle: true,
  jsx: "automatic",
  loader: {
    ".js": "jsx",
    ".woff": "file",
    ".woff2": "file",
    ".ttf": "file",
    ".png": "file",
    ".jpg": "file",
    ".jpeg": "file",
    ".svg": "file",
    ".webp": "file",
  },
  minify: isProd,
  sourcemap: !isProd,
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      isProd ? "production" : "development",
    ),
  },
  plugins: [
    sassPlugin({
      loadPaths: ["node_modules"],
      quietDeps: true,
      silenceDeprecations: ["import", "color-functions", "global-builtin"],
    }),
  ],
  logLevel: "info",
};

if (isWatch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  const { port } = await ctx.serve({
    servedir: "dist",
    port: 3000,
    fallback: "dist/index.html",
  });
  console.log(`\n🚀 Dev server: http://localhost:${port}\n`);
} else {
  await esbuild.build(options);
  console.log("✅ Build finished → dist/");
}

let html = fs.readFileSync("public/index.html", "utf-8");
if (isWatch) {
  const liveReload = `<script>new EventSource('/esbuild').addEventListener('change', () => location.reload());</script>`;
  html = html.replace("</body>", `${liveReload}\n  </body>`);
}
fs.writeFileSync("dist/index.html", html);
