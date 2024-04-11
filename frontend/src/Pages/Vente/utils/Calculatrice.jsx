import React, { useState, useRef, useEffect } from "react";
import { useData } from "./DataProvider";
import { FaHistory, FaBackspace } from "react-icons/fa";

export default function Calculatrice() {
  const { expression, setExpression, result, setResult, setShowCalculatrice } =
    useData();
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const historyRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => {
        const newX = e.clientX - 2 * offset.x;
        const newY = e.clientY - 2 * offset.y;
        setInitialPosition({ x: newX, y: newY });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, offset]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - historyRef.current.getBoundingClientRect().left,
      y: e.clientY - historyRef.current.getBoundingClientRect().top,
    });
  };

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        const evalResult = eval(expression);
        setResult("=" + evalResult);
        addToHistory(`${expression} = ${evalResult}`);
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setExpression("");
      setResult("");
    } else if (value === "DEL") {
      setExpression((prevExpression) => prevExpression.slice(0, -1));
    } else {
      setExpression((prevExpression) => prevExpression + value);
    }
  };

  const addToHistory = (calculation) => {
    setHistory((prevHistory) => [...prevHistory, calculation]);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const equationClass =
    expression.length > 16 ? "h-40 overflow-y-auto" : "h-56";

  return (
    <div
      className="fixed mt-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-4 border border-gray-300 rounded-lg shadow-lg scale-75"
      style={{ width: "850px", height: "700px" }}
    >
      <button
        className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-md"
        onClick={() => setShowCalculatrice(false)}
      >
        X
      </button>
      <div
        className={
          "mb-2 bg-black rounded-md text-2xl font-bold text-green-500 mt-12 border " +
          equationClass
        }
      >
        {expression}
        <div className="mt-14 text-6xl">{result}</div>
      </div>

      <div className="grid grid-cols-4 gap-4 ">
        {[7, 8, 9, "/"].map((value, index) => (
          <button
            key={index}
            className="bg-gray-200 hover:bg-blue-300 p-4  rounded-md text-xl"
            onClick={() => handleButtonClick(value)}
          >
            {value}
          </button>
        ))}
        {[4, 5, 6, "*"].map((value, index) => (
          <button
            key={index}
            className="bg-gray-200 hover:bg-blue-300 p-4 rounded-md text-xl"
            onClick={() => handleButtonClick(value)}
          >
            {value}
          </button>
        ))}
        {[1, 2, 3, "-"].map((value, index) => (
          <button
            key={index}
            className="bg-gray-200 hover:bg-blue-300 p-4 rounded-md text-xl"
            onClick={() => handleButtonClick(value)}
          >
            {value}
          </button>
        ))}

        <button
          className="bg-gray-200 hover:bg-blue-300 p-4 rounded-md text-xl"
          onClick={() => handleButtonClick("0")}
        >
          0
        </button>
        <button
          className="bg-gray-200 hover:bg-blue-300 p-4 rounded-md text-xl"
          onClick={() => handleButtonClick(".")}
        >
          .
        </button>
        <button
          className="bg-gray-200 hover:bg-blue-300 p-4 rounded-md text-xl flex items-center justify-center"
          onClick={() => handleButtonClick("DEL")}
        >
          <FaBackspace style={{ size: 40 }} />
        </button>
        <button
          className="bg-gray-200 text-red-500 hover:bg-blue-300 p-4 rounded-md text-xl"
          onClick={() => handleButtonClick("C")}
        >
          C
        </button>
        <button
          className="bg-red-500 text-white p-4 rounded-md text-xl col-span-2"
          onClick={() => handleButtonClick("=")}
        >
          =
        </button>
        <button
          className="bg-blue-400 text-white p-4 rounded-md text-xl col-span-2 flex flex-row justify-center items-center gap-2"
          onClick={toggleHistory}
        >
          <FaHistory /> Historique
        </button>
      </div>

      {showHistory && (
        <div
          ref={historyRef}
          className="fixed bg-white p-4 border border-gray-300 rounded-lg shadow-lg cursor-move unselectable"
          style={{
            width: "300px",
            left: `${initialPosition.x}px`,
            top: `${initialPosition.y}px`,
          }}
          onMouseDown={handleMouseDown}
        >
          <button
            className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={toggleHistory}
          >
            X
          </button>
          <h2 className="text-lg font-bold mb-2">History</h2>
          <ul>
            {history.map((calculation, index) => (
              <li key={index}>{calculation}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
