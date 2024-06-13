import React from 'react';
import { Routes, Route } from "react-router-dom";
// import useStore from './ZustandStore.js';
import Practice from "./pages/PracticePage/PracticePage.jsx";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import  useStore from "./ZustandStore";
import CookieConsentStatus from "./enums/CookieConsentEnums.js";
import CookieNotice from "./components/CookieConsent/CookieConsent.jsx";
import PrivacyPolicy from "./pages/Privacy Policy/PrivacyPolicy.jsx";

function App() {

  const { cookieConsent, cookieConsentVisible } = useStore();

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Practice />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
      {cookieConsent === CookieConsentStatus.ACCEPTED && <Analytics />}
      {(!(cookieConsent === CookieConsentStatus.ACCEPTED) && cookieConsentVisible) && <CookieNotice />}
    </div>
  );
}

export default App;
