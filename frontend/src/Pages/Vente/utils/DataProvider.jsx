import React, { useState, createContext, useContext, useRef } from "react";

const DataContext = createContext();
//le component dataProvider vas fournire les information important pour les 3 componenet NAV,BODY,TABLE(comptoire)
//garentie le partage des info entre les 3 componenet

export const DataProvider = ({ children }) => {
  const cbRef = useRef(null);
  const qteRef = useRef(null);
  const PrixRef = useRef(null);
  const resultRef = useRef(null);
  const [input, setInput] = useState({
    art: "",
    qte: 1,
    id: 0,
    prix: 0,
    cb: 0,
  });
  const [InfoArticle, setInfoArticle] = useState(false); // cest pour le button F2
  const [expression, setExpression] = useState(""); // cela cest pour l'expression de calculatrice (EQUATION)
  const [result, setResult] = useState(""); // cela cest la resultat de l'equation
  const [ShowCalculatrice, setShowCalculatrice] = useState(false); // cela cest pour apparait la calculatrice ou non
  const [data, setData] = useState([]);
  const [lastItemSelected, setLastItemSelected] = useState(0);
  // Exemple de données
  // const data = [
  //   { article: "Ordinateur portable", price: 1200, quantity: 2, total: 2400 },
  //   { article: "Souris sans fil", price: 30, quantity: 5, total: 150 },
  //   { article: "Clavier mécanique", price: 80, quantity: 3, total: 240 },
  //   { article: 'Écran LCD 24"', price: 200, quantity: 1, total: 200 },
  //   { article: 'Écran LCD 24"', price: 200, quantity: 1, total: 200 },
  //   { article: 'Écran LCD 24"', price: 200, quantity: 1, total: 200 },
  //   { article: 'Écran LCD 24"', price: 200, quantity: 1, total: 200 },
  //   { article: 'Écran LCD 24"', price: 200, quantity: 1, total: 200 },
  //   { article: 'Écran LCD 24"', price: 200, quantity: 1, total: 200 },
  //   // Ajoutez plus de données au besoin
  // ];

  return (
    <DataContext.Provider
      value={{
        cbRef,
        qteRef,
        resultRef,
        PrixRef,
        input,
        setInput,
        InfoArticle,
        setInfoArticle,
        expression,
        setExpression,
        result,
        setResult,
        setShowCalculatrice,
        ShowCalculatrice,
        data,
        setData,
        lastItemSelected,
        setLastItemSelected,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
