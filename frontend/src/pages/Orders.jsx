import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { useShop } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function Orders() {
    const { currency, token,backendUrl } = useShop();
    const [orderData, setOrderData] = useState([]);

    const loadOrder = async () => {
        try {
            if (!token) {
                return null;
            }
            const response = await axios.get(`${backendUrl}/api/order/userorders`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.data.success) {
                let allOrderItems = [];
                response.data.orders.forEach((order) => {
                    order.items.forEach((item) => {
                        // Add order-specific properties to the item
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = new Date(order.date).toLocaleDateString(); // Format date to readable format
                        allOrderItems.push(item);
                    });
                });
                setOrderData(allOrderItems.reverse()); // Set all items from orders to state
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        loadOrder();
    }, []);

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={"MY"} text2={"ORDERS"} />
            </div>
            <div className=''>
                {
                    orderData.length === 0 ? (
                        <p>No orders found</p>
                    ) : (
                        orderData.map((item, index) => (
                            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row items-center md:justify-between gap-4'>
                                <div className='flex items-start gap-6 text-sm'>
                                    <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                                    <div className=''>
                                        <p className='sm:text-base font-medium'>{item.name}</p>
                                        <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                            <p>{currency}{item.price}</p>
                                            <p>Quantity: {item.quantity || 1}</p>
                                            <p>Size: {item.size || 'N/A'}</p>
                                        </div>
                                        <p className='mt-2'>Date:  <span className='text-gray-400'>{item.date}</span></p>
                                        <p className='mt-2'>Payment Method :  <span className='text-gray-400'>{item.paymentMethod}</span></p>
                                    </div>
                                </div>
                                <div className='md:w-1/2 flex justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                        <p className='text-sm md:text-base'>{item.status}</p>
                                    </div>
                                    <button className="border px-4 py-2 text-sm font-medium rounded-sm ml-5">Track Order</button>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default Orders;
