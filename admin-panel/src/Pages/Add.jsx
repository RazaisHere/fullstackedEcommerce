import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/admin_assets/assets';
import axios from 'axios';
function Add() {
  const [showPopup, setShowPopup] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]); // Initialized as an array
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleButtonClick = () => setShowPopup(true);
  const handleCloseModal = () => setShowPopup(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subcategory); 
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
  
      // Append images if they exist
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
  
      const response = await axios.post(`${backendUrl}/admin/products/add`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
  
      console.log(response.data);
      if(response.data.success){
        setName("");
        setDescription("");
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setShowPopup(false)
        setPrice("")
        setCategory("");
        setSubCategory("");
        setBestSeller(false);

        toast.success(response.data.message)


      }else{
        toast.error(response.error.message)
      }
    } catch (error) {
      console.error("Error adding product:", error.response ? error.response.data : error.message);
    }
  }
  

  return ( 
    <div>
      <div>
        <h1 className='text-3xl  mt-4 text-center ' >Add a Product</h1>
      </div>
      <div className='flex justify-start py-6'>
        <button className='bg-gray-950 text-white px-2 sm:px-8 py-2 rounded-md' onClick={handleButtonClick}>
          Add Product
        </button>
      </div>

      {/* Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <form onSubmit={onSubmitHandler} className='w-full max-w-[90%] h-[70vh] sm:h-[90vh] sm:max-w-[600px] overflow-y-scroll hide-scrollbar'>
            <div className="bg-white p-8 py-2 rounded-md shadow-md">
              <h2 className="text-lg font-bold mb-2 text-center">Add New Product</h2>

              {/* Upload Image */}
              <p>Upload Image</p>
              <div className='flex gap-2 my-2 overflow-x-auto'>
                <label htmlFor="image1">
                  <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="Upload Area" />
                  <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                </label>
                <label htmlFor="image2">
                  <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="Upload Area" />
                  <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                </label>
                <label htmlFor="image3">
                  <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="Upload Area" />
                  <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                </label>
              </div>

              {/* Product Name */}
              <div className='w-full my-4'>
                <p className='mb-2'>Product Name</p>
                <input
                  className='w-full px-3 py-2 border rounded'
                  type="text"
                  placeholder='Type here ...'
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Product Description */}
              <div className='w-full my-4'>
                <p className='mb-2'>Product Description</p>
                <input
                  className='w-full px-3 py-2 border rounded'
                  type="text"
                  placeholder='Write content here...'
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Product Category */}
              <div className='flex items-center gap-2'>
                <div className='w-full sm:w-[300px] my-3'>
                  <p className='mb-2'>Product Category</p>
                  <select className='w-full px-3 py-3 border rounded' defaultValue={"Men"} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>

                {/* Sub Category */}
                
              <div className='w-full sm:w-[300px] my-3'>
              <p className='mb-2'>Product SubCategory</p>
              <select className='w-full px-3 py-3 border rounded' defaultValue={"Topwear"} onChange={(e) => setSubCategory(e.target.value)}>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </select>
              </div>


                {/* Product Price */}
                <div className='w-full sm:w-[200px] my-3'>
                  <p className='mb-2'>Product Price</p>
                  <input
                    className='w-full px-3 py-2 border rounded'
                    type="number"
                    required
                    placeholder='25'
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Product Sizes */}
              <div className='my-3'>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3 flex-wrap'>
                  {["S", "M", "L", "XL", "XXL"].map(size => (
                    <div
                      key={size}

                      className={`flex items-center  overflow-hidden ${sizes.includes(size) ? 'border bg-black text-white' : 'bg-slate-200'}`}
                      onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
                    >
                      <p className='px-3 py-1 cursor-pointer rounded'>{size}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Seller Checkbox */}
              <div className='flex gap-2 py-2 pt-5 '>
                <input type="checkbox" id="bestseller" onChange={() => setBestSeller(!bestseller)} checked={bestseller} />
                <label className='ml-2 cursor-pointer' htmlFor="bestseller" >Add to Best Seller</label>
              </div>

              {/* Buttons */}
              <div className='flex flex-col sm:flex-row items-center justify-center gap-2 pt-4'>
                <button className='bg-black text-white px-4 py-2 rounded-md w-full sm:w-auto'>
                  Add Product
                </button>
                <button className='bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto' onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Add;
