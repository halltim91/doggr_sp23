import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.FB_API_KEY,
  authDomain: import.meta.env.FB_AUTH_DOMAIN,
  projectId: import.meta.env.FB_PROJ_ID,
  storageBucket: import.meta.env.FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.FB_APP_ID,
  measurementId: import.meta.env.FB_MEASUREMENT_ID
};

export const fbApp = initializeApp(firebaseConfig);
