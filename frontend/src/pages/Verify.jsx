import React, { useEffect } from 'react'
import { useShop } from '../context/ShopContext'
import {useSearchParams} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'

function Verify() {
    const {navigate,backendUrl,token,setCartItems}=useShop();
    const [searchParams,setSearchParams]=useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    const verifyPayment=async()=>{
        try {
            if(!token){
                return null
            }
            const response = await axios.post(`${backendUrl}/api/order/verifyPayment`, {success,orderId},{
                headers:{
                    "Authorization": `Bearer ${token}`,
                }
            })
            if(response.data.success){
                setCartItems({})
                navigate("/orders")
            }else{
                navigate("/cart")
            }   
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        verifyPayment()
    },[])
  return (
    <div>

    </div>
  )
}

export default Verify