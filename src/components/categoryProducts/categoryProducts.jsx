import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../cartContext/cartContext';

export default function CategoryProducts() {

    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        async function getCategoryProducts() {
            try {
                setLoading(true);
                const response = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching category products:", error);
            } finally {
                setLoading(false);
            }
        }
        getCategoryProducts();
    }, [categoryName]);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 capitalize">
                {categoryName.replace('-', ' ')} Products
            </h1>

            {loading ? (
                <p className="text-center text-gray-700 text-lg">Loading products...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {products.map((item) => (
                        <div key={item.id} className="border rounded-xl shadow-md p-4 bg-gray-200">
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="h-40 w-full object-contain mb-3"
                            />
                            <h2 className="font-semibold mb-1 text-gray-800">
                                {item.title.split(" ").slice(0, 2).join(" ")}
                            </h2>
                            <p className="text-gray-700">${item.price}</p>

                            <div className="flex justify-between mt-3">
                                <Link
                                    to={`/productdetails/${item.id}`}
                                    className="bg-blue-900 text-white rounded px-3 py-1"
                                >
                                    Details
                                </Link>

                                <button
                                    onClick={() => addToCart(item)}
                                    className="bg-green-700 text-white rounded px-3 py-1"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
