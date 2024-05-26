import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPrinter, FiPlus, FiMinus, FiEdit2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

const GestionCLients = () => {
  const [formData, setFormData] = useState({
    RSS: "",
    nom: "",
    adresse: "",
    credit_init: "0.00",
    registre_commerce: "",
    NIF: "",
    NIS: "",
    ART: "",
    BP: "",
    type: null,
    etat: null,
  });
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/comptoire/entite-personnes/client/")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make POST request here using formData
    fetch("http://127.0.0.1:8000/api/comptoire/entite-personnes/client/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log(data);
        setClients([...clients, data]);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-11/12 h-4/5 overflow-y-auto bg-gray-100 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center">
        <h1 className="underline text-2xl font-semibold">Clients</h1>
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

      <div className="flex w-full justify-between">
        {/* Top Section */}
        <div className="flex flex-col justify-evenly">
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-gray-700">Nom:</label>
              <input
                type="text"
                className="p-2 border rounded"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
              />
              <div>
                <input type="checkbox" className="mr-2" />
                <label className="text-gray-700">Modif en cours</label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="block text-gray-700">Tel:</label>
              <input type="number" className=" p-2 border rounded" name="tel" />
              <div>
                <input type="checkbox" className="mr-2" />
                <label className="text-gray-700">Distributeur</label>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between mt-4">
            <label className="block text-gray-700">RC:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              name="registre_commerce"
              value={formData.registre_commerce}
              onChange={handleChange}
            />
            <label className="block text-gray-700">ART:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              name="ART"
              value={formData.ART}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 justify-between">
            <label className="block text-gray-700">NIF:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              name="NIF"
              value={formData.NIF}
              onChange={handleChange}
            />
            <label className="block text-gray-700">NIS:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              name="NIS"
              value={formData.NIS}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 justify-between">
            <label className="block text-gray-700">RSS:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              name="RSS"
              value={formData.RSS}
              onChange={handleChange}
            />
            <label className="block text-gray-700">BP:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              name="BP"
              value={formData.BP}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between"></div>
        </div>

        <div className="flex w-1/4 flex-col gap-4">
          <div className="flex min-w-[200px] opacity-50">
            <label className="block text-gray-700">Créances:</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-right"
              defaultValue="0,00 DZD"
              readOnly
            />
          </div>
          <div className="flex min-w-[200px] opacity-50">
            <label className="block text-gray-700">Avances:</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-right"
              defaultValue="0,00 DZD"
              readOnly
            />
          </div>
          <div className="flex min-w-[200px]">
            <label className="block text-gray-700">Créance initial:</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-right"
              value={formData.credit_init}
              onchange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            className="flex items-center gap-1 bg-blue-500 text-white p-2 rounded"
            onClick={handleSubmit}
          >
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
        </div>
      </div>
      <div className="">
        <label className="block text-gray-700">Adresse:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 border">id</th>
              <th className="py-2 px-4 bg-gray-200 border">nom</th>
              <th className="py-2 px-4 bg-gray-200 border">adresse</th>
              <th className="py-2 px-4 bg-gray-200 border">RSS</th>
              <th className="py-2 px-4 bg-gray-200 border">RC</th>
              <th className="py-2 px-4 bg-gray-200 border">NIF</th>
              <th className="py-2 px-4 bg-gray-200 border">NIS</th>
              <th className="py-2 px-4 bg-gray-200 border">ART</th>
              <th className="py-2 px-4 bg-gray-200 border">BP</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="py-2 px-4 border">{client.id}</td>
                <td className="py-2 px-4 border">{client.nom}</td>
                <td className="py-2 px-4 border">{client.adresse}</td>
                <td className="py-2 px-4 border">{client.RSS}</td>
                <td className="py-2 px-4 border">{client.registre_commerce}</td>
                <td className="py-2 px-4 border">{client.NIF}</td>
                <td className="py-2 px-4 border">{client.NIS}</td>
                <td className="py-2 px-4 border">{client.ART}</td>
                <td className="py-2 px-4 border">{client.BP}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionCLients;
