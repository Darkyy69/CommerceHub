import React from "react";
import {
  FaShoppingCart,
  FaMoneyBillAlt,
  FaShoppingBasket,
} from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { IoCard } from "react-icons/io5";
import { BiGroup } from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";

function MonComposant() {
  return (
    <div className="">
      <div className="flex flex-wrap justify-center items-center gap-4">
        <Link
          to="/Magazin/Articles"
          className="flex justify-center border h-56 w-56 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-blue-300 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <div className="flex flex-col justify-center items-center gap-9">
            <h1 className="text-2xl font-bold">Articles</h1>
            <FaShoppingBasket size={94} />
          </div>
        </Link>

        <Link
          to="/Magazin/Famille"
          className="flex justify-center border h-56 w-56 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-blue-300 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <div className="flex flex-col justify-center items-center gap-9">
            <h1 className="text-2xl font-bold">Famille</h1>
            <MdFamilyRestroom size={94} />
          </div>
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default MonComposant;
