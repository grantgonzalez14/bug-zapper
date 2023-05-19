import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, editInformation } from '../../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../Navbar';
import './Account.css';
import '../Button.css';



function Account() {
    const [editName, setEditName] = useState(false);
    const [newName, setNewName] = useState('');
    const [editEmail, setEditEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    // const [theme, setTheme] = useState('system');

    const navigate = useNavigate();

    const updateInfo = () => {
        if (editName && newName === '') {
            alert('Name field cannot be empty!');
            return;
        }
        else if (editEmail && newEmail === '') {
            alert('Email field cannot be empty!');
            return;
        }
        else if (editEmail && !newEmail.includes('@') && !newEmail.includes('.')) {
            alert('New email must be a vaild email address!');
            return;
        }
        
        if (editName) {
            editInformation('name', newName)
                .then(() => {
                    setEditName(false);
                    setNewName('');
                });
        }
        else if (editEmail) {
            editInformation('email', newEmail)
                .then(() => {
                    setEditEmail(false);
                    setNewEmail('');
                });
        }
    }

    // const changeTheme = (newTheme) => {
    //     setTheme(newTheme);

    //     // Change theme in firebase here
    //     updateUserTheme(newTheme);
    // }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) navigate('/sign-in');
            else {
                setCurrentUser(auth.currentUser);
                // setTheme(auth.currentUser.theme);
            }
        });
    }, [navigate]);

    return (
        <>
            <Navbar />
            <div className='settings-container'>
                <h1>ACCOUNT SETTINGS</h1>
                <div className='info-container'>
                    <div className='name-container'>
                        <div className='name-info'>
                            <h1>Name:</h1>
                            <p>{currentUser.displayName}</p>
                            {!editName && <button className='btn-edit' onClick={() => setEditName(true)}>Edit</button>}
                            {editName && <button className='btn-edit' onClick={updateInfo}>Submit</button>}
                        </div>
                        {editName &&
                        <div className='edit-name-box'>
                            <input type='text' name='' required='' placeholder=' ' onChange={(event) => {setNewName(event.target.value);}}/>
                            <label>Enter New Name</label>
                        </div>}
                    </div>
                    <div className='email-container'>
                        <div className='email-info'>
                            <h1>Email:</h1>
                            <p>{currentUser.email}</p>
                            {!editEmail && <button className='btn-edit' onClick={() => setEditEmail(true)}>Edit</button>}
                            {editEmail && <button className='btn-edit' onClick={updateInfo}>Submit</button>}
                        </div>
                        {editEmail &&
                        <div className='edit-email-box'>
                            <input type='email' name='' required='' placeholder=' ' onChange={(event) => {setNewEmail(event.target.value);}}/>
                            <label>Enter New Email</label>
                        </div>}
                    </div>
                    <div className='password-container'>
                        <div className='password-info'>
                            <h1>Password:</h1>
                            <p>********</p>
                            <Link className='btn-edit' to='/reset-password'>Reset Password</Link>
                        </div>
                    </div>
                    {/* <div className='theme-container'>
                        <div className='theme-info'>
                            <h1>Theme:</h1>
                            <form type='radio'>
                                <label><input type='radio' name='' onClick={() => changeTheme('dark')} checked={theme === 'dark'}/> Dark</label>
                                <label><input type='radio' name='' onChange={() => changeTheme('light')} checked={theme === 'light'}/> Light</label>
                                <label><input type='radio' name='' onChange={() => changeTheme('system')} checked={theme === 'system'}/> Use System Theme</label>
                            </form>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

// Aim to use firebase for, but use local storage for plane

// const textForStorage = 'Hello World.'

// setter
// localStorage.setItem('my-key', textForStorage);

// getter
// const textFromStorage = localStorage.getItem('my-key');

// // remove
// localStorage.removeItem('my-key');

// // remove all
// localStorage.clear();

// const person = { firstName: 'Robin', lastName: 'Wieruch' };

// localStorage.setItem('user', JSON.stringify(person));

// const stringifiedPerson = localStorage.getItem('user');
// const personAsObjectAgain = JSON.parse(stringifiedPerson);

// import * as React from 'react';


// const useLocalStorage = (storageKey, fallbackState) => {
//     const [value, setValue] = React.useState(
//       JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
//     );
  
//     React.useEffect(() => {
//       localStorage.setItem(storageKey, JSON.stringify(value));
//     }, [value, storageKey]);
  
//     return [value, setValue];
//   };
  
//   const App = () => {
//     const [isOpen, setOpen] = useLocalStorage('is-open', false);
  
//     const handleToggle = () => {
//       setOpen(!isOpen);
//     };
  
//     return (
//       <div>
//         <button onClick={handleToggle}>Toggle</button>
//         {isOpen && <div>Content</div>}
//       </div>
//     );
//   };
  
//   export default App;


export default Account;
