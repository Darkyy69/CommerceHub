import React, { useContext, useState, useEffect } from "react";
import {
  FaCheck,
  FaPlus,
  FaMinus,
  FaPaperclip,
  FaPen,
  FaSearch,
} from "react-icons/fa";
import { useData } from "./DataProvider";
import Parameters from "../../../assets/Parameters.json"; // Lire le fichier Parameters.md pour plus d'informations
import axios from "axios";

export function ComptoireTable() {
  const Currency = "DA";
  const [searchTermArticle, setSearchTermArticle] = useState("");
  const [searchTermPrice, setSearchTermPrice] = useState("");
  const [searchTermQuantity, setSearchTermQuantity] = useState("");
  const [searchTermTotal, setSearchTermTotal] = useState("");
  const { data, setData } = useData();
  const { cbRef } = useData();
  const { setInput } = useData();
  const { PrixRef } = useData();
  const { resultRef } = useData();
  const { lastItemSelected } = useData();
  const { setLastItemSelected } = useData();

  console.log("in CompTable");
  // re-render the component when the lastItemSelected changes
  useEffect(() => {
    setLastItemSelected(data.length);
  }, [data.length]);

  // Filtrage des données basé sur les termes de recherche
  const filteredData = data.filter(
    (item) =>
      item.article.toLowerCase().includes(searchTermArticle.toLowerCase()) &&
      item.price.toString().includes(searchTermPrice.toLowerCase()) &&
      item.quantity.toString().includes(searchTermQuantity.toLowerCase()) &&
      item.total.toString().includes(searchTermTotal.toLowerCase())
  );

  const handleKeyDownPrix = (e) => {
    // Ajouter l'article Divers à la liste des articles aprés avoir clické sur le bouton Entrer!
    if (e.key === "Enter") {
      // Ajouter l'article Divers à la liste des articles
      setData((prevData) => [
        ...prevData,
        {
          article: "Divers",
          price: PrixRef.current.value,
          quantity: 1,
          total: PrixRef.current.value,
          id_S_article: 1,
        },
      ]);
      // setLastItemSelected(lastItemSelected + 1)
      // Effacer le contenu de l'input
      // attendre 0.1s pour que le state soit mis à jour
      setTimeout(() => {
        PrixRef.current.value = 0;
      }, 100);
      //selectionner le code barre
      cbRef.current.select();
      // Enlever l'event listener
      document.removeEventListener("keydown", handleKeyDownPrix);
    }
  };

  const handleRowClick = (index) => {
    setLastItemSelected(index + 1);
    // Charger les données de l'article selectionné dans le state input
    if (data[index].article === "Divers") {
      setInput({
        art: "",
        prix: data[index].price,
        qte: data[index].quantity,
        cb: 0,
        id: 1,
      });
      return;
    }

    setInput({
      art: data[index].article,
      qte: data[index].quantity,
      prix: data[index].price,
      cb: 0,
    });
  };

  const handleAjouterBtn = () => {};
  const handleEffacerBtn = () => {
    // remove the lastSelectedItem from the data array (find the index of the lastSelectedItem and remove it)
    if (lastItemSelected === 0) {
      alert("Tableau d'Articles est VIDE!");
      return; // if there is no item selected return (do nothing)
    }

    setData((prevData) => {
      let newData = [...prevData]; // Create a copy of the data
      newData.splice(lastItemSelected - 1, 1); // Remove the item
      return newData; // Return the new data
    });
  };
  const handleModifierBtn = () => {};

  // Ajouter un article Divers dans la liste des articles
  const handleInsererBtn = () => {
    // Attendre jusqu'à ce que l'utilisateur entre un prix
    PrixRef.current.select();
    // ajouter un event listener pour le bouton Entrer
    document.addEventListener("keydown", handleKeyDownPrix);
  };
  const handleEnregistrerBtn = () => {
    // Vérifier si le tableau d'articles est vide
    if (data.length === 0) {
      alert("Tableau d'Articles est VIDE!");
      return;
    }
    // Prendre tous les articles et les envoyer à la base de données
    const docObj = {
      num: Parameters[0].num,
      date: new Date(),
      proprietaire: 1, // 1== PARTICULIER (Change later to the actual selected Client in ComptoireNav)
      montant: resultRef.current.innerHTML,
      type_payement: 4,
      etat: 3,
      imprime: 3,
      editeur: 1,
    };
    const ligneDocObj = data.map((item) => {
      return {
        id_art: item.id_S_article,
        qte: item.quantity,
        prix: item.price,
        montant: item.total,
      };
    });
    // Create an object containing both docObj and ligneDocObj
    const dataToSend = {
      document: docObj,
      ligneDocument: ligneDocObj,
    };

    // Send the data to the server
    axios
      .post(
        "http://localhost:8000/comptoire/enregistrer/vente/bon-art-out/",
        dataToSend
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // Retrieve existing data from local storage
        let existingData = localStorage.getItem("dataToSend");
        if (!existingData || existingData === "undefined") {
          existingData = [];
        } else {
          existingData = JSON.parse(existingData);
          if (!Array.isArray(existingData)) {
            existingData = [existingData];
          }
          console.log(existingData);
        }
        // Merge existing data with new data
        const newData = [...existingData, dataToSend];
        console.log(newData);
        // Store the merged data in local storage
        localStorage.setItem("dataToSend", JSON.stringify(newData));
      });
    // Effacer le contenu de la table + les inputs
    setData([]);
    setInput({
      art: "",
      qte: 1,
      id: 0,
      prix: 0,
      cb: 0,
    });
    //selectionner le code barre
    cbRef.current.select();
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-grow h-1">
        <div className="overflow-y-auto">
          <table className=" divide-y divide-gray-200 ml-3">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Article"
                      value={searchTermArticle}
                      onChange={(e) => setSearchTermArticle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:border-indigo-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch />
                    </div>
                  </div>
                </th>
                <th className="sticky  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Prix"
                      value={searchTermPrice}
                      onChange={(e) => setSearchTermPrice(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:border-indigo-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch />
                    </div>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Qte"
                      value={searchTermQuantity}
                      onChange={(e) => setSearchTermQuantity(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:border-indigo-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch />
                    </div>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Total"
                      value={searchTermTotal}
                      onChange={(e) => setSearchTermTotal(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:border-indigo-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            {/* <div className="max-h-40 overflow-y-auto"> */}
            <tbody className="">
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  tabIndex="0"
                  className={`${lastItemSelected === index + 1 ? "border-2 border-blue-300 bg-blue-50" : ""} ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"} ${"hover:bg-blue-100 transition-colors ease-in-out cursor-pointer"}`}
                  onClick={() => handleRowClick(index)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.article}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                    {item.price} {Currency}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                    {item.total} {Currency}
                  </td>
                </tr>
              ))}
            </tbody>
            {/* </div> */}
          </table>
        </div>

        <div className="flex flex-col bg-gray-400 justify-evenly items-center self-center h-full p-3">
          <div className="text-xl md:text-2xl lg:text-4xl">
            <h1 className="flex flex-col items-center text-center">
              Total Qte :{" "}
              <span className="" style={{ color: "red" }}>
                {data.length}
              </span>
            </h1>
            <h1 className="flex flex-col items-center text-center">
              Nombre Articles :{" "}
              <span className="" style={{ color: "red" }}>
                {/* {data.reduce((acc, item) => acc + Number(item.quantity), 0)} */}
                {data.reduce((acc, item) => acc + +item.quantity, 0)}
              </span>
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 mt-2 ">
            <div className="flex flex-wrap justify-center items-center gap-2">
              <button
                className="hover:bg-blue-400 bg-slate-300 p-1 h-12 w-32 flex flex-row justify-center items-center gap-1"
                onClick={handleEnregistrerBtn}
              >
                Enregister <FaCheck style={{ color: "green" }} />
              </button>
              <button
                className="hover:bg-blue-400 bg-slate-300 p-1 h-12 w-24 flex flex-row justify-center items-center gap-1"
                onClick={handleInsererBtn}
              >
                Inserer <FaPaperclip style={{ color: "orange" }} />
              </button>
              <button
                className="hover:bg-blue-400 bg-slate-300 p-1 h-12 w-24 flex flex-row justify-center items-center gap-1"
                onClick={handleModifierBtn}
              >
                Modifier
                <FaPen style={{ color: "blue" }} />
              </button>

              <button
                className="hover:bg-blue-400 bg-slate-300 p-1 h-12 w-24 flex flex-row justify-center items-center gap-1"
                onClick={handleEffacerBtn}
              >
                Effacer <FaMinus style={{ color: "red" }} />
              </button>
              <button
                className="hover:bg-blue-400 bg-slate-300 p-1 h-12 w-24 flex flex-row justify-center items-center gap-1"
                onClick={handleAjouterBtn}
              >
                Ajouter <FaPlus style={{ color: "green" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(ComptoireTable);
