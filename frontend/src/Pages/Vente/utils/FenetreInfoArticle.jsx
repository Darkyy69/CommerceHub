import React, { useEffect } from "react";
import { useData } from "./DataProvider";

const FenetreInfoArticle = ({ indexedArticles }) => {
  const currency = "DA";
  const { InfoArticle, setInfoArticle } = useData();
  const [infoArt, setInfoArt] = React.useState({
    famille: "",
    art: "",
    cb: "0",
    prix: "___.__",
  });
  const [familles, setFamilles] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  console.log(familles);
  // la fenetre de article info apparait dans le cas de clique sur F2
  console.log("in FenetreInfoArticle");
  // Fetch s-articles & familles from the API
  const fetchArticles = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/comptoire/entite-marchandise/s-articles/"
      );
      const data = await response.json();
      // console.log(data);
      setArticles(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchFamilles = async () => {
    try {
      const response = await fetch(
        "/api/comptoire/entite-marchandise/s-famille/"
      );
      const data = await response.json();
      // console.log(data);
      setFamilles(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchArticles();
    fetchFamilles();
  }, []);
  if (!InfoArticle) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-2/5 h-72 bg-gray-100 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="absolute top-2 left-2 text-xl font-bold">
          Information Article
        </h1>
        <button
          className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={() => setInfoArticle(false)}
        >
          X
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-10">
        <div className="flex flex-row justify-between items-center gap-1">
          <label htmlFor="">Famille:</label>
          <select
            name="Famille"
            id=""
            className="border border-gray-300 h-8 w-56 "
            value={infoArt.famille}
            onChange={(e) =>
              setInfoArt({ ...infoArt, famille: e.target.value })
            }
          >
            <option value={" "}>{infoArt.famille}</option>
          </select>
        </div>

        <div className="flex flex-row justify-between items-center gap-1">
          <label htmlFor="">Article:</label>
          {indexedArticles ? (
            <select
              name="Article"
              id=""
              className="border border-gray-300 h-8 w-56 ml-1 "
              value={infoArt.art}
              onChange={(e) => setInfoArt({ ...infoArt, art: e.target.value })}
            >
              <option value="">
                {infoArt.art ? infoArt.art : "Selectionner un article"}
              </option>
              {/* {Object.values(indexedArticles).map((article) => (
                <option className="" key={article.id} value={article.barrcode}>
                  {article.disignation}
                </option>
              ))} */}
            </select>
          ) : (
            <p>Loading articles...</p>
          )}
        </div>

        <div className="flex flex-row justify-between items-center gap-1">
          <label htmlFor="">CodeBarre:</label>
          <input
            name="CodeBarre"
            id=""
            className="border border-gray-300 h-8 text-center"
            autoFocus={true}
            onFocus={(e) => e.target.select()}
            value={infoArt.cb}
            onChange={(e) => setInfoArt({ ...infoArt, cb: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            onBlur={(e) => {
              const searchedArticle = indexedArticles[e.target.value];
              if (searchedArticle) {
                setInfoArt((prev) => ({
                  ...prev,
                  art: searchedArticle.disignation,
                  prix: searchedArticle.P_vente,
                  // loop through familles to find the famille of the article and set famille to its disignation
                  famille: familles.find(
                    (famille) => famille.id === searchedArticle.id_S_famille
                  ).disignation,
                }));
              } else {
                alert("Champ de CodeBarre Vide!");
              }
            }}
          ></input>
        </div>
        <div className="flex flex-row justify-between items-center gap-1">
          <label htmlFor="">Prix:</label>
          <input
            name="Prix"
            id=""
            className="border border-gray-300 h-8 text-right"
            value={infoArt.prix}
            onChange={() => {}}
          ></input>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5">
        <h1 className="text-2xl font-bold text-green-500">
          {infoArt.prix}
          {currency}
        </h1>
      </div>
    </div>
  );
};
export const MemoizedInfoArticle = React.memo(FenetreInfoArticle);
