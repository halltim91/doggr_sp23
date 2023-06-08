import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBUJFXnbeZ4e01yv5IDSpGkViGw7TKQI48",
  authDomain: "npsee-a9647.firebaseapp.com",
  projectId: "npsee-a9647",
  storageBucket: "npsee-a9647.appspot.com",
  messagingSenderId: "449508238502",
  appId: "1:449508238502:web:dbda8ae57f1b0e227b4067",
  measurementId: "G-GS17ZR9KRG"
};

export const fbApp = initializeApp(firebaseConfig);
