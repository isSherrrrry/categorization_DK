import React from 'react';
import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore"; 



const firebaseConfig = {
  apiKey: "AIzaSyAHS7JCzpZAkLRmgilLdGDp9251l4HOO94",
  authDomain: "dkeffect-3776d.firebaseapp.com",
  projectId: "dkeffect-3776d",
  storageBucket: "dkeffect-3776d.appspot.com",
  messagingSenderId: "356413199968",
  appId: "1:356413199968:web:3211cbe960df3c8d4d9505",
  measurementId: "G-WE3CHELSN1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const docRef = addDoc(collection(db, "users"), {
  first: "Alan",
  middle: "Mathison",
  last: "Turing",
  born: 1912
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();