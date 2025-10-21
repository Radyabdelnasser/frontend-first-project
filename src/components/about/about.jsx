import React from "react";

export default function About() {
    return (
        <section className="bg-slate-700 text-white min-h-screen pt-24 pb-16 px-6">
            <div className="max-w-5xl mx-auto">

                {/* العنوان الرئيسي */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        About <span className="text-blue-500">Cartyx</span>
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Welcome to <span className="text-blue-400 font-semibold">Cartyx</span>, 
                        your trusted destination for premium tech products and an exceptional shopping experience.
                    </p>
                </div>

                {/* من نحن */}
                <div className="bg-gray-900 rounded-xl p-8 shadow-lg mb-10">
                    <h2 className="text-2xl font-semibold mb-3 text-blue-400">Who We Are</h2>
                    <p className="text-gray-300 leading-relaxed">
                        We’re a passionate team of developers, designers, and dreamers who love technology and clean code.
                        Cartyx started as a small side project and grew into a fully functional e-commerce platform,
                        designed to showcase our skills and our love for innovation.
                    </p>
                </div>

                {/* رؤيتنا */}
                <div className="bg-gray-900 rounded-xl p-8 shadow-lg mb-10">
                    <h2 className="text-2xl font-semibold mb-3 text-blue-400">Our Vision</h2>
                    <p className="text-gray-300 leading-relaxed">
                        To create a smooth, modern, and fast online shopping experience built with the latest web technologies.
                        We aim to inspire young developers to learn, build, and share their own creative projects.
                    </p>
                </div>

                {/* التواصل */}
                <div className="text-center mt-12">
                    <h3 className="text-2xl font-semibold mb-4">Want to know more?</h3>
                    <p className="text-gray-300 mb-6">
                        Feel free to explore our products, check the code, or contact us for collaboration.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg transition">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    );
}
