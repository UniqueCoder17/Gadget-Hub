import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getStoredOrders } from "../../utility/orderDb";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  return (
    <div className="w-11/12 mx-auto py-10">

      <Helmet>
        <title>Order History | Gadget Heaven</title>
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-10 text-[#9538E2]">
        Order History
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-gray-500">
            No Orders Found
          </h2>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-gradient-to-b from-[#9b56d4] to-blue-300 rounded-2xl shadow-xl p-6 mb-8 text-white"
          >
            {/* Order Info */}
            <div className="flex justify-between items-center">

              <div>
                <h2 className="text-2xl font-bold">
                  Order #{order.id}
                </h2>

                <p className="mt-1">
                  Date : {order.date}
                </p>

                <p>
                  Payment : {order.payment}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  Gadget Heaven
                </h2>
              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-5 text-black">

              <div className="flex justify-between py-1">
                <span>Items</span>
                <span>{order.items}</span>
              </div>

              <div className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>${order.subtotal?.toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-1">
                <span>Shipping</span>
                <span>${order.shipping?.toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-1">
                <span>VAT (5%)</span>
                <span>${order.vat?.toFixed(2)}</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between text-xl font-bold text-[#9538E2]">
                <span>Total</span>
                <span>${order.total?.toFixed(2)}</span>
              </div>

            </div>

            <hr className="my-6 border-white/30" />

            {/* Products */}

            <div className="space-y-4">

              {order.products &&
                order.products.map((product) => (

                  <div
                    key={product.product_id}
                    className="bg-white rounded-xl p-4 flex justify-between items-center"
                  >

                    <div className="flex items-center gap-5">

                      <img
                        src={product.product_image}
                        alt={product.product_title}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div>

                        <h2 className="text-xl font-bold text-black">
                          {product.product_title}
                        </h2>

                        <p className="text-gray-500">
                          {product.category}
                        </p>

                      </div>

                    </div>

                    <h2 className="text-2xl font-bold text-[#9538E2]">
                      ${product.price}
                    </h2>

                  </div>

                ))}

            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;