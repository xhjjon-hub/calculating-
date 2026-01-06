import React from 'react';
import { ButtonVariant } from '../types';

interface ButtonProps {
  label: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
  doubleWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = ButtonVariant.Default, 
  className = '',
  doubleWidth = false
}) => {
  
  const getVariantStyles = (variant: ButtonVariant) => {
    switch (variant) {
      case ButtonVariant.Primary:
        return 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30';
      case ButtonVariant.Secondary:
        return 'bg-slate-700 hover:bg-slate-600 text-slate-100';
      case ButtonVariant.Accent:
        return 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/30';
      case ButtonVariant.Default:
      default:
        return 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden
        h-16 ${doubleWidth ? 'col-span-2 w-full' : 'w-full'}
        rounded-2xl
        text-xl font-medium transition-all duration-200 active:scale-95
        flex items-center justify-center
        select-none
        ${getVariantStyles(variant)}
        ${className}
      `}
    >
      {label}
    </button>
  );
};