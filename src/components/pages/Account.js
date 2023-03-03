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

    const currentUser = auth.currentUser;
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

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) navigate('/sign-in');
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
                </div>
            </div>
        </>
    )
}

export default Account;
