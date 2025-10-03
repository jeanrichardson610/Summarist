// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWlHU6Uk-6miraZyHk6myO5zu7lKGoeS4",
  authDomain: "summarist-8d728.firebaseapp.com",
  projectId: "summarist-8d728",
  storageBucket: "summarist-8d728.firebasestorage.app",
  messagingSenderId: "111954947864",
  appId: "1:111954947864:web:2262d3680bd915e42d386d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }