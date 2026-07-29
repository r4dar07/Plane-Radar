import { bearing, distanceKm, type Airport } from "@/lib/flight-data";
import type { Flight } from "@/lib/flight-engine";

interface Props {
  center: Airport;
  rangeKm: number;
  flights: Flight[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const SIZE = 600;
const C = SIZE / 2;
const R = SIZE / 2 - 24;

export function RadarScope({ center, rangeKm, flights, selectedId, onSelect }: Props) {
  const rings = [0.25, 0.5, 0.75, 1];

  const plotted = flights
    .map((f) => {
      const d = distanceKm(center, f);
      const b = bearing(center, f);
      const r = (d / rangeKm) * R;
      const rad = ((b - 90) * Math.PI) / 180;
      return { f, d, x: C + r * Math.cos(rad), y: C + r * Math.sin(rad), inRange: d <= rangeKm };
    })
    .filter((p) => p.inRange);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-full w-full select-none"
      role="img"
      aria-label={`Radar scope centred on ${center.name}`}
    >
      <defs>
        <radialGradient id="scope-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--radar)" stopOpacity="0.10" />
          <stop offset="70%" stopColor="var(--radar)" stopOpacity="0.03" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--radar)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--radar)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx={C} cy={C} r={R} fill="url(#scope-bg)" />

      {rings.map((k) => (
        <circle
          key={k}
          cx={C}
          cy={C}
          r={R * k}
          fill="none"
          stroke="var(--radar-dim)"
          strokeOpacity={0.6}
          strokeWidth={1}
          strokeDasharray={k === 1 ? undefined : "3 6"}
        />
      ))}

      {[0, 45, 90, 135].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={C - R * Math.cos(rad)}
            y1={C - R * Math.sin(rad)}
            x2={C + R * Math.cos(rad)}
            y2={C + R * Math.sin(rad)}
            stroke="var(--radar-dim)"
            strokeOpacity={0.35}
          />
        );
      })}

      {rings.map((k) => (
        <text
          key={`lbl-${k}`}
          x={C + 4}
          y={C - R * k + 12}
          fontSize={10}
          fill="var(--radar-dim)"
          className="font-mono"
        >
          {Math.round(rangeKm * k)} km
        </text>
      ))}

      {["N", "E", "S", "W"].map((d, i) => {
        const rad = ((i * 90 - 90) * Math.PI) / 180;
        return (
          <text
            key={d}
            x={C + (R + 14) * Math.cos(rad)}
            y={C + (R + 14) * Math.sin(rad) + 4}
            fontSize={11}
            textAnchor="middle"
            fill="var(--radar-dim)"
            className="font-mono"
          >
            {d}
          </text>
        );
      })}

      <g className="animate-sweep" style={{ transformOrigin: `${C}px ${C}px` }}>
        <path d={`M ${C} ${C} L ${C + R} ${C} A ${R} ${R} 0 0 0 ${C + R * Math.cos(-Math.PI / 4)} ${C + R * Math.sin(-Math.PI / 4)} Z`} fill="url(#sweep)" />
        <line x1={C} y1={C} x2={C + R} y2={C} stroke="var(--radar)" strokeOpacity={0.7} />
      </g>

      {/* home airport */}
      <circle cx={C} cy={C} r={5} fill="var(--warn)" />
      <text x={C} y={C - 12} fontSize={11} textAnchor="middle" fill="var(--warn)" className="font-mono">
        {center.iata}
      </text>

      {plotted.map(({ f, x, y, d }) => {
        const active = f.id === selectedId;
        return (
          <g
            key={f.id}
            transform={`translate(${x} ${y})`}
            onClick={() => onSelect(f.id)}
            className="cursor-pointer"
          >
            <circle r={12} fill="transparent" />
            <g transform={`rotate(${f.headingDeg})`}>
              <path
                d="M 0 -7 L 5 6 L 0 3 L -5 6 Z"
                fill={active ? "var(--warn)" : "var(--radar)"}
                className={active ? undefined : "animate-blip"}
              />
            </g>
            {(active || d < rangeKm * 0.8) && (
              <text
                x={9}
                y={4}
                fontSize={9}
                fill={active ? "var(--warn)" : "var(--radar-dim)"}
                className="font-mono"
              >
                {f.flightNo}
              </text>
            )}
            {active && <circle r={14} fill="none" stroke="var(--warn)" strokeDasharray="2 4" />}
          </g>
        );
      })}
    </svg>
  );
}