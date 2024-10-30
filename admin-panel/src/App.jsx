import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Add from './Pages/Add';
import List from './Pages/List';
import Orders from './Pages/Orders';
import User from './Pages/User';
import Login from './components/Login';
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || "");

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token'); // Make sure token is cleared from localStorage when logged out
        }
    }, [token]);

    return (
        <>
            <BrowserRouter>
            <ToastContainer />
                {token ? (
                    <div className="bg-gray-50 min-h-screen ">
                        {/* <Navbar setToken={setToken} /> Pass setToken as a prop */}
                        <hr />
                        <div className="flex w-full">
                            <Sidebar setToken={setToken}/>
                            <div className="w-[70%] mx-auto  ml-[120px] sm:ml-[165px] md:ml-[200px] lg:ml-[240px]  xl:ml-[350px] 2xl:ml-[400px]   my-5 text-gray-600 text-base">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/add-items" element={<Add />} />
                                    <Route path="/list-items" element={<List token={token} />} />
                                    <Route path="/orders" element={<Orders token={token} />} />
                                    <Route path="/users" element={<User />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Login setToken={setToken} />
                )}
            </BrowserRouter>
        </>
    );
}

export default App;
