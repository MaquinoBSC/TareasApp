// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNHDk0mb_83QQmHyi5PcinWBWLx-KdXE0",
    authDomain: "cloud-cafe-4974c.firebaseapp.com",
    projectId: "cloud-cafe-4974c",
    storageBucket: "cloud-cafe-4974c.appspot.com",
    messagingSenderId: "336360726081",
    appId: "1:336360726081:web:e564cbf51bf46f04d8b0c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db= getFirestore();

export const saveTask= ( title, description )=> addDoc(collection( db, 'tasksV9' ), { title, description });