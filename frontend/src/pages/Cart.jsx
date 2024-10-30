import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';


function Cart() {
    const { products, currency, cartItems,updateQuantity,navigate } = useShop();
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const ID in cartItems) {
            for (const Size in cartItems[ID]) {
                if (cartItems[ID][Size] > 0) {
                    tempData.push({
                        _id: ID,
                        size: Size,
                        quantity: cartItems[ID][Size]
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);



    return (
        <div>
            <div className="border-t pt-14">
                <div className='text-2xl mb-3 text-center'>
                    <Title text1={"YOUR"} text2={"CART"} />
                </div>

                {cartData.length > 0 ? (
                    <div>
                       {cartData.map((item, index) => {
    const productData = products.find((product) => product._id === item._id);
    if (!productData) {
      
        return null; 
    }
    return (
        <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center'>
            <div className='flex items-start gap-6'>
                <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                    <p className='text-xs sm:text-lg font-medium'>
                        {productData.name}
                    </p>
                    <div className='flex items-center gap-5 mt-2'>
                        <p>
                            {productData.price} {currency}
                        </p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                            {item.size}
                        </p>
                    </div>
                </div>
            </div>
            <input onChange={(e) => e.target.value === '' || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className='border max-w-10  sm:max-w-20 px-1 sm:px-2 sm:py-1' />
            <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className='w-4 ml-2 sm:w-5 cursor-pointer' alt="Delete" />
        </div>
    );
})}
                    </div>
                ) : (
                    <div>
                        <div className='text-center text-2xl font-medium py-10 text-gray-500'>WHOOPS !!! <br /><div className='mt-2 text-3xl'>Your cart is Empty</div></div>
                    </div>
                )}
            </div>
            <div className='flex justify-end my-20'>

                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <div className='w-full text-end'>
                        <button onClick={()=>navigate("/place-order")} className='bg-black text-white text-sm my-8 px-8 py-3 active:bg-white active:border active:border-black active:text-black' >Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
