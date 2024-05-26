// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Toaster } from "react-hot-toast";
// import { toast } from "react-hot-toast";
// import { Link } from "react-router-dom";
// const Famille = () => {
//   const [familles, setFamilles] = useState([]);
//   const [selectedFamille, setSelectedFamille] = useState(null);
//   const [formData, setFormData] = useState({ famille: "", codification: "" });

//   const apiBaseUrl =
//     "http://127.0.0.1:8000/api/comptoire/entite-marchandise/famille/";

//   // Fetch data
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(apiBaseUrl);
//       setFamilles(response.data);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission for adding or modifying data
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (selectedFamille) {
//         await axios.put(`${apiBaseUrl}${selectedFamille.id}/`, formData);
//       } else {
//         await axios.post(apiBaseUrl, formData);
//       }
//       setFormData({ famille: "", codification: "" });
//       setSelectedFamille(null);
//       fetchData();
//     } catch (error) {
//       console.error("Error saving data", error);
//     }
//   };

//   // Handle selecting a row
//   const handleRowClick = (famille) => {
//     setSelectedFamille(famille);
//     setFormData({ famille: famille.disignation, codification: famille.codif });
//   };

//   // Handle deleting a row
//   const handleDelete = async () => {
//     if (selectedFamille) {
//       try {
//         await axios.delete(`${apiBaseUrl}${selectedFamille.id}/`);
//         setSelectedFamille(null);
//         setFormData({ famille: "", codification: "" });
//         fetchData();
//       } catch (error) {
//         console.error("Error deleting data", error);
//       }
//     }
//   };

//   return (
//     // <div className="flex flex-col justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 h-4/5 overflow-y-auto bg-gray-100 rounded-lg shadow-lg p-6">
//     <div className="p-6 bg-gray-100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-y-auto">
//       <Toaster position="bottom-right" />

//       <div className="flex justify-between items-center mb-5">
//         <h1 className="underline text-2xl font-semibold">Articles</h1>
//         <Link
//           to="/Magazin"
//           className="w-8 h-8 bg-red-500 text-white rounded-md"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-8 h-8"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </Link>
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <form onSubmit={handleFormSubmit} className="space-y-4">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <label className="block text-gray-700">Famille:</label>
//               <input
//                 type="text"
//                 name="famille"
//                 value={formData.famille}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-gray-700">Codification:</label>
//               <input
//                 type="text"
//                 name="codification"
//                 value={formData.codification}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <button
//               type="submit"
//               className="bg-green-500 text-white p-2 rounded"
//             >
//               {selectedFamille ? "Modifier" : "Ajouter"}
//             </button>
//             {selectedFamille && (
//               <button
//                 type="button"
//                 onClick={handleDelete}
//                 className="bg-red-500 text-white p-2 rounded"
//               >
//                 Supprimer
//               </button>
//             )}
//           </div>
//         </form>

//         <div className="mt-6">
//           <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 bg-gray-200 border">id</th>
//                 <th className="py-2 px-4 bg-gray-200 border">famille</th>
//                 <th className="py-2 px-4 bg-gray-200 border">codif</th>
//               </tr>
//             </thead>
//             <tbody>
//               {familles.map((famille) => (
//                 <tr
//                   key={famille.id}
//                   onClick={() => handleRowClick(famille)}
//                   className={`cursor-pointer ${selectedFamille && selectedFamille.id === famille.id ? "bg-blue-100" : ""} hover:bg-gray-100`}
//                 >
//                   <td className="py-2 px-4 border">{famille.id}</td>
//                   <td className="py-2 px-4 border">{famille.disignation}</td>
//                   <td className="py-2 px-4 border">{famille.codif}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Famille;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Famille = () => {
  const [familles, setFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [formData, setFormData] = useState({ disignation: "", codif: "" });

  const apiBaseUrl =
    "http://127.0.0.1:8000/api/comptoire/entite-marchandise/famille/";

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiBaseUrl);
      setFamilles(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for adding or modifying data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedFamille) {
        await axios.put(`${apiBaseUrl}${selectedFamille.id}/`, formData);
        toast.success("Famille updated successfully");
      } else {
        await axios.post(apiBaseUrl, formData);
        toast.success("Famille added successfully");
      }
      setFormData({ disignation: "", codif: "" });
      setSelectedFamille(null);
      fetchData();
    } catch (error) {
      console.error("Error saving data", error);
      toast.error("Failed to save data");
    }
  };

  // Handle selecting a row
  const handleRowClick = (famille) => {
    setSelectedFamille(famille);
    setFormData({ disignation: famille.disignation, codif: famille.codif });
  };

  // Handle deleting a row
  const handleDelete = async () => {
    if (selectedFamille) {
      try {
        await axios.delete(`${apiBaseUrl}${selectedFamille.id}/`);
        setSelectedFamille(null);
        setFormData({ disignation: "", codif: "" });
        fetchData();
        toast.success("Famille deleted successfully");
      } catch (error) {
        console.error("Error deleting data", error);
        toast.error("Failed to delete data");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 overflow-y-auto">
      <Toaster position="bottom-right" />

      <div className="flex justify-between items-center mb-5">
        <h1 className="underline text-2xl font-semibold">Famille</h1>
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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700">Famille:</label>
              <input
                type="text"
                name="disignation"
                value={formData.disignation}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Codification:</label>
              <input
                type="text"
                name="codif"
                value={formData.codif}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded"
            >
              {selectedFamille ? "Modifier" : "Ajouter"}
            </button>
            {selectedFamille && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded"
              >
                Supprimer
              </button>
            )}
          </div>
        </form>

        <div className="mt-6">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 border">id</th>
                <th className="py-2 px-4 bg-gray-200 border">famille</th>
                <th className="py-2 px-4 bg-gray-200 border">codif</th>
              </tr>
            </thead>
            <tbody>
              {familles.map((famille) => (
                <tr
                  key={famille.id}
                  onClick={() => handleRowClick(famille)}
                  className={`cursor-pointer ${selectedFamille && selectedFamille.id === famille.id ? "bg-blue-100" : ""} hover:bg-gray-100`}
                >
                  <td className="py-2 px-4 border">{famille.id}</td>
                  <td className="py-2 px-4 border">{famille.disignation}</td>
                  <td className="py-2 px-4 border">{famille.codif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Famille;
