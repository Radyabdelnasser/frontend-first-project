
import React from 'react'
import { Link } from 'react-router-dom'

export default function HeroSections() {


    return <>


        <div style={ {backgroundImage : "url('/src/assets/ChatGPT bg Image.png')"} } className="  pt-5">

            <div className="relative isolate ">
                {/* <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75" />
                </div> */}
                <div className="mx-auto max-w-2xl sm:py-48 lg:py-40">
                    {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                            Announcing our next round of funding. <a href="#" className="font-semibold text-indigo-400"><span aria-hidden="true" className="absolute inset-0" />Read more <span aria-hidden="true">→</span></a>
                        </div>
                    </div> */}
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-balance text-blue-600 sm:text-7xl">All you need, all in one place</h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">Find everything you need — from timeless classics to the latest trends — all crafted with quality you can trust and prices you’ll love</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to='products' className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Get started →</Link>
                        </div>
                    </div>
                </div>
    
            </div>
        </div>


        





    </>
}
