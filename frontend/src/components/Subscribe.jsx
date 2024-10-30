import React, { useState } from 'react';

function Subscribe() {
    const [sub, setSub] = useState("");

    function SubmitHandler(e) {
        e.preventDefault();
        // Here you can add any logic to handle the subscription (like API call)
      
        setSub(""); // Clear the input field after submission
    }

    return (
        <div className='w-full my-10 flex flex-col gap-4' style={{ fontFamily: "'Outfit', sans-serif" }}>
            <h1 className='text-2xl font-semibold text-center'>Subscribe now & get 20% off</h1>
            <p className='text-gray-400 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, sequi?</p>

            <form onSubmit={SubmitHandler} className='flex justify-center mx-auto'>
                <input
                    type="text"
                    className='w-[220px] sm:w-[500px] px-4 py-3 outline-none border'
                    placeholder='Enter your email'
                    value={sub} // Use value to bind the input field to the state
                    onChange={(e) => setSub(e.target.value)} // Update state on input change
                />
                <button type='submit' className='bg-black text-white px-5 sm:px-5 py-3 border-none'>Subscribe</button>
            </form>
        </div>
    );
}

export default Subscribe;
