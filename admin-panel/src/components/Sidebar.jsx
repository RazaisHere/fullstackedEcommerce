import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar({setToken}) {
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setToken(""); // Set the token to an empty string, which triggers the app to redirect
    navigate('/'); // Redirect to login page (assuming login is at the root route)
  };
  return (
    <div className='sm:w-[18%] w-[22%] 2xl:w-[15%]  min-h-screen border-r-2 bg-gray-900 -mt-[1px] fixed top-0  ' >

       <div className='ml-1 md:ml-5 mt-5' >
            <h1 className='text-white md:text-2xl text-sm sm:text-xl relative'>FOREVER <span className=' absolute bg-red-500 w-2 h-2 rounded-full bottom-1 ml-1'></span></h1>
            <h2 className='text-red-500 text-xs font-light'>ADMIN PANEL</h2>
       </div>

        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px] '>
            <NavLink 
              to="/add-items"
              className={({ isActive }) => 
                `flex items-center gap-3  px-3 py-2 rounded-lg md:mr-2 mr-7
                 ${isActive ? 'bg-red-500 text-white' : 'bg-transparent text-white'} justify-center md:justify-start`
              }
            >
                <i className="fa-solid fa-plus"></i>
                <p className='hidden md:block'>Add Items</p>
            </NavLink>
            <NavLink 
              to="/list-items"
              className={({ isActive }) => 
                `flex items-center gap-3  px-3 py-2 rounded-lg md:mr-2 mr-7
                 ${isActive ? 'bg-red-500 text-white' : 'bg-transparent text-white'} justify-center md:justify-start`
              }
            >
                <i className="fa-solid fa-book-open px-1"></i>
                <p className='hidden md:block'>List Items</p>
            </NavLink>
            <NavLink 
              to="/orders"
              className={({ isActive }) => 
                `flex items-center gap-3  px-3 py-2 rounded-lg md:mr-2 mr-7
                 ${isActive ? 'bg-red-500 text-white' : 'bg-transparent text-white'} justify-center md:justify-start`
              }
            >
                <i className="fa-solid fa-layer-group px-1"></i>
                <p className='hidden md:block'>Order</p>
            </NavLink>
            <NavLink 
              to="/users"
              className={({ isActive }) => 
                `flex items-center gap-3  px-3 py-2 rounded-lg md:mr-2 mr-7
                 ${isActive ? 'bg-red-500 text-white' : 'bg-transparent text-white'} justify-center md:justify-start`
              }
            >
                <i className="fa-regular fa-user px-1"></i>
                <p className='hidden md:block'>Users</p>
            </NavLink>
        </div>
           <div className='w-full flex justify-center relative top-[40px] sm:top-[400px]  md:top-[550px] lg:top-[550px]   2xl:top-[550px]'>
           <button 
        onClick={logout}
        className="bg-red-500 text-white px-5 py-2 sm:px-7 rounded text-xs sm:text-sm w-[70px]  sm:w-[100px] md:w-[130px]  xl:w-[200px] "
      >
        Logout
      </button>
           </div>
    </div>
  )
}

export default Sidebar
