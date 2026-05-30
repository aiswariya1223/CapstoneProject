import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("https://yourdomain.com/api/auth/login", { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            navigate('/home');
            window.location.reload();
        }
    } catch (error) {
        alert("Login Failed: Please check your credentials.");
    }
};
 
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-10 bg-white shadow-xl rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input type="email" placeholder="Email" className="w-full p-2 mb-4 border" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="w-full p-2 mb-6 border" onChange={(e) => setPassword(e.target.value)} required />
                <button className="w-full bg-orange-500 text-white p-2 rounded font-bold">Sign In</button>
                <p className="mt-4 text-center">New user? <a href="/signup" className="text-blue-500">Create Account</a></p>
            </form>
        </div>
    );
}

export default Login;