import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCkTynF0gAhPQsqt9OxH13UOkYw5243Wn8",
  authDomain: "slack-11k.firebaseapp.com",
  databaseURL: "https://slack-11k.firebaseio.com",
  projectId: "slack-11k",
  storageBucket: "slack-11k.appspot.com",
  messagingSenderId: "350941863674",
  appId: "1:350941863674:web:dd2e4d626a598efb18f343",
  measurementId: "G-KSF07P9PX4",
});

export const db = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
