// src/entry-server.ts
// Minimal SSR entry so Vite/Nitro uses a JS/TS entry rather than index.html.
// It imports your existing server start file so Nitro picks up middleware and routes.
import "./start";
export {};
