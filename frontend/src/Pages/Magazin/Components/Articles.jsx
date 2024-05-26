import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import axios from "axios";
const Articles = () => {
  const [sArticles, setSArticles] = useState([]);
  const [familles, setFamilles] = useState([]);
  const [formData, setFormData] = useState({
    // codif is the first 5 letters of disignation
    codif: "",
    disignation: "",
    P_achat: "0.00",
    P_vente: "",
    P_min: "0.00",
    barrcode: "",
    fournisseur_best: 1,
    id_S_famille: 2,
    id_Article: 2,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/comptoire/entite-marchandise/s-article/")
      .then((response) => response.json())
      .then((data) => setSArticles(data))
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/api/comptoire/entite-marchandise/famille/")
      .then((response) => response.json())
      .then((data) => setFamilles(data))
      .catch((error) => console.error(error));
  }, []);

const handleFormSubmit = async (e) => {
    e.preventDefault();
    // set codif to the first 5 letters of disignation
    setFormData({
        ...formData,
        codif: formData.disignation.slice(0, 5),
    });

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/comptoire/entite-marchandise/s-article/",
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // Handle the response data if needed
        console.log(response.data);
        toast.success("Article added successfully!");
    } catch (error) {
        // Handle any errors
        console.error(error);
        toast.error("An error occurred while adding the article.");
    }
};

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-11/12 h-4/5 overflow-y-auto bg-gray-100 rounded-lg shadow-lg p-6">
      <Toaster position="bottom-right" />

      <div className="flex justify-between items-center mb-5">
        <h1 className="underline text-2xl font-semibold">Articles</h1>
        <Link
          to="/Magazin"
          className="w-8 h-8 bg-red-500 text-white rounded-md"
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
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex gap-10">
            <label className="block">
              Article:
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                name="disignation"
                value={formData.disignation}
                onChange={handleInputChange}
              />
            </label>
            <label className="block">
              Code barre:
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                name="barrcode"
                value={formData.barrcode}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <label className="block">
            Famille:
            <div className="flex items-center space-x-2">
              <select
                className="border border-gray-300 p-2 rounded w-full"
                name="id_S_famille"
                value={formData.id_S_famille}
                onChange={handleInputChange}
              >
                {familles?.map((famille) => (
                  <option key={famille.id}>{famille.disignation}</option>
                ))}
              </select>
              <button className="bg-green-500 text-white p-2 rounded">+</button>
            </div>
          </label>
          {/* <label className="block">
                                                                                Taille standard :
                                                                                <div className="flex items-center space-x-2">
                                                                                                <select className="border border-gray-300 p-2 rounded w-full">
                                                                                                                <option>PT</option>
                                                                                                </select>
                                                                                                <button className="bg-green-500 text-white p-2 rounded">+</button>
                                                                                </div>
                                                                </label> */}

          <label className="block">
            Prix Achat:
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full"
              name="P_achat"
              value={formData.P_achat}
              onChange={handleInputChange}
            />
          </label>
          <label className="block">
            Prix de Vente:
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full"
              name="P_vente"
              value={formData.P_vente}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="block">
            Prix Min:
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full"
              name="P_min"
              value={formData.P_min}
              onChange={handleInputChange}
            />
          </label>
          {/* <label className="block">
                                                                                Stock init :
                                                                                <input
                                                                                                type="text"
                                                                                                className="border border-gray-300 p-2 rounded w-full"
                                                                                                defaultValue="0.00"
                                                                                />
                                                                </label> */}
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={handleFormSubmit}
            >
              Ajouter
            </button>
            <button className="bg-yellow-500 text-white p-2 rounded">
              Modifier
            </button>
            <button className="bg-red-500 text-white p-2 rounded">
              Supprimer
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <button className="bg-gray-500 text-white p-2 rounded">
              Exporter tous
            </button>
            <button className="bg-gray-500 text-white p-2 rounded">
              Importer
            </button>
          </div>
        </div>
      </div>

      <div className="flex mt-5 space-x-2 items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button className="bg-green-500 text-white p-2 rounded">+</button>
        <input
          type="text"
          placeholder="chemin"
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button className="bg-gray-300 text-black p-2 rounded">Toujours</button>
      </div>
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">cb</th>
            <th className="border p-2">article</th>
            <th className="border p-2">PrixVente</th>
            <th className="border p-2">famille</th>
          </tr>
        </thead>
        <tbody>
          {sArticles?.slice(0, 500).map((sArticle) => (
            <tr key={sArticle.id}>
              <td className="border p-2">{sArticle.id}</td>
              <td className="border p-2">{sArticle.barrcode}</td>
              <td className="border p-2">{sArticle.disignation}</td>
              <td className="border p-2">{sArticle.P_vente}</td>
              <td className="border p-2">{sArticle.id_S_famille}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Articles;
