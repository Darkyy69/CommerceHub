import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaPlus, FaMinus, FaPen, FaUser } from "react-icons/fa";
import axios from "axios";

const FenetreListeBon = ({ client, date, setListeBon }) => {
  const [bon, setBon] = useState([]);
  const componentRef = useRef(null);
  const [filteredBons, setFilteredBons] = useState(bon);
  const [modifierBon, setModifierBon] = useState(false);
  const [AjouterBon, setAjouterBon] = useState(false);
  const [selectedClient, setSelectedClient] = useState(client[0].id);
  const [montantInput, setMontantInput] = useState("");

  const [lastBonSelected, setLastBonSelected] = useState(
    // equals filteredbons first index element, if its not empty
    filteredBons.length > 0 ? 0 : null
  );

  // change date format from dd/mm/yyyy to yyyy-mm-dd for F4 Liste des bons
  const changeDateFormat = (date) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const [dateFilter, setDateFilter] = useState({
    le: changeDateFormat(date),
    au: changeDateFormat(date),
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/comptoire/documents/bon-art-out/")
      .then((res) => setBon(res.data))
      .catch((err) => console.log(err));
  }, []);

  // filtrer les bons par rapport a dateFilter (le, au)
  React.useEffect(() => {
    const filteredBon = bon.filter((item) => {
      const bonDate = new Date(item.date.split("T")[0]);
      const startDate = new Date(dateFilter.le.split("T")[0]);
      const endDate = new Date(dateFilter.au.split("T")[0]);

      return (
        bonDate >= startDate &&
        bonDate <= endDate &&
        +item.proprietaire === +selectedClient
      );
    });
    setFilteredBons(filteredBon);
  }, [dateFilter, bon, selectedClient]);

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
  const handleEffacerBtn = () => {
    if (lastBonSelected === null || filteredBons.length === 0)
      return alert("Veuillez sélectionner un bon");

    // Alerter l'utilisateur pour confirmer l'effacement
    if (window.confirm("Voulez-vous vraiment effacer ce bon ?")) {
      // Effacer le bon
      const newBon = bon.filter(
        (item, index) => item.id !== filteredBons[lastBonSelected].id
      );
      console.log(filteredBons[lastBonSelected]);
      console.log(newBon);
      setBon(newBon);
      setFilteredBons(newBon);
      setLastBonSelected(0); // Reset the lastBonSelected state
    }
  };

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  const formatPrice = (price) => {
    // Convertir le prix en nombre
    const numericPrice = parseFloat(price);
    // Formater le prix avec deux décimales et ajouter " DZD"
    return `${numericPrice.toFixed(2)} DZD`;
  };

  // si l'utilisateur clique sur l'un des boutons radio (Aujourd'hui, Semaine, Mois, Année) pour filtrer les bons par date
  const handleRadioChange = (e) => {
    const radioId = e.target.id;
    let startDate = null;
    const today = changeDateFormat(date);
    const endDate = today;
    switch (radioId) {
      case "aujordhui":
        startDate = today;
        setDateFilter({ le: startDate, au: endDate });

        break;
      case "semaine":
        // endDate est toujours aujourd'hui (today) et startDate dans la semaine est today-6
        startDate = new Date(
          new Date(today).setDate(new Date(today).getDate() - 7)
        );
        // transformer la date en format yyyy-mm-dd
        startDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
          .toString()
          .padStart(
            2,
            "0"
          )}-${startDate.getDate().toString().padStart(2, "0")}`;

        console.log(startDate);
        setDateFilter({ le: startDate, au: endDate });
        break;
      case "mois":
        // startDate dans le mois est le mois d'aujourd'hui - 1 avec les cas spécial pour janvier et décembre
        startDate = new Date(
          new Date(today).setMonth(new Date(today).getMonth() - 1)
        );
        // transformer la date en format yyyy-mm-dd
        startDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
          .toString()
          .padStart(
            2,
            "0"
          )}-${startDate.getDate().toString().padStart(2, "0")}`;

        console.log(startDate);
        setDateFilter({ le: startDate, au: endDate });

        break;
      case "annee":
        // startDate dans l'année est l'année d'aujourd'hui - 1
        startDate = new Date(
          new Date(today).setFullYear(new Date(today).getFullYear() - 1)
        );

        // transformer la date en format yyyy-mm-dd
        startDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
          .toString()
          .padStart(
            2,
            "0"
          )}-${startDate.getDate().toString().padStart(2, "0")}`;

        console.log(startDate);
        setDateFilter({ le: startDate, au: endDate });

        break;
      default:
        break;
    }
  };

  return (
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
            <select
              className="w-64 p-1.5"
              onChange={handleClientChange}
              value={selectedClient}
            >
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
            <button
              className="flex items-center gap-1 p-1.5 bg-gray-200"
              onClick={handleEffacerBtn}
            >
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
                    value={dateFilter.le}
                    onChange={(e) => {
                      setDateFilter((prev) => ({
                        ...prev,
                        le: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p>Au:</p>
                  <input
                    className="p-1.5 w-40"
                    type="date"
                    value={dateFilter.au}
                    onChange={(e) => {
                      setDateFilter((prev) => ({
                        ...prev,
                        au: e.target.value,
                      }));
                    }}
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
                value={montantInput}
                placeholder={formatPrice(0)}
                onClick={(e) => e.target.select()}
                onChange={(e) => {
                  // const filterValue = e.target.value;
                  // console.log(f);
                  // const filteredData = filteredBons.filter((item) =>
                  //   item.montant.includes(filterValue)
                  // );
                  setMontantInput(e.target.value);
                }}
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
                <th className="text-left p-4">Date</th>
                <th className="p-4">Propriétaire</th>
                <th className="p-4">Montant</th>
              </tr>
            </thead>

            <tbody>
              {filteredBons.length > 0 ? (
                filteredBons.map((item, index) => {
                  if (montantInput !== "") {
                    if (!String(item.montant).includes(montantInput))
                      return null;
                  }

                  return (
                    <tr
                      key={index}
                      tabIndex="0"
                      className={`${lastBonSelected === index ? "border-2 border-blue-300 bg-blue-50" : ""} ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"} ${"hover:bg-blue-100 transition-colors ease-in-out cursor-pointer"}`}
                      onClick={() => {
                        setLastBonSelected(index);
                      }}
                    >
                      <td className="p-4">{item.date.substring(0, 16)}</td>
                      <td className="p-4">{item.proprietaire}</td>
                      <td className="p-4">{item.montant} DZD</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="text-center text-red-500">Pas de Bon</td>
                  <td className="text-center text-red-500">Pas de Bon</td>
                  <td className="text-center text-red-500">Pas de Bon</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5">
        <h1 className="text-2xl font-bold text-green-500">
          Total:{" "}
          {formatPrice(
            filteredBons
              .reduce((acc, item) => acc + parseFloat(item.montant), 0)
              .toFixed(2)
          )}
        </h1>
      </div>
    </div>
  );
};

export default FenetreListeBon;
