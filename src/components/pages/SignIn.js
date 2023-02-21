import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, sendPasswordReset } from '../../Firebase';
import './SignIn.css';

function SignIn() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
  
    return (
        <>
            <div className='login-screen'>
                <div className='login-box'>
                    <h2>LOGIN</h2>
                    <form>
                        <div className='user-box'>
                            <input type='email' name='' required='' placeholder=' ' onChange={(event) => {setLoginEmail(event.target.value);}}/>
                            <label>Email</label>
                        </div>
                        <div className='user-box'>
                            <input type='password' name='' required='' placeholder=' ' onChange={(event) => {setLoginPassword(event.target.value);}}/>
                            <label>Password</label>
                        </div>
                        <div className='button-form'>
                            <button className='submit' type='submit' onClick={() => logInWithEmailAndPassword(loginEmail, loginPassword)}>Submit</button>
                            
                        </div>
                        <div className='register-forgot-password-container'>
                            <div className='register'>
                                Don't have an account?
                                <Link className='sign-up' to='/sign-up'>Register</Link>
                            </div>
                            <div className='register'>
                                Forgot password?
                                <Link className='sign-up' to='/forgot-password'>Reset Password</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
  
}

export default SignIn;