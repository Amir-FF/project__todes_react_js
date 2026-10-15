import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import fs from "node:fs";

const isWatch = process.argv.includes("--watch");
const isProd = process.argv.includes("--prod");

const DIST_DIR = "dist";
const DEV_PORT = 3000;
const LIVE_RELOAD_SCRIPT = `<script>new EventSource('/esbuild').addEventListener('change', () => location.reload());</script>`;

const prepareDist = () => {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });

  // copy everything in public/ (_redirects, favicon, ...) into dist/
  fs.cpSync("public", DIST_DIR, { recursive: true });

  let html = fs.readFileSync("public/index.html", "utf-8");

  if (isWatch) {
    html = html.replace("</body>", `${LIVE_RELOAD_SCRIPT}\n  </body>`);
  }

  fs.writeFileSync(`${DIST_DIR}/index.html`, html);
};

const buildOptions = {
  entryPoints: {
    "js/bundle": "src/main.jsx",
    "css/style": "src/styles/main.scss",
  },
  outdir: DIST_DIR,
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
    "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "development"),
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

prepareDist();

if (isWatch) {
  const context = await esbuild.context(buildOptions);
  await context.watch();

  const { port } = await context.serve({
    servedir: DIST_DIR,
    port: DEV_PORT,
    fallback: `${DIST_DIR}/index.html`,
  });

  console.log(`\n🚀 Dev server: http://localhost:${port}\n`);
} else {
  await esbuild.build(buildOptions);
  console.log(`✅ Build finished → ${DIST_DIR}/`);
}
