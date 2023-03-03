import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import BugList from './components/pages/BugList';
import SignUp from './components/pages/SignUp';
import ForgotPassword from './components/pages/ForgotPassword';
import Account from './components/pages/Account';
import 'firebase/firestore';
import './App.css';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/bug-list' element={<BugList/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/account' element={<Account/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;