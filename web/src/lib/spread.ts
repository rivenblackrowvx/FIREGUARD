// PUBLIC DEMO EXCERPT — fire-spread module.
// Only the published-literature building blocks are included here (Scott & Burgan
// fuel table, Simard EMC). The propagation engine (Rothermel ROS → Anderson L:B →
// Huygens front), its calibration and the urban non-fuel handling are NOT public.

export interface FuelModel {
  id: string;
  label: string;
  load: number; // total fine fuel load, tons/acre
  sav: number; // characteristic surface-area-to-volume, 1/ft
  depth: number; // fuel bed depth, ft
  mx: number; // moisture of extinction, fraction
  waf: number; // wind adjustment factor 10 m → midflame
}

// Scott & Burgan (2005) models common in Mediterranean Spain.
export const FUELS: FuelModel[] = [
  { id: 'SH5', label: 'SH5 · Mediterranean shrubland (matorral)', load: 5.7, sav: 900, depth: 6, mx: 0.15, waf: 0.4 },
  { id: 'GR2', label: 'GR2 · Dry grass', load: 1.1, sav: 2000, depth: 1, mx: 0.15, waf: 0.4 },
  { id: 'TU5', label: 'TU5 · Pine forest with shrub understory', load: 7.0, sav: 1300, depth: 1, mx: 0.25, waf: 0.2 },
  { id: 'TL8', label: 'TL8 · Long-needle pine litter', load: 5.8, sav: 1800, depth: 0.3, mx: 0.35, waf: 0.1 },
];

// Simard (1968) equilibrium moisture content, % → 1-h dead fuel moisture fraction.
export function deadFuelMoisture(tempC: number, rh: number) {
  const T = tempC * 1.8 + 32;
  let emc;
  if (rh < 10) emc = 0.03229 + 0.281073 * rh - 0.000578 * rh * T;
  else if (rh < 50) emc = 2.22749 + 0.160107 * rh - 0.01478 * T;
  else emc = 21.0606 + 0.005565 * rh * rh - 0.00035 * rh * T - 0.483199 * rh;
  return Math.max(0.02, (emc + 1) / 100);
}

// Rothermel head rate of spread (m/min) for 10-m wind km/h and slope (tan).

export interface SpreadInput {
  ignition: [number, number];
  hotspots: unknown[];
  weather: unknown;
  fuel?: FuelModel;
  windOverride?: { kmh: number; dir: number };
  horizons?: number[];
  urban?: unknown[];
}

export const HORIZONS = [15, 30, 60, 180];

/** Proprietary engine — intentionally omitted from the public repository. */
export function simulateSpread(_input: SpreadInput): never {
  throw new Error('simulateSpread is not part of the public demo repository.');
}
