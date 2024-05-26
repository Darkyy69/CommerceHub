import React, { useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useData } from "./DataProvider";
import toast from "react-hot-toast";

// La fenetre d'ajout d'article apparait dans le cas de l'ajout d'un article (code barre non trouvé)
const fenetreAjouterArticle = ({ setArticle, setAjouter }) => {
  console.log("in fenetreAjouterArticle");
  const { cbRef, setInput } = useData();
  //   const [showModal, setShowModal] = useState(true);
  const [nvInputs, setNvInput] = useState({});
  const handleClose = () => {
    // setShowModal(false);
    setAjouter(false);
    setNvInput({});
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
    // Mise à jour de l'état 'article' en ajoutant le nouvel article à la liste existante
    setArticle((prevArticles) => [...prevArticles, nouvelArticle]);
    // Dissmiss the toast after 3 seconds
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    // Réinitialiser les champs d'entrée
    setTimeout(() => {
      setInput({ art: "", qte: 1, id: 0, cb: 0, prix: 0 });
      handleClose();
    }, 500);
  };

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
};
export const MemoizedFenetreAjouterArticle = React.memo(fenetreAjouterArticle);
