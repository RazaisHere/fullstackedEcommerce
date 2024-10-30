import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
function About_Hero() {
  return (
    <div>
         <div className='py-7 text-2xl text-center'>
     <Title text1={"ABOUT"} text2={"US"}/>
     </div>
      
      <div className='flex flex-col md:flex-row gap-10 text-sm text-gray-700'>
        <img src={assets.about_img} className='w-full sm:w-[35%]'  alt="" />
        <div id='img-right ' className='flex flex-col justify-centers space-y-5 sm:py-20 leading-5 sm:ml-5'>
          <p className='sm:w-[80%]'>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p className='sm:w-[80%]'>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <h1 className='font-bold'>Our Mission</h1>
          <p className='sm:w-[80%]'>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>
    </div>
  )
}

export default About_Hero