import React, { useState } from 'react';
import { sendPasswordReset } from '../../Firebase';
import Navbar from '../Navbar';
import './ResetPassword.css';

function ResetPassword() {
    const [resetPasswordEmail, setResetPasswordEmail] = useState('');

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
                            <button className='submit' type='submit' onClick={() => sendPasswordReset(resetPasswordEmail)}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;