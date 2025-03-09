import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CoinContext } from "../../Context/CoinContext";

export default function Home() {

  const { coins, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const[search,setSearch]=useState("");
  const navigate=useNavigate()
  

  function inputHandler(e){
    setSearch(e.target.value);
    if(e.target.value===""){
      setDisplayCoin(coins)
    }
  }
async function searchHandler(e){
  e.preventDefault();
  const filterCoins= await coins.filter((item)=>{
   return item.name.toLowerCase().includes(search.toLowerCase());
  })
  setDisplayCoin(filterCoins);
}
  useEffect(() => {
    setDisplayCoin(coins);
  }, [coins]);

  return (
    <>
      <div className="px-[10px] pb-[100px]">
        <div className="hero text-white max-w-[600px] my-20 mx-auto flex flex-col items-center text-center gap-7">
          <h1 className="capitalize font-extrabold text-4xl md:text-6xl leading-tight">
            largest <br /> crypto marketplace
          </h1>
          <p className="w-[75%] text-[#e3e3e3] leading-6 text-md">
            Welcome to the world's largest cryptocurrency marketplace. Sign up
            to explore more about cryptos.
          </p>
          <form onSubmit={searchHandler} className="flex gap-2 items-center justify-center rounded-[5px] text-lg w-full z-20">
           <div className="md:w-[130%]">
           <input
              onChange={inputHandler}
              list="coinList"
              value={search}
              required
              type="text"
              placeholder="search crypto"
              className="bg-transparent rounded-[5px] text-white capitalize w-full text-[16px] outline-none border focus:border-[#5fd] border-[#5fd] pl-2 z-40"
            />

            <datalist id="coinList" className="w-14">
              {coins.map((item,index)=>{
                return <option key={index} value={item.name}/>
              })}
            </datalist>
           </div>
           <div>
           <button
              type="submit"
              className=" border-none py-1.5 px-6 bg-[#2e665a] text-[16px] tracking-wider rounded-[5px] capitalize"
            >
              search
            </button>
           </div>
          </form>
        </div>

        
        <div className="relative flex justify-center rounded-[15px]">
          <table className="w-full text-sm text-left rtl:text-right table rounded-[15px]">
            <thead className="text-[12px] lg:text-[15px] text-white uppercase">
              <tr className="font-medium tracking-wider capitalize border-b border-b-white/30">
                <th scope="col" className="px-4 py-3">
                  #
                </th>
                <th scope="col" className="px-4 py-3">
                  coins
                </th>
                <th scope="col" className="px-4 py-3">
                  price
                </th>
                <th scope="col" className="px-4 py-3">
                  24h change
                </th>
                <th scope="col" className="px-4 py-3 hidden md:block">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody>
              {displayCoin.slice(0, 15).map((item, index) => {
                const islastIndex = index === 14;
                return (
                  <tr key={item.id}
                  onClick={()=>{
                    navigate(`/coin/${item.id}`)
                  }}
                    className={`text-white font-medium tracking-wider capitalize text-[10px] sm:text-[12px] lg:text-[14px] cursor-pointer ${
                      islastIndex
                        ? "border border-none"
                        : "border-b border-b-white/40"
                    }`}
                  >
                    <th scope="row" className="px-6 py-5 font-medium whitespace-nowrap text-white">
                      {item.market_cap_rank}
                    </th>
                    <td className="px-4 py-3">
                      <div className="flex gap-4 items-center ">
                        <img
                          className="w-[35px] object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                        <p>{item.name}-{item.symbol}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {currency.symbol} {item.current_price.toLocaleString()}
                    </td>
                    <td className={`px-4 py-3 ${item.price_change_percentage_24h>0?"text-green-400":"text-red-400"}`}>
                      {Math.floor(item.price_change_percentage_24h * 100) / 100}
                    </td>
                    <td className="px-4 py-3 hidden md:block">
                      {currency.symbol} {item.market_cap.toLocaleString()}
                    </td>
                  </tr> 
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
