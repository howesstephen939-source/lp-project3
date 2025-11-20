import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { PricePoint, LiquidityPoint, VolumePoint } from '../types';

interface PriceChartProps {
  data: PricePoint[];
  minPrice: number;
  maxPrice: number;
  currentPrice: number;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, minPrice, maxPrice, currentPrice }) => {
  
  // Calculate the domain to ensure the Range Lines are always visible
  const domain = useMemo(() => {
    const dataMin = Math.min(...data.map(d => d.price));
    const dataMax = Math.max(...data.map(d => d.price));
    
    // Add buffer to min/max lines or data limits
    const lowerBound = Math.min(dataMin, minPrice);
    const upperBound = Math.max(dataMax, maxPrice);
    
    // Add 5% padding
    const padding = (upperBound - lowerBound) * 0.05;
    
    return [lowerBound - padding, upperBound + padding];
  }, [data, minPrice, maxPrice]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 20 }}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis 
          dataKey="date" 
          tick={{ fill: '#64748b', fontSize: 10, textAnchor: 'end', dy: 5 }} 
          angle={-45}
          height={50}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
          minTickGap={30}
        />
        <YAxis 
          domain={domain}
          tick={{ fill: '#64748b', fontSize: 10 }} 
          axisLine={false}
          tickLine={false}
          tickFormatter={(val) => val.toLocaleString(undefined, {maximumFractionDigits: 0})}
          width={65}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
          itemStyle={{ color: '#fbbf24' }}
          labelStyle={{ color: '#94a3b8' }}
          formatter={(value: number) => [value.toFixed(2), "Price"]}
        />
        <Area 
          type="monotone" 
          dataKey="price" 
          stroke="url(#lineGradient)" 
          fillOpacity={1} 
          fill="url(#colorPrice)" 
          strokeWidth={2}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        
        {/* Range Lines - Order matters, later elements render on top */}
        <ReferenceLine 
          y={maxPrice} 
          stroke="#fbbf24" 
          strokeDasharray="4 4" 
          label={{ value: `Max: ${maxPrice.toLocaleString(undefined, {maximumFractionDigits: 0})}`, position: 'insideTopRight', fill: '#fbbf24', fontSize: 11, fontWeight: 500, dy: -10 }} 
        />
        <ReferenceLine 
          y={minPrice} 
          stroke="#fbbf24" 
          strokeDasharray="4 4" 
          label={{ value: `Min: ${minPrice.toLocaleString(undefined, {maximumFractionDigits: 0})}`, position: 'insideBottomRight', fill: '#fbbf24', fontSize: 11, fontWeight: 500, dy: 10 }} 
        />
        
      </AreaChart>
    </ResponsiveContainer>
  );
};

interface LiquidityChartProps {
  data: LiquidityPoint[];
  minPrice: number;
  maxPrice: number;
  currentPrice: number;
}

export const LiquidityChart: React.FC<LiquidityChartProps> = ({ data, minPrice, maxPrice, currentPrice }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 20 }} barCategoryGap={1}>
        <defs>
          <linearGradient id="activeBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity={1} />
            <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="inactiveBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#1e293b" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="price" 
          tick={{ fill: '#64748b', fontSize: 10, textAnchor: 'end', dy: 5 }} 
          angle={-45}
          height={50}
          axisLine={false}
          tickLine={false}
          tickFormatter={(val) => val.toFixed(0)}
          interval="preserveStartEnd"
        />
        <YAxis 
          tick={{ fill: '#64748b', fontSize: 10 }} 
          axisLine={false}
          tickLine={false}
          width={45}
          tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val.toFixed(0)}
        />
        <Tooltip 
          cursor={{fill: 'rgba(255,255,255,0.05)'}}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-slate-900 border border-slate-700 p-3 text-xs rounded-xl shadow-xl backdrop-blur-md bg-slate-900/90">
                  <p className="text-slate-400 mb-1">Price: <span className="text-slate-50 font-mono">{payload[0].payload.price.toFixed(2)}</span></p>
                  <p className="text-slate-400">Liquidity: <span className="text-amber-400 font-mono">{payload[0].value?.toFixed(0)}</span></p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="density">
          {data.map((entry, index) => {
            const isActive = entry.price >= minPrice && entry.price <= maxPrice;
            return (
              <Cell 
                key={`cell-${index}`} 
                fill={isActive ? 'url(#activeBar)' : 'url(#inactiveBar)'} 
              />
            );
          })}
        </Bar>
        <ReferenceLine x={currentPrice} stroke="#f8fafc" strokeDasharray="3 3" label={{ value: 'Current', position: 'top', fill: '#f8fafc', fontSize: 10, fontWeight: 600 }} />
        <ReferenceLine x={minPrice} stroke="#fbbf24" strokeDasharray="3 3" label={{ value: 'Min', position: 'insideTopLeft', fill: '#fbbf24', fontSize: 10 }} />
        <ReferenceLine x={maxPrice} stroke="#fbbf24" strokeDasharray="3 3" label={{ value: 'Max', position: 'insideTopRight', fill: '#fbbf24', fontSize: 10 }} />
      </BarChart>
    </ResponsiveContainer>
  );
};


interface VolumeChartProps {
  data: VolumePoint[];
}

export const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 20 }}>
        <defs>
           <linearGradient id="volumeBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity={1} />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="date" 
          tick={{ fill: '#64748b', fontSize: 10, textAnchor: 'end', dy: 5 }} 
          angle={-45}
          height={50}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis 
          tick={{ fill: '#64748b', fontSize: 10 }} 
          axisLine={false}
          tickLine={false}
          tickFormatter={(val) => `$${(val / 1000000).toFixed(0)}M`}
          width={45}
        />
        <Tooltip 
           contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '12px' }}
           itemStyle={{ color: '#fbbf24' }}
           cursor={{fill: '#1e293b'}}
           formatter={(value: number) => [`$${(value/1000000).toFixed(2)}M`, 'Volume']}
        />
        <Bar dataKey="volume" fill="url(#volumeBar)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};