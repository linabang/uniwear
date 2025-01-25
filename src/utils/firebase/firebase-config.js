import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAk2jgiAyhT43w27_8aUzxNbpHXXSALK58",
  authDomain: "uniwear-5cf6f.firebaseapp.com",
  projectId: "uniwear-5cf6f",
  storageBucket: "uniwear-5cf6f.firebasestorage.app",
  messagingSenderId: "267337284578",
  appId: "1:267337284578:web:314d622a263d9b021b17bb",
  measurementId: "G-M7WN9MBLY7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
