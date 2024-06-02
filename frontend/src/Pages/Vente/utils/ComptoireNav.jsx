import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaSearch,
  FaPlus,
  FaMinus,
  FaPen,
  FaUser,
  FaTimes,
  FaCalculator,
} from "react-icons/fa";
import { useData } from "./DataProvider";
import Calculatrice from "./Calculatrice";
import Clock from "./Clock";
import FenetreListeBon from "./FenetreListeBon";
import Parameters from "../../../assets/Parameters.json";

export default function ComptoireNav() {
  const [client, setClient] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [listeBon, setListeBon] = useState(false);
  const [input, setInput] = useState({});
  // const [prix, setPrix] = useState();
  const [dateEtHeureActuelles, setDateEtHeureActuelles] =
    useState(getCurrentDateTime());
  const [date, time] = dateEtHeureActuelles.split(" ");
  const { setShowCalculatrice } = useData();
  const { qteRef, PrixRef } = useData();
  const {
    setData,
    data,
    lastItemSelected,
    InfoArticle,
    setInfoArticle,
    ShowCalculatrice,
    resultRef,
  } = useData();

  const HandelInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInput((item) => ({ ...item, [name]: value }));
  };

  const onClientSelect = (e) => {
    setSelectedClient(client[e.target.value]);
    console.log(e.target.value);
  };

  useEffect(() => {
    setSelectedClient(client[0]);
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/comptoire/entite-personnes/client/")
      .then((res) => setClient(res.data))
      .catch((err) => console.log(err));

    const handleKeyDown = (event) => {
      switch (event.keyCode || event.code) {
        case 107: // Add (Numpad)
          event.preventDefault();
          console.log("You Pressed +");
          if (lastItemSelected >= 1) {
            setData((prev) => {
              const newData = [...prev];
              newData[lastItemSelected - 1].quantity =
                +newData[lastItemSelected - 1].quantity + 1;
              newData[lastItemSelected - 1].total =
                newData[lastItemSelected - 1].quantity *
                newData[lastItemSelected - 1].price;
              return newData;
            });
          }

          break;
        case 106: // Multiply (Numpad)
          event.preventDefault();
          // Add your code here for the corresponding key
          console.log("You Pressed *");
          qteRef.current.select();

          break;
        case 109: // Minus (Numpad)
          event.preventDefault();
          console.log("You Pressed -");

          if (lastItemSelected >= 1) {
            setData((prev) => {
              const newData = [...prev];
              newData[lastItemSelected - 1].quantity -= 1;
              newData[lastItemSelected - 1].total =
                newData[lastItemSelected - 1].quantity *
                newData[lastItemSelected - 1].price;
              if (newData[lastItemSelected - 1].quantity === 0) {
                newData.splice(lastItemSelected - 1, 1);
              }
              return newData;
            });
          }

          break;

        case 112:
          event.preventDefault();
          // Add your code here for F1 key
          console.log("You Pressed F1");
          break;
        case 113:
          event.preventDefault();
          // Add your code here for F2 key
          console.log("You Pressed F2");
          // fermer ou afficher la fenetre infoArticle
          setInfoArticle(!InfoArticle);

          break;
        case 115:
          event.preventDefault();
          // Add your code here for F4 key
          console.log("You Pressed F4");
          setListeBon(!listeBon);
          break;
        case 116:
          event.preventDefault();
          // Add your code here for F5 key
          console.log("You Pressed F5");
          handleF5(data, Parameters, resultRef);
          break;
        case 119:
          event.preventDefault();
          // Add your code here for F8 key
          console.log("You Pressed F8");
          PrixRef.current.select();
          break;
        case 121:
          event.preventDefault();
          // Add your code here for F10 key
          console.log("You Pressed F10");
          break;

        case 122:
          // event.preventDefault();
          // Add your code here for F11 key
          console.log("You Pressed F11");
          break;
        default:
          break;
      }
    };

    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [InfoArticle, listeBon, lastItemSelected]);

  function handleF5(data, Parameters, resultRef) {
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
  }

  const HandelArticl = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    // Vérifier si l'article sélectionné est un nom ou un ID
    const selectedItem = props.article.find(
      (item) =>
        item.article === selectedValue || item.id === parseInt(selectedValue)
    );

    if (selectedItem) {
      const prixformater = formatPrice(selectedItem.prix);
      setInput((prev) => ({
        ...prev,
        id: selectedItem.id,
        code: selectedItem.code,
        prix: prixformater,
      }));
    }
  };

  const formatPrice = (price) => {
    // Convertir le prix en nombre
    const numericPrice = parseFloat(price);
    // Formater le prix avec deux décimales et ajouter " DZD"
    return `${numericPrice.toFixed(2)} DZD`;
  };

  const HandelCodeInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if (!isNaN(value)) {
      setInput((item) => ({ ...item, [name]: value }));
    }
  };

  function getCurrentDateTime() {
    const maintenant = new Date();
    const jour = maintenant.getDate().toString().padStart(2, "0");
    const mois = (maintenant.getMonth() + 1).toString().padStart(2, "0");
    const annee = maintenant.getFullYear();
    const heure = maintenant.getHours().toString().padStart(2, "0");
    const minutes = maintenant.getMinutes().toString().padStart(2, "0");
    const secondes = maintenant.getSeconds().toString().padStart(2, "0");
    return `${jour}/${mois}/${annee} ${heure}:${minutes}:${secondes}`;
  }

  const ChangePrix = (e) => {
    e.preventDefault();
    PrixRef.current.select();
  };

  const HandelShowCalculatrice = (e) => {
    e.preventDefault();
    setShowCalculatrice(true);
  };

  // la fenetre de calcultrice apparait dans le clique de calc
  const fenetreCalculatrice = ShowCalculatrice && <Calculatrice />;

  return (
    <div className="h-fit w-full">
      <div className="flex w-full justify-between gap-5">
        <div className="flex flex-col justify-center items-center bg-gray-300 p-3 w-80 h-24">
          <h3 style={{ color: "red" }} className="font-bold text-xl">
            CREDIT CLIENT
          </h3>
          <div className="flex flex-row justify-center items-center gap-4">
            <h5 className="flex flex-row justify-center items-center gap-1">
              <FaUser /> Clients :
            </h5>
            <select
              className="w-32 border-none h-6"
              value={selectedClient}
              onChange={onClientSelect}
            >
              {/* Loop through client */}
              {client.map((item, index) => (
                <option key={index} value={index}>
                  {item.nom}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap flex-row justify-center items-center gap-2 w-3/5">
          <button
            className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300"
            onClick={() => setInfoArticle(true)}
          >
            F2 prix?
          </button>
          <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">
            F5 OK
          </button>
          <button
            className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300"
            onClick={() => setListeBon(true)}
          >
            F4 Liste
          </button>
          <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">
            Bon Suiv
          </button>
          <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">
            Bon Pre
          </button>
          <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center flex-col justify-center bg-gray-300">
            F1 <FaSearch style={{ color: "gray" }} />
          </button>
          <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">
            con F10
          </button>
          <button
            className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300"
            onClick={(e) => ChangePrix(e)}
          >
            Prix F8
          </button>
          <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">
            F11
          </button>
          <button
            className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300"
            onClick={() => {
              if (lastItemSelected >= 1) {
                setData((prev) => {
                  const newData = [...prev];
                  newData[lastItemSelected - 1].quantity =
                    +newData[lastItemSelected - 1].quantity + 1;
                  newData[lastItemSelected - 1].total =
                    newData[lastItemSelected - 1].quantity *
                    newData[lastItemSelected - 1].price;
                  return newData;
                });
              }
            }}
          >
            <FaPlus style={{ color: "green" }} />
          </button>
          <button
            className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300"
            onClick={() => {
              if (lastItemSelected >= 1) {
                setData((prev) => {
                  const newData = [...prev];
                  newData[lastItemSelected - 1].quantity -= 1;
                  newData[lastItemSelected - 1].total =
                    newData[lastItemSelected - 1].quantity *
                    newData[lastItemSelected - 1].price;
                  if (newData[lastItemSelected - 1].quantity === 0) {
                    newData.splice(lastItemSelected - 1, 1);
                  }
                  return newData;
                });
              }
            }}
          >
            <FaMinus style={{ color: "red" }} />
          </button>
          <button
            className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300"
            style={{ color: "green", fontSize: "20px" }}
            onClick={() => {
              qteRef.current.select();
            }}
          >
            *
          </button>
          <button
            className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex flex-col items-center justify-center bg-gray-300"
            style={{ color: "blue", fontSize: "15px" }}
            onClick={(e) => HandelShowCalculatrice(e)}
          >
            <FaCalculator style={{ color: "blue" }} />
            Calc
          </button>
        </div>

        <div className="sm:text-lg lg:text-2xl font-semibold p-2 bg-green-500 flex items-center justify-center h-24 w-1/6">
          <Clock />
        </div>
      </div>

      {listeBon && (
        <FenetreListeBon
          client={client}
          date={date}
          setListeBon={setListeBon}
        />
      )}
      {fenetreCalculatrice}
    </div>
  );
}
