import React from "react";
import not_found from "../../assets/notFound.png";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <>
    <div className="flex flex-col justify-center items-center gap-2 text-white">
        <img src={not_found} className="w-[40%]" alt="not found image" />
       <div className="absolute top-[69%] text-center">
       <h2 className="mb-4 text-6xl capitalize"><span className="text-[#5fd] ">404</span> not found page</h2>
        <p className="mb-8 capitalize">Sorry, the page you are looking for does not exist</p>
        <Link to="/" className="border capitalize text-lg border-[#5fd] text-[#5fd] rounded-[8px] px-6 py-3 my-4">back to home</Link>
       </div>
    </div>
    </>
  )
}
