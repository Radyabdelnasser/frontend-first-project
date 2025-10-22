import React from 'react'
import { Link } from 'react-router-dom'

export default function HeroSections() {
    return (
        <div
            style={{ backgroundImage: "url('/frontend-first-project/bg.png')" }}
            className="pt-10 bg-cover bg-center min-h-screen flex items-center justify-center"
        >
            <div className="relative text-center px-4 sm:px-6 md:px-12 max-w-3xl">
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-blue-600 leading-tight">
                    All you need, all in one place
                </h1>

                <p className="mt-4 text-gray-700 text-sm sm:text-lg md:text-xl leading-relaxed">
                    Find everything you need — from timeless classics to the latest trends —
                    all crafted with quality you can trust and prices you’ll love.
                </p>

                <div className="mt-8">
                    <Link
                        to="products"
                        className="rounded-md bg-blue-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-blue-500 transition"
                    >
                        Get started →
                    </Link>
                </div>
            </div>
        </div>
    )
}
