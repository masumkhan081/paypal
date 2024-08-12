import { StrictMode } from 'react'
import React from "react";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Routes, Route, useParams } from 'react-router-dom';
// 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PaymentSuccess from './PaymentSuccess.jsx';
import PaymentFailed from './PaymentFailed.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "payment/success/:tran_id",
    element: <PaymentSuccess />,
  },
  {
    path: "payment/failed/:tran_id",
    element: <PaymentFailed />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


