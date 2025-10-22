import React, { useEffect, useState, useContext } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from 'react-router-dom'
import { CartContext } from '../cartContext/cartContext'
import { PulseLoader } from "react-spinners"

export default function Getproducts() {
    const { addToCart } = useContext(CartContext)

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const color = "#09c"
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#09c",
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024, // أقل من لابتوب
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768, // تابلت أو موبايل
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };



    async function getdata() {
        setLoading(true)
        try {
            let response = await fetch('https://dummyjson.com/products?limit=400')
            let data = await response.json()
            setProducts(data.products)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <>
            {loading ? (
                <div className="flex items-center h-lvh justify-center py-20">
                    <PulseLoader
                        color={color}
                        loading={loading}
                        cssOverride={override}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <section className="bg-slate-700 py-8 mt-12">
                    <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
                        <span className="border-b-4 border-blue-500 pb-1">Featured Products</span>
                    </h2>

                    {/* Slider Section */}
                    <div className="px-4 md:px-8">
                        <Slider {...settings}>
                            {[...products]
                                .filter(item =>
                                    ["laptops", "smartphones", "computers"].includes(item.category.toLowerCase()) &&
                                    item.price > 1000
                                )
                                .sort(() => Math.random() - 0.5)
                                .slice(0, 9)
                                .map((item) => (
                                    <Link to={`/productdetails/${item.id}`} key={item.id}>
                                        <div className="p-2">
                                            <div className="bg-gray-900 rounded-xl hover:scale-105 transition duration-300 text-center shadow-md">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="h-48 mx-auto object-contain mb-4"
                                                />
                                                <h3 className="text-lg font-semibold text-white mb-2">
                                                    {item.title.split(" ").slice(0, 2).join(" ")}...
                                                </h3>
                                                <p className="text-blue-400 font-bold pb-4">${item.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </Slider>
                    </div>

                    {/* All Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 bg-white mt-10 gap-6 p-4">
                        {products.map((item) => (
                            <div key={item.id} className="border rounded-xl shadow-md p-4 bg-gray-200">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="h-40 w-full object-contain mb-3"
                                />
                                <h2 className="font-semibold mb-1">
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
                </section>
            )}
        </>
    )
}
