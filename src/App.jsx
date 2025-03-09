import "./App.css";
import Coin from "./Components/Coin/Coin";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Notfound from "./Components/Notfound/Notfound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {

  const route= createBrowserRouter([
    {path:"/", element:<Layout/>, children:[
      {index:true, element:<Home/>},
      {path:"/coin/:coinId", element:<Coin/>},
      {path:"*",element:<Notfound/>}
    ]}
  ])
  

  return (
    <>
    <RouterProvider router={route} ></RouterProvider>
    </>
  )
}

export default App
