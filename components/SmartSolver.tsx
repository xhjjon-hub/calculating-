import React, { useState } from 'react';
import { solveMathProblem } from '../services/geminiService';
import { SolveResult } from '../types';

interface SmartSolverProps {
  onClose: () => void;
  onApplyResult: (result: string) => void;
}

export const SmartSolver: React.FC<SmartSolverProps> = ({ onClose, onApplyResult }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SolveResult | null>(null);
  const [error, setError] = useState('');

  const handleSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await solveMathProblem(query);
      setResult(data);
    } catch (err) {
      setError('Could not solve. Check your API Key or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-xl p-6 rounded-3xl flex flex-col animate-in fade-in zoom-in duration-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          AI Math Assistant
        </h3>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white p-2"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSolve} className="flex-1 flex flex-col gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-2 uppercase tracking-wider">Describe Problem</label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., How many seconds in a year? or 15% of 200 + 50"
            className="w-full h-24 bg-slate-800 rounded-xl p-4 text-white placeholder-slate-500 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </>
          ) : (
            <>
              ✨ Solve with Gemini
            </>
          )}
        </button>

        {error && (
          <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-2 bg-slate-800/50 rounded-xl p-4 border border-slate-700 animate-in slide-in-from-bottom-2">
            <div className="text-slate-400 text-xs uppercase mb-1">Answer</div>
            <div className="text-3xl font-mono text-white mb-2">{result.answer}</div>
            <div className="text-slate-400 text-sm leading-relaxed border-t border-slate-700 pt-2">
              {result.explanation}
            </div>
            <button
              type="button"
              onClick={() => onApplyResult(result.answer.replace(/[^0-9.-]/g, ''))}
              className="mt-4 w-full py-2 bg-slate-700 hover:bg-slate-600 text-sm rounded-lg text-white transition-colors"
            >
              Use this Answer
            </button>
          </div>
        )}
      </form>
    </div>
  );
};