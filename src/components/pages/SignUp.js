import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const register = async () => {
        try {
            if (registerPassword === confirmPassword) {

                const user = await createUserWithEmailAndPassword(
                    auth,
                    registerEmail,
                    registerPassword
                );
                
                console.log(user);
                navigate('/');
            }
            else {
                console.log('Passwords do not match');
            }
        }
        catch(error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className='form'>
                <span className='form-title'>SIGN UP</span>
                <form action=''>
                    <div className='form-input'>
                        <i className='ri-user-line'/>
                        <input type='text' placeholder='Name'/>
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
        </>
    )
}

export default SignUp;