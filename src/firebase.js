// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your Firebase configuration (replace with your Firebase config details)
const firebaseConfig = {
  apiKey: "AIzaSyDFN0q9hY5DxvDGks9XvQvOLeP8vZWe2yc",
  authDomain: "mobileotp-e1764.firebaseapp.com",
  projectId: "mobileotp-e1764",
  storageBucket: "mobileotp-e1764.firebasestorage.app",
  messagingSenderId: "320106817832",
  appId: "1:320106817832:web:215284e8ddd3402425881d"
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
