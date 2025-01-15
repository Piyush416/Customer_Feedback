import React, { useState } from 'react'
import './Login.css'

import { useNavigate } from 'react-router-dom'

// Backend port 
const PORT = 5000;


const Login = () => {
    const [enrollment, setEmailOrEnrol] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:${PORT}/user/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enrollment, password })
        })

        const resp = await response.json();
        if (response.ok) {
            localStorage.setItem("token", resp.token);
            localStorage.setItem("enrollment", enrollment);
            navigate("/")
        } else {
            alert(resp.message)
        }
    };


    return (
        <div className="container">
            <div className="blurContainerLogin">
                <form onSubmit={handleSubmit}>
                    <h2>Login Page</h2>
                    <div className="linedivlogin" />
                    <input type="Number" placeholder="Enter your Enrollment Number: " onChange={(e) => { setEmailOrEnrol(e.target.value) }} required />
                    <input type="password" placeholder="Enter your Password" onChange={(e) => { setPassword(e.target.value) }} required />
                    <input className="loginSubmit" type="submit" />
                </form>
            </div>
        </div>
    )
}

export default Login