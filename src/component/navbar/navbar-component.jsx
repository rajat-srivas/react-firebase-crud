import React from 'react'
import './navbar.style.scss';
import LoginWithGoogle from '../login/login.component'
import { auth } from '../../firebase-util';
import Logo from '../../logo.png';



const Navbar = ({ currentUser }) => (

    <div className="navbar">


        <div className="content-btn">

            <div className="logo">
                <img src={Logo} alt="" />
            </div>

            {
                currentUser ?
                    <div className='signout' onClick={() => auth.signOut()} >
                        <h4 >Logout</h4>
                    </div> :
                    <LoginWithGoogle />
            }
        </div>


    </div>

)

export default Navbar;