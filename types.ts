export interface Token {
  symbol: string;
  name: string;
  color: string;
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface VolumePoint {
  date: string;
  volume: number;
}

export interface LiquidityPoint {
  price: number;
  density: number;
}

export enum TimeRange {
  H24 = '24h',
  D7 = '7d',
  D30 = '30d',
  D90 = '90d',
  D180 = '180d',
  Y1 = '1y',
}
