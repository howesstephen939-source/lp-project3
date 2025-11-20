import React, { useState, useMemo } from 'react';
import { Icons, TokenIcons } from './components/Icon';
import { CURRENT_PRICE, INITIAL_MIN_PRICE, INITIAL_MAX_PRICE, DATA_SETS, VOLUME_DATA_SETS, LIQUIDITY_DATA } from './constants';
import { PriceChart, LiquidityChart, VolumeChart } from './components/ChartComponents';
import { NumberInput, RangeAdjuster, TimeToggle, Slider } from './components/Controls';

// Helpers for Uniswap math estimation
const calculateDepositRatio = (current: number, min: number, max: number) => {
  if (current <= min) return 0; // 100% Asset A (Base)
  if (current >= max) return 1; // 100% Asset B (Quote)
  return (current - min) / (max - min);
};

// Number formatter utility
const formatNum = (num: number, digits = 2) => {
  return num.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
};

const formatCurrency = (num: number) => {
  return '$' + formatNum(num, 2);
};

// Reusable Panel Component based on Design System
const Panel = ({ title, subtitle, children, className = "" }: { title?: string, subtitle?: React.ReactNode, children?: React.ReactNode, className?: string }) => (
  <div className={`rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-950/80 shadow-2xl shadow-black/40 p-6 backdrop-blur-sm ${className}`}>
    {(title || subtitle) && (
      <div className="flex justify-between items-center mb-6">
        {title && <h3 className="text-slate-50 font-semibold text-lg">{title}</h3>}
        {subtitle && <div>{subtitle}</div>}
      </div>
    )}
    {children}
  </div>
);

