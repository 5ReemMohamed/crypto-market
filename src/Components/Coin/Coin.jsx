import CoinChart from "../CoinChart/CoinChart";
import React, { useContext, useEffect, useState } from "react";
import { BiLeftArrowCircle } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { CoinContext } from "../../Context/CoinContext";

export default function Coin() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const { currency } = useContext(CoinContext);

  async function fetchCoinData() {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-2o5YFRKVL3yShJ7YLdCcpiTi' }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error("Error fetching coin data:", err);
    }
  }

  async function fetchHistoricalData() {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-2o5YFRKVL3yShJ7YLdCcpiTi' }
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error("Error fetching historical data:", err);
    }
  }

  useEffect(() => {
    setLoading(true); 
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]); 

  useEffect(() => {
   
    if (coinData && historicalData) {
      setLoading(false); 
    }
  }, [coinData, historicalData]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/90">
        <RingLoader size={150} color="#5fd" loading={loading} />
      </div>
    );
  }

  const getValueOrFallback = (value, fallback = 'N/A') => (value !== undefined && value !== null ? value : fallback);

  return (
    <div className="text-white px-5 my-14 capitalize">
      <Link to="/" className="flex gap-4 items-center text-[#5fd]"><BiLeftArrowCircle className="text-3xl" /> go back</Link>
      <div className="flex flex-col items-center gap-5 mx-auto my-24 mb-12">
        <img className="max-w-[200px]" src={coinData?.image?.large || ''} alt={coinData?.name || 'Coin'} />
        <p>
          <b>{coinData?.name} ({coinData?.symbol?.toUpperCase() || 'N/A'})</b>
        </p>
      </div>

      <div className="mb-12 mx-auto max-w-[80%] capitalize">
        {historicalData ? (
          <CoinChart historicalData={historicalData} />
        ) : (
          <p>Loading historical data...</p> 
        )}
      </div>

      <div className="flex mx-auto flex-col gap-6 max-w-[80%]">
        <ul className="flex justify-between border-b border-b-white pb-5 capitalize">
          <li>Crypto market rank</li>
          <li>{getValueOrFallback(coinData?.market_cap_rank)}</li>
        </ul>
        <ul className="flex justify-between border-b border-b-white pb-3 capitalize">
          <li>Current price</li>
          <li>
            {currency?.symbol} 
            {getValueOrFallback(coinData?.market_data?.current_price[currency?.name], 'N/A').toLocaleString()}
          </li>
        </ul>
        <ul className="flex justify-between border-b border-b-white pb-3 capitalize">
          <li>Market cap</li>
          <li>
            {currency?.symbol} 
            {getValueOrFallback(coinData?.market_data?.market_cap[currency?.name], 'N/A').toLocaleString()}
          </li>
        </ul>
        <ul className="flex justify-between border-b border-b-white pb-3 capitalize">
          <li>24 hour high</li>
          <li>
            {currency?.symbol} 
            {getValueOrFallback(coinData?.market_data?.high_24h[currency?.name], 'N/A').toLocaleString()}
          </li>
        </ul>
        <ul className="flex justify-between border-b border-b-white pb-3 capitalize">
          <li>24 hour low</li>
          <li>
            {currency?.symbol} 
            {getValueOrFallback(coinData?.market_data?.low_24h[currency?.name], 'N/A').toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
}
