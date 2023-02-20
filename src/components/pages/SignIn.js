import { useState } from 'react';
import { Link } from 'react-router-dom';
// import firebase from 'firebase/compat/app';
// import 'firebase/auth';
import './SignIn.css';

function SignIn() {
    // const auth = firebase.auth();

    // const signInWithGoogle = () => {
    //   const provider = new firebase.auth.GoogleAuthProvider();
    //   auth.signInWithPopup(provider);
    // }
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
  
    return (
        <>
            <div className='login-screen'>
                <div className='login-box'>
                    <h2>LOGIN</h2>
                    <form>
                        <div className='user-box'>
                            <input type='email' name='' required='' onChange={(event) => {setLoginEmail(event.target.value);}}/>
                            <label>Email</label>
                        </div>
                        <div className='user-box'>
                            <input type='password' name='' required='' onChange={(event) => {setLoginPassword(event.target.value);}}/>
                            <label>Password</label>
                        </div>
                        <div className='button-form'>
                            <Link className='submit' to='/sign-in'>Submit</Link>
                            <div className='register'>
                                Don't have an account?
                                <Link className='sign-up' to='/sign-up'>Register</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
  
}

export default SignIn;