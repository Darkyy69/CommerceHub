import React, { useState } from 'react';
import { FaCheck, FaPlus, FaMinus, FaPaperclip, FaPen,FaSearch } from 'react-icons/fa';


export default function ComptoireTable ()  {
    const [searchTermArticle, setSearchTermArticle] = useState('');
    const [searchTermPrice, setSearchTermPrice] = useState('');
    const [searchTermQuantity, setSearchTermQuantity] = useState('');
    const [searchTermTotal, setSearchTermTotal] = useState('');
  
    // Exemple de données
    const data = [
      { article: 'Ordinateur portable', price: 1200, quantity: 2, total: 2400 },
      { article: 'Souris sans fil', price: 30, quantity: 5, total: 150 },
      { article: 'Clavier mécanique', price: 80, quantity: 3, total: 240 },
      { article: 'Écran LCD 24"', price: 200, quantity: 1, total: 200 },
      // Ajoutez plus de données au besoin
    ];
  
    // Filtrage des données basé sur les termes de recherche
    const filteredData = data.filter(item =>
      item.article.toLowerCase().includes(searchTermArticle.toLowerCase()) &&
      item.price.toString().includes(searchTermPrice.toLowerCase()) &&
      item.quantity.toString().includes(searchTermQuantity.toLowerCase()) &&
      item.total.toString().includes(searchTermTotal.toLowerCase())
    );
  
    return (
      <div className='flex flex-row items-start justify-start' style={{height:'59%'}}>
        <table className=" divide-y divide-gray-200 h-full ml-3" style={{width:'75%'}}>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Article"
                    value={searchTermArticle}
                    onChange={(e) => setSearchTermArticle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch />
                  </div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Prix"
                    value={searchTermPrice}
                    onChange={(e) => setSearchTermPrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch />
                  </div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Qte"
                    value={searchTermQuantity}
                    onChange={(e) => setSearchTermQuantity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch />
                  </div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Total"
                    value={searchTermTotal}
                    onChange={(e) => setSearchTermTotal(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.article}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex flex-col bg-gray-400 h-full justify-center items-center mr-3' style={{width:'25%'}}>
          <div className=' flex flex-col justify-center items-center '>
            <h1 className='font-bold text-3xl'>Total Qte :</h1> <span className='text-3xl' style={{color:'red'}}>0</span>
            <h1 className='font-bold text-3xl'>Nombre Article :</h1> <span className='text-3xl' style={{color:'red'}}>0</span>
          </div>
          <div className='flex flex-col justify-center items-center gap-4 mt-2 '>
            <div className='flex flex-row justify-center items-center gap-2'>
              <button className='hover:bg-blue-400 bg-slate-300 p-1 h-12 w-32 flex flex-row justify-center items-center gap-1'>Enregister <FaCheck style={{color:'green'}}/></button>
              <button className='hover:bg-blue-400 bg-slate-300 p-1 h-12 w-24 flex flex-row justify-center items-center gap-1'>Inserer  <FaPaperclip style={{color:'orange'}}/></button>
              <button className='hover:bg-blue-400 bg-slate-300 p-1 h-12 w-24 flex flex-row justify-center items-center gap-1'>Modifier<FaPen style={{color:'blue'}}/></button>
            </div>
            <div className='flex flex-row justify-center items-center gap-2'>
              <button className='hover:bg-blue-400 bg-slate-300 p-1 h-12 w-24 flex flex-row justify-center items-center gap-1'>Effacer <FaMinus style={{color:'red'}}/></button>
              <button className='hover:bg-blue-400 bg-slate-300 p-1 h-12 w-24 flex flex-row justify-center items-center gap-1'>Ajouter <FaPlus style={{color:'green'}}/></button>
            </div>
          </div>
        </div>
      </div>
    );
  };


