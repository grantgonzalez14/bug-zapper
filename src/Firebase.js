import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0obPc94tYkfr5FYI6838cjGWeeZ9mYPc",
    authDomain: "bug-zapper-885cb.firebaseapp.com",
    projectId: "bug-zapper-885cb",
    storageBucket: "bug-zapper-885cb.appspot.com",
    messagingSenderId: "291408418050",
    appId: "1:291408418050:web:3d9ea406ab0aa31c885e1b",
    measurementId: "G-340LXWQB6B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };