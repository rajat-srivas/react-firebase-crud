import React from 'react'
import './navbar.style.scss';
import LoginWithGoogle from '../login/login.component'
import { auth } from '../../firebase-util';



const Navbar = ({ currentUser }) => (

    <div className="navbar">
        <div className="navbar-item">
            <div className="navbar__logo">
                <span>Firebase with React</span>
            </div>
            <div className="content-btn">
                {
                    currentUser ?
                        <div className='signout' onClick={() => auth.signOut()} >
                            <h4 >Signout</h4>
                        </div> :
                        <LoginWithGoogle />
                }
            </div>
        </div>

    </div>

)

export default Navbar;