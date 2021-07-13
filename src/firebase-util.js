import firebase from "firebase/app";
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAjmHLMR9yGujwTjbvQaTEeZTOQ1gPVI5A",
    authDomain: "react-firebase-crud-cs.firebaseapp.com",
    projectId: "react-firebase-crud-cs",
    storageBucket: "react-firebase-crud-cs.appspot.com",
    messagingSenderId: "96171658549",
    appId: "1:96171658549:web:3fa3c97e488c7b82cb507c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;