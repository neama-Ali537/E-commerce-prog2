import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Componants/Home/Home";
import About from "./Componants/About/About";
import Layout from "./Componants/Layout/Layout";
import CardDetails from "./Componants/CardDetails/CardDetails";
import Shop from "./Componants/Shop/Shop";
import Card from "./Componants/Card/Card";

import DataContextProvider from "./Componants/DataContext/DataContextProvider";

import ShoppingCardProvider from "./Componants/ShoppingCardContext/ShoppingCardContext";
import Error from "./Componants/Error/Error";

let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },

      {
        path: "/carddetails/:id",
        element: <CardDetails />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "card",
        element: <Card />,
      },{
        path: "*",
        element: <Error />,
      }
    ],
  },
]);

export default function App() {
  return (
    <>
      <ShoppingCardProvider>
        <DataContextProvider>
          <RouterProvider router={routers} />
        </DataContextProvider>
      </ShoppingCardProvider>
    </>
  );
}
