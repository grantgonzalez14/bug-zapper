import React, { useState } from 'react';
import { sendPasswordReset } from '../../Firebase';
import './ForgotPassword.css';

function ForgotPassword() {
    const [resetPasswordEmail, setResetPasswordEmail] = useState('');

    return (
        <>
            <div className='fp-screen'>
                <div className='fp-box'>
                    <h2>FORGOT PASSWORD</h2>
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

export default ForgotPassword