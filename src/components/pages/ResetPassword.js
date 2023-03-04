import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordReset } from '../../Firebase';
import Navbar from '../Navbar';
import './ResetPassword.css';

function ResetPassword() {
    const [resetPasswordEmail, setResetPasswordEmail] = useState('');
    const navigate = useNavigate();

    const resetPassword = () => {
        sendPasswordReset(resetPasswordEmail);
        navigate('/');
    }

    return (
        <>
            <Navbar />
            <div className='fp-screen'>
                <div className='fp-box'>
                    <h2>RESET PASSWORD</h2>
                    <form>
                        <div className='fp-email-box'>
                            <input type='email' name='' required='' placeholder=' ' onChange={(event) => {setResetPasswordEmail(event.target.value);}}/>
                            <label>Email</label>
                        </div>
                        <div className='button-form'>
                            <button className='submit' type='submit' onClick={resetPassword}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;