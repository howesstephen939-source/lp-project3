import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';

interface NumberInputProps {
  value: number;
  onChange: (val: number) => void;
  label?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, label, prefix, suffix, className = "" }) => {
  const [localValue, setLocalValue] = useState(value.toString());

  // Sync local state when prop changes externally (e.g. via slider or range buttons)
  useEffect(() => {
    if (parseFloat(localValue) !== value) {
      setLocalValue(value.toString());
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">{label}</span>}
      <div className="flex items-center bg-slate-900/70 border border-slate-800 rounded-xl px-3 py-3 hover:border-amber-400/50 transition-colors shadow-inner shadow-black/20 focus-within:border-amber-400/50 focus-within:ring-1 focus-within:ring-amber-400/20">
        {prefix && <span className="text-slate-400 mr-2">{prefix}</span>}
        <input 
          type="number" 
          className="bg-transparent text-slate-50 w-full focus:outline-none font-mono text-sm placeholder-slate-600"
          value={localValue}
          onChange={handleChange}
        />
        {suffix && <span className="text-slate-500 text-xs ml-2">{suffix}</span>}
      </div>
    </div>
  );
};

interface RangeAdjusterProps {
  onDecrease: () => void;
  onIncrease: () => void;
  percentage: number;
}

export const RangeAdjuster: React.FC<RangeAdjusterProps> = ({ onDecrease, onIncrease, percentage }) => {
  return (
    <div className="flex items-center gap-1 mt-2">
       <button onClick={onDecrease} className="p-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400/50 text-slate-400 transition-colors hover:text-amber-300 active:scale-95">
         <Icons.Minus size={12} />
       </button>
       <div className="bg-slate-950/50 border border-slate-800 px-2 py-1 rounded-md text-xs text-slate-300 font-mono min-w-[60px] text-center">
         {percentage > 0 ? '+' : ''}{percentage.toFixed(2)}
       </div>
       <span className="text-xs text-slate-500">%</span>
       <button onClick={onIncrease} className="p-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400/50 text-slate-400 transition-colors hover:text-amber-300 active:scale-95">
         <Icons.Plus size={12} />
       </button>
    </div>
  );
};

export const TimeToggle: React.FC<{ active: string, options: string[], onChange: (v: string) => void }> = ({ active, options, onChange }) => {
  return (
    <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1 text-xs rounded-md transition-all ${active === opt ? 'bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-400/20' : 'text-slate-500 hover:text-slate-300'}`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export const Slider: React.FC<{ value: number, min: number, max: number, onChange: (val: number) => void }> = ({ value, min, max, onChange }) => {
  // Calculate percentage for positioning
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  
  return (
    <div className="relative w-full h-6 flex items-center select-none group">
      {/* Track Background */}
      <div className="absolute w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        {/* Active Fill */}
        <div 
          className="h-full bg-amber-400 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(251,191,36,0.3)]" 
          style={{ width: `${percentage}%` }} 
        />
      </div>
      
      {/* Range Input (Invisible interaction layer) */}
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
      />

      {/* Custom Thumb */}
      <div 
        className="absolute h-4 w-4 bg-amber-400 rounded-full border-2 border-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.5)] z-10 pointer-events-none transition-all duration-75 ease-out group-hover:scale-110 group-active:scale-95"
        style={{ left: `calc(${percentage}% - 8px)` }}
      />
    </div>
  );
};