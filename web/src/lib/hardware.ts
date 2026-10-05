// PUBLIC DEMO EXCERPT — hardware network model with three sample nodes.
// Values are synthetic; node positions are demo placements.
import type { LngLat } from './types';

export type SensorStatus = 'ONLINE' | 'WARNING' | 'OFFLINE';
export type SmokeLevel = 'NORMAL' | 'ELEVATED' | 'HIGH';
export type SignalState = 'POSSIBLE FIRE' | 'HIGH-CONFIDENCE FIRE SIGNAL' | 'PENDING' | 'UNCONFIRMED';

export interface SensorNode {
  id: string;
  region: string;
  lngLat: LngLat;
  status: SensorStatus;
  temp: number;
  humidity: number;
  smoke: SmokeLevel;
  battery: number;
  signal: number; // dBm
  lastSignal: number; // seconds ago
  anomaly?: 'TEMP' | 'HUMIDITY' | 'SMOKE' | 'BATTERY';
}

export const SENSOR_NODES: SensorNode[] = [
  { id: 'ESP32-FG-001', region: 'Gredos', lngLat: [-5.25, 40.25], status: 'ONLINE', temp: 38.4, humidity: 21, smoke: 'NORMAL', battery: 91, signal: -54, lastSignal: 4 },
  { id: 'ESP32-FG-006', region: 'Sierra de Cazorla', lngLat: [-2.95, 37.9], status: 'WARNING', temp: 43.8, humidity: 12, smoke: 'ELEVATED', battery: 52, signal: -66, lastSignal: 8, anomaly: 'TEMP' },
  { id: 'ESP32-FG-019', region: 'Peña Trevinca', lngLat: [-6.79, 42.24], status: 'OFFLINE', temp: 0, humidity: 0, smoke: 'NORMAL', battery: 31, signal: -97, lastSignal: 4000 },
];
