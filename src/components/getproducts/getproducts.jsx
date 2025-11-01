
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

    // search
    const [search, setSearch] = useState('');

    const [searchInput, setSearchInput] = useState('')



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
            let response = await fetch('https://dummyjson.com/products?limit=600')
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



    // search functionality

    const filteredProducts = products.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    )

    // const filteredProducts = products.filter(item =>
    //     item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     item.description.toLowerCase().includes(searchTerm.toLowerCase())
    // )


    return (
        <>
            {loading ? (
                <div className="flex items-center h-lvh justify-center py-20">
                    <PulseLoader
                        color={'09c'}
                        loading={loading}
                        cssOverride={override}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <section className=" py-8 mt-8">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-6 tracking-wide">
                        <span className="border-b-4 border-blue-900 pb-1">Featured Products</span>
                    </h2>

                    {/* Slider Section */}
                    <div className="px-4 md:px-8 mb-10">
                        <Slider {...settings}>
                            {[...products]
                                .filter(item =>
                                    ["laptops", "smartphones", "computers"].includes(item.category.toLowerCase()) &&
                                    item.price > 1000
                                )
                                // .sort(() => Math.random() - 0.5)
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

                    {/* search */}

                    <div className="flex justify-center w-1/2 mx-auto mt-4">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* زر البحث */}
                        <button
                            onClick={() => setSearch(searchInput)}
                            className="bg-blue-900 text-white rounded px-4 py-2 ml-3 hover:bg-blue-800 transition"
                        >
                            {search ? 'Search' : 'Search'}
                        </button>

                        {/* زر الإرجاع (يظهر بنفس شكل زر البحث) */}
                        {search && (
                            <button
                                onClick={() => {
                                    setSearch('');
                                    setSearchInput('');
                                }}
                                className="bg-gray-500 text-white rounded px-4 py-2 ml-3 hover:bg-gray-600 transition"
                            >
                                Show All
                            </button>
                        )}
                    </div>



                    {/* All Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 bg-white mt-5 gap-6 p-4">
                        {filteredProducts.map((item) => (
                            <div key={item.id} className="border rounded-xl shadow-md p-4 hover:scale-105 bg-gray-200">
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
