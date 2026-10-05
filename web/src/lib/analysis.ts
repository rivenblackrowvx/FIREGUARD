// PUBLIC DEMO EXCERPT — analysis pipeline (interface only).
// Pipeline: weather → spread → values at risk → risk score → timeline.
// The risk-score weighting, exposure computation and ETA logic are proprietary
// and have been removed from the public version.
import type { Asset, Fire, Risk, Spread, TimelineEvent, Weather } from './types';
import type { FuelModel } from './spread';

export interface Analysis {
  weather: Weather;
  spread: Spread;
  assets: Asset[];
  roads: { ref: string; kind: string; coords: [number, number][]; etaMin: number | null }[];
  exposure: { people: number; schools: number; hospitals: number; roads: number; critical: number };
  risk: Risk; // 0–100 composite score built from eight factors
  timeline: TimelineEvent[];
}

// Towns are modelled as discs; denser cores for bigger cities (inhabitants/km²).
export function townRadiusKm(pop: number) {
  const density = pop >= 100_000 ? 12_000 : pop >= 20_000 ? 6_000 : 3_000;
  return Math.max(0.25, Math.sqrt(pop / density / Math.PI));
}

/** Proprietary pipeline — intentionally omitted from the public repository. */
export async function analyzeFire(_fire: Fire, _fuel?: FuelModel, _weather?: Weather): Promise<Analysis> {
  throw new Error('analyzeFire is not part of the public demo repository.');
}
