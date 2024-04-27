import React, { useState, useEffect, useRef } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const calculatorRef = useRef(null);

  useEffect(() => {
    calculatorRef.current.focus();
  }, []);

  const handleButtonClick = (value) => {
    setExpression(prevExpression => prevExpression + value);
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      setResult(eval(expression).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const handleBackspace = () => {
    setExpression(prevExpression => prevExpression.slice(0, -1));
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    if (/[\d.+\-*/]/.test(key)) {
      setExpression(prevExpression => prevExpression + key);
    } else if (key === 'Backspace') {
      handleBackspace();
    } else if (key === 'Enter' || key === '=') {
      handleCalculate();
    }
  };

  return (
    <div
      className="calculator"
      tabIndex="0"
      ref={calculatorRef}
      onKeyDown={handleKeyDown}
    >
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('+')}>+</button>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('*')}>*</button>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={handleClear}>C</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={() => handleButtonClick('/')}>/</button>
        <button onClick={handleBackspace} className="backspace">⌫</button>
      </div>
    </div>
  );
};

export default Calculator;
