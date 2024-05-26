import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPrinter, FiPlus, FiMinus, FiEdit2 } from "react-icons/fi";
import GestionCLients from "./GestionCLients";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const PayementClients = () => {
  const [showGestionClients, setShowGestionClients] = useState(false);

  useEffect(() => {
    // Fetch data from the API /api/comptoire/payement/
    // axios
    //   .get("/api/comptoire/payement/")
    //   .then((response) => console.log(response.data))
    //   .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex flex-col justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-11/12 h-4/5 overflow-y-auto bg-gray-100 rounded-lg shadow-lg p-6">
      {/* <div className="bg-white p-6 rounded-lg shadow-md"> */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="underline text-2xl font-semibold ">
          Versements Clients
        </h1>
        <Link
          to="/Vente"
          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-md "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
      </div>
      {/* Three Columns */}
      <div className="flex w-full justify-between">
        {/* Top Section */}
        <div className="flex w-1/3 flex-col justify-evenly">
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Total bon en cours:</label>
            <span className="text-red-600 text-2xl font-bold">0,00 DZD</span>
          </div>
          <div className="flex items-center justify-between">
            <label className="block text-gray-700">Client:</label>
            <div className="flex items-center justify-end gap-2">
              <select className="w-full p-2 border rounded">
                <option>PARTICULIER</option>
              </select>
              <button
                className="border border-gray-500 p-1 rounded"
                onClick={() => setShowGestionClients(true)}
              >
                <FaPlus className="text-green-600" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="block text-gray-700">Type:</label>
            <select className="text-center w-1/2 p-2 border rounded">
              <option>Espece</option>
              {/* map through the fetched object */}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="block text-gray-700">Montant Reçu:</label>
            <input
              type="text"
              defaultValue={"0.0 DZD"}
              className="text-green-600 text-right text-2xl font-bold w-1/2 p-2 border rounded"
            ></input>
          </div>
        </div>

        {/* Middle Section */}
        {/* <div className="flex flex-col justify-between mt-4"> */}
        <div className="flex flex-col justify-evenly">
          <div className="flex items-center justify-between gap-5">
            <label className="text-gray-700">Date:</label>
            <input type="date" className="w-full p-2 border rounded" />
            <label>AU</label>
            <input type="date" className="w-full p-2 border rounded" />
            <button className="p-2 border rounded bg-gray-200">🔍</button>
          </div>
          <div className="flex flex-col bg-orange-200 p-4 rounded">
            <div className="flex justify-between">
              <label className="block text-gray-700">Total Créances:</label>
              <span>0,00 DZD</span>
            </div>
            <div className="flex justify-between">
              <label className="block text-gray-700">Crédit Initial:</label>
              <span>0,00 DZD</span>
            </div>
            <div className="flex justify-between">
              <label className="block text-gray-700">Total Versements:</label>
              <span>0,00 DZD</span>
            </div>
            <div className="flex justify-between">
              <label className="block text-gray-700">Total Remises:</label>
              <span>0,00 DZD</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <button className="flex items-center gap-1 bg-blue-500 text-white p-2 rounded">
            <FiPlus /> Ajouter
          </button>
          <button className="flex items-center gap-1 bg-yellow-500 text-white p-2 rounded">
            <FiEdit2 /> Modifier
          </button>
          <button className="flex items-center gap-1 bg-red-500 text-white p-2 rounded">
            <FiMinus /> Effacer
          </button>
          <button className="flex items-center gap-1 bg-gray-500 text-white p-2 rounded">
            <FiPrinter />
            Adresse
          </button>
          {/* <input className="text-gray-700" defaultValue={2.00}></input> */}
        </div>
        {/* </div> */}
      </div>
      {/* Table Section */}
      <div className="mt-6">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 border">Date</th>
              <th className="py-2 px-4 bg-gray-200 border">Nom</th>
              <th className="py-2 px-4 bg-gray-200 border">Montant</th>
              <th className="py-2 px-4 bg-gray-200 border">Type</th>
              <th className="py-2 px-4 bg-gray-200 border">Établissement</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="py-2 px-4 border">27-05-2024</td>
              <td className="py-2 px-4 border">Fournisseur 1</td>
              <td className="py-2 px-4 border"> 20000 DA</td>
              <td className="py-2 px-4 border">Versement</td>
              <td className="py-2 px-4 border"> - </td>
            </tr>
            <tr className="text-center">
              <td className="py-2 px-4 border">27-05-2024</td>
              <td className="py-2 px-4 border">Fournisseur 1</td>
              <td className="py-2 px-4 border"> 20000 DA</td>
              <td className="py-2 px-4 border">Versement</td>
              <td className="py-2 px-4 border"> - </td>
            </tr>
            <tr className="text-center">
              <td className="py-2 px-4 border">27-05-2024</td>
              <td className="py-2 px-4 border">Fournisseur 1</td>
              <td className="py-2 px-4 border"> 20000 DA</td>
              <td className="py-2 px-4 border">Versement</td>
              <td className="py-2 px-4 border"> - </td>
            </tr>
            {/* More rows can be added here */}
          </tbody>
        </table>
      </div>
      {/* Bottom Section */}
      <div className="flex justify-between mt-2">
        <div className="text-gray-700">Nombre d'opérations: 0</div>
        <div className="text-green-600 text-2xl font-bold">TOTAL: 0,00 DZD</div>
      </div>
      {showGestionClients && (
        <GestionCLients onClose={() => setShowGestionClients(false)} />
      )}
    </div>
  );
};

export default PayementClients;
