// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration (replace with your own Firebase project details)
const firebaseConfig = {
  apiKey: "AIzaSyB3eUyJxTarIUJdIerY5956VHFMViwoHDY",
  authDomain: "medisense-57089.firebaseapp.com",
  projectId: "medisense-57089",
  storageBucket: "medisense-57089.firebasestorage.app",
  messagingSenderId: "52545666514",
  appId: "1:52545666514:web:52d380b6a6afdbc302dc0b",
  measurementId: "G-88FWDHSYGE"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(firebaseApp); // Firebase Authentication
export const firestore = getFirestore(firebaseApp); // Firestore Database

export default firebaseApp;

