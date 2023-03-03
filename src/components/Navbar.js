import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logout } from '../Firebase';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [loggedInStatus, setLoggedInStatus] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const signOutCloseMobileMenu = () => {
        logout();
        closeMobileMenu();
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        }
        else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setLoggedInStatus(true);
            } 
            else {
              setLoggedInStatus(false);
            }
        });
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        BUG ZAPPER <i className='fab fa-typo3'></i>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        {loggedInStatus &&
                            <li className='nav-item'>
                                <Link to='/' className={button ? 'nav-links': 'nav-links-mobile'} onClick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                        }
                        {loggedInStatus &&
                            <li className='nav-item'>
                                <Link to='/bug-list' className={button ? 'nav-links': 'nav-links-mobile'} onClick={closeMobileMenu}>
                                    Bug List
                                </Link>
                            </li>
                        }
                        {loggedInStatus &&
                            <li className='nav-item'>
                                <Link to='/account' className='nav-links-mobile' onClick={closeMobileMenu}>
                                    Account
                                </Link>
                            </li>
                        }
                        {loggedInStatus &&
                            <li className='nav-item'>
                                <Link to='/' className='nav-links-mobile' onClick={signOutCloseMobileMenu}>
                                    Sign Out
                                </Link>
                            </li>
                        }
                        {!loggedInStatus &&
                            <li className='nav-item'>
                                <Link to='/' className='nav-links-mobile' onClick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                        }
                        {!loggedInStatus && 
                            <li className='nav-item'>
                                <Link to='/sign-in' className='nav-links-mobile' onClick={closeMobileMenu}>
                                    Sign In
                                </Link>
                            </li>
                        }
                        {!loggedInStatus &&
                            <li className='nav-item'>
                                <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                                    Sign Up
                                </Link>
                            </li>
                        }
                    </ul>
                    {!loggedInStatus && button && <Button buttonStyle='btn--outline' src='/sign-up'>SIGN UP</Button>}
                    {!loggedInStatus && button && <Button buttonStyle='btn--outline' src='/sign-in'>SIGN IN</Button>}
                    {loggedInStatus && button && <Button buttonStyle='btn--outline' src='/account'>ACCOUNT</Button>}
                    {loggedInStatus && button && <Button buttonStyle='btn--outline' src='/' onClick={logout}>SIGN OUT</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar;