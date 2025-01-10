import React, { useState } from 'react';
import { CalculatorButton } from './CalculatorButton';
import { Display } from './Display';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setExpression(display + ' ' + op);
    setNewNumber(true);
  };

  const handleEquals = () => {
    try {
      const result = eval(expression + display);
      setDisplay(String(result));
      setExpression('');
      setNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setExpression('');
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setNewNumber(true);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow-lg">
      <Display value={display} expression={expression} />
      
      <div className="grid grid-cols-4 gap-2">
        <CalculatorButton value="C" onClick={handleClear} variant="clear" />
        <CalculatorButton value="(" onClick={() => handleNumber('(')} variant="operator" />
        <CalculatorButton value=")" onClick={() => handleNumber(')')} variant="operator" />
        <CalculatorButton value="÷" onClick={() => handleOperator('/')} variant="operator" />
        
        <CalculatorButton value="7" onClick={() => handleNumber('7')} />
        <CalculatorButton value="8" onClick={() => handleNumber('8')} />
        <CalculatorButton value="9" onClick={() => handleNumber('9')} />
        <CalculatorButton value="×" onClick={() => handleOperator('*')} variant="operator" />
        
        <CalculatorButton value="4" onClick={() => handleNumber('4')} />
        <CalculatorButton value="5" onClick={() => handleNumber('5')} />
        <CalculatorButton value="6" onClick={() => handleNumber('6')} />
        <CalculatorButton value="-" onClick={() => handleOperator('-')} variant="operator" />
        
        <CalculatorButton value="1" onClick={() => handleNumber('1')} />
        <CalculatorButton value="2" onClick={() => handleNumber('2')} />
        <CalculatorButton value="3" onClick={() => handleNumber('3')} />
        <CalculatorButton value="+" onClick={() => handleOperator('+')} variant="operator" />
        
        <CalculatorButton value="0" onClick={() => handleNumber('0')} className="col-span-2" />
        <CalculatorButton value="." onClick={() => handleNumber('.')} />
        <CalculatorButton value="=" onClick={handleEquals} variant="equals" />
      </div>
    </div>
  );
}