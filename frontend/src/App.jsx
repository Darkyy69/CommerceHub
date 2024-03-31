import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navbar } from './Components/Navbar';
import { Home } from './Components/Home';
import { Footer } from './Components/Footer';

function App() {

  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

      </Routes>

      <Footer />
    </>
  )
}

export default App
