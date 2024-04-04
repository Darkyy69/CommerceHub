import React, { useState, createContext, useContext, useRef } from 'react';

const DataContext = createContext();
//le component dataProvider vas fournire les information important pour les 3 componenet NAV,BODY,TABLE(comptoire)  
//garentie le partage des info entre les 3 componenet

export const DataProvider = ({ children }) => {
  const PrixRef = useRef(null);
  const [InfoArticle,setInfoArticle]=useState(false); // cest pour le button F2
  const [expression, setExpression] = useState(''); // cela cest pour l'expression de calculatrice (EQUATION)
  const [result, setResult] = useState(''); // cela cest la resultat de l'equation 
  const [ShowCalculatrice,setShowCalculatrice] = useState(false); // cela cest pour apparait la calculatrice ou non


  return (
    <DataContext.Provider value={{ PrixRef,InfoArticle,setInfoArticle,expression,setExpression,result,setResult,setShowCalculatrice,ShowCalculatrice }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
