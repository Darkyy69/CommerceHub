import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
const Acheter = () => {
  const [todayDate, setTodayDate] = useState("");
  const [fetchedArticles, setFetchedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [cb, setCb] = useState("");
  const [qte, setQte] = useState("1");
  const [price, setPrice] = useState(0.0);
  const familleRef = useRef();
  const articleRef = useRef();
  const qteRef = useRef();

  useEffect(() => {
    // Get today's date
    const today = new Date();

    // Format the date as YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so +1 and pad with 0
    const day = String(today.getDate()).padStart(2, "0"); // Pad with 0 if necessary

    const formattedDate = `${year}-${month}-${day}`;
    setTodayDate(formattedDate);
  }, []);

  // Fetch articles from the API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/comptoire/entite-marchandise/s-article/")
      .then((response) => response.json())
      .then((data) => setFetchedArticles(data));
  }, []);

  // Fetch fournisseurs from the API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/comptoire/entite-personnes/fournisseur/")
      .then((response) => response.json())
      .then((data) => setFournisseurs(data));
  }, []);

  return (
    // <section className="fixed inset-0 flex flex-col justify-start items-center bg-gray-100 z-50 shadow-xl ">
    <section className="flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-10/12 h-4/5 bg-gray-100 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center">
        <h1 className="underline text-2xl font-semibold">Achat Article</h1>
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
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center space-x-2">
            <label className="text-gray-700 text-sm">Type:</label>
            <select className="block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Pro-Format</option>
              <option>Facture</option>
              <option>Bon de Livraison</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-gray-700 text-sm">Date:</label>
            <input
              type="date"
              className="block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={todayDate}
              onChange={(e) => setTodayDate(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 justify-end">
            <label className="text-gray-700 text-sm">Copies:</label>
            <input
              type="number"
              className="block w-16 py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue="1"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              Imprimer
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-gray-700 text-sm">Fournisseur:</label>
              <select
                type="text"
                className="block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {fournisseurs?.map((fournisseur) => (
                  <option key={fournisseur.id} value={fournisseur.id}>
                    {fournisseur.nom}
                  </option>
                ))}
              </select>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                +
              </button>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
                🔍
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-700 text-sm">Code à barres:</label>
              <input
                type="text"
                className="block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={cb}
                onBlur={(e) => {
                  if (e.target.value.length === 13) {
                    const foundArticle = fetchedArticles.find(
                      (article) => article.barrcode === e.target.value
                    );
                    if (foundArticle) {
                      familleRef.current.value = foundArticle.id_S_famille;
                      articleRef.current.value = foundArticle.disignation;
                      // Set Prix input to P_vente
                      setPrice(foundArticle.P_vente);
                      // Focus on the Qte input
                      qteRef.current.select();
                    }
                  }
                }}
                onChange={(e) => {
                  setCb(e.target.value);
                }}
                onKeyDown={(e) => {
                  // if the key pressed is Enter key or Tab  key also their JS code is 13 and 9
                  if (e.key === "Enter" || e.key === "Tab") {
                    // call the blur event
                    e.target.blur();
                  }
                }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-700 text-sm">Famille:</label>
              <input
                ref={familleRef}
                className="cursor-default block w-1/2 py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-700 text-sm">Article:</label>
              <input
                ref={articleRef}
                type="text"
                className="cursor-default block w-1/2 py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-col justify-center bg-orange-100 p-4 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-gray-700 text-lg">Nombre Articles:</p>
              <span>{articles.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700 text-lg">Total Qté:</p>
              <span>
                {articles.reduce(
                  (total, article) => total + parseInt(article.qte),
                  0
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700 text-2xl">Total Bon:</p>
              <span className="text-red-600 text-2xl">
                {articles
                  .reduce(
                    (total, article) => total + parseFloat(article.total),
                    0
                  )
                  .toFixed(2)}{" "}
                DZD
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label className="text-gray-700 text-sm">Prix:</label>
            <input
              type="text"
              className="block w-20 text-right py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={price}
              readOnly
            />
            <label className="text-gray-700 text-sm">Qté:</label>
            <input
              type="number"
              className="block w-20 text-center py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ref={qteRef}
              value={qte}
              onChange={(e) => setQte(e.target.value)}
              onBlur={(e) => {
                // Calculate total
                const total = e.target.value * price;
                // setPrice(total);
                // Add article to the list
                setArticles([
                  ...articles,
                  {
                    article: articleRef.current.value,
                    qte: e.target.value,
                    price: price,
                    total: total,
                  },
                ]);
              }}
              onKeyDown={(e) => {
                // if the key pressed is Enter key or Tab  key also their JS code is 13 and 9
                if (e.key === "Enter" || e.key === "Tab") {
                  // call the blur event
                  e.target.blur();
                }
              }}
            />
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
            Ajouter
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            Effacer
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Enregistrer
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
            Modifier
          </button>
        </div>

        <div className="mt-4  overflow-y-auto h-32 ">
          <table className="min-w-full  bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Article</th>
                <th className="py-2 px-4 border-b text-center">Qté</th>
                <th className="py-2 px-4 border-b text-center">Prix</th>
                <th className="py-2 px-4 border-b text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through articles here */}
              {articles?.map((article, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{article.article}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {article.qte}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {article.price} {"DA"}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {article.total} {"DA"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Acheter;
