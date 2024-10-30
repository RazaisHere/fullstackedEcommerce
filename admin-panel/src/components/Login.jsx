import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login({ setToken }) {
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/admin/login`, { adminEmail, adminPassword });

            console.log(response.data); // Check the response from the backend

            if (response.data.success) {
                const token = response.data.token; // This is the token without 'Bearer ' prefix
                // console.log(token);

                // Set the token in state and local storage with the 'Bearer ' prefix
                setToken(token);
                localStorage.setItem('token', `Bearer ${token}`); // Store token with 'Bearer ' prefix
            } else {
                toast.error(response.data.message);
            }
        }catch (error) {
            console.error(error.response ? error.response.data : error.message);
            toast.error("Provide correct credentials" || error.message);
        }
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full ">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md border border-gray-300">
                <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Email address</p>
                        <input
                            placeholder="admin321@gmail.com"
                            onChange={(e) => setAdminEmail(e.target.value)}
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            type="email"
                        />
                    </div>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                        <input
                            placeholder="admin321"
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            type="password"
                        />
                    </div>
                    <button className="w-full mt-2 bg-black text-white rounded-lg py-2 px-4" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
