import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../cartContext/cartContext';

export default function ProductDetails() {
    const { addToCart } = useContext(CartContext);
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
        return (
            <div className="flex justify-center items-center min-h-screen text-blue-600 text-xl">
                Loading...
            </div>
        );
    }

    const rating = Number(product.rating) || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const totalStars = 5;

    return (
        <>
            <section className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-12">
                <div className="max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* الصور */}
                        <div className="flex flex-col items-center">
                            <img
                                src={mainImage}
                                alt={product.title}
                                className="w-full h-72 sm:h-96 object-contain rounded-xl bg-gray-100 mb-5 transition-all duration-300"
                            />
                            <div className="flex gap-3 flex-wrap justify-center">
                                {product.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`thumbnail-${index}`}
                                        className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer border-2 transition-transform duration-200 
                      ${mainImage === img ? 'border-blue-500 scale-105' : 'border-gray-200'}`}
                                        onClick={() => setMainImage(img)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* تفاصيل المنتج */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">{product.title}</h1>

                            {/* النجوم */}
                            <div className="flex items-center mb-3">
                                {[...Array(totalStars)].map((_, i) => {
                                    if (i < fullStars) {
                                        return <span key={i} className="text-yellow-400">★</span>;
                                    } else if (i === fullStars && hasHalfStar) {
                                        return <span key={i} className="text-yellow-400">☆</span>;
                                    } else {
                                        return <span key={i} className="text-gray-300">★</span>;
                                    }
                                })}
                                <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
                            </div>

                            <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

                            <p className="text-blue-700 text-2xl font-semibold mb-6">${product.price}</p>

                            <button
                                onClick={() => addToCart(product)}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 w-full sm:w-auto transition duration-200"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Link
                to="/products"
                className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
            >
                Back
            </Link>
        </>
    );
}
