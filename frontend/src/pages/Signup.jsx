import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { useShop } from '../context/ShopContext';
function Signup() {
  const [firstname, setFname] = useState("");
  const [lastname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const{token,setToken,navigate,backendUrl}=useShop()

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      if(password!==confirmpassword){
        toast.error("Password  and Confirm Password do not match");

      }
      // ${backendUrl}
      const response = await axios.post(`${backendUrl}/api/users/signup`, {
        firstname,
        lastname,
        email,
        password,
        confirmpassword

      });
      console.log(response.data);
  
      if (response.data.success) {
        toast.success("Signup successful!");
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token)
       
        setFname("");
        
        setLname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response.data.message || "Signup failed.");
      }
    } catch (error) {
      if(password==confirmpassword){
        toast.error("Error signing up. Please try again.");
      console.error(error);
      }
    }
  };
  

  return (
    <div>
      <div className='flex flex-col items-center w-[90%] sm:w-[30rem] mx-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <h1 className='prata-regular text-3xl'>Create Account</h1>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        <form onSubmit={signupUser} className='w-full'>
         <div className='flex gap-2'>
         <input
            type="text"
            placeholder='First name'
            value={firstname}
            onChange={(e) => setFname(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800 mb-4'
          />
           <input
            type="text"
            placeholder='Last name'
            value={lastname}
            onChange={(e) => setLname(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800 mb-4'
          />
         </div>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800 mb-4'
          />
          <div className='flex gap-2'> 
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800 mb-4'
          />
          <input
            type="password"
            placeholder='Confirm password'
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full px-3 py-2 border border-gray-800 mb-4'
          />
          </div>
          <div className='w-full flex justify-between text-xs mt-[-8px] mb-4'>
            <p className='cursor-pointer'>Forgot your password?</p>
            <Link to={"/login"}><p className='cursor-pointer'>Login Here</p></Link>
          </div>
          <button type="submit" className="bg-black text-white px-8 py-2 mt-4 font-light w-full">Sign Up</button>
        </form>

      </div>
    </div>
  );
}

export default Signup;