function App() {
  // Global State
  const [currentPrice] = useState(CURRENT_PRICE);
  const [minPrice, setMinPrice] = useState(INITIAL_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(INITIAL_MAX_PRICE);
  const [depositAmount, setDepositAmount] = useState(1000);
  
  // UI State
  const [timeRange, setTimeRange] = useState('30d');
  const [volumeTimeRange, setVolumeTimeRange] = useState('30d');
  const [backtestDays, setBacktestDays] = useState(30);

  // Dynamic Data based on Time Selection
  const chartData = useMemo(() => {
    return DATA_SETS[timeRange] || DATA_SETS['30d'];
  }, [timeRange]);

  const volumeData = useMemo(() => {
    return VOLUME_DATA_SETS[volumeTimeRange] || VOLUME_DATA_SETS['30d'];
  }, [volumeTimeRange]);

  // Derived State
  const ratioB = useMemo(() => calculateDepositRatio(currentPrice, minPrice, maxPrice), [currentPrice, minPrice, maxPrice]);
  const ratioA = 1 - ratioB;

  const tokenAAmount = (depositAmount * ratioA) / currentPrice;
  const tokenBAmount = depositAmount * ratioB;

  const estimatedApr = useMemo(() => {
    const variance = Math.sin(backtestDays / 10) * 5; 
    return 41.14 + variance;
  }, [backtestDays]);

  const dailyFee = (depositAmount * (estimatedApr / 100)) / 365;

  const adjustMin = (deltaPercent: number) => {
    setMinPrice(prev => prev * (1 + deltaPercent / 100));
  };

  const adjustMax = (deltaPercent: number) => {
    setMaxPrice(prev => prev * (1 + deltaPercent / 100));
  };

  const setRangeStrategy = (percent: number) => {
    const half = percent / 2;
    setMinPrice(currentPrice * (1 - half / 100));
    setMaxPrice(currentPrice * (1 + half / 100));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-amber-500/30 flex justify-center">
      <div className="w-full max-w-[1280px] p-4 lg:p-8 space-y-8">
      
        {/* Header Title Section */}
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-slate-50 tracking-tight">Liquidity Position Simulator</h1>
          <p className="text-slate-400 text-base">Simulate Uniswap V3 returns and visualize concentrated liquidity.</p>
        </header>

        {/* Selection Bar */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <SelectBox label="Chain" value="Arbitrum" icon={<TokenIcons.Arbitrum className="w-5 h-5 mr-2" />} />
          <SelectBox label="Protocol" value="Uniswap V3" />
          <SelectBox label="Token A" value="WETH" icon={<TokenIcons.ETH className="w-5 h-5 mr-2" />}/>
          <SelectBox label="Token B" value="USDC" icon={<TokenIcons.USDC className="w-5 h-5 mr-2" />}/>
          <SelectBox label="Fee Tier" value="0.05%" />
        </section>
        
        {/* Hero: Token Pair & Status */}
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 shadow-inner shadow-black/30 p-6 overflow-hidden group">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div className="flex items-center gap-4 z-10">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center z-10 shadow-lg border-4 border-slate-950">
                  <TokenIcons.ETH className="w-full h-full" />
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center shadow-lg border-4 border-slate-950">
                  <TokenIcons.USDC className="w-full h-full" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold text-slate-50">WETH / USDC</h2>
                  <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full uppercase tracking-wide">0.05%</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                  <span className="font-mono text-slate-600">0xc696...e8d0</span>
                  <Icons.Copy size={14} className="cursor-pointer hover:text-amber-400 transition-colors" />
                  <Icons.ExternalLink size={14} className="cursor-pointer hover:text-amber-400 transition-colors ml-1" />
                </div>
              </div>
            </div>

             <div className="flex items-center gap-3 z-10">
                <div className="flex items-center gap-2 text-emerald-300 bg-emerald-500/10 px-4 py-2 rounded-full text-sm border border-emerald-500/20 shadow-lg shadow-emerald-900/20 relative overflow-hidden">
                  <span className="relative flex h-2.5 w-2.5 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-medium tracking-wide">Active Pool</span>
                </div>
                <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 hover:text-amber-300 hover:border-amber-400/50 px-4 py-2 rounded-full text-sm transition-all border border-slate-700 text-slate-200 shadow-lg active:scale-95">
                  <Icons.ArrowRightLeft size={14} />
                  Invert
                </button>
            </div>
          </div>
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-0 pointer-events-none transition-all duration-1000 group-hover:bg-blue-500/10"></div>
        </div>

        {/* ROW 1: Price Range & Price Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Price Range Panel */}
            <Panel title="Liquidity Price Range" className="flex flex-col justify-between h-full">
              <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-6 text-center mb-6 shadow-inner relative overflow-hidden">
                 {/* Subtle background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/30 to-transparent w-full h-full animate-pulse"></div>
                <span className="text-slate-500 text-xs uppercase tracking-[0.3em] font-semibold relative z-10">Current Price</span>
                <div className="text-3xl font-bold text-slate-50 mt-2 tracking-tight relative z-10">
                  1 WETH = {formatNum(currentPrice)} USDC
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="text-slate-500 text-xs mb-2 block text-center uppercase tracking-wider">Min Price</label>
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center text-base font-mono text-slate-200 mb-2 shadow-sm">
                    {formatNum(minPrice)}
                  </div>
                  <div className="flex justify-center gap-2">
                    <RangeAdjuster onDecrease={() => adjustMin(-1)} onIncrease={() => adjustMin(1)} percentage={-10.00} />
                  </div>
                </div>
                <div>
                  <label className="text-slate-500 text-xs mb-2 block text-center uppercase tracking-wider">Max Price</label>
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center text-base font-mono text-slate-200 mb-2 shadow-sm">
                    {formatNum(maxPrice)}
                  </div>
                  <div className="flex justify-center gap-2">
                    <RangeAdjuster onDecrease={() => adjustMax(-1)} onIncrease={() => adjustMax(1)} percentage={10.00} />
                  </div>
                </div>
              </div>

              {/* Range Presets */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                <PresetButton label="Narrow" onClick={() => setRangeStrategy(10)} />
                <PresetButton label="Balanced" onClick={() => setRangeStrategy(20)} />
                <PresetButton label="Wide" onClick={() => setRangeStrategy(50)} />
                <PresetButton label="Full" onClick={() => setRangeStrategy(100)} />
              </div>

              <div className="mt-auto bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-400 rounded-r-lg p-4">
                <div className="text-amber-400/80 text-xs uppercase tracking-wider mb-1 font-medium">Selected Range</div>
                <div className="text-slate-50 text-xl font-bold">
                  {formatNum(minPrice)} - {formatNum(maxPrice)}
                </div>
                <div className="text-slate-400 text-xs mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  In Range
                </div>
              </div>
            </Panel>

             {/* Price Chart Panel */}
            <Panel 
              title="Price Chart" 
              subtitle={<TimeToggle active={timeRange} onChange={setTimeRange} options={['24h', '7d', '30d', '90d', '180d', '1y']} />}
              className="flex flex-col h-full"
            >
              <div className="flex-grow min-h-[300px] w-full mt-4">
                  <PriceChart 
                    data={chartData} 
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    currentPrice={currentPrice}
                  />
              </div>
            </Panel>

        </div>

        {/* ROW 2: Deposit Amount & Estimated Fees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Deposit Amount Panel */}
            <Panel title="Deposit Amount" className="h-full flex flex-col">
              <NumberInput 
                value={depositAmount} 
                onChange={setDepositAmount} 
                prefix="$" 
                className="mb-8"
              />

              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors group cursor-default">
                  <div className="flex items-center gap-2 mb-4">
                    <TokenIcons.ETH className="w-6 h-6" />
                    <span className="text-sm font-semibold text-slate-300">WETH</span>
                    <span className="ml-auto text-slate-500 text-xs tracking-widest">{(ratioA * 100).toFixed(0)}%</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-50">{formatCurrency(depositAmount * ratioA)}</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">{tokenAAmount.toFixed(4)} WETH</div>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors group cursor-default">
                  <div className="flex items-center gap-2 mb-4">
                    <TokenIcons.USDC className="w-6 h-6" />
                    <span className="text-sm font-semibold text-slate-300">USDC</span>
                    <span className="ml-auto text-slate-500 text-xs tracking-widest">{(ratioB * 100).toFixed(0)}%</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-50">{formatCurrency(depositAmount * ratioB)}</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">{tokenBAmount.toFixed(4)} USDC</div>
                </div>
              </div>
            </Panel>

            {/* Estimated Fees Panel */}
            <Panel title="Estimated Fees" className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-slate-400 text-sm">Backtest Period</span>
                <div className="flex items-center gap-3">
                  <button className="bg-slate-900 p-1.5 rounded-lg border border-slate-800 hover:border-amber-400/50 hover:text-amber-300 transition-colors active:scale-95" onClick={() => setBacktestDays(d => Math.max(1, d-1))}>
                    <Icons.Minus size={14} />
                  </button>
                  <span className="text-slate-200 font-mono text-sm min-w-[24px] text-center">{backtestDays}d</span>
                  <button className="bg-slate-900 p-1.5 rounded-lg border border-slate-800 hover:border-amber-400/50 hover:text-amber-300 transition-colors active:scale-95" onClick={() => setBacktestDays(d => Math.min(365, d+1))}>
                    <Icons.Plus size={14} />
                  </button>
                </div>
              </div>
              
              {/* Interactive Slider */}
              <div className="mb-10 px-1">
                <Slider 
                  min={1} 
                  max={180} 
                  value={backtestDays} 
                  onChange={setBacktestDays} 
                />
              </div>

              <div className="grid grid-cols-4 gap-2 mb-8 border-b border-slate-800/50 pb-8 mt-auto">
                <FeeCard label="24H" value={formatNum(dailyFee)} roi={(estimatedApr/365).toFixed(2)} />
                <FeeCard label="7D" value={formatNum(dailyFee * 7)} roi={(estimatedApr/52).toFixed(2)} />
                <FeeCard label="30D" value={formatNum(dailyFee * 30)} roi={(estimatedApr/12).toFixed(2)} />
                <FeeCard label="1Y" value={formatNum(dailyFee * 365)} roi={estimatedApr.toFixed(0)} />
              </div>

              <div className="flex items-end justify-center gap-3">
                <div className="text-slate-400 text-sm mb-2 uppercase tracking-widest">Est. APR</div>
                <div className="text-5xl font-bold text-amber-400 drop-shadow-lg transition-all duration-500">{estimatedApr.toFixed(2)}%</div>
              </div>
            </Panel>

        </div>

        {/* ROW 3: Liquidity Distribution & Volume History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Liquidity Distribution Panel */}
            <Panel 
              title="Liquidity Distribution" 
              subtitle={
                <div className="flex gap-2">
                  <button className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 border border-slate-800 transition-colors active:scale-95"><Icons.ZoomIn size={14} className="text-slate-400" /></button>
                  <button className="bg-slate-900 px-3 py-1 text-xs rounded-lg border border-slate-800 text-slate-300 font-mono">585%</button>
                  <button className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 border border-slate-800 transition-colors active:scale-95"><Icons.ZoomOut size={14} className="text-slate-400" /></button>
                </div>
              }
              className="flex flex-col h-full"
            >
              <div className="h-64 w-full relative mt-auto">
                <LiquidityChart 
                  data={LIQUIDITY_DATA} 
                  minPrice={minPrice} 
                  maxPrice={maxPrice} 
                  currentPrice={currentPrice}
                />
              </div>
            </Panel>

            {/* Volume History Panel */}
            <Panel 
               title="Volume History"
               subtitle={<TimeToggle active={volumeTimeRange} onChange={setVolumeTimeRange} options={['24h', '7d', '30d', '90d', '180d', '1y']} />}
               className="flex flex-col h-full"
            >
              <div className="text-xs text-slate-400 mb-2 h-6 flex items-center uppercase tracking-widest">Total Vol: <span className="text-slate-50 ml-2 font-bold text-sm">$429M</span></div>
              <div className="h-64 w-full relative mt-auto">
                  <VolumeChart data={volumeData} />
              </div>
            </Panel>
        </div>

      </div>
    </div>
  );
}

// Mini Component for the Top Selectors
const SelectBox = ({ label, value, icon }: { label: string, value: string, icon?: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold ml-1">{label}</label>
    <div className="flex items-center justify-between bg-slate-900/70 border border-slate-800 rounded-xl px-3 py-2.5 hover:border-amber-400/40 hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]">
      <div className="flex items-center">
        {icon}
        <span className="text-sm text-slate-300 group-hover:text-amber-100 font-medium">{value}</span>
      </div>
      <Icons.ChevronDown size={14} className="text-slate-600 group-hover:text-amber-400 transition-colors" />
    </div>
  </div>
);

const FeeCard = ({ label, value, roi }: { label: string, value: string, roi: string }) => (
  <div className="text-center p-2 rounded-lg hover:bg-slate-900/40 transition-colors cursor-default">
    <div className="text-slate-500 text-[10px] mb-1 uppercase tracking-widest">{label}</div>
    <div className="text-slate-50 font-bold text-lg mb-0.5 tracking-tight">${value}</div>
    <div className="text-emerald-300 text-xs font-medium">{roi}%</div>
  </div>
);

const PresetButton = ({ label, onClick }: { label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-xs text-slate-400 hover:text-amber-300 hover:border-amber-400/30 transition-all active:scale-95"
  >
    {label}
  </button>
);

export default App;