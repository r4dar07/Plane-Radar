import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { fileURLToPath } from "node:url";

export default defineConfig(({ command, ssrBuild }) => ({
  // ⚠️ CHANGE THIS: Replace with your exact GitHub repository path name
  base: "/Plane-Radar/",
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
    // Vite native tsconfig path resolution (replaces vite-tsconfig-paths plugin)
    tsconfigPaths: true,
  },
  plugins: [
    // removed vite-tsconfig-paths plugin per Vite warning
    tailwindcss(),
    tanstackStart(),
    nitro(),
    viteReact(),
  ],
  server: { host: true, port: 8080 },

  // When building for SSR (nitro/vite SSR step), ensure the SSR entry is a TS/JS file,
  // not index.html. Use src/start.ts (already in your repo) as the SSR entry.
  build: ssrBuild
    ? {
        rollupOptions: {
          input: fileURLToPath(new URL("./src/start.ts", import.meta.url)),
        },
      }
    : undefined,
}));
