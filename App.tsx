import React from 'react';
import { Calculator } from './components/Calculator';

export default function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Ambient Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      
      <main className="z-10 w-full max-w-md">
        <Calculator />
      </main>
      
      <footer className="absolute bottom-4 text-slate-500 text-xs text-center w-full z-0">
        Powered by React
      </footer>
    </div>
  );
}