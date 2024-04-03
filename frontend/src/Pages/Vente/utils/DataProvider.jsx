import React, { useState, createContext, useContext, useRef } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const PrixRef = useRef(null);
  const [InfoArticle,setInfoArticle]=useState(false);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [ShowCalculatrice,setShowCalculatrice] = useState(false);
  return (
    <DataContext.Provider value={{ PrixRef,InfoArticle,setInfoArticle,expression,setExpression,result,setResult,setShowCalculatrice,ShowCalculatrice }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
