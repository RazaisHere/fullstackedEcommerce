import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/frontend_assets/assets';
import { toast } from 'react-toastify';

function User() {
  const [allUsers, setAllUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem("token"); 
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/users/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        setAllUsers(response.data.Users || []);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const removeUser = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/admin/users/remove`, { id }, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        fetchUsers();
        toast.success("User Deleted");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const addUser = async (e) => {
    e.preventDefault();  // Prevent form submission default behavior
    try {
      const response = await axios.post(`${backendUrl}/admin/users/adduser`, {
        firstname,
        lastname,
        email,
        password
      }, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        toast.success("User Added Successfully");
        setShowPopup(false); // Close the modal after adding
        setFirstname(""); // Clear the input fields
        setLastname("");
        setEmail("");
        setPassword("");
        fetchUsers(); // Refresh user list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCloseModal = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <p className='my-5 text-2xl text-gray-700 text-center'>All Users</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm text-center'>
          <b>Profile</b>
          <b>Name</b>
          <b>Email</b>
          <b className='text-center'>Action</b>
        </div>

        {allUsers.length > 0 ? (
          allUsers.map(user => (
            <div key={user._id} className='grid grid-cols-[1fr_2fr_2fr_1fr] items-center gap-2 py-1 px-2 border text-sm text-center relative'>
              <img className='w-5 sm:w-[40px] py-5 sm:ml-5' src={assets.profile_icon} alt="Profile" />
              <p className='text-sm'>{user.firstname} {user.lastname}</p>
              <p className='text-sm'>{user.email}</p>
              <p onClick={() => removeUser(user._id)} className='text-right md:text-center cursor-pointer text-lg'><i class="fa-regular fa-trash-can"></i></p>
            </div>
          ))
        ).reverse() : (
          <p>No users available</p>
        )}
      </div>
      <div className='flex py-5 justify-end'>
        <button onClick={() => setShowPopup(true)} className='px-4 py-2 mr-2 rounded bg-gray-950 text-white active:text-black active:bg-white active:border active:border-black'>Add User</button>
      </div>

      {/* showpop modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <form onSubmit={addUser} className='w-full max-w-[90%] h-[80vh] sm:h-[90vh] sm:max-w-[500px]'>
            <div className="bg-white p-8 py-2 rounded-md shadow-md">
              <h2 className="text-lg font-bold mb-2 text-center">Add New User</h2>
              <div className='my-2'>
                <label className="block mb-2 text-sm text-gray-600">First Name:</label>
                <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" name="firstname" className="block w-full p-2 mb border border-gray-300 rounded" />
                <label className="my-2 block mb-2 text-sm text-gray-600">Last Name:</label>
                <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" name="lastname" className="block w-full p-2 mb border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="block w-full p-2 mb border border-gray-300 rounded" />
                <label className="my-2 block mb-2 text-sm text-gray-600">Password:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" className="block w-full p-2 mb border border-gray-300 rounded" />
              </div>

              <div className='flex items-center justify-center space-x-2 my-2'>
                <button type="submit" className='bg-gray-950 text-white px-4 sm:px-5 py-2 my-2 rounded-md w-full sm:w-auto'>Add</button>
                <button className='bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto' onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default User;
