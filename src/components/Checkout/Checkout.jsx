import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { getStoredCartList } from "../../utility/addToDb";
const Checkout = () => {
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    fetch("/gadgetsData.json")
      .then((res) => res.json())
      .then((data) => {
        const storedCart = getStoredCartList();

        const products = storedCart
          .map((cartItem) => {
            const product = data.find(
              (item) => item.product_id === cartItem.product_id
            );

            if (!product) return null;

            return {
              ...product,
              quantity: cartItem.quantity,
            };
          })
          .filter(Boolean);

        setCartProducts(products);

        const total = products.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        setSubtotal(total);
      });
  }, []);

  const shipping = cartProducts.length > 0 ? 20 : 0;
  const vat = subtotal * 0.05;
  const total = subtotal + shipping + vat;

  return (
    <div className="min-h-screen bg-gray-100 py-12">

      <Helmet>
        <title>Checkout | Gadget Heaven</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-5">

        <h1 className="text-4xl font-bold text-center mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Shipping */}

          <div className="lg:col-span-2 bg-gradient-to-b from-[#9b56d4] to-blue-300 text-black rounded-2xl shadow-xl p-8">

            <h1 className="text-3xl font-bold text-center mb-2">
              Checkout Form
            </h1>

            <p className="text-center text-white/80 mb-8">
              Please fill in your shipping details
            </p>

            <h2 className="text-2xl font-bold mb-6">
              Shipping Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-bordered w-full"
                value={shippingInfo.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={shippingInfo.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                value={shippingInfo.phone}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                className="input input-bordered w-full"
                value={shippingInfo.city}
                onChange={handleChange}
                required
              />

            </div>

            <textarea
              name="address"
              placeholder="Full Address"
              className="textarea textarea-bordered w-full mt-5 h-32"
              value={shippingInfo.address}
              onChange={handleChange}
              required
            ></textarea>

            {/* Products */}

            <h2 className="text-2xl font-bold mt-10 mb-5">
              Products
            </h2>

            <div className="space-y-4">

              {cartProducts.map((product) => (

                <div
                  key={product.product_id}
                  className="flex items-center justify-between border rounded-xl p-4"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={product.product_image}
                      alt={product.product_title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div>

                      <h3 className="font-bold">
                        {product.product_title}
                      </h3>

                      <p className="text-gray-500">
                        {product.category}
                      </p>
                      {
                        product.stock === 0 ? (
                          <p className="text-red-500 font-bold mt-1">
                            ❌ Out Of Stock
                          </p>
                        ) : (
                          <p className="text-green-600 font-semibold mt-1">
                            Stock: {product.stock}
                          </p>
                        )
                      }
                    </div>

                  </div>

                  <div className="text-right space-y-1">
                    <p className="text-sm text-gray-500">
                      Qty: <span className="font-bold">{product.quantity}</span>
                    </p>

                    <p className="text-purple-600 font-bold">
                      Price: ${Number(product.price).toFixed(2)}
                    </p>

                    <p className="text-green-600 font-bold">
                      Total: ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Order Summary */}

          <div className="bg-gradient-to-b from-[#9b56d4] to-blue-300 rounded-2xl shadow-xl p-8 h-fit sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Products</span>
                <span>{cartProducts.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Quantity</span>
                <span>
                  {cartProducts.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>VAT (5%)</span>
                <span>${vat.toFixed(2)}</span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-purple-700">
                  ${total.toFixed(2)}
                </span>

              </div>

            </div>

            <button
              onClick={() => {
                if (
                  !shippingInfo.name ||
                  !shippingInfo.email ||
                  !shippingInfo.phone ||
                  !shippingInfo.city ||
                  !shippingInfo.address
                ) {
                  alert("Please fill up all shipping information.");
                  return;
                }

                navigate("/payment");
              }}
              className="btn bg-purple-700 hover:bg-purple-800 text-white w-full mt-8"
            >
              Continue To Payment
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;