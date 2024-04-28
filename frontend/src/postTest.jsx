import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const PostTest = () => {
  const [formData, setFormData] = useState({
    codif: "",
    disignation: "",
    P_achat: null,
    P_vente: null,
    P_min: null,
    barrcode: "",
    fournisseur_best: null,
    id_S_famille: null,
    id_Article: null,
  });

  const [articles, setArticles] = useState([]);
  const [familles, setFamilles] = useState([]);
  const [s_familles, setS_Familles] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const articles_response = await axios.get(
          "http://127.0.0.1:8000/api/comptoire/entite-marchandise/article/"
        );
        const familles_response = await axios.get(
          "http://127.0.0.1:8000/api/comptoire/entite-marchandise/famille/"
        );
        const s_familles_response = await axios.get(
          "http://127.0.0.1:8000/api/comptoire/entite-marchandise/s-famille/"
        );
        const fournisseurs_response = await axios.get(
          "http://127.0.0.1:8000/api/comptoire/entite-personnes/fournisseur/"
        );
        console.log(articles_response.data); // Handle the response data as needed
        console.log(familles_response.data); // Handle the response data as needed
        console.log(s_familles_response.data); // Handle the response data as needed
        console.log(fournisseurs_response.data); // Handle the response data as needed
        setArticles(articles_response.data);
        setFamilles(familles_response.data);
        setS_Familles(s_familles_response.data);
        setFournisseurs(fournisseurs_response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToastID = toast.loading("Waiting...");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/comptoire/entite-marchandise/s-article/",
        formData
      );

      console.log(response.data); // Handle the response data as needed
      // Dissmiss the loading toast
      toast.dismiss(loadingToastID);
      toast.success("Successfully created!");
    } catch (error) {
      console.error(error);
      // Dissmiss the loading toast
      toast.dismiss(loadingToastID);
      toast.error("This is an error!");
    }
    // Dissmiss the toast after 3 seconds
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Toaster position="bottom-right" />

      <form
        className="flex flex-col ml-44 justify-center bg-gray-200"
        onSubmit={handleSubmit}
      >
        <label>
          Codif:
          <input
            type="text"
            name="codif"
            value={formData.codif}
            onChange={handleChange}
            maxLength={10}
          />
        </label>
        <label>
          Designation:
          <input
            type="text"
            name="disignation"
            value={formData.disignation}
            onChange={handleChange}
          />
        </label>

        <label>
          P_achat:
          <input
            type="number"
            name="P_achat"
            value={formData.P_achat}
            onChange={handleChange}
            min={1}
          />
        </label>
        <label>
          P_vente:
          <input
            type="number"
            name="P_vente"
            value={formData.P_vente}
            onChange={handleChange}
            min={1}
          />
        </label>
        <label>
          P_min:
          <input
            type="number"
            name="P_min"
            value={formData.P_min}
            onChange={handleChange}
            min={1}
          />
        </label>
        <label>
          Barrcode:
          <input
            type="text"
            name="barrcode"
            value={formData.barrcode}
            onChange={handleChange}
            maxLength={13}
          />
        </label>
        <label>
          Fournisseur_best:
          {/* <input
            type="number"
            name="fournisseur_best"
            value={formData.fournisseur_best}
            onChange={handleChange}
            min={1}
          /> */}
          <select
            className=" invalid:text-[#999999]"
            onChange={handleChange}
            required
          >
            <option value="" selected disabled hidden>
              Select a fournisseur
            </option>
            {fournisseurs.map((fournisseur) => (
              <option
                className="text-black"
                key={fournisseur.id}
                value={fournisseur.id}
              >
                {fournisseur.nom}
              </option>
            ))}
          </select>
        </label>

        <label>
          id_S_famille:
          {/* <input
            type="number"
            name="id_S_famille"
            value={formData.id_S_famille}
            onChange={handleChange}
            min={1}
          /> */}
          <select
            className=" invalid:text-[#999999]"
            onChange={handleChange}
            required
          >
            <option value="" selected disabled hidden>
              Select a famille
            </option>
            {s_familles.map((s_famille) => (
              <option
                className="text-black"
                key={s_famille.id}
                value={s_famille.id}
              >
                {s_famille.disignation}
              </option>
            ))}
          </select>
        </label>
        <label>
          id_Article:
          {/* <input
            type="number"
            name="id_Article"
            value={formData.id_Article}
            onChange={handleChange}
            min={1}
          /> */}
          <select
            className="invalid:text-[#999999]"
            onChange={handleChange}
            required
          >
            <option value="" selected disabled hidden>
              Select an article
            </option>
            {articles.map((article) => (
              <option
                className="text-black"
                key={article.id}
                value={article.id}
              >
                {article.disignation}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default PostTest;
