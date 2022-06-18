// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    onSnapshot, 
    deleteDoc, 
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js"
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

// Guardar una tarea en firestore
export const saveTask= ( title, description )=> addDoc(collection( db, 'tasksV9' ), { title, description });

// Obtener todas las tareas
export const getTasks= ()=> getDocs( collection( db, 'tasksV9' ) );

//Obtener los datos en tiempo real
export const onGetTasks= ( callback )=> onSnapshot( collection( db, 'tasksV9' ), callback );

// Eliminar una tarea por su id
export const deleteTask= ( id )=> deleteDoc(doc( db, 'tasksV9', id ));

// Obtener una tarea por su id
export const getTask= ( id )=> getDoc(doc( db, 'tasksV9', id));

// Editar una tarea por su id
export const updateTask= ( id, newFields )=> updateDoc( doc(db, 'tasksV9', id), newFields );