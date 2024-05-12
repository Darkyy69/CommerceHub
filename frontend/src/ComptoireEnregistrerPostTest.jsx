import React from "react";
import axios from "axios";
import Parameters from "./assets/Parameters.json"; // Lire le fichier Parameters.md pour plus d'informations

const ComptoireEnregistrerPostTest = () => {
  // Assume obj1 and obj2 are the objects you want to send
  const obj1 = {
    num: Parameters[0].num,
    date: "2024-05-02T11:10:00Z",
    proprietaire: 1,
    montant: 2050.0,
    type_payement: 4,
    etat: 3,
    imprime: 3,
    editeur: 1,
  };

  const obj2 = [
    {
      id_art: 800,
      qte: "5",
      prix: 30,
      montant: 150,
    },
    {
      id_art: 5360,
      qte: "2",
      prix: 680,
      montant: 1360,
    },
    {
      id_art: 2926,
      qte: "1",
      prix: 180,
      montant: 180,
    },
  ];

  // Create an object containing both obj1 and obj2
  const dataToSend = {
    document: obj1,
    ligneDocument: obj2,
  };

  const handleEnregistrerBtn = () => {
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
  };

  return (
    <div>
      <button
        className="w-36 h-12 ml-40 mt-10 rounded bg-slate-400"
        onClick={handleEnregistrerBtn}
      >
        Enregistrer
      </button>
    </div>
  );
};

export default ComptoireEnregistrerPostTest;
