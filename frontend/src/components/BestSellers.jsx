import { useShop } from '../context/ShopContext';
import React, { useEffect, useState } from 'react';
import Title from './Title';
import ProductItems from './ProductItems';

function BestSellers() {
    const { products } = useShop();
    const [bestseller, setBestSeller] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const bestProduct = products.filter((item) => item.bestseller === true); // gets products with bestseller === true
            setBestSeller(bestProduct.slice(0, 5));
        }
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1="Best" text2="Sellers" />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus numquam perspiciatis doloremque, enim eaque sequi?
                </p>
            </div>

            {/* Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestseller.map((item) => (
                    <ProductItems key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    );
}

export default BestSellers;
