// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fullstackassignmentakiratech.firebaseapp.com",
  projectId: "fullstackassignmentakiratech",
  storageBucket: "fullstackassignmentakiratech.appspot.com",
  messagingSenderId: "545491421112",
  appId: "1:545491421112:web:087be99eea44ee3000b14d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
