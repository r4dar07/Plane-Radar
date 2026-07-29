/** Minimal server-rendered fallback shown when SSR fails. */
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Something went wrong</title>
    <style>
      body { margin:0; min-height:100vh; display:grid; place-items:center;
             background:#0b1512; color:#d7f5e3;
             font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      main { text-align:center; padding:2rem; }
      h1 { font-size:1.25rem; margin:0 0 .5rem; }
      p { opacity:.7; font-size:.875rem; margin:0 0 1.5rem; }
      a { color:#5ee9a0; text-decoration:none; border:1px solid #5ee9a0;
          padding:.5rem 1rem; border-radius:.375rem; font-size:.875rem; }
    </style>
  </head>
  <body>
    <main>
      <h1>Something went wrong</h1>
      <p>The server hit an unexpected error. Please try again.</p>
      <a href="/">Go home</a>
    </main>
  </body>
</html>`;
}
