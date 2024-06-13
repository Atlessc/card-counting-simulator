import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import useStore from './ZustandStore.js';
import Practice from "./pages/PracticePage/PracticePage.jsx";
import NavBar from "./components/NavBar/NavBar";
// import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import CookieConsentStatus from "./enums/CookieConsentEnums.js";
import CookieNotice from "./components/CookieConsent/CookieConsent.jsx";
import PrivacyPolicy from "./pages/Privacy Policy/PrivacyPolicy.jsx";

function App() {

  const { cookieConsent, cookieConsentVisible } = useStore();

  const dontShowCookieNotice = () => {
    setTimeout(() => {
      useStore.setState({ cookieConsentVisible: false });
    }, 5000);
  }

  useEffect(() => {
    if (cookieConsent === CookieConsentStatus.ACCEPTED) {
      dontShowCookieNotice();
    }
  }, [cookieConsent]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Practice />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      {/* <Footer /> */}
      {cookieConsent === CookieConsentStatus.ACCEPTED && <Analytics />}
      {cookieConsentVisible && <CookieNotice />}
    </div>
  );
}

export default App;
