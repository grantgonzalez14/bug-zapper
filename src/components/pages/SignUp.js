import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './SignUp.css';

function SignUp() {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const navigate = useNavigate();

    const register = () => {
        if (registerPassword === confirmPassword) {
            registerWithEmailAndPassword(registerName, registerEmail, registerPassword);
            navigate('/');
        }
        else { 
            alert('Passwords do not match!'); 
        }
    }

    return (
        <>
            <Navbar />
            <div className='sign-up-container'>
                <div className='form'>
                    <span className='form-title'>SIGN UP</span>
                    <form action=''>
                        <div className='form-input'>
                            <i className='ri-user-line'/>
                            <input type='text' placeholder='Name' onChange={(event) => {setRegisterName(event.target.value);}}/>
                            <span className='bar'/>
                        </div>
                        <div className='form-input'>
                            <i className='ri-mail-line'/>
                            <input type='text' placeholder='Email' onChange={(event) => {setRegisterEmail(event.target.value);}}/>
                            <span className='bar'/>
                        </div>
                        <div className='form-input'>
                            <i className='ri-lock-line'/>
                            <input type='password' placeholder='Password' onChange={(event) => {setRegisterPassword(event.target.value);}}/>
                            <span className='bar'/>
                        </div>
                        <div className='form-input'>
                            <i className='ri-lock-line'/>
                            <input type='password' placeholder='Confirm Password' onChange={(event) => {setConfirmPassword(event.target.value);}}/>
                            <span className='bar'/>
                        </div>
                        <button type='button' className='form-button' onClick={register}>Sign Up</button>
                        <span className='form-switch'>
                            Already have an account?
                            <Link className='link' to='/sign-in'>Login</Link>
                        </span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;