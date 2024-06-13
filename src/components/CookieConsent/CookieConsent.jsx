import React, { useEffect } from "react";
import useStore from "../../ZustandStore";
import CookieConsentStatus from "../../enums/CookieConsentEnums.js";
import Cookies from "js-cookie";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const NoticeWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  z-index: 1000;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NoticeText = styled.p`
  color: #242424;
  font-size: 1rem;
  margin: 0;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #007aff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #005bb5 !important;
  }
`;

const DeclineButton = styled(Button)`
  background-color: #e0e0e0;
  color: #333;
  &:hover {
    background-color: #c0c0c0 !important;
  }
`;

const UpdateConsentWrapper = styled.div`
  position: relative;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const UpdateButton = styled(Button)`
  background-color: #ff9500;
  &:hover {
    background-color: #cc7a00 !important;
  }
`;

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  cursor: pointer;
`;

const CookieNotice = () => {
  const {
    cookieConsent,
    setCookieConsent,
    cookieConsentVisible,
    setCookieConsentVisible,
  } = useStore();

  useEffect(() => {
    if (cookieConsent === CookieConsentStatus.ACCEPTED) {
      console.log("User accepted cookies");
    } else if (cookieConsent === CookieConsentStatus.DECLINED) {
      console.log("User declined cookies");
    }
  }, [cookieConsent]);

  const handleCloseCookieNotice = () => {
    setCookieConsentVisible(false);
  };

  const handleAccept = () => {
    setCookieConsent(CookieConsentStatus.ACCEPTED);
    console.log("Cookies accepted");
  };

  const handleDecline = () => {
    setCookieConsent(CookieConsentStatus.DECLINED);
    console.log("Cookies declined");
  };

  const handleUpdateConsent = () => {
    setCookieConsent(CookieConsentStatus.UNANSWERED);
    Cookies.remove("userConsent");
    window.location.reload();
  };

  return (
    <div
      style={{
        width: "100vw",
        position: "fixed",
        bottom: 0,
        padding: "1rem",
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {cookieConsent === CookieConsentStatus.UNANSWERED && (
        <NoticeWrapper>
          <CloseIcon
            icon={faTimes}
            size="lg"
            color="black"
            onClick={() => (handleDecline(), handleCloseCookieNotice())}
          />
          <NoticeText>
            We use cookies to enhance your experience and analyze traffic. By
            clicking "Accept", you agree to our use of cookies. See our{" "}
            <a href="/privacy-policy">Privacy Policy</a> for more details.
          </NoticeText>

          <ButtonWrapper>
            <Button onClick={handleAccept}>Accept</Button>
            <DeclineButton onClick={handleDecline}>Decline</DeclineButton>
          </ButtonWrapper>
        </NoticeWrapper>
      )}
      {cookieConsent !== CookieConsentStatus.UNANSWERED && (
        <UpdateConsentWrapper>
          <CloseIcon
            icon={faTimes}
            size="lg"
            color="black"
            onClick={handleCloseCookieNotice}
          />
          <NoticeText>Your current consent status: {cookieConsent}</NoticeText>
          <UpdateButton onClick={handleUpdateConsent}>
            Change Consent Preferences
          </UpdateButton>
        </UpdateConsentWrapper>
      )}
    </div>
  );
};

export default CookieNotice;
