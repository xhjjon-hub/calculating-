import React from 'react';

interface DisplayProps {
  value: string;
  previousValue: string | null;
  operator: string | null;
}

export const Display: React.FC<DisplayProps> = ({ value, previousValue, operator }) => {
  // Format numbers for better readability (commas)
  const formatNumber = (num: string) => {
    if (!num) return '';
    if (num === 'Error') return 'Error';
    if (num.includes('e')) return num; // Scientific notation
    
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
  };

  return (
    <div className="w-full bg-slate-950/50 backdrop-blur-md rounded-2xl p-6 mb-4 flex flex-col items-end justify-end h-32 border border-slate-800 shadow-inner relative overflow-hidden">
      {/* Previous calculation context */}
      <div className="text-slate-400 text-sm font-mono h-6 flex items-center gap-2">
        {previousValue && (
          <>
            <span>{formatNumber(previousValue)}</span>
            <span className="text-indigo-400">{operator}</span>
          </>
        )}
      </div>
      
      {/* Main Display */}
      <div className="text-5xl font-light text-white tracking-tight break-all text-right w-full mt-1 font-mono">
        {formatNumber(value)}
      </div>
    </div>
  );
};