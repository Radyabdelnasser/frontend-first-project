
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'

export default function Layout() {



    return <>

        <Navbar /> 

        {/* <div className="  mt-5"> */}

            <Outlet />

        {/* </div> */}

        <Footer />



    </>


}
