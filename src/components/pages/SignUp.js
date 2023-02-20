import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
    return (
        <>
            <div className='form'>
                <span className='form-title'>SIGN UP</span>
                <form action=''>
                    <div class='form-input'>
                        <i className='ri-user-line'/>
                        <input type='text' placeholder='Name'/>
                        <span className='bar'/>
                    </div>
                    <div class='form-input'>
                        <i className='ri-mail-line'/>
                        <input type='text' placeholder='Email'/>
                        <span className='bar'/>
                    </div>
                    <div class='form-input'>
                        <i className='ri-lock-line'/>
                        <input type='text' placeholder='Password'/>
                        <span className='bar'/>
                    </div>
                    <div className='form-input'>
                        <i className='ri-lock-line'/>
                        <input type='text' placeholder='Confirm Password'/>
                        <span class='bar'/>
                    </div>
                    <button type='submit' className='form-button'>Sign Up</button>
                    <span className='form-switch'>
                        Already have an account?
                        <Link class='link' to='/sign-in'>Login</Link>
                    </span>
                </form>
            </div>
        </>
    )
}

export default SignUp;