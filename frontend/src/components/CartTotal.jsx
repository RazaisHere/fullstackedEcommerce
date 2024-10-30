import React from 'react'
import { useShop } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
    const {currency,delivery,getCartAmount}=useShop()

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={"Cart"} text2={"TOTALS"}/>

        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>SubTotal</p>
                <p>{currency}{getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping</p>
                <p>{currency}{delivery}</p>

            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency}{getCartAmount()===0 ? 0:getCartAmount() + delivery}.00</b>
            </div>
        </div>
        
    </div>
  )
}

export default CartTotal