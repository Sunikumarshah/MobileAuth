// src/components/PhoneAuth.jsx
import { useState } from "react";
import { auth, setupRecaptcha, signInWithPhoneNumber } from "./firebase";
import "./PhoneAuth.css";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [message, setMessage] = useState("");
  // const [ph, setPh] = useState("");


  const handleSendOtp = (e) => {
    e.preventDefault();
    setupRecaptcha();
    let appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setMessage("OTP sent successfully!");
      })
      .catch((error) => {
        setMessage("Error sending OTP: " + error.message);
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (verificationId && otp) {
      const credential = window.firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        otp
      );
      auth
        .signInWithCredential(credential)
        .then((result) => {
          setMessage("User authenticated successfully!");
        })
        .catch((error) => {
          setMessage("Error verifying OTP: " + error.message);
        });
    } else {
      setMessage("Please enter a valid OTP.");
    }
  };

  return (
    <div className="phone-auth-container">
      <h1>Mobile OTP Authentication</h1>
      <form onSubmit={handleSendOtp} className="auth-form"> 
          
        <input
        
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="btn">
          Send OTP
        </button>
      </form>

      <div id="recaptcha-container"></div>

      {verificationId && (
        <form onSubmit={handleVerifyOtp} className="auth-form">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn">
            Verify OTP
          </button>
        </form>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PhoneAuth;
