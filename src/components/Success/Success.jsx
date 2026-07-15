import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { getStoredOrders } from "../../utility/orderDb";

const Success = () => {
  const navigate = useNavigate();

  const orders = getStoredOrders();

  const lastOrder = orders[0];
  console.log("Orders:", orders);
  console.log(lastOrder.products[0]);
  if (!lastOrder) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">
          No Order Found
        </h1>
      </div>
    );
  }

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
            <span className="font-bold">Products :</span>{" "}
            {lastOrder?.products?.length}
          </p>

          <p>
            <span className="font-bold">Total Quantity :</span>{" "}
            {lastOrder?.items}
          </p>

          <div className="mt-6 text-left">

            <h2 className="text-xl font-bold text-[#9538E2] mb-4">
              Purchased Products
            </h2>

            <div className="space-y-3">

              {lastOrder?.products?.map((product) => (

                <div
                  key={product.product_id}
                  className="flex items-center justify-between border rounded-xl p-3"
                >

                  <div className="flex items-center gap-3">

                    <img
                      src={product.product_image}
                      alt={product.product_title}
                      className="w-14 h-14 rounded-lg object-cover"
                    />

                    <div>

                      <h3 className="font-bold">
                        {product.product_title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty : {Number(product.quantity)}
                      </p>
                      <p>
                        <span className="font-bold">Grand Total :</span>{" "}
                        ${lastOrder?.total?.toFixed(2)}
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-[#9538E2] font-bold">
                      ${Number(product.price).toFixed(2)}
                    </p>
                    <p className="text-green-600 font-bold">
                      ${(Number(product.price) * Number(product.quantity)).toFixed(2)}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

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