import {
  AIRCRAFT,
  AIRLINES,
  AIRPORTS,
  aircraftByCode,
  bearing,
  distanceKm,
  interpolate,
  type AircraftType,
  type Airline,
  type Airport,
} from "./flight-data";

export interface Flight {
  id: string;
  callsign: string;
  flightNo: string;
  registration: string;
  airline: Airline;
  aircraft: AircraftType;
  from: Airport;
  to: Airport;
  routeKm: number;
  durationMin: number;
  /* live */
  lat: number;
  lon: number;
  headingDeg: number;
  altitudeFt: number;
  speedKts: number;
  progress: number;
  phase: "Climbing" | "Cruising" | "Descending";
  minutesElapsed: number;
  minutesRemaining: number;
  squawk: string;
}

/* deterministic pseudo-random */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ";

interface Plan {
  id: string;
  airline: Airline;
  aircraft: AircraftType;
  from: Airport;
  to: Airport;
  callsign: string;
  flightNo: string;
  registration: string;
  squawk: string;
  routeKm: number;
  durationMin: number;
  departureOffsetMin: number;
  cycleMin: number;
}

export const FLIGHT_PLANS: Plan[] = buildPlans(160);

function buildPlans(count: number): Plan[] {
  const rand = rng(20260729);
  const plans: Plan[] = [];
  for (let i = 0; i < count; i++) {
    const airline = AIRLINES[Math.floor(rand() * AIRLINES.length)];
    let from = AIRPORTS[Math.floor(rand() * AIRPORTS.length)];
    let to = AIRPORTS[Math.floor(rand() * AIRPORTS.length)];
    let guard = 0;
    while ((to.iata === from.iata || distanceKm(from, to) < 400) && guard++ < 20) {
      to = AIRPORTS[Math.floor(rand() * AIRPORTS.length)];
    }
    if (rand() > 0.5) [from, to] = [to, from];
    const routeKm = distanceKm(from, to);
    // long haul is flown by wide-bodies only
    const LONG_HAUL = ["A333", "A359", "A388", "B789", "B77W", "B744"];
    const eligible = airline.fleet.filter((c) => routeKm < 6000 || LONG_HAUL.includes(c));
    const pool = eligible.length ? eligible : airline.fleet;
    const aircraft = aircraftByCode(pool[Math.floor(rand() * pool.length)]) ?? AIRCRAFT[0];
    const durationMin = Math.round((routeKm / (aircraft.cruiseKts * 1.852)) * 60 + 35);
    const num = 100 + Math.floor(rand() * 8899);
    const reg = `${ALPHA[Math.floor(rand() * 24)]}-${ALPHA[Math.floor(rand() * 24)]}${ALPHA[Math.floor(rand() * 24)]}${ALPHA[Math.floor(rand() * 24)]}${ALPHA[Math.floor(rand() * 24)]}`;
    plans.push({
      id: `${airline.icao}${num}-${i}`,
      airline,
      aircraft,
      from,
      to,
      callsign: `${airline.icao}${num}`,
      flightNo: `${airline.iata}${num}`,
      registration: reg,
      squawk: String(1000 + Math.floor(rand() * 6777)).padStart(4, "0"),
      routeKm,
      durationMin,
      departureOffsetMin: Math.floor(rand() * durationMin * 1.6),
      cycleMin: Math.round(durationMin * 1.6),
    });
  }
  return plans;
}

/** Compute all airborne flights for a given wall-clock time. */
export function flightsAt(nowMs: number): Flight[] {
  const minutes = nowMs / 60000;
  const out: Flight[] = [];

  for (const p of FLIGHT_PLANS) {
    const t = (((minutes - p.departureOffsetMin) % p.cycleMin) + p.cycleMin) % p.cycleMin;
    if (t > p.durationMin) continue; // on the ground between rotations
    const progress = t / p.durationMin;
    const pos = interpolate(p.from, p.to, progress);
    const ahead = interpolate(p.from, p.to, Math.min(1, progress + 0.01));
    const climb = 0.12;
    const descent = 0.85;
    let altitudeFt: number;
    let phase: Flight["phase"];
    if (progress < climb) {
      altitudeFt = Math.round((progress / climb) * p.aircraft.cruiseFt);
      phase = "Climbing";
    } else if (progress > descent) {
      altitudeFt = Math.round(((1 - progress) / (1 - descent)) * p.aircraft.cruiseFt);
      phase = "Descending";
    } else {
      altitudeFt = p.aircraft.cruiseFt;
      phase = "Cruising";
    }
    const speedKts =
      phase === "Cruising"
        ? p.aircraft.cruiseKts
        : Math.round(180 + (altitudeFt / p.aircraft.cruiseFt) * (p.aircraft.cruiseKts - 180));

    out.push({
      id: p.id,
      callsign: p.callsign,
      flightNo: p.flightNo,
      registration: p.registration,
      airline: p.airline,
      aircraft: p.aircraft,
      from: p.from,
      to: p.to,
      routeKm: Math.round(p.routeKm),
      durationMin: p.durationMin,
      lat: pos.lat,
      lon: pos.lon,
      headingDeg: bearing(pos, ahead),
      altitudeFt: Math.max(0, altitudeFt),
      speedKts,
      progress,
      phase,
      minutesElapsed: Math.round(t),
      minutesRemaining: Math.max(0, Math.round(p.durationMin - t)),
      squawk: p.squawk,
    });
  }
  return out;
}

export function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return h ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}

export function etaLabel(nowMs: number, minutesRemaining: number) {
  return new Date(nowMs + minutesRemaining * 60000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}