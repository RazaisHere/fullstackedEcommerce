
import { useState, useEffect } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import ProductItems from '../components/ProductItems'
import { useShop } from '../context/ShopContext'
import Title from '../components/Title'
import Searchbar from '../components/Searchbar';

function Collection() {
  const {products,search , showSearch } = useShop();
  const [collectionP, setCollectionP] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [sortType, setSortType] = useState("relavent")
  

  function toggleCategory(e) {
    if (category.includes(e.target.value)) {
      setCategory(category.filter(item => item !== e.target.value));//removing the selected Category if it already exist in array
    }
    else {
      setCategory(prev => [...prev, e.target.value])//removing the selected Category
    }
  }
  function toggleSubCategory(e) {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter(item => item !== e.target.value));//removing the selected Category if it already exist in array
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])//removing the selected Category
    }
  }
  
  useEffect(() => {
    setCollectionP(products);//set all the products from  shop context to collectionproducts
    
  }, [products]);
  
  function handleVisibility() {
    setVisible(!visible);
  }
  function applyfilter() {
    let productCopy = products.slice();
    
    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    
    setCollectionP(productCopy);
  }
  
  
  useEffect(() => {
    applyfilter();//apply filers on first render
  }, [category, subCategory,search,showSearch])


  const sortProduct = () => {
    let filterP = collectionP.slice();
    switch (sortType) {
      case 'low-high':
        {
          setCollectionP(filterP.sort((a, b) => a.price - b.price));
          break;
        }
      case 'high-low': {
        setCollectionP(filterP.sort((a, b) => b.price - a.price));
        break;
      }
      default: {
        applyfilter();
        break
      }




    }
  }
  useEffect(() => {
    sortProduct();
  }, [sortType])
  return (
  <div>
    <Searchbar/>
    <div className='flex flex-col gap-1 pt-10 sm:flex-row sm:gap-10 border-t'>
      <div className='sm:w-60'>
        <div className='sm:min-w-60 sticky top-[8rem]'>
          <h1 className='font-medium my-2 text-xl flex items-center cursor-pointer gap-2'>
            FILTERS
            <img onClick={handleVisibility} className='w-2 sm:hidden' src={assets.dropdown_icon} alt="Toggle Filter" />
          </h1>
          <div className={`border border-gray-300 pl-5 py-3 mt-6 text-xs ${visible ? 'hidden' : 'block'} transition-all ease-in-out duration-500 sm:block`}>
            <h1 className='mb-3 text-sm font-medium'>Categories</h1>
            <div className='flex gap-2 mb-1'>
              <input type="checkbox" value="Men" onChange={toggleCategory} />
              <label>Men</label>
            </div>
            <div className='flex gap-2 mb-1'>
              <input type="checkbox" value="Women" onChange={toggleCategory} />
              <label>Women</label>
            </div>
            <div className='flex gap-2 mb-1'>
              <input type="checkbox" value="Kids" onChange={toggleCategory} />
              <label>Kids</label>
            </div>
          </div>
          <div className={`border border-gray-300 pl-5 py-3 mt-6 text-xs ${visible ? 'hidden' : 'block'} sm:block mb-5`}>
            <h1 className='mb-3 text-sm font-medium'>Type</h1>
            <div className='flex gap-2 mb-1'>
              <input type="checkbox" value="Topwear" onChange={toggleSubCategory} />
              <label>Topwear</label>
            </div>
            <div className='flex gap-2 mb-1'>
              <input type="checkbox" value="Bottomwear" onChange={toggleSubCategory} />
              <label>Bottomwear</label>
            </div>
            <div className='flex gap-2 mb-1'>
              <input type="checkbox" value="Winterwear" onChange={toggleSubCategory} />
              <label>Winterwear</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='w-full'>
          <div className='flex justify-between  mt-5 sm:mt-0 mb-5 '>
            <div className='mt-2 sm:text-2xl'>
              <Title text1={"ALL"} text2={"COLLECTIONS"} />
            </div>
            <select name="sort" onChange={e => setSortType(e.target.value)} className=' outline-none border-2 bg-transparent border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {collectionP.map((item, index) => (
              
              <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            
            ))}
            
            
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Collection;
