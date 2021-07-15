import React from 'react'
import './login.style.scss';
import Logo from '../../google.png'
import { signInWithGoogle } from '../../firebase-util.js'

class LoginWithGoogle extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="google">
                <img src={Logo} alt="" />
                <span onClick={signInWithGoogle}>Sign In with Google</span>
            </div>

        )
    }

}

export default LoginWithGoogle