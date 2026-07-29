import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { fileURLToPath } from "node:url";

export default defineConfig(({ command, ssrBuild }) => {
  // Detect Nitro build environment: Nitro may invoke Vite without setting `ssrBuild`,
  // but it will set NITRO_PRESET or NITRO_BUILD environment variables. Also fall back
  // to the ssrBuild flag when present.
  const isNitroBuild = Boolean(process.env.NITRO_PRESET || process.env.NITRO_BUILD || ssrBuild);

  return {
    // ⚠️ CHANGE THIS: Replace with your exact GitHub repository path name
    base: "/Plane-Radar/",
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
      dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
      // Use Vite's native tsconfig path resolution
      tsconfigPaths: true,
    },
    plugins: [
      tailwindcss(),
      tanstackStart(),
      nitro(),
      viteReact(),
    ],
    server: { host: true, port: 8080 },

    // Ensure a dedicated SSR entry when Nitro builds the server bundle. Nitro sets
    // environment variables (NITRO_PRESET/NITRO_BUILD) when running its build, so
    // detect that and point rollup to a JS/TS entry instead of index.html.
    build: isNitroBuild
      ? {
          rollupOptions: {
            input: fileURLToPath(new URL("./src/start.ts", import.meta.url)),
          },
        }
      : undefined,
  };
});
