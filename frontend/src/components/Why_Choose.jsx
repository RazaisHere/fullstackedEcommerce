import React from 'react'
import Title from './Title'
function Why_Choose() {
  return (
    <div>
        <div className='py-7 text-2xl text-center'>
     <Title text1={"WHY"} text2={"CHOOSE US"}/>
     </div>

     <div className='flex flex-col sm:flex-row sm:mb-[60px]'>
        <div className='border px-8 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-sm'>
            <h1 className='font-semibold'>Quality Assurance:</h1>
            <p className='text-gray-600 text-xs w-[100%]'>We meticulously select and vet each product to ensure it meets our stringent quality standards</p>
        </div>
        <div className='border px-8 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <h1 className='font-semibold'>Convenience:</h1>
            <p className='text-gray-600 text-xs'>We meticulously select and vet each product to ensure it meets our stringent quality standards</p>
        </div>
        <div className='border px-8 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <h1 className='font-semibold'>Exceptional Customer Service:</h1>
            <p className='text-gray-600 text-xs'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
     </div>
    </div>
  )
}

export default Why_Choose