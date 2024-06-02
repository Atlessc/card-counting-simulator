import React from 'react';
import { Routes, Route } from "react-router-dom";
// import useStore from './ZustandStore.js';
import Practice from "./pages/PracticePage/PracticePage.jsx";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Practice />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;