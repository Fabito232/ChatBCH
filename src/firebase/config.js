// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoQ9KAdCKDiT6UCaR47Ubm4HJhiabqEew",
  authDomain: "chatbch-870f4.firebaseapp.com",
  projectId: "chatbch-870f4",
  storageBucket: "chatbch-870f4.appspot.com",
  messagingSenderId: "624028645474",
  appId: "1:624028645474:web:bf99e921d808a2ac8af93b",
  measurementId: "G-CGCKHEVVX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);