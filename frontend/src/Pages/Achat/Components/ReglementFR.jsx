import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function ReglementFR() {
  const [formData, setFormData] = useState({
    fournisseur: "",
    date: new Date().toISOString().split("T")[0],
    creditInitial: "0.00 DZD",
    totalCredit: "0.00 DZD",
    totalAvances: "0.00 DZD",
    montantRecu: "0.00 DZD",
  });
  const [fournisseurs, setFournisseurs] = useState([]);

  useEffect(() => {
    // Fetch fournisseurs
    axios
      .get("http://127.0.0.1:8000/api/comptoire/entite-personnes/fournisseur/")
      .then((res) => {
        const data = res.data;
        setFournisseurs(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    // Add functionality
  };

  const handleModify = () => {
    // Modify functionality
  };

  const handleDelete = () => {
    // Delete functionality
  };

  const handleRemise = () => {
    // Remise functionality
  };

  return (
    <section className="flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-10/12 h-4/5 bg-gray-100 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center">
        <h1 className="underline text-2xl font-semibold">
          Avances Fournisseurs
        </h1>
        <Link
          to="/Achat"
          className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center">
            <label className="w-32">Fournisseur:</label>
            <select
              name="fournisseur"
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="">Choisir un fournisseur</option>
              {fournisseurs?.map((fournisseur) => (
                <option key={fournisseur.id} value={fournisseur.nom}>
                  {fournisseur.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-32">Date:</label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            {" "}
            {/* Updated */}
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Ajouter
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="w-32">Crédit initial:</label>
            <span>{formData.creditInitial}</span>
          </div>
          <div className="flex items-center"></div>
          <div className="flex justify-end">
            {" "}
            {/* Updated */}
            <button
              onClick={handleModify}
              className="bg-yellow-500 text-white p-2 rounded"
            >
              Modifier
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="w-32">Total Crédit:</label>
            <span>{formData.totalCredit}</span>
          </div>
          <div className="flex items-center">
            <label className="w-32">Montant Reçu:</label>
            <input
              type="text"
              name="montantRecu"
              onChange={handleChange}
              className="border rounded p-2 w-full text-right"
              value={formData.montantRecu}
            />
          </div>
          <div className="flex justify-end">
            {" "}
            {/* Updated */}
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded"
            >
              Supprimer
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="w-32">Total Avances:</label>
            <span>{formData.totalAvances}</span>
          </div>
          <div></div>
          <div className="flex justify-end">
            {" "}
            {/* Updated */}
            <button
              onClick={handleRemise}
              className="bg-green-500 text-white p-2 rounded"
            >
              Remise
            </button>
          </div>
        </div>
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 font-semibold text-gray-700">id</th>
              <th className="border p-2 font-semibold text-gray-700">Nom</th>
              <th className="border p-2 font-semibold text-gray-700">Date</th>
              <th className="border p-2 font-semibold text-gray-700">
                Montant
              </th>
              <th className="border p-2 font-semibold text-gray-700">
                Etablissement
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Populate this with your data */}
            <tr className="bg-white hover:bg-gray-100">
              <td className="border p-2">1</td>
              <td className="border p-2">Example</td>
              <td className="border p-2">{formData.date}</td>
              <td className="border p-2">{formData.montantRecu}</td>
              <td className="border p-2">Example Etablissement</td>
            </tr>
            <tr className="bg-white hover:bg-gray-100">
              <td className="border p-2">2</td>
              <td className="border p-2">Example</td>
              <td className="border p-2">{formData.date}</td>
              <td className="border p-2">{formData.montantRecu}</td>
              <td className="border p-2">Example Etablissement</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <span>Total Avances: {formData.totalAvances}</span>
          <span>Nombre d'operations: 0</span>
        </div>
      </div>
    </section>
  );
}
