import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPimTgECb7HeKCQhjCY8Qjdk-5FYRY0Cw",
  authDomain: "e-commerce-auth-c5528.firebaseapp.com",
  projectId: "e-commerce-auth-c5528",
  storageBucket: "e-commerce-auth-c5528.appspot.com",
  messagingSenderId: "392796033043",
  appId: "1:392796033043:web:5a1edee495897987d6afe6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
