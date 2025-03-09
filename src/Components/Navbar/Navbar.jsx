import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { FaBars } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { CoinContext } from "../../Context/CoinContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const{setCurrency}=useContext(CoinContext);
  function currencyHandler(e){
    switch(e.target.value){
      case "usd":{
        setCurrency({name:"usd",symbol:"$"});
        break;
      }
      case "eur":{
        setCurrency({name:"eur",symbol:"€"});
        break;
      }
      case "inr":{
        setCurrency({name:"inr",symbol:"₹"});
        break;
      }
      default : {
        setCurrency({name:"usd",symbol:"$"});
      }
    }
  }
  return (
    <>
  
      <nav className={`w-full border-b fixed z-50 border-white/40 bg-transparent ${
        scrolled ? "backdrop-blur-3xl bg-[#201F31]/80 shadow-md" : "bg-[#201F31]"
      }`}>
        <div className="max-w-screen-xl flex  flex-wrap gap-2  items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="website Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
          </Link>
          <div className="flex md:gap-2 md:order-2 rtl:space-x-reverse">
              <select onChange={currencyHandler} className="border-2 border-white bg-transparent text-white py-[5px] px-[8px] rounded-[6px]">
                  <option className="bg-[#003a40] text-white" value="usd">USD</option>
                  <option className="bg-[#003a40] text-white" value="eur">EUR</option>
                  <option className="bg-[#003a40] text-white" value="inr">INR</option>
              </select>
            <button type="button" className="text-[#002641] bg-white  border border-white hidden  focus:outline-none text-[16px] font-medium rounded-[20px] text-sm text-center md:flex gap-1 justify-center items-center px-[15px] py-[10px]">sign in <MdArrowOutward />
            </button>
          
            <button
             onClick={() => setMenuOpen(!menuOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 text-xl justify-center  text-[#5fd] rounded-lg md:hidden focus:outline-none   dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <FaBars />
            </button>
          </div>
          <div  className={`${
            menuOpen ? "block" : "hidden"
          } grow gap-6 w-full mx-auto  lg:flex items-center lg:w-auto`}
        >
            <ul className="text-white cursor-pointer flex flex-col mx-auto p-4 md:p-0 mt-4 font-medium  rounded-lg  lg:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
           
            <li className="block py-2 px-3 text-[#ddd]"><NavLink to="/">Home</NavLink></li>
            <li className="block py-2 px-3 text-[#ddd]">Features</li>
            <li className="block py-2 px-3 text-[#ddd]">Pricing</li>
            <li className="block py-2 px-3 text-[#ddd]">Blog</li>
            </ul>
          </div>
        </div>
      </nav>


    </>
  )
}
