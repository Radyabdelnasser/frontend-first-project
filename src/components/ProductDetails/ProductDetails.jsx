
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../cartContext/cartContext';


export default function ProductDetails() {


    const { addToCart } = useContext(CartContext); 
    
    // get id from url
    const { id } = useParams();


    const [product, setProduct] = useState(null);

    const [mainImage, setMainImage] = useState('');




    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
                setMainImage(data.thumbnail);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        }
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="text-center text-white mt-10">Loading...</div>;
    }

    // حساب النجوم
    const rating = Number(product.rating) || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const totalStars = 5;


    return <>
        <section className="bg-white text-white min-h-screen py-6 mt-20 px-6">
            <div className="max-w-5xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">

                    {/* الصور */}
                    <div>
                        <img
                            src={mainImage}
                            alt={product.title}
                            className="w-full h-80 object-contain rounded-lg bg-slate-800 mb-4 transition-all duration-300"
                        />

                        {/* الصور المصغرة */}
                        <div className="flex gap-3 justify-center flex-wrap">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`thumbnail-${index}`}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${mainImage === img ? 'border-blue-500 scale-105' : 'border-transparent'
                                        }`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* تفاصيل المنتج */}
                    <div className='pt-8'>
                        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                        {/* النجوم والتقييم */}
                        <div className="flex items-center mt-2">
                            {[...Array(totalStars)].map((_, i) => {
                                if (i < fullStars) {
                                    return <span key={i} className="text-yellow-400">★</span>; // نجمة كاملة
                                } else if (i === fullStars && hasHalfStar) {
                                    return <span key={i} className="text-yellow-400">☆</span>; // تمثل نص نجمة (اختياري ممكن نحط أيقونة مختلفة)
                                } else {
                                    return <span key={i} className="text-gray-400">★</span>; // نجمة فاضية
                                }
                            })}
                            <span className="ml-2 text-gray-300">({rating.toFixed(1)})</span>
                        </div>

                        <p className="text-gray-300 mb-4">{product.description}</p>

                        <p className="text-blue-400 text-2xl font-semibold mb-6">
                            ${product.price}
                        </p>

                        <button onClick={ ()=> addToCart(product) } className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <Link to='/products' className="fixed  bottom-4 right-8 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition">
            Back to Products
        </Link>
    </>
}
