import React from 'react'
import { assets } from '../assets/frontend_assets/assets';
function Hero() {
  return (
    <section id="hero-section" className='mb-8' >
        <div className="flex flex-col sm:flex-row w-full  items-center border border-gray-500">
          <div
            id="left"
            className="w-full sm:w-1/2 flex items-center justify-center  py-10 sm:py-0"
          >
            <div className="  px-5 sm:px-10 ">
              <div className="flex items-center gap-2">
                <p className="w-8 md:w-11 h-[2.7px] bg-[#441e1e]"></p>
                <p className="uppercase font-[400] text-sm md:text-base" style={{ fontFamily: "'poppins', serif" }} >Our Best Sellers</p>
              </div>
              <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed text-gray-600" style={{ fontFamily: "'Playfair Display', serif" }}>
  Latest Arrivals
</h1>

              <div className="flex items-center gap-2">
                <p className="uppercase font-medium text-sm md:text-base" style={{ fontFamily: "'poppins', serif" }}>Shop Now</p>
                <p className="w-8 md:w-11 h-[1px] bg-[#492424]"></p>
              </div>
            </div>
          </div>

          <div id="right" className="w-full sm:w-1/2 ">
            <img
              className="w-full h-full object-cover"
              src={assets.hero_img}
              alt=""
            />
          </div>
        </div>
      </section>
  )
}

export default Hero