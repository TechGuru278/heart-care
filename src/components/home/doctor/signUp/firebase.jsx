// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXCRWbSChF-mC65wBk2fymVhiNc-c9ILk",
  authDomain: "heart-care-827c6.firebaseapp.com",
  projectId: "heart-care-827c6",
  storageBucket: "heart-care-827c6.firebasestorage.app",
  messagingSenderId: "275087315129",
  appId: "1:275087315129:web:750ae7e35489a532c98b68",
  measurementId: "G-L4M66WFS9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getAuth(app)