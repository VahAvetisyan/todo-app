import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-OhCIUrmcg5tS5uXWf5wjkUOpBsmD8P4",
  authDomain: "todo-8ea01.firebaseapp.com",
  projectId: "todo-8ea01",
  storageBucket: "todo-8ea01.appspot.com",
  messagingSenderId: "955286641234",
  appId: "1:955286641234:web:d744f1ec289bf0b0975d8b",
  measurementId: "G-6938VQZQBP"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();