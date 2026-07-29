import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plane, Radar, Gauge, MapPin, Search } from "lucide-react";

import { RadarScope } from "@/components/RadarScope";
import { AIRPORTS, distanceKm, type Airport } from "@/lib/flight-data";
import { flightsAt, formatDuration, etaLabel, type Flight } from "@/lib/flight-engine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkyScope — Live Plane Finder & Radar for Aviation Fans" },
      {
        name: "description",
        content:
          "Track aircraft on a live radar scope: flight numbers, airlines, aircraft models, altitude, speed and destination airports.",
      },
      { property: "og:title", content: "SkyScope — Live Plane Finder & Radar for Aviation Fans" },
      {
        property: "og:description",
        content:
          "Track aircraft on a live radar scope: flight numbers, airlines, aircraft models, altitude, speed and destination airports.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const RANGES = [500, 1500, 4000, 12000];

function Stat({ label, value, unit }: { label: string; value: string | number; unit?: string }) {
  return (
    <div className="rounded border border-border bg-card px-3 py-2">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="font-mono text-lg text-foreground text-glow">
        {value}
        {unit && <span className="ml-1 text-xs text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}

function Index() {
  const [now, setNow] = useState(() => Date.now());
  const [centerIata, setCenterIata] = useState("LHR");
  const [rangeKm, setRangeKm] = useState(1500);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 2000);
    return () => clearInterval(t);
  }, []);

  const center: Airport = useMemo(
    () => AIRPORTS.find((a) => a.iata === centerIata) ?? AIRPORTS[0],
    [centerIata],
  );

  const all = useMemo(() => flightsAt(now), [now]);

  const inRange = useMemo(
    () =>
      all
        .map((f) => ({ f, d: distanceKm(center, f) }))
        .filter((x) => x.d <= rangeKm)
        .sort((a, b) => a.d - b.d),
    [all, center, rangeKm],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return inRange;
    return inRange.filter(({ f }) =>
      [f.flightNo, f.callsign, f.airline.name, f.aircraft.model, f.from.iata, f.to.iata, f.to.city]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [inRange, query]);

  const selected: Flight | undefined =
    all.find((f) => f.id === selectedId) ?? visible[0]?.f;

  return (
    <main className="mx-auto min-h-screen max-w-[1500px] px-4 py-6 lg:px-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Radar className="h-7 w-7 text-primary" />
          <div>
            <h1 className="font-mono text-xl font-bold uppercase tracking-[0.2em] text-foreground text-glow">
              SkyScope
            </h1>
            <p className="text-xs text-muted-foreground">
              Plane finder &amp; radar for the incurably curious
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="inline-block h-2 w-2 animate-blip rounded-full bg-primary" />
          {inRange.length} contacts · {new Date(now).toLocaleTimeString()}
        </div>
      </header>

      <div className="mb-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Radar station
          </span>
          <select
            value={centerIata}
            onChange={(e) => setCenterIata(e.target.value)}
            className="rounded border border-border bg-card px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-primary"
          >
            {AIRPORTS.map((a) => (
              <option key={a.iata} value={a.iata}>
                {a.iata} — {a.city}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Range
          </span>
          <div className="flex gap-1">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRangeKm(r)}
                className={`rounded border px-3 py-2 font-mono text-xs transition-colors ${
                  r === rangeKm
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary"
                }`}
              >
                {r} km
              </button>
            ))}
          </div>
        </div>

        <label className="flex min-w-[220px] flex-1 flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Search flight, airline, model, airport
          </span>
          <div className="flex items-center gap-2 rounded border border-border bg-card px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="A350, Emirates, JFK…"
              className="w-full bg-transparent py-2 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="rounded-lg border border-border bg-panel p-3">
          <div className="aspect-square w-full">
            <RadarScope
              center={center}
              rangeKm={rangeKm}
              flights={visible.map((v) => v.f)}
              selectedId={selected?.id ?? null}
              onSelect={setSelectedId}
            />
          </div>
        </section>

        <aside className="flex flex-col gap-4">
          {selected ? (
            <section className="rounded-lg border border-primary/40 bg-panel p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-2xl font-bold text-foreground text-glow">
                    {selected.flightNo}
                  </div>
                  <div className="text-sm text-muted-foreground">{selected.airline.name}</div>
                </div>
                <Plane
                  className="h-6 w-6 text-accent"
                  style={{ transform: `rotate(${selected.headingDeg}deg)` }}
                />
              </div>

              <div className="my-4 flex items-center gap-3">
                <div className="text-center">
                  <div className="font-mono text-lg text-foreground">{selected.from.iata}</div>
                  <div className="text-[10px] text-muted-foreground">{selected.from.city}</div>
                </div>
                <div className="relative h-px flex-1 bg-border">
                  <div
                    className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-primary"
                    style={{ left: `${selected.progress * 100}%` }}
                  />
                </div>
                <div className="text-center">
                  <div className="font-mono text-lg text-foreground">{selected.to.iata}</div>
                  <div className="text-[10px] text-muted-foreground">{selected.to.city}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Stat label="Altitude" value={selected.altitudeFt.toLocaleString()} unit="ft" />
                <Stat label="Ground speed" value={selected.speedKts} unit="kts" />
                <Stat label="Heading" value={`${Math.round(selected.headingDeg)}°`} />
                <Stat label="Squawk" value={selected.squawk} />
                <Stat label="Phase" value={selected.phase} />
                <Stat label="ETA" value={etaLabel(now, selected.minutesRemaining)} />
              </div>

              <dl className="mt-4 space-y-1.5 border-t border-border pt-3 text-sm">
                <Row label="Aircraft" value={selected.aircraft.model} />
                <Row label="Manufacturer" value={selected.aircraft.manufacturer} />
                <Row label="Type code" value={selected.aircraft.code} />
                <Row label="Engines" value={selected.aircraft.engines} />
                <Row label="Typical seats" value={String(selected.aircraft.seats)} />
                <Row label="Registration" value={selected.registration} />
                <Row label="Callsign" value={selected.callsign} />
                <Row
                  label="Destination"
                  value={`${selected.to.name} (${selected.to.icao}), ${selected.to.country}`}
                />
                <Row label="Route" value={`${selected.routeKm.toLocaleString()} km`} />
                <Row
                  label="Flight time"
                  value={`${formatDuration(selected.minutesElapsed)} flown · ${formatDuration(selected.minutesRemaining)} left`}
                />
              </dl>
            </section>
          ) : (
            <section className="rounded-lg border border-border bg-panel p-6 text-center text-sm text-muted-foreground">
              No contacts match your filter.
            </section>
          )}

          <section className="rounded-lg border border-border bg-panel">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <Gauge className="h-3.5 w-3.5" /> Contacts near {center.iata}
            </div>
            <ul className="max-h-[420px] overflow-y-auto">
              {visible.map(({ f, d }) => (
                <li key={f.id}>
                  <button
                    onClick={() => setSelectedId(f.id)}
                    className={`flex w-full items-center justify-between gap-3 border-b border-border/60 px-4 py-2.5 text-left transition-colors hover:bg-secondary ${
                      f.id === selected?.id ? "bg-secondary" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-sm text-foreground">
                        {f.flightNo} <span className="text-muted-foreground">{f.aircraft.code}</span>
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {f.from.iata} → {f.to.iata} · {f.airline.name}
                      </div>
                    </div>
                    <div className="shrink-0 text-right font-mono text-[11px] text-muted-foreground">
                      <div>{Math.round(d)} km</div>
                      <div>{(f.altitudeFt / 100).toFixed(0)} FL</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-border bg-panel px-4 py-3 text-xs text-muted-foreground">
            <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
              <MapPin className="h-3.5 w-3.5" /> Station
            </div>
            {center.name} ({center.iata}/{center.icao}) · {center.city}, {center.country} ·{" "}
            {center.lat.toFixed(2)}°, {center.lon.toFixed(2)}°
          </section>
        </aside>
      </div>

      <p className="mt-6 text-center text-[11px] text-muted-foreground">
        Traffic is a simulated feed built on real airports, airline fleets and aircraft performance
        data — not for navigational use.
      </p>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="text-right font-mono text-xs text-foreground">{value}</dd>
    </div>
  );
}