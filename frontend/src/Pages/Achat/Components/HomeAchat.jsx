import React from 'react';
import { FaShoppingCart, FaMoneyBillAlt } from 'react-icons/fa';
import { IoCard } from 'react-icons/io5';
import { BiGroup } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
function HomeAchat() {
  return (
    <div className='flex flex-row justify-center items-center gap-4 ml-56'>
      <Link to='/Vente/Comptoire' className='border h-56 w-56 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-blue-300 bg-gray-200'> 
        <div className='flex flex-col justify-center items-center gap-9'>
          <h1 className='text-2xl font-bold'>Acheter</h1>
          <FaShoppingCart size={94} />
        </div>
      </Link>

      <Link to='/Vente/ListBons' className='border h-56 w-56 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-blue-300  bg-gray-200'>
        <div className='flex flex-col justify-center items-center gap-9'>
          <h1 className='text-2xl font-bold'>Fournisseurs</h1>
          <BiGroup size={94} />
        </div>
      </Link>

      <Link to='/Vente/GestionCLients' className='border h-56 w-56 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-blue-300  bg-gray-200'>
        <div className='flex flex-col justify-center items-center gap-9'>
          <h1 className='text-2xl font-bold'>Reglement FR</h1>
          <FaMoneyBillAlt size={94} />
        </div>
      </Link>

      <Link to='/Vent/PaymentClient' className='border h-56 w-56  rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-blue-300  bg-gray-200'>
        <div className='flex flex-col justify-center items-center gap-9'>
          <h1 className='text-2xl font-bold'>Bons de Commande</h1>
          <FaFileAlt size={94}/>
        </div>
      </Link> 

      
    </div>
  );
}

export default HomeAchat;
