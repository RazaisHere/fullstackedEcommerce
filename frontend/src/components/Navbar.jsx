import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets';
import { useShop } from '../context/ShopContext';
function Navbar() {
    const [visible, setvisible] = useState(false)
    const { setShowSearch, getCartCount, navigate, token, logout } = useShop()


    return (
        <div className='flex items-center justify-between py-[1.2rem]' style={{ fontFamily: "'Poppins', serif" }}>
            <div className='w-[8.5rem]'>
                <Link to={"/"}><img src={assets.logo} alt="" /></Link>
            </div>
            <ul className='hidden sm:flex space-x-5 items-center uppercase text-sm font-medium'>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <a
                    href="http://192.168.18.16:5173"
                    className="border border-gray-300 p-2 rounded-full flex flex-col items-center gap-1 text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p>Admin Panel</p>
                </a>



            </ul>
            <div className='flex items-center gap-6'>
                <Link to={"/collection"}>  <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" /></Link>
                <div className='relative group'>
                    <img onClick={() => token ? null : navigate("/login")} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                    {
                        token &&
                        <div className='hidden group-hover:flex absolute right-0 pt-4 z-10'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>

                                <p onClick={() => navigate("/orders")} className='cursor-pointer hover:text-black'>My Orders</p>
                                <p onClick={() => logout()} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to={"/cart"} className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>
            {/* Menu */}
            <div className={`absolute z-40 top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}>
                <div className='flex flex-col text-gray-600'>
                    <div className='flex items-center gap-4 p-3 '>
                        <img onClick={() => setvisible(false)} src={assets.dropdown_icon} className='h-3 rotate-180 cursor-pointer' alt="" />
                        <p className='cursor-pointer uppercase' onClick={() => setvisible(false)}>Back</p>
                    </div>
                    <NavLink
                        onClick={() => setvisible(false)}
                        className={({ isActive }) => `py-3 uppercase pl-4 text-[17px] font-normal border ${isActive ? 'bg-black text-white' : ''}`}
                        to="/"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        onClick={() => setvisible(false)}
                        className={({ isActive }) => `py-3 uppercase pl-4 text-[17px] font-normal  border ${isActive ? 'bg-black text-white' : ''}`}
                        to="/about"
                    >
                        About
                    </NavLink>
                    <NavLink
                        onClick={() => setvisible(false)}
                        className={({ isActive }) => `py-3 uppercase pl-4 text-[17px] font-normal  border ${isActive ? 'bg-black text-white' : ''}`}
                        to="/collection"
                    >
                        Collection
                    </NavLink>
                    <NavLink
                        onClick={() => setvisible(false)}
                        className={({ isActive }) => `py-3 uppercase pl-4 text-[17px]  font-normal  border ${isActive ? 'bg-black text-white' : ''}`}
                        to="/contact"
                    >
                        Contact
                    </NavLink>
                    <a
                        href="http://localhost:5173/"
                        className="py-3 uppercase pl-4 text-[17px]  font-normal"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Admin Panel
                    </a>

                </div>
            </div>
        </div>
    );
}

export default Navbar;
