import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function List() {
    const [list, setList] = useState([]);
    const token = localStorage.getItem("token"); 
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const fetchList = async () => {
      // const token = localStorage.getItem("token"); 
    //   console.log("Token from localStorage:", token); 
  
      try {
          const response = await axios.get(`${backendUrl}/admin/products/list`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
          });
  
          if (response.data.success) {
              setList(response.data.products); 
          } else {
              console.log(response.data.message);
          }
      } catch (error) {
          console.error("Error fetching product list:", error.response ? error.response.data : error.message);
      }
  };
  

  const removeProduct = async (id) => {
    try {
        const response = await axios.post(`${backendUrl}/admin/products/remove`, { id }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
  
        if (response.data.success) {
            toast.success(response.data.message);
            fetchList();
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Error removing product:", error.response ? error.response.data : error.message); 
        toast.error("Error removing product: " + (error.response ? error.response.data.message : error.message));
    }
  };
  
    useEffect(() => {
        fetchList(); 
    }, []);

    return (
        <div>
            <p className='my-5 text-2xl text-gray-700 text-center'>All Products List</p>
            <div className='flex flex-col gap-2'>
                {/* Listing Table Title */}
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>

                {/* Product List */}
                {list.length > 0 ? (
                    list.map((product) => (
                        <div key={product._id} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
                            <img className='w-[90px]' src={product.image[0]} alt={product.name} /> 
                            <p className='text-sm'>{product.name}</p>
                            <p className='text-sm'>{product.category}</p>
                            <p className='text-sm'>{product.price}$</p>
                            <p onClick={() => removeProduct(product._id)} className='text-right md:text-center cursor-pointer text-lg'><i class="fa-regular fa-trash-can"></i></p>
                        </div>
                    ))
                ).reverse() : (
                    <p>No products available</p> // Fallback message if no products are found
                )}
            </div>
        </div>
    );
}

export default List;
