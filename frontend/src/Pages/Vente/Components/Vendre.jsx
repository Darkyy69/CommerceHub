import React from "react";
import { Link } from "react-router-dom";

const Vendre = () => {
  return (
    <div className="flex flex-col justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-10/12 h-4/5 overflow-y-auto bg-gray-100 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center">
        <h1 className="underline text-2xl font-semibold">Vente Article</h1>
        <Link to="/Vente" className="w-8 h-8 bg-red-500 text-white rounded-md">
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
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <select className="border border-gray-300 p-2 rounded">
            <option>Pro-Format</option>
          </select>
          <input
            type="date"
            className="border border-gray-300 p-2 rounded"
            defaultValue="2024-05-25"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block">
              Clients:
              <select className="border border-gray-300 p-2 rounded w-full">
                <option>PARTICULIER</option>
              </select>
            </label>
            <label className="block">
              Code à barres:
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                defaultValue="0"
              />
            </label>
            <label className="block">
              Famille:
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
              />
            </label>
            <label className="block flex items-center space-x-2">
              <span>Article:</span>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded flex-1"
              />
              <span>ID</span>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-16"
                defaultValue="0"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="block">
              Prix:
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                defaultValue="0,00 DZD"
              />
            </label>
            <div className="flex items-center space-x-2">
              <span>Qté:</span>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-16"
                defaultValue="1.00"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center bg-orange-100 p-4 rounded">
          <div>
            <div>Nombre Articles: 0</div>
            <div>Total Qté: 0.00</div>
          </div>
          <div className="text-red-500 font-bold text-xl">0,00 DZD</div>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white p-2 rounded">
            Ajouter
          </button>
          <button className="bg-red-500 text-white p-2 rounded">Effacer</button>
          <button className="bg-gray-500 text-white p-2 rounded flex-1">
            Enregistrer
          </button>
          <button className="bg-yellow-500 text-white p-2 rounded flex-1">
            Modifier
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="bg-gray-200 p-2 rounded">
              Imprimer Document
            </button>
            <input
              type="number"
              className="border border-gray-300 p-2 rounded w-16"
              defaultValue="1.00"
            />
          </div>
          <button className="bg-gray-200 p-2 rounded">Adresse</button>
        </div>
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="border p-2">article</th>
              <th className="border p-2">Qté</th>
              <th className="border p-2">Prix</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>{/* Table rows will go here */}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendre;
