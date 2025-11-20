import { LiquidityPoint, PricePoint, VolumePoint } from "./types";

export const CURRENT_PRICE = 3026.58;
export const INITIAL_MIN_PRICE = 2723.93;
export const INITIAL_MAX_PRICE = 3329.24;

// Helper to create realistic price curves
const generatePriceHistory = (days: number, pointsPerDay: number, startPrice: number, volatility: number): PricePoint[] => {
  const data: PricePoint[] = [];
  const totalPoints = Math.floor(days * pointsPerDay);
  let currentPrice = startPrice;
  const now = new Date();
  
  // Generate backwards
  for (let i = totalPoints; i >= 0; i--) {
    const date = new Date(now);
    // Calculate time offset
    const timeOffset = (i / pointsPerDay) * 24 * 60 * 60 * 1000; 
    date.setTime(date.getTime() - timeOffset);
    
    // Random walk with some trend
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = currentPrice * (1 + change);
    
    // Format date based on range
    let dateStr = '';
    if (days <= 1) {
        dateStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (days <= 30) {
        dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
        dateStr = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }

    data.push({
      date: dateStr,
      price: currentPrice
    });
  }
  return data.reverse();
};

// Generate Volume Data
const generateVolumeData = (days: number, points: number, isHourly: boolean = false): VolumePoint[] => {
  const data: VolumePoint[] = [];
  const now = new Date();
  
  for (let i = points; i >= 0; i--) {
    const date = new Date(now);
    if (isHourly) {
      date.setHours(date.getHours() - i);
    } else {
      // Distribute points over the days
      const dayOffset = (i / points) * days;
      date.setTime(date.getTime() - (dayOffset * 24 * 60 * 60 * 1000));
    }
    
    let dateStr = '';
    if (isHourly) {
        dateStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (days <= 90) {
        dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
        dateStr = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }

    // Random volume spikes
    const baseVol = 150000000;
    const spike = Math.random() > 0.8 ? Math.random() * 200000000 : 0;
    const volume = baseVol + (Math.random() * 50000000) + spike;

    data.push({
      date: dateStr,
      volume: volume
    });
  }
  return data;
};

// Generate Liquidity Density Distribution
const generateLiquidityDistribution = (center: number, spread: number): LiquidityPoint[] => {
  const points: LiquidityPoint[] = [];
  const step = spread / 20;
  const start = center - spread;
  
  for (let p = start; p <= center + spread; p += step) {
    // Bell curve shape approximation
    const distance = Math.abs(p - center);
    const density = Math.exp(-(distance * distance) / (2 * (spread * 0.3) * (spread * 0.3))) * 1000;
    points.push({
      price: p,
      density: density + (Math.random() * 200) // Noise
    });
  }
  return points;
};

// Pre-generated datasets for responsiveness
export const DATA_SETS: Record<string, PricePoint[]> = {
  '24h': generatePriceHistory(1, 24, CURRENT_PRICE, 0.002),
  '7d': generatePriceHistory(7, 4, CURRENT_PRICE, 0.008),
  '30d': generatePriceHistory(30, 1, CURRENT_PRICE, 0.02),
  '90d': generatePriceHistory(90, 1, CURRENT_PRICE, 0.05),
  '180d': generatePriceHistory(180, 0.5, CURRENT_PRICE, 0.1),
  '1y': generatePriceHistory(365, 0.2, CURRENT_PRICE, 0.15),
};

export const VOLUME_DATA_SETS: Record<string, VolumePoint[]> = {
  '24h': generateVolumeData(1, 24, true),
  '7d': generateVolumeData(7, 14, false),
  '30d': generateVolumeData(30, 30, false),
  '90d': generateVolumeData(90, 30, false),
  '180d': generateVolumeData(180, 24, false),
  '1y': generateVolumeData(365, 12, false),
};

export const LIQUIDITY_DATA = generateLiquidityDistribution(CURRENT_PRICE, 1000);