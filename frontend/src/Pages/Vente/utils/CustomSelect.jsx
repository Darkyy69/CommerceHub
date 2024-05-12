import React, { useState, useRef } from "react";

const CustomSelect = ({ options }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(50);
  const selectRef = useRef(null);

  const handleScroll = () => {
    const scrollTop = selectRef.current.scrollTop;
    const itemHeight = 35; // Adjust as per your item height

    const newStart = Math.floor(scrollTop / itemHeight);
    const newEnd = Math.min(newStart + 50, options.length);

    setStart(newStart);
    setEnd(newEnd);
  };

  const renderOptions = () => {
    const visibleOptions = options.slice(start, end);
    return visibleOptions.map((option, index) => (
      <div key={index} style={{ height: "35px", lineHeight: "35px" }}>
        {option}
      </div>
    ));
  };

  return (
    <div
      ref={selectRef}
      style={{ height: "200px", overflowY: "auto" }}
      onScroll={handleScroll}
    >
      {renderOptions()}
    </div>
  );
};

export default CustomSelect;
