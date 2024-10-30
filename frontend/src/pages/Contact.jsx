import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import Subscribe from '../components/Subscribe'

function Contact() {
  return (
    <div>
       <div className='py-7 text-2xl text-center'>
     <Title text1={"CONTACT"} text2={"US"}/>
     </div>

     <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
      <img src={assets.contact_img} className='w-full md:max-w-[480px] ' alt="" />
      <div className='flex flex-col justify-center items-start gap-6'>
        <h1 className='font-semibold'>Our Store</h1>
        <p className='text-gray-600'>123 Main St, Anytown, USA 12345</p>
            <div>
            <p className='text-gray-600'>Phone: 555-555-5555</p>
            <p className='text-gray-600'>Email: admin@ecommerce.com</p>
            </div>
        <h1 className='font-semibold'>Careers at Forever</h1>    

      <p className='text-gray-600'>Learn more about out teams and job openings</p>

      <button className='border border-black  px-7 py-5 text-sm hover:bg-black hover:text-white transition-all ease-in-out hover:shadow-lg duration-500'>Explore Jobs</button>
      </div>
     </div>

     <Subscribe/>
    </div>
  )
}

export default Contact