import React from 'react'

export default function Acceuil() {
  return (
    <section className='flex flex-col md:flex-row justify-center items-center gap-10'>


        <div className='flex flex-col justify-center items-center gap-10 border h-96 w-96 rounded-md shadow-md transition-transform  hover:bg-blue-300  bg-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700'>
          <h1 className='text-3xl font-bold mb-10'>Aujourd'hui</h1>
          <ul className='flex flex-col gap-2'>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Marchendis vendus :   <span style={{color:'red'}}>0.00DZD</span></li>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Marchendis achetèe :   <span style={{color:'red'}}>0.00DZD</span></li>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Total versement :   <span style={{color:'red'}} className='ml-8'>0.00DZD</span></li>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Total Crèdit :   <span style={{color:'red'}} className='ml-16'>0.00DZD</span></li>
          </ul>

        </div>



        <div className='flex flex-col justify-center items-center gap-10 border h-96 w-96 rounded-md shadow-md transition-transform  hover:bg-blue-300  bg-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700'>
          <h1 className='text-3xl font-bold mb-10'>Semaine</h1>
          <ul className='flex flex-col gap-2'>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Marchendis vendus :  <span style={{color:'red'}}>0.00DZD</span>  </li>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Marchendis achetèe :  <span style={{color:'red'}}>0.00DZD</span></li>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Total versement :  <span style={{color:'red'}} className='ml-8'>0.00DZD</span></li>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Total Crèdit :    <span style={{color:'red'}} className='ml-16'>0.00DZD</span></li>
          </ul>

        </div>



        <div className='flex flex-col justify-center items-center gap-10 border h-96 w-96 rounded-md shadow-md transition-transform  hover:bg-blue-300  bg-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700'>
          <h1 className='text-3xl font-bold mb-10'>Mois</h1>

          <ul className='flex flex-col gap-2'>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Marchendis vendus :  <span style={{color:'red'}}>0.00DZD</span></li>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Marchendis achetèe :  <span style={{color:'red'}}>0.00DZD</span></li>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Total versement :  <span style={{color:'red'}} className='ml-8'>0.00DZD</span></li>
            <li className='flex flex-row justify-center items-center gap-24 font-bold'>Total Crèdit :   <span style={{color:'red'}} className='ml-16'>0.00DZD</span></li>
          </ul>

        </div>



    </section>
  )
}
