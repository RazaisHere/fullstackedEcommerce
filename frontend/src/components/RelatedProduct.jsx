import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import ProductItems from './ProductItems';
import Title from './Title';

function RelatedProduct({ category, subCategory }) {
    const { products } = useShop();
    const [related, setRelated] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
            const relatedProducts = productsCopy.slice(0, 5);
            setRelated(relatedProducts);
        }
    }, [products, category, subCategory]);

    const handleProductClick = (id) => {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Navigate to the product page
        navigate(`/product/${id}`);
    };

    return (
        <div>
            <div className='my-24'>
                <div className='sm:text-3xl text-center py-2'>
                    <Title text1={"RELATED"} text2={"PRODUCTS"} />
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {related && related.map((item, index) => (
                        <div key={index} onClick={() => handleProductClick(item._id)}>
                            <ProductItems
                                name={item.name}
                                id={item._id}
                                price={item.price}
                                image={item.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RelatedProduct;
