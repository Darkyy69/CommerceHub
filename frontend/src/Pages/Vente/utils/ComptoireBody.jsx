import React, { useState, useEffect, useCallback } from "react";
import { FaCheck, FaPen, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useData } from "./DataProvider";
import { MemoizedInfoArticle } from "./FenetreInfoArticle";
import toast from "react-hot-toast";

// import CustomSelect from "./CustomSelect";

export default function ComptoireBody() {
  const [articleLookup, setArticleLookup] = useState({});
  const [article, setArticle] = useState([]);
  const [ajouter, setAjouter] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [nvInputs, setNvInput] = useState({});
  const handleClose = () => {
    setShowModal(false);
    setAjouter(false);
    setNvInput({});
  };
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
        .slice(0, 100)
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

  const HandelNvInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setNvInput((val) => ({ ...val, [name]: value }));
  };
  const HandelAjouterElement = async (e) => {
    console.log(nvInputs);

    e.preventDefault();
    const nouvelArticle = {
      codif: nvInputs.article
        ? nvInputs.article.substring(0, 3).toUpperCase()
        : "",
      disignation: nvInputs.article,
      barrcode: cbRef.current.value,
      P_achat: 0,
      P_vente: parseFloat(nvInputs.prix),
      P_min: 0,
      fournisseur_best: 1, // Remplacer 2 par l'ID approprié du fournisseur
      id_S_famille: 2, // Remplacer 1 par l'ID approprié de la famille de l'article
      id_Article: 2,
    };

    // Mise à jour de l'état 'article' en ajoutant le nouvel article à la liste existante
    setArticle((prevArticles) => [...prevArticles, nouvelArticle]);
    // Ajouter l'article a la base de données
    const loadingToastID = toast.loading("Waiting...");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/comptoire/entite-marchandise/s-article/",
        nouvelArticle
      );
      // Dissmiss the loading toast
      toast.dismiss(loadingToastID);
      toast.success("Article ajouté avec succès!");
    } catch (error) {
      console.error(error);
      // Dissmiss the loading toast
      toast.dismiss(loadingToastID);
      toast.error("Erreur lors de l'ajout de l'article!");
    }
    // Dissmiss the toast after 3 seconds
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    // Réinitialiser les champs d'entrée
    setTimeout(() => {
      setInput({ art: "", qte: 1, id: 0, cb: 0, prix: 0 });
      setNvInput({});
      setAjouter(false);
    }, 500);
  };

  // La fenetre d'ajout d'article apparait dans le cas de l'ajout d'un article (code barre non trouvé)
  const fenetreAjouterArticle = React.useMemo(() => {
    console.log("in fenetreAjouterArticle");
    if (ajouter) {
      return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-2/5 h-72 bg-gray-100 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="absolute top-2 left-2 text-xl font-bold">
              Article Rapide
            </h1>
            <button
              className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={handleClose}
            >
              X
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-10">
            <div className="flex flex-row justify-between items-center gap-1">
              <label htmlFor="">Article:</label>
              <input
                name="article"
                id=""
                className="border border-gray-300 h-8 w-56 ml-1 "
                onChange={HandelNvInput}
              ></input>
            </div>

            <div className="flex flex-row justify-between items-center gap-1">
              <label htmlFor="">CodeBarre:</label>
              <input
                name="CodeBarre"
                id=""
                className="border border-gray-300 h-8 text-center"
                value={cbRef.current.value}
                disabled
              ></input>
            </div>
            <div className="flex flex-row justify-between items-center gap-1">
              <label htmlFor="">Prix:</label>
              <input
                name="prix"
                id=""
                className="border border-gray-300 h-8 text-center"
                onChange={HandelNvInput}
              ></input>
            </div>
          </div>
          <div className="flex items-center justify-center mt-5">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={HandelAjouterElement}
            >
              <FaCheck />
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
              onClick={handleClose}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }, [ajouter]);

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
      {fenetreAjouterArticle}
    </div>
  );
}
