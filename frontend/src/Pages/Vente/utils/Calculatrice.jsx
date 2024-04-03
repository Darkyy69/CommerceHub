import React, { useState } from 'react';
import { useData } from './DataProvider';

export default function Calculatrice() {
 const {expression, setExpression,result, setResult}=useData()

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const evalResult = eval(expression);
        setResult(evalResult);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('');
    } else {
      setExpression(prevExpression => prevExpression + value);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-4 border border-gray-300 rounded-lg shadow-lg" style={{width:'850px',height:'555px'}}>
      <div className="mb-2  h-56 bg-black rounded-md text-2xl font-bold">{expression}</div>
      <div className="mb-4 text-green-500 text-2xl font-bold">{result}</div>
      <div className="grid grid-cols-4 gap-4   " style={{height:'100px'}}>
        {[7, 8, 9, '/'].map((value, index) => (
          <button key={index} className="bg-gray-200 hover:bg-blue-300 p-4  rounded-md text-xl" onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {[4, 5, 6, '*'].map((value, index) => (
          <button key={index} className="bg-gray-200 hover:bg-blue-300 p-4 rounded-md text-xl" onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {[1, 2, 3, '-'].map((value, index) => (
          <button key={index} className="bg-gray-200 hover:bg-blue-300 p-4 rounded-md text-xl" onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {['C', 0, '=', '+'].map((value, index) => (
          <button key={index} className="bg-gray-200 hover:bg-blue-300 p-4 rounded-md text-xl" onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}