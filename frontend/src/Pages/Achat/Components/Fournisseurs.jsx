import React from "react";
import { Link } from "react-router-dom";
export default function Fournisseurs() {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
  return (
    <section className="flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-10/12 h-4/5 bg-gray-100 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center">
        <h1 className="underline text-2xl font-semibold">Fournisseurs</h1>
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
            <label className="w-20">Nom:</label>
            <input
              type="text"
              name="nom"
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="w-20">Crédit:</label>
            <input
              type="number"
              name="credit"
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Ajouter
            </button>
          </div>
          <div className="flex items-center">
            <label className="w-20">Tel:</label>
            <input
              type="text"
              name="tel"
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="w-20">Avances:</label>
            <input
              type="number"
              name="avances"
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <button
              onClick={handleModify}
              className="bg-yellow-500 text-white p-2 rounded mt-2"
            >
              Modifier
            </button>
          </div>
          <div className="flex items-center">
            <label className="w-20">Adress:</label>
            <input
              type="text"
              name="adress"
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="w-20">Crédit initial:</label>
            <input
              type="number"
              name="creditInit"
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded mt-2"
            >
              Supprimer
            </button>
          </div>
        </div>
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">id</th>
              <th className="border p-2">nom</th>
              <th className="border p-2">crédit</th>
              <th className="border p-2">Créance_init</th>
              <th className="border p-2">avances</th>
              <th className="border p-2">tel</th>
              <th className="border p-2">etablissement</th>
            </tr>
          </thead>
          <tbody>
            {/* Populate this with your data */}
            <tr>
              <td className="border p-2">1</td>
              <td className="border p-2">Example</td>
              <td className="border p-2">5.00 DZD</td>
              <td className="border p-2">0.00 DZD</td>
              <td className="border p-2">0.00 DZD</td>
              <td className="border p-2">12345678</td>
              <td className="border p-2">Example Etablissement</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
