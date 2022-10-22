// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2DzFyp86U2Pa79Vg2v_ytHFTS-huNzn8",
    authDomain: "motor-parts-website.firebaseapp.com",
    projectId: "motor-parts-website",
    storageBucket: "motor-parts-website.appspot.com",
    messagingSenderId: "515371754389",
    appId: "1:515371754389:web:e5fdf2b0dc536912018c9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;