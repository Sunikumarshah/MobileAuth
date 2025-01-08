// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your Firebase configuration (replace with your Firebase config details)
const firebaseConfig = {
    apiKey: "AIzaSyBSbk9apy7FkZvPKwp-w84JxUTNCl76cKQ",
    authDomain: "mobileauth-dcf1e.firebaseapp.com",
    projectId: "mobileauth-dcf1e",
    storageBucket: "mobileauth-dcf1e.firebasestorage.app",
    messagingSenderId: "150456967410",
    appId: "1:150456967410:web:4e93989f58784aa1d1b06b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Recaptcha verifier function
const setupRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: () => {
        console.log("Recaptcha resolved");
      },
    },
    auth
  );
};

export { auth, setupRecaptcha, signInWithPhoneNumber };
