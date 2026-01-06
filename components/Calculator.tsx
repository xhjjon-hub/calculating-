import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './Button';
import { Display } from './Display';
import { ButtonVariant } from '../types';

export const Calculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [isNewNumber, setIsNewNumber] = useState(true);

  // Core Logic
  const handleNumber = useCallback((num: string) => {
    if (isNewNumber) {
      setCurrentValue(num);
      setIsNewNumber(false);
    } else {
      if (currentValue === '0') {
        setCurrentValue(num);
      } else {
        // Prevent overflow (rudimentary)
        if (currentValue.length < 15) {
          setCurrentValue(prev => prev + num);
        }
      }
    }
  }, [currentValue, isNewNumber]);

  const handleDecimal = useCallback(() => {
    if (isNewNumber) {
      setCurrentValue('0.');
      setIsNewNumber(false);
      return;
    }
    if (!currentValue.includes('.')) {
      setCurrentValue(prev => prev + '.');
    }
  }, [currentValue, isNewNumber]);

  const calculate = useCallback((a: string, b: string, op: string): string => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    let result = 0;

    switch (op) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '×': result = num1 * num2; break;
      case '÷': 
        if (num2 === 0) return 'Error';
        result = num1 / num2; 
        break;
      default: return b;
    }

    // Handle floating point precision errors
    let resultStr = result.toPrecision(12);
    // Remove trailing zeros after decimal
    if (resultStr.includes('.')) {
        resultStr = resultStr.replace(/\.?0+$/, "");
    }
    return resultStr;
  }, []);

  const handleOperator = useCallback((op: string) => {
    if (operator && !isNewNumber && previousValue) {
      const result = calculate(previousValue, currentValue, operator);
      setCurrentValue(result);
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    
    setOperator(op);
    setIsNewNumber(true);
  }, [operator, isNewNumber, previousValue, currentValue, calculate]);

  const handleEqual = useCallback(() => {
    if (!operator || !previousValue) return;
    
    const result = calculate(previousValue, currentValue, operator);
    setCurrentValue(result);
    setPreviousValue(null);
    setOperator(null);
    setIsNewNumber(true);
  }, [operator, previousValue, currentValue, calculate]);

  const handleClear = useCallback(() => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
    setIsNewNumber(true);
  }, []);

  const handlePercentage = useCallback(() => {
    const num = parseFloat(currentValue);
    setCurrentValue((num / 100).toString());
  }, [currentValue]);

  const handleSignToggle = useCallback(() => {
    setCurrentValue(prev => (parseFloat(prev) * -1).toString());
  }, []);

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      if (/[0-9]/.test(key)) handleNumber(key);
      if (key === '.') handleDecimal();
      if (key === 'Enter' || key === '=') { e.preventDefault(); handleEqual(); }
      if (key === 'Escape') handleClear();
      if (key === 'Backspace') {
        if (currentValue.length === 1 || (currentValue.length === 2 && currentValue.startsWith('-'))) {
             setCurrentValue('0');
             setIsNewNumber(true);
        } else {
             setCurrentValue(prev => prev.slice(0, -1));
        }
      }
      if (key === '+') handleOperator('+');
      if (key === '-') handleOperator('-');
      if (key === '*') handleOperator('×');
      if (key === '/') { e.preventDefault(); handleOperator('÷'); }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumber, handleDecimal, handleEqual, handleClear, handleOperator, currentValue]);

  return (
    <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-5 rounded-3xl shadow-2xl overflow-hidden">
      
      <div className="flex justify-between items-center mb-4 px-1">
         <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">Lumina Calc</span>
      </div>

      <Display value={currentValue} previousValue={previousValue} operator={operator} />

      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button label="AC" onClick={handleClear} variant={ButtonVariant.Secondary} />
        <Button label="+/-" onClick={handleSignToggle} variant={ButtonVariant.Secondary} />
        <Button label="%" onClick={handlePercentage} variant={ButtonVariant.Secondary} />
        <Button label="÷" onClick={() => handleOperator('÷')} variant={ButtonVariant.Accent} />

        {/* Row 2 */}
        <Button label="7" onClick={() => handleNumber('7')} />
        <Button label="8" onClick={() => handleNumber('8')} />
        <Button label="9" onClick={() => handleNumber('9')} />
        <Button label="×" onClick={() => handleOperator('×')} variant={ButtonVariant.Accent} />

        {/* Row 3 */}
        <Button label="4" onClick={() => handleNumber('4')} />
        <Button label="5" onClick={() => handleNumber('5')} />
        <Button label="6" onClick={() => handleNumber('6')} />
        <Button label="-" onClick={() => handleOperator('-')} variant={ButtonVariant.Accent} />

        {/* Row 4 */}
        <Button label="1" onClick={() => handleNumber('1')} />
        <Button label="2" onClick={() => handleNumber('2')} />
        <Button label="3" onClick={() => handleNumber('3')} />
        <Button label="+" onClick={() => handleOperator('+')} variant={ButtonVariant.Accent} />

        {/* Row 5 */}
        <Button label="0" onClick={() => handleNumber('0')} doubleWidth />
        <Button label="." onClick={handleDecimal} />
        <Button label="=" onClick={handleEqual} variant={ButtonVariant.Primary} />
      </div>
    </div>
  );
};