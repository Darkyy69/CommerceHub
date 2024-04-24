import React, { useState, useEffect, useRef, useContext } from "react";
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

export default function ComptoireNav() {
  const [client, setClient] = useState([]);
  const [bon, setBon] = useState([
    {
      id: 2,
      num: "152-",
      date: "2024-04-22T12:30:00Z",
      propretaire: 56,
      montant: 3900.55,
      type_payement: 1,
      etat: 2,
      imprime: 7,
      editeur: 1,
    },
    {
      id: 3,
      num: "152-",
      date: "2024-02-26T12:30:00Z",
      propretaire: 57,
      montant: 1254622.08,
      type_payement: 1,
      etat: 1,
      imprime: 7,
      editeur: 1,
    },
    {
      id: 4,
      num: "153-",
      date: "2024-02-26T13:29:00Z",
      propretaire: 3,
      montant: 18887.2,
      type_payement: 1,
      etat: 3,
      imprime: 7,
      editeur: 1,
    },
    {
      id: 5,
      num: "153-a",
      date: "2024-03-07T13:37:51Z",
      propretaire: 56,
      montant: 6988.12,
      type_payement: 4,
      etat: 4,
      imprime: 1,
      editeur: 1,
    },
  ]);
  const [listeBon, setListeBon] = useState(false);
  const [input, setInput] = useState({});
  // const [prix, setPrix] = useState();
  const [modifierBon, setModifierBon] = useState(false);
  const [AjouterBon, setAjouterBon] = useState(false);
  const [dateEtHeureActuelles, setDateEtHeureActuelles] =
    useState(getCurrentDateTime());
  const [date, time] = dateEtHeureActuelles.split(" ");
  const { setShowCalculatrice } = useData();
  const { PrixRef } = useData();
  const { InfoArticle,setInfoArticle } = useData();
  const componentRef = useRef(null);

  const HandelInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInput((item) => ({ ...item, [name]: value }));
  };

  const onClientSelect = (e) => {
    setClient(e.target.value);
  };

  useEffect(() => {
    // Mettre à jour la date toutes les secondes
    const interval = setInterval(() => {
      setDateEtHeureActuelles(getCurrentDateTime());
    }, 1000);
    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/comptoire/entite-personnes/client/")
      .then((res) => setClient(res.data))
      .catch((err) => console.log(err));

      const handleKeyDown = (event) => {
        switch (event.keyCode || event.code) {
          case 187: // Add (Numpad)
          case 106: // Multiply (Numpad)
          case 189: // Minus (Numpad)
          case "*":
          case "+":
          case "-":    
            event.preventDefault();
            // Add your code here for the corresponding key
            console.log("You Pressed + or - or *");
            break;
          case "F1":
          case 112 :
            event.preventDefault();
            // Add your code here for F1 key
            console.log("You Pressed F1");
            break;  
          case "F2":
          case 113 :
            event.preventDefault();
            // Add your code here for F2 key
            console.log("You Pressed F2");
            // fermer ou afficher la fenetre infoArticle
            setInfoArticle(!InfoArticle);

            break;
          case "F4":
          case 115 :
            event.preventDefault();
            // Add your code here for F4 key
            console.log("You Pressed F4");
            setListeBon(!listeBon)
            break;
          case "F5":
          case 116 :
            event.preventDefault();
            // Add your code here for F5 key
            console.log("You Pressed F5");
            break;
          case "F8":
          case 119 :
            event.preventDefault();
            // Add your code here for F8 key
            console.log("You Pressed F8");
            PrixRef.current.select();
            break;
          case "F10":
          case 121 :
            event.preventDefault();
            // Add your code here for F10 key
            console.log("You Pressed F10");
            break;
                
          case "F11":
          case 122 :
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
      
  }, [InfoArticle, listeBon]);

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

  const handelModifOpen = () => {
    setModifierBon(true);
    setListeBon(false);
  };
  const handelModifClose = () => {
    setModifierBon(false);
    setListeBon(true);
  };
  const handelAjoutOpen = () => {
    setAjouterBon(true);
    setListeBon(false);
  };
  const handlePrint = () => {};
  const handelAjoutClose = () => {
    setAjouterBon(false);
    setListeBon(true);
  };

  const ChangePrix = (e) => {
    e.preventDefault();
    PrixRef.current.select();
  };

  const HandelShowCalculatrice = (e) => {
    e.preventDefault();
    setShowCalculatrice(true);
  };
  // change date format from dd/mm/yyyy to yyyy-mm-dd for F4 Liste des bons
  const changeDateFormat = (date) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  // si l'utilisateur clique sur l'un des boutons radio (Aujourd'hui, Semaine, Mois, Année) pour filtrer les bons par date
  const handleRadioChange = (e) => {
    const radioId = e.target.id;
    let startDate, endDate;
    const today = changeDateFormat(date);
    switch (radioId) {
      case "aujordhui":
        startDate = today;
        endDate = today;
        break;
      case "semaine":
        // startDate = new Date(date.setDate(date.getDate() - date.getDay()));
        // endDate = new Date(date.setDate(date.getDate() + 6));
        break;
      case "mois":
        // startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        // endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        break;
      case "annee":
        // startDate = new Date(date.getFullYear(), 0, 1);
        // endDate = new Date(date.getFullYear(), 11, 31);
        break;
      default:
        break;
    }
    // filtrer les bons par date
    const filteredBon = bon.filter((item) => {
      const itemDate = new Date(item.date);
      console.log("Line 211");
      return itemDate >= startDate && itemDate <= endDate;
    });
    setBon(filteredBon);
  };

  // console.log(date.split("-")[0])
  const FenetreListeBon = listeBon && (
    <div className="flex flex-col justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-10/12 h-4/5 bg-gray-100 rounded-lg shadow-lg p-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="underline text-2xl font-semibold">Liste des bons</h1>

          <button
            className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={() => setListeBon(false)}
          >
            X
          </button>
        </div>

        <div className="flex items-center justify-between">
          <form className="flex items-center gap-4">
            <p className="flex items-center">
              <FaUser />
              Client:
            </p>
            <select className="w-64 p-1.5">
              {/* Options pour le sélecteur de client */}
              {client.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.nom}
                </option>
              ))}
            </select>
          </form>
          <div className="flex gap-3">
            <button
              className="flex items-center gap-1 p-1.5 bg-gray-200"
              onClick={handelAjoutOpen}
            >
              Ajouter
              <FaPlus style={{ color: "green" }} />
            </button>
            <button className="flex items-center gap-1 p-1.5 bg-gray-200">
              Effacer
              <FaMinus style={{ color: "red" }} />
            </button>
            <button
              className="flex items-center gap-1 p-1.5 bg-gray-200"
              onClick={handelModifOpen}
            >
              Modifier
              <FaPen style={{ color: "blue" }} />
            </button>
            <button
              className="flex items-center gap-1 p-1.5 bg-gray-200"
              onClick={handlePrint}
            >
              Imprimer
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between border border-gray-300 p-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-6">
              <form className="flex gap-5">
                <div className="flex items-center justify-between">
                  <p>Date:</p>
                  <input
                    className="p-1.5 w-40"
                    type="date"
                    placeholder="JJ/MM/AAAA"
                    value={changeDateFormat(date)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p>Au:</p>
                  <input
                    className="p-1.5 w-40"
                    type="date"
                    placeholder="JJ/MM/AAAA"
                    value={changeDateFormat(date)}
                  />
                </div>
              </form>
              <button className="bg-gray-200 p-1.5">
                <FaSearch />
              </button>
            </div>

            <div className="flex justify-center items-center gap-3">
              <input
                className="cursor-pointer"
                inline
                type="radio"
                name="radioFilter"
                id="aujordhui"
                onChange={handleRadioChange}
              />
              <label className="cursor-pointer" htmlFor="aujordhui">
                Aujord'hui
              </label>
              <input
                className="cursor-pointer"
                inline
                type="radio"
                name="radioFilter"
                id="semaine"
                onChange={handleRadioChange}
              />
              <label className="cursor-pointer" htmlFor="semaine">
                Semaine
              </label>
              <input
                className="cursor-pointer"
                inline
                type="radio"
                name="radioFilter"
                id="mois"
                onChange={handleRadioChange}
              />
              <label className="cursor-pointer" htmlFor="mois">
                Mois
              </label>
              <input
                className="cursor-pointer"
                inline
                type="radio"
                name="radioFilter"
                id="annee"
                onChange={handleRadioChange}
              />
              <label className="cursor-pointer" htmlFor="annee">
                Année
              </label>
            </div>
          </div>
          <form className="">
            <label className="flex flex-col gap-2 text-center">
              Chercher Montant:
              <input
                className="text-right border border-gray-300 p-1.5 w-40"
                type="text"
                defaultValue={formatPrice(0)}
              />
            </label>
          </form>
        </div>
      </div>

      <div className="flex flex-grow h-1 mt-4" ref={componentRef}>
        <div className="w-full overflow-y-scroll overflow-x-hidden">
          <table
            className="divide-y divide-gray-200 ml-3 w-full"
            aria-label="simple table"
          >
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th>
                  <td className="p-4">Date</td>
                </th>
                <th>
                  <td className="p-4">Propriétaire</td>
                </th>
                <th>
                  <td className="p-4">Montant</td>
                </th>
              </tr>
            </thead>

            <tbody>
              {bon ? (
                bon.map((item, index) => {
                  return (
                    <tr
                      className={
                        index % 2 === 0 ? "bg-white" : "bg-gray-200/70"
                      }
                      key={index}
                      onClick={() => {
                        console.log("hada n" + item.id);
                      }}
                    >
                      <td className="p-4">{item.date.substring(0, 16)}</td>
                      <td className="p-4">{item.propretaire}</td>
                      <td className="p-4">{item.montant} DZD</td>
                    </tr>
                  );
                })
              ) : (
                <h1>Pas de Bon</h1>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5">
        <h1 className="text-2xl font-bold text-green-500">
          Total:{" "}
          {formatPrice(
            bon
              .reduce((acc, item) => acc + parseFloat(item.montant), 0)
              .toFixed(2)
          )}
        </h1>
      </div>
    </div>
  );

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
              value={client}
              onChange={onClientSelect}
            >
              {/* Loop through client */}
              {client.map((item, index) => (
                <option key={index} value={item.id}>
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
          <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">
            <FaPlus style={{ color: "green" }} />
          </button>
          <button className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300">
            <FaMinus style={{ color: "red" }} />
          </button>
          <button
            className=" w-12 h-12 border border-gray-500 hover:bg-blue-300 p-1 flex items-center justify-center bg-gray-300"
            style={{ color: "green", fontSize: "20px" }}
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
          <h2 className="text-center">
            {date}
            <br />
            {time}
          </h2>
        </div>
      </div>

      {FenetreListeBon}
    </div>
  );
}
