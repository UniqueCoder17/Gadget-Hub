import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { getStoredOrders } from "../../utility/orderDb";

const Success = () => {
  const navigate = useNavigate();

  const orders = getStoredOrders();

  const lastOrder = orders[orders.length - 1];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-indigo-700">

      <Helmet>
        <title>Order Success | Gadget Heaven</title>
      </Helmet>

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[500px] text-center">

        <div className="text-7xl mb-5">
          🎉
        </div>

        <h1 className="text-4xl font-bold text-green-600">
          Order Successful!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for shopping with
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mt-2">
          Gadget Heaven
        </h2>

        <div className="mt-8 space-y-3 text-lg">

          <p>
            <span className="font-bold">Order ID :</span>
            {" "}
            #{lastOrder?.id}
          </p>

          <p>
            <span className="font-bold">Order Date :</span>
            {" "}
            {lastOrder?.date}
          </p>

          <p>
            <span className="font-bold">Payment :</span>
            {" "}
            {lastOrder?.payment}
          </p>

          <p>
            <span className="font-bold">Total :</span>
            {" "}
            ${lastOrder?.total}
          </p>

          <p>
            <span className="font-bold">Estimated Delivery :</span>
            3-5 Days
          </p>

          <p className="text-green-600 font-bold">
            Payment Completed Successfully
          </p>

        </div>

        <button
          onClick={() => navigate("/home")}
          className="btn btn-primary w-full mt-8"
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
};

export default Success;