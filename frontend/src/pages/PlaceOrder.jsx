import React, { useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { useShop } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function PlaceOrder() {
    const [method, setMethod] = useState("cod");
    const { cartItems, setCartItems, token, getCartAmount, delivery, products, userId, navigate,backendUrl } = useShop(); // Destructure userId from useShop
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];
            for (const items in cartItems) {
                for (const size in cartItems[items]) {
                    if (cartItems[items][size] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = size;
                            itemInfo.quantity = cartItems[items][size];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                userId, 
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery,
            };

            switch (method) {
                case "cod": {
                    const res = await axios.post(`${backendUrl}/api/order/placeOrder`, orderData, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    if (res.data.success) {
                        console.log(res.data.success);

                        setCartItems({});
                        navigate("/orders")
                        // navigate('/orders');
                    } else {
                        toast.error(res.data.message);
                    }
                    break;
                }
                case 'stripe':{
                    const responseStripe = await axios.post("http://localhost:5000/api/order/placeOrderStripe", orderData,{
                        headers:{
                            "Authorization": `Bearer ${token}`,
                        }
                    });
                    if(responseStripe.data.success){
                     const {session_url}=responseStripe.data;
                     window.location.replace(session_url)
                    }else{
                        toast.error(responseStripe.data.message);
                    }
                    break;
                }
            }
        } catch (error) {
            console.error("Error placing order:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
            {/* Left Side Address Info */}
            <div className='flex flex-col gap-4 sm:max-w-[480px]'>
                <div className='text-2xl items-start my-3'>
                    <Title text1={"DELIVERY "} text2={"INFORMATION"} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name="firstName" type="text" placeholder='First name' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <input required onChange={onChangeHandler} name="lastName" type="text" placeholder='Last name' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
                <div className='flex flex-col gap-3'>
                    <input required onChange={onChangeHandler} name="email" type="email" placeholder='Email address' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <input required onChange={onChangeHandler} name="street" type="text" placeholder='Street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name="city" type="text" placeholder='City' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <input required onChange={onChangeHandler} name="state" type="text" placeholder='State' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name="zip" type="text" placeholder='Zipcode' value={formData.zip} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                    <input required onChange={onChangeHandler} name="country" type="text" placeholder='Country'  value={formData.country}className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
                <div>
                    <input required onChange={onChangeHandler} name="phone" type="tel" placeholder='Phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
            </div>
            {/* Right Side Order Info */}
            <div className='mt-8 sm:w-[500px]'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
                <div className='mt-12'>
                    <Title text1={"PAYMENT"} text2={"METHOD"} />
                    <div className='flex gap-3 justify-center flex-col lg:flex-row'>
                        <div onClick={() => setMethod("stripe")} className='flex items-center gap-3 border p-2 px-[3.2rem] cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : "bg-white"} `}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe Logo" />
                        </div>
                        <div onClick={() => setMethod("cod")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : "bg-white"}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON <span className='text-green-500'>DELIVERY</span></p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white text-sm my-8 px-8 py-3 active:bg-white active:border active:border-black active:text-black'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PlaceOrder;
