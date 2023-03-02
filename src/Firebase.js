import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";

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
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } 
    catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

        await updateProfile(user, {
            displayName: name
        });
    } 
    catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export { auth, db, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout };