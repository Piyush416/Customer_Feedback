import React, { useState } from 'react'
import './Register.css'

const PORT = 5000;


const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [enrol, setEnrol] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`https://customer-feedback-f5do.onrender.com/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, enrol, email, password })
        })

        if (response.ok) {
            alert("Register Successfully")
        }
        else {
            alert("Error to Register")
        }
    }



    return (
        <div className="container">
            <div className="blurContainer">
                <form onSubmit={handleSubmit}>
                    <h2>Registration</h2>
                    <div className="linediv" />
                    <div className="input-filed_name">
                        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
                        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <input type="Number" placeholder="Enrollment Number" onChange={(e) => setEnrol(e.target.value)} required />
                    <input type="text" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} required />
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default Register
