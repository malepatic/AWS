import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log(role)
        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email, role })
        });
        console.log(response)
        const data = await response.json();
        if (response.status==200) {
            alert("User Created Succesfully");
            navigate('/')
        } else {
            alert("Unable to create user");
        }
    };

    return (
        <div style={{justifyContent: "center", display: "flex", width: "100%"}}>
            <div>
                <h2>Register</h2>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >   
                    <option value="">--Select Role--</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <button onClick={handleLogin}>Sign Up</button>
            </div>
        </div>
    );
};

export default Register;