import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ComptoireNav from "../utils/ComptoireNav";
import ComptoireBody from "../utils/ComptoireBody";
import ComptoireTable from "../utils/ComptoireTable";
import { DataProvider } from "../utils/DataProvider"; // Correction ici
import { Toaster } from "react-hot-toast";

function MonComposant() {
  // Titre du comptoire ex: Superette EK BARAKA
  const Title = () => (
    <h1 className="m-auto text-4xl font-semibold">
      Superette <span className="uppercase">el baraka</span>
    </h1>
  );

  useEffect(() => {
    // Set window to fullscreen when component mounts
    // window.document.documentElement.requestFullscreen();
    // return () => {
    //   // Remove fullscreen when component unmounts
    //   if (window.document.exitFullscreen) {
    //     window.document.exitFullscreen();
    //   }
    // };
  }, []);

  return (
    <section className="fixed inset-0 flex flex-col justify-start items-center bg-gray-100 z-50 shadow-xl">
      <Toaster position="bottom-right" />
      <div className="w-full flex justify-between p-1 bg-red-500 text-white items-center">
        <Title />
        <Link to="/Vente" className="bg-white text-red-500">
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
      <DataProvider>
        {" "}
        {/* Utilisation du composant DataProvider */}
        <ComptoireNav />
        <ComptoireBody />
        <ComptoireTable />
      </DataProvider>
    </section>
  );
}

export default MonComposant;
