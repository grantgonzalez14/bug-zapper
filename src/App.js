import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignOut from './components/pages/SignOut';
import SignUp from './components/pages/SignUp';
import 'firebase/firestore';
import './App.css';

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyD0obPc94tYkfr5FYI6838cjGWeeZ9mYPc",
//     authDomain: "bug-zapper-885cb.firebaseapp.com",
//     projectId: "bug-zapper-885cb",
//     storageBucket: "bug-zapper-885cb.appspot.com",
//     messagingSenderId: "291408418050",
//     appId: "1:291408418050:web:3d9ea406ab0aa31c885e1b",
//     measurementId: "G-340LXWQB6B"
// };

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-out' element={<SignOut/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;