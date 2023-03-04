import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerWithEmailAndPassword } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './SignUp.css';

function SignUp() {
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const navigate = useNavigate();

    const register = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!registerName || !registerEmail || !registerPassword || !confirmPassword) {
            alert('All fields must be filled out to continue!');
        }
        else if (!registerEmail.includes('@') || !registerEmail.includes('.')) {
            alert('You must register with a valid email!');
        }
        else if (!passwordRegex.test(registerPassword)) {
            alert('Password must be at least 6 characters in length, contain at least one capital letter, contain at least one special character, and contain at least one digit!');
        }
        else if (registerPassword !== confirmPassword) {
            alert('Passwords do not match!');
        }
        else { 
            registerWithEmailAndPassword(registerName, registerEmail, registerPassword);
            alert('Sign up successful!');
            navigate('/');
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
                            <input type='text' placeholder='Name' onChange={(event) => {setRegisterName(event.target.value);}} required/>
                            <span className='bar'/>
                        </div>
                        <div className='form-input'>
                            <i className='ri-mail-line'/>
                            <input type='text' placeholder='Email' onChange={(event) => {setRegisterEmail(event.target.value);}} required/>
                            <span className='bar'/>
                        </div>
                        <div className='form-input'>
                            <i className='ri-lock-line'/>
                            <input type='password' placeholder='Password' onChange={(event) => {setRegisterPassword(event.target.value);}} required/>
                            <span className='bar'/>
                        </div>
                        <div className='form-input'>
                            <i className='ri-lock-line'/>
                            <input type='password' placeholder='Confirm Password' onChange={(event) => {setConfirmPassword(event.target.value);}} required/>
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