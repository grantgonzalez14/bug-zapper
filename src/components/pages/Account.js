import React from 'react';
import Navbar from '../Navbar';
import { auth } from '../../Firebase';
import './Account.css';

function Account() {
    const user = auth.currentUser;

    return (
        <>
            <Navbar />
            <div className='settings-container'>
                <div className='email-container'>
                    <h1>Email:</h1>
                </div>
            </div>
        </>
    )
}

export default Account;