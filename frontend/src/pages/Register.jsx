import React from 'react'
import './register.css'

const Register = () => {
    return (
        <div className="container">
            <div className="blurContainer">
                <form action="">
                    <h2>Registration</h2>
                    <div className="linediv" />
                    <div className="input-filed_name">
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <input type="text" placeholder="Enter your Email" />
                    <input type="password" placeholder="Enter your Password" />
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default Register
