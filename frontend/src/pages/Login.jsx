import React from 'react'
import './Login.css'

const Login = () => {
    return (
        <div className="container">
            <div className="blurContainerLogin">
                <form action="">
                    <h2>Login Page</h2>
                    <div className="linedivlogin" />
                    <input type="text" placeholder="Enter your Email" />
                    <input type="password" placeholder="Enter your Password" />
                    <input className="loginSubmit" type="submit" />
                </form>
            </div>
        </div>
    )
}

export default Login