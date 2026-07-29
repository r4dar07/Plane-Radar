# SkyScope

A live radar scope for plane spotters. Track aircraft across a simulated global
airspace: callsigns, airlines, aircraft models, altitude, speed, heading,
route progress and destination airports.

## Features

- SVG radar scope with sweep animation and range rings (500 km – 12,000 km)
- 160 concurrent flights over 28 international airports
- 25 real airlines flying their actual fleet types
- 12 aircraft models with real cruise speed, altitude, engine and seat data
- Great-circle routing with climb / cruise / descent phases
- Searchable flight list and a detailed technical readout per aircraft
- Selectable radar station to re-centre the scope

## Getting started

Requires Node.js 20+.

```sh
npm install
npm run dev
```

The app runs at http://localhost:8080.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint the codebase |
| `npm run format` | Format with Prettier |

## Project structure

```
src/
  lib/flight-data.ts     airports, aircraft types, airlines, geo helpers
  lib/flight-engine.ts   flight plan generation and live position solver
  components/            radar scope and UI components
  routes/                file-based routes (TanStack Router)
  styles.css             design tokens and theme
```

## Tech stack

TanStack Start · React 19 · TypeScript · Tailwind CSS v4 · Vite

## License

Copyright (c) 2026 Asifur Rahman. All rights reserved. See [LICENSE](./LICENSE).
