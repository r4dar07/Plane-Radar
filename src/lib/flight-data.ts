export interface Airport {
  iata: string;
  icao: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

export interface AircraftType {
  code: string;
  model: string;
  manufacturer: string;
  engines: string;
  cruiseKts: number;
  cruiseFt: number;
  seats: number;
}

export interface Airline {
  iata: string;
  icao: string;
  name: string;
  country: string;
  fleet: string[];
}

export const AIRPORTS: Airport[] = [
  { iata: "LHR", icao: "EGLL", name: "Heathrow", city: "London", country: "United Kingdom", lat: 51.4706, lon: -0.4619 },
  { iata: "CDG", icao: "LFPG", name: "Charles de Gaulle", city: "Paris", country: "France", lat: 49.0097, lon: 2.5479 },
  { iata: "AMS", icao: "EHAM", name: "Schiphol", city: "Amsterdam", country: "Netherlands", lat: 52.3105, lon: 4.7683 },
  { iata: "FRA", icao: "EDDF", name: "Frankfurt am Main", city: "Frankfurt", country: "Germany", lat: 50.0379, lon: 8.5622 },
  { iata: "MAD", icao: "LEMD", name: "Barajas", city: "Madrid", country: "Spain", lat: 40.4719, lon: -3.5626 },
  { iata: "FCO", icao: "LIRF", name: "Fiumicino", city: "Rome", country: "Italy", lat: 41.8003, lon: 12.2389 },
  { iata: "IST", icao: "LTFM", name: "Istanbul", city: "Istanbul", country: "Türkiye", lat: 41.2753, lon: 28.7519 },
  { iata: "DXB", icao: "OMDB", name: "Dubai Intl", city: "Dubai", country: "UAE", lat: 25.2532, lon: 55.3657 },
  { iata: "DOH", icao: "OTHH", name: "Hamad Intl", city: "Doha", country: "Qatar", lat: 25.2731, lon: 51.6081 },
  { iata: "SIN", icao: "WSSS", name: "Changi", city: "Singapore", country: "Singapore", lat: 1.3644, lon: 103.9915 },
  { iata: "HND", icao: "RJTT", name: "Haneda", city: "Tokyo", country: "Japan", lat: 35.5494, lon: 139.7798 },
  { iata: "HKG", icao: "VHHH", name: "Hong Kong Intl", city: "Hong Kong", country: "Hong Kong", lat: 22.308, lon: 113.9185 },
  { iata: "SYD", icao: "YSSY", name: "Kingsford Smith", city: "Sydney", country: "Australia", lat: -33.9399, lon: 151.1753 },
  { iata: "JFK", icao: "KJFK", name: "John F. Kennedy", city: "New York", country: "United States", lat: 40.6413, lon: -73.7781 },
  { iata: "LAX", icao: "KLAX", name: "Los Angeles Intl", city: "Los Angeles", country: "United States", lat: 33.9416, lon: -118.4085 },
  { iata: "ORD", icao: "KORD", name: "O'Hare", city: "Chicago", country: "United States", lat: 41.9742, lon: -87.9073 },
  { iata: "ATL", icao: "KATL", name: "Hartsfield-Jackson", city: "Atlanta", country: "United States", lat: 33.6407, lon: -84.4277 },
  { iata: "SFO", icao: "KSFO", name: "San Francisco Intl", city: "San Francisco", country: "United States", lat: 37.6213, lon: -122.379 },
  { iata: "YYZ", icao: "CYYZ", name: "Pearson", city: "Toronto", country: "Canada", lat: 43.6777, lon: -79.6248 },
  { iata: "GRU", icao: "SBGR", name: "Guarulhos", city: "São Paulo", country: "Brazil", lat: -23.4356, lon: -46.4731 },
  { iata: "JNB", icao: "FAOR", name: "O.R. Tambo", city: "Johannesburg", country: "South Africa", lat: -26.1392, lon: 28.246 },
  { iata: "DEL", icao: "VIDP", name: "Indira Gandhi", city: "Delhi", country: "India", lat: 28.5562, lon: 77.1 },
  { iata: "PEK", icao: "ZBAA", name: "Beijing Capital", city: "Beijing", country: "China", lat: 40.0799, lon: 116.6031 },
  { iata: "CPH", icao: "EKCH", name: "Kastrup", city: "Copenhagen", country: "Denmark", lat: 55.618, lon: 12.656 },
  { iata: "ZRH", icao: "LSZH", name: "Kloten", city: "Zurich", country: "Switzerland", lat: 47.4647, lon: 8.5492 },
  { iata: "DUB", icao: "EIDW", name: "Dublin", city: "Dublin", country: "Ireland", lat: 53.4213, lon: -6.2701 },
  { iata: "LIS", icao: "LPPT", name: "Humberto Delgado", city: "Lisbon", country: "Portugal", lat: 38.7742, lon: -9.1342 },
  { iata: "KEF", icao: "BIKF", name: "Keflavík", city: "Reykjavík", country: "Iceland", lat: 63.985, lon: -22.6056 },
];

export const AIRCRAFT: AircraftType[] = [
  { code: "A320", model: "Airbus A320-200", manufacturer: "Airbus", engines: "2 × CFM56-5B", cruiseKts: 447, cruiseFt: 36000, seats: 180 },
  { code: "A21N", model: "Airbus A321neo", manufacturer: "Airbus", engines: "2 × LEAP-1A", cruiseKts: 455, cruiseFt: 37000, seats: 220 },
  { code: "A333", model: "Airbus A330-300", manufacturer: "Airbus", engines: "2 × Trent 700", cruiseKts: 470, cruiseFt: 39000, seats: 300 },
  { code: "A359", model: "Airbus A350-900", manufacturer: "Airbus", engines: "2 × Trent XWB", cruiseKts: 488, cruiseFt: 41000, seats: 325 },
  { code: "A388", model: "Airbus A380-800", manufacturer: "Airbus", engines: "4 × Trent 900", cruiseKts: 495, cruiseFt: 43000, seats: 525 },
  { code: "B738", model: "Boeing 737-800", manufacturer: "Boeing", engines: "2 × CFM56-7B", cruiseKts: 453, cruiseFt: 36000, seats: 189 },
  { code: "B38M", model: "Boeing 737 MAX 8", manufacturer: "Boeing", engines: "2 × LEAP-1B", cruiseKts: 453, cruiseFt: 37000, seats: 178 },
  { code: "B789", model: "Boeing 787-9 Dreamliner", manufacturer: "Boeing", engines: "2 × GEnx-1B", cruiseKts: 488, cruiseFt: 40000, seats: 296 },
  { code: "B77W", model: "Boeing 777-300ER", manufacturer: "Boeing", engines: "2 × GE90-115B", cruiseKts: 490, cruiseFt: 38000, seats: 396 },
  { code: "B744", model: "Boeing 747-400", manufacturer: "Boeing", engines: "4 × CF6-80C2", cruiseKts: 493, cruiseFt: 35000, seats: 416 },
  { code: "E190", model: "Embraer E190", manufacturer: "Embraer", engines: "2 × CF34-10E", cruiseKts: 447, cruiseFt: 35000, seats: 100 },
  { code: "BCS3", model: "Airbus A220-300", manufacturer: "Airbus", engines: "2 × PW1500G", cruiseKts: 447, cruiseFt: 37000, seats: 145 },
];

export const AIRLINES: Airline[] = [
  { iata: "BA", icao: "BAW", name: "British Airways", country: "United Kingdom", fleet: ["A320", "B77W", "A359", "B789"] },
  { iata: "AF", icao: "AFR", name: "Air France", country: "France", fleet: ["A21N", "B77W", "A359", "A320"] },
  { iata: "KL", icao: "KLM", name: "KLM Royal Dutch Airlines", country: "Netherlands", fleet: ["B738", "B789", "E190", "A333"] },
  { iata: "LH", icao: "DLH", name: "Lufthansa", country: "Germany", fleet: ["A320", "A388", "B744", "A359"] },
  { iata: "IB", icao: "IBE", name: "Iberia", country: "Spain", fleet: ["A320", "A333", "A359"] },
  { iata: "AZ", icao: "ITY", name: "ITA Airways", country: "Italy", fleet: ["A320", "A333", "A21N"] },
  { iata: "TK", icao: "THY", name: "Turkish Airlines", country: "Türkiye", fleet: ["B738", "A333", "B77W", "A21N"] },
  { iata: "EK", icao: "UAE", name: "Emirates", country: "UAE", fleet: ["A388", "B77W"] },
  { iata: "QR", icao: "QTR", name: "Qatar Airways", country: "Qatar", fleet: ["A359", "B77W", "A21N"] },
  { iata: "SQ", icao: "SIA", name: "Singapore Airlines", country: "Singapore", fleet: ["A359", "A388", "B789"] },
  { iata: "NH", icao: "ANA", name: "All Nippon Airways", country: "Japan", fleet: ["B789", "B77W", "A320"] },
  { iata: "CX", icao: "CPA", name: "Cathay Pacific", country: "Hong Kong", fleet: ["A359", "B77W", "A333"] },
  { iata: "QF", icao: "QFA", name: "Qantas", country: "Australia", fleet: ["A388", "B789", "B738"] },
  { iata: "AA", icao: "AAL", name: "American Airlines", country: "United States", fleet: ["B738", "A320", "B789", "B77W"] },
  { iata: "DL", icao: "DAL", name: "Delta Air Lines", country: "United States", fleet: ["B38M", "A333", "A359", "BCS3"] },
  { iata: "UA", icao: "UAL", name: "United Airlines", country: "United States", fleet: ["B738", "B789", "B77W", "A320"] },
  { iata: "AC", icao: "ACA", name: "Air Canada", country: "Canada", fleet: ["B789", "A333", "BCS3"] },
  { iata: "LA", icao: "LAN", name: "LATAM Airlines", country: "Brazil", fleet: ["B789", "A320", "B77W"] },
  { iata: "SA", icao: "SAA", name: "South African Airways", country: "South Africa", fleet: ["A333", "A320"] },
  { iata: "AI", icao: "AIC", name: "Air India", country: "India", fleet: ["B789", "B77W", "A320"] },
  { iata: "SK", icao: "SAS", name: "SAS Scandinavian", country: "Sweden", fleet: ["BCS3", "A21N", "B738"] },
  { iata: "LX", icao: "SWR", name: "SWISS", country: "Switzerland", fleet: ["BCS3", "B77W", "A333"] },
  { iata: "EI", icao: "EIN", name: "Aer Lingus", country: "Ireland", fleet: ["A320", "A333"] },
  { iata: "TP", icao: "TAP", name: "TAP Air Portugal", country: "Portugal", fleet: ["A320", "A21N", "A333"] },
  { iata: "FI", icao: "ICE", name: "Icelandair", country: "Iceland", fleet: ["B738", "B38M"] },
];

export const airportByIata = (iata: string) => AIRPORTS.find((a) => a.iata === iata)!;
export const aircraftByCode = (code: string) => AIRCRAFT.find((a) => a.code === code)!;

/* ---------- geo helpers ---------- */
const R_KM = 6371;
const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;

export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R_KM * Math.asin(Math.sqrt(s));
}

export function bearing(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const φ1 = toRad(a.lat);
  const φ2 = toRad(b.lat);
  const Δλ = toRad(b.lon - a.lon);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/** Great-circle interpolation, fraction f in [0,1]. */
export function interpolate(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
  f: number,
) {
  const φ1 = toRad(a.lat);
  const λ1 = toRad(a.lon);
  const φ2 = toRad(b.lat);
  const λ2 = toRad(b.lon);
  const d = distanceKm(a, b) / R_KM;
  if (d === 0) return { lat: a.lat, lon: a.lon };
  const A = Math.sin((1 - f) * d) / Math.sin(d);
  const B = Math.sin(f * d) / Math.sin(d);
  const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
  const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
  const z = A * Math.sin(φ1) + B * Math.sin(φ2);
  return {
    lat: toDeg(Math.atan2(z, Math.hypot(x, y))),
    lon: toDeg(Math.atan2(y, x)),
  };
}