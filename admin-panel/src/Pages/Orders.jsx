import React, { useEffect, useState } from 'react';
import { assets } from '../assets/admin_assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.get(`${backendUrl}/api/order/list`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  const statusHandler=async(e,orderId)=>{
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`,{orderId,status:event.target.value}, {headers: {
        "Authorization": `Bearer ${token}`
      }})
      if(response.data.success){
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h1 className='my-5 text-2xl text-gray-700 text-center'>Orders</h1>
      {
        orders.map((order, index) => (
          <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 '>
            <img src={assets.parcel_icon} alt="" />
            <div className='flex flex-col gap-2 sm:ml-[2rem]'>
              <p>
                {order.items.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item.name} x {item.quantity} x {item.size}
                  </span>
                ))}
              </p>
              <p className='font-semibold'>{order.address.firstName} {order.address.lastName}</p>
              <p className='font-semibold'>{order.address.street}</p>
              <p className='font-semibold'>{order.address.city}, {order.address.state}, {order.address.country}</p>
            </div>
            <div className='flex flex-col gap-4 '>
              <p>Items: {order.items.length}</p>
              <div>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>
            <p>
              Total: $
              {order.items.reduce((total, item) => total + item.price * item.quantity, 0)}
            </p>
            <select onChange={(e)=>statusHandler(e,order._id)} className='p-2 font-semibold border-2' name="status" value={order.status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        )).reverse()
      }
    </div>
  );
}

export default Orders;
