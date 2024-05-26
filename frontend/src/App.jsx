import React, { useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom"; // Importez également Navigate
import { Navbar } from "./Components/Navbar";
import Acceuil from "./Pages/Acceuil/Acceuil";
import HomeVente from "./Pages/Vente/Components/HomeVent";
import Comptoire from "./Pages/Vente/Components/Comptoire";
import ListBons from "./Pages/Vente/Components/ListBons";
import GestionClients from "./Pages/Vente/Components/GestionCLients";
import PayementClients from "./Pages/Vente/Components/PaymentClients";
import Vendre from "./Pages/Vente/Components/Vendre";
import HomeAchat from "./Pages/Achat/Components/HomeAchat";
import Acheter from "./Pages/Achat/Components/Acheter";
import Fournisseurs from "./Pages/Achat/Components/Fournisseurs";
import ReglementFR from "./Pages/Achat/Components/ReglementFR";
import BonsDeCommande from "./Pages/Achat/Components/BonsDeCommande";
import Sidebare from "./Components/Sidebare";
import HomeEtatSuivits from "./Pages/EtatSuivits/Components/HomeEtatSuivits";
import HomeDocuments from "./Pages/Documents/Components/HomeDocuments";
import HomeMagazin from "./Pages/Magazin/Components/HomeMagazin";
import Articles from "./Pages/Magazin/Components/Articles";
import Famille from "./Pages/Magazin/Components/Famille";
import Login from "./Pages/Login/Login";
import RequireAuth from "./Components/RequireAuth";
import Layout from "./Components/Layout";
import useAuth from "./hooks/useAuth";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
  const { setAuth } = useAuth();
  const csrftoken = Cookies.get("csrftoken");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(from);

  const getSession = async () => {
    try {
      // Make a GET request to the "/auth/session/" URL with "same-origin" credentials
      const response = await axios.get("/auth/session/", {
        headers: {
          "X-CSRFToken": csrftoken,
        },

        withCredentials: true,
      });

      const data = response.data; // Extract data from the response

      console.log(data); // Log the response data to the console

      // If the response indicates the user is authenticated
      if (data.isAuthenticated) {
        // Update the component's state
        const rights = data.rights.split(" ");
        console.log("before setAuth");
        setAuth({ username: data.username, rights: rights });
        console.log("after setAuth");
        navigate(from, { replace: true });
      } else {
        // If the response indicates the user is not authenticated
        // Update the component's state
        // setIsAuthenticated({ isAuthenticated: false });
        console.log("ur not authenticated");
      }
    } catch (error) {
      // Handle any errors that occurred during the Axios request
      console.error(error);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <div className="">
      <Navbar />
      <Sidebare />
      <div className="px-4 md:px-8 lg:px-12 flex items-center justify-center mt-20">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Redirige vers Acceuil lors de l'accès à la racine */}
            <Route path="/" element={<Navigate to="/Acceuil" />} />
            {/* Public Route */}
            <Route path="/Login" element={<Login />} />
            <Route
              path="/Unauthorized"
              element={
                <h1 className="text-9xl dark:text-white">
                  Page Non Autorisée!
                </h1>
              }
            />

            {/* Protected Routes */}
            <Route
              element={
                <RequireAuth
                  allowedRights={[
                    "vente",
                    "achat",
                    "stock",
                    "production",
                    "transformation",
                  ]}
                />
              }
            >
              <Route path="/Acceuil" element={<Acceuil />} />
            </Route>

            {/* Routes de Vente */}
            <Route element={<RequireAuth allowedRights={["vente"]} />}>
              <Route path="Vente" element={<HomeVente />}>
                <Route path="Comptoire" element={<Comptoire />} />
                <Route path="ListBons" element={<ListBons />} />
                <Route path="GestionClients" element={<GestionClients />} />
                <Route path="PayementClients" element={<PayementClients />} />
                <Route path="Vendre" element={<Vendre />} />
              </Route>
            </Route>
            {/* Routes d'achat */}
            <Route element={<RequireAuth allowedRights={["achat"]} />}>
              <Route path="/Achat" element={<HomeAchat />} />
              <Route path="/Achat/Acheter" element={<Acheter />} />
              <Route path="/Achat/Fournisseurs" element={<Fournisseurs />} />
              <Route
                path="/Achat/BonsDeCommande"
                element={<BonsDeCommande />}
              />
              <Route path="/Achat/ReglementFR" element={<ReglementFR />} />
              {/* </Route> */}
            </Route>
            {/* Routes d'état et suivits */}
            <Route path="/Etat-Suivit" element={<HomeEtatSuivits />}></Route>
            {/* Routes de Documents */}
            <Route path="/Documents" element={<HomeDocuments />}></Route>
            {/* Routes de Magazin */}
            <Route element={<RequireAuth allowedRights={["stock", "vente"]} />}>
              <Route path="/Magazin" element={<HomeMagazin />}>
                <Route path="Articles" element={<Articles />} />
                <Route path="Famille" element={<Famille />} />
                {/* <Route path="Stock" element={<HomeMagazin />} /> */}
              </Route>
            </Route>

            {/* Route pour les pages non trouvées */}
            <Route
              path="*"
              element={
                <h1 className="text-9xl dark:text-white">Page non trouvée!</h1>
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
