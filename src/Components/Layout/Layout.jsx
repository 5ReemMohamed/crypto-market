import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
    <Navbar/>
   <div className="min-h-screen w-full app ">
       <div className="lg:max-w-screen-2xl container mx-auto py-60 md:py-24">
       <Outlet></Outlet>
       </div>
       <Footer/>
    </div>
    
   
    </>
  )
}
