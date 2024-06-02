import React, { useState, useEffect, useCallback } from "react";
// import { FaCheck, FaPen, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useData } from "./DataProvider";
import { MemoizedInfoArticle } from "./FenetreInfoArticle";
import { MemoizedFenetreAjouterArticle } from "./FenetreAjouterArticle";
import toast from "react-hot-toast";

// import CustomSelect from "./CustomSelect";

export default function ComptoireBody() {
  const [articleLookup, setArticleLookup] = useState({});
  const [article, setArticle] = useState([]);
  const [ajouter, setAjouter] = useState(false);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const {
    input,
    setInput,
    cbRef,
    qteRef,
    resultRef,
    PrixRef,
    data,
    setData,
    lastItemSelected,
  } = useData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/comptoire/entite-marchandise/s-article/"
        );
        setArticle(res.data);
        const newArticleLookup = {};
        res.data.forEach((item) => {
          newArticleLookup[item.barrcode] = item;
        });
        setArticleLookup(newArticleLookup);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
    console.log("in useEffect");
  }, []);

  // if articles get changed (added or removed after being loaded in useEffect) update the lookup table
  useEffect(() => {
    const newArticleLookup = {};
    article.forEach((item) => {
      newArticleLookup[item.barrcode] = item;
    });
    setArticleLookup(newArticleLookup);
  }, [article]);

  // const articleOptions = React.useMemo(() => {
  //   return article.map((item, index) => item.disignation);
  // }, [article]);
  // const handleSelectChange = (selectedOption) => {
  //   // Handle the selected option
  //   console.log("Selected option:", selectedOption);
  // };

  // Fonction pour afficher les options d'articles dans le champ de sélection
  const ArticlesOptions = React.useMemo(() => {
    console.log("in ArticlesOptions");

    return (
      article
        // .sort((a, b) => {
        //   const aClean = a.disignation.replace(/[^a-zA-Z]/g, "zzzz");
        //   const bClean = b.disignation.replace(/[^a-zA-Z]/g, "zzzz");
        //   return aClean.localeCompare(bClean);
        // })
        // .slice(0, 100)
        .map((item, index) => (
          <option key={index} value={item.disignation}>
            {item.disignation}
          </option>
        ))
    );
  }, [article]);

  const IdOptions = React.useMemo(() => {
    console.log("in IdOptions");
    return article.slice(0, 100).map((item, index) => (
      <option key={index} value={item.id}>
        {item.id}
      </option>
    ));
  }, [article]);

  // const SFamilleOptions = React.useMemo(() => {
  //   console.log("in SFamilleOptions");
  //   return article.map((item, index) => (
  //     <option key={index} value={item.id_S_famille}>
  //       {item.id_S_famille}
  //     </option>
  //   ));
  // }, [article]);

  const handleOnBlur = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // switch (e.target.name) un autre scénario pour gérer les événements de perte de focus
    switch (name) {
      case "cb":
        if (value.length > 7) {
          const selectedItem = articleLookup[value];

          if (selectedItem) {
            setInput((prev) => ({
              ...prev,
              cb: selectedItem.barrcode,
              art: selectedItem.disignation,
              id: selectedItem.id,
              prix: selectedItem.P_vente,
            }));

            qteRef.current.select();
          } else {
            setAjouter(true);
            // alert(
            //   "Article n'existe pas...Ouverture de la fenetre AjouterArticle"
            // );
            toast.error(
              "Article n'existe pas...Ouverture de la fenetre AjouterArticle"
            );
          }
        }
        break;
      case "qte":
        // alert("Scénario de perte de focus pour le champ 'qte'");
        const selectedItem = articleLookup[cbRef.current.value];
        if (selectedItem) {
          setInput((prev) => ({
            ...prev,
            id: selectedItem.id,
            prix: selectedItem.P_vente,
          }));

          // si l'article existe déja avec le meme prix additioner juste la quantité et le total
          const existingItem = data.find(
            (item) => item.article === selectedItem.disignation
          );
          if (existingItem) {
            setData((prevData) =>
              prevData.map((item) =>
                item.article === selectedItem.disignation
                  ? {
                      ...item,
                      quantity: +value,
                      total: +value * +item.price,
                    }
                  : item
              )
            );
          } else {
            setData((prevData) => [
              ...prevData,
              {
                article: selectedItem.disignation,
                id_S_article: selectedItem.id,
                quantity: +value,
                price: +selectedItem.P_vente,
                total: +selectedItem.P_vente * +value,
              },
            ]);
            // setLastItemSelected(lastItemSelected + 1);
          }
        } else {
          if (cbRef.current.value === "0" && lastItemSelected >= 1) {
            // set the data item of index lastitemselected - 1 to the new quantity
            setData((prevData) =>
              prevData.map((item, index) =>
                index === lastItemSelected - 1
                  ? {
                      ...item,
                      quantity: +value,
                      total: +value * +item.price,
                    }
                  : item
              )
            );
          } else {
            // alert("Article n'existe pas");
            toast.error("Article n'existe pas!");
          }
        }
        // Réinitialiser les champs d'entrée
        setInput({ art: "", qte: 1, id: 0, cb: 0, prix: 0 }); //initialisation
        cbRef.current.value = 0;
        qteRef.current.value = 1;
        // attendre 0.2s pour que le champ code bare soit selectionner
        setTimeout(() => {
          // selectionner le champ code bare
          cbRef.current.select();
        }, 100);

        break;
      default:
        break;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (event.target.value.length > 7) {
        const selectedItem = articleLookup[event.target.value];
        if (!selectedItem) {
          // déselectionner le champ code bare
          event.currentTarget.blur();
          return;
        }
      }
      qteRef.current.select();
    }
  };

  const handleKeyPressQte = (event) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  //stocker les informations des input filed (code bare article id .....)
  const HandelInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    // Vérifier si la valeur est numérique
    if (!isNaN(value)) {
      // Limiter la longueur à 13 chiffres pour le champ 'cb'
      if (name === "cb" && value.length > 13) {
        return;
      }

      setInput((val) => ({ ...val, [name]: value }));
    } else {
      setInput((val) => ({ ...val, [name]: "" }));
    }
  };
  console.log("YAW");
  //la fonction pour selecionner un artilce sont id et famille automatiquemet s'affiche
  const HandelArticl = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    // Vérifier si l'article sélectionné est un nom ou un ID
    const selectedItem = article.find(
      (item) =>
        item.disignation === selectedValue ||
        item.id === parseInt(selectedValue)
    );
    if (selectedItem) {
      const prixformater = formatPrice(selectedItem.P_vente);
      setSelectedArticle(selectedItem); // Mettre à jour l'article sélectionné

      setInput((prev) => ({
        ...prev,
        art: selectedItem.disignation,
        id: selectedItem.id,
        prix: prixformater,
        cb: selectedItem.barrcode,
      }));
      cbRef.current.value = selectedItem.barrcode;
      qteRef.current.select();
    }
  };

  const formatPrice = (price) => {
    // Convertir le prix en nombre
    const numericPrice = parseFloat(price);
    // Formater le prix avec deux décimales et ajouter " DZD"
    return `${numericPrice.toFixed(2)} DZD`;
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-fit my-3">
      <div className="flex flex-col h-full items-start justify-center gap-5  bg-blue-500 p-3">
        <div className="flex flex-row gap-2 justify-center items-center">
          <div className="flex flex-row justify-center items-center gap-1 ml-6">
            <p className="text-lg font-bold">Code:</p>
            <input
              className="w-60 h-12 text-center text-xl font-bold"
              type="number"
              ref={cbRef}
              name="cb"
              autoFocus={true}
              onFocus={(e) => e.target.select()}
              onBlur={handleOnBlur}
              onKeyDown={handleKeyPress}
              onClick={() => cbRef.current.select()}
              defaultValue={0}
            />
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
            <p className="text-lg font-bold mr-1 ">Qte:</p>
            <input
              type="number"
              className="h-12 w-20 text-center font-bold"
              ref={qteRef}
              name="qte"
              onFocus={(e) => e.target.select()}
              onClick={() => qteRef.current.select()}
              onKeyDown={handleKeyPressQte}
              onBlur={handleOnBlur}
              defaultValue={1}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <p className="text-lg font-bold">Famille:</p>
          <select className="w-56 h-8">
            <option disabled value="0" key={-1}></option>
            {/* {SFamilleOptions} */}
          </select>

          <div className="flex flex-row justify-center items-center">
            <p className="text-lg font-bold mr-6">ID:</p>
            <select
              className="h-8 w-32 text-center"
              name="id"
              onChange={HandelArticl}
              value={input.id}
            >
              <option disabled value="0" key={-1}></option>

              {IdOptions}
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <p
            style={{ marginRight: "1px", marginTop: "6px" }}
            className="text-lg font-bold"
          >
            Article:
          </p>
          <select
            className="w-56 h-8"
            onChange={HandelArticl}
            value={input.art}
            name="art"
          >
            {/* ajouter une option vide par défaut */}
            <option disabled value="" key={-1}></option>
            {ArticlesOptions}
            {/* {CustomSelect({ options: articleOptions })} */}
          </select>
          <p style={{ marginTop: "6px" }} className="text-lg font-bold">
            Prix:
          </p>
          <input
            type="text"
            className="w-1/3 h-8 text-center"
            ref={PrixRef}
            name="prix"
            onFocus={(e) => e.target.select()}
            onClick={() => PrixRef.current.select()}
            onChange={HandelInput}
            value={input.prix}
          />
        </div>
      </div>

      <div
        style={{ overflow: "hidden", position: "relative", width: "60%" }}
        className=" w-1/2 h-full text-right bg-black"
      >
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          {/* {history.map((equation, index) => (
      <div key={index}>{equation}</div>
    ))} */}
        </div>
        <div
          ref={resultRef}
          style={{ fontSize: `80px` }}
          className="mt-10 text-green-500"
        >
          {/* Loop through data array (articles) and sum total */}
          {data
            .reduce(
              (acc, item) => parseFloat(acc) + parseFloat(item.total),
              parseFloat(0.0)
            )
            .toFixed(2)}
        </div>
      </div>

      <MemoizedInfoArticle indexedArticles={articleLookup} />
      {ajouter ? (
        <MemoizedFenetreAjouterArticle
          setArticle={setArticle}
          setAjouter={setAjouter}
        />
      ) : null}
    </div>
  );
}
