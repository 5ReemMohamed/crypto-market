import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CoinContext= createContext();

export default function CoinContextProvider({children}){
    const [coins, setCoins] = useState([]);
    const [currency,setCurrency]=useState({
        name:"usd",
        symbol:"$"
    })

      function fetchAllCoins(){
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-2o5YFRKVL3yShJ7YLdCcpiTi'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setCoins(response))
            .catch(err => console.error(err));
    
      }
        useEffect(()=>{
            fetchAllCoins();
        },[currency]);

        const contextValue = {
            coins,currency,setCurrency,
        }
    return( 
    <CoinContext.Provider value={contextValue}>
       {children}
</CoinContext.Provider>
    )
}