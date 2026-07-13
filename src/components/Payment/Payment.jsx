import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { saveOrder } from "../../utility/orderDb";
import {
    getStoredCartList,
    clearStoredCartList,
} from "../../utility/addToDb";

const Payment = () => {
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("");
    const [gadgets, setGadgets] = useState([]);

    // Load products
    useEffect(() => {
        fetch("/gadgetsData.json")
            .then((res) => res.json())
            .then((data) => setGadgets(data));
    }, []);

    const handlePayment = () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        // Cart IDs
        const cartIds = getStoredCartList().map(id => Number(id));

        // Find purchased products
        const purchasedProducts = gadgets.filter(product =>
            cartIds.includes(Number(product.product_id))
        );

        // Total price
        const total = purchasedProducts.reduce(
            (sum, product) => sum + Number(product.price),
            0
        );

        const shipping = purchasedProducts.length > 0 ? 20 : 0;
        const vat = total * 0.05;
        const grandTotal = total + shipping + vat;

        console.log("Cart IDs:", cartIds);
        console.log("Purchased Products:", purchasedProducts);
        console.log("First Product:", purchasedProducts[0]);
        console.log("Price:", purchasedProducts[0]?.price);
        console.log("All Gadgets:", gadgets);

        // Order Object
        const order = {
            id: Date.now(),
            payment: paymentMethod,
            date: new Date().toLocaleString(),

            items: purchasedProducts.length,
            subtotal: total,
            shipping,
            vat,
            total: grandTotal,

            products: purchasedProducts,
        };

        // Save Order
        saveOrder(order);

        // Clear Cart
        clearStoredCartList();

        navigate("/success");
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <Helmet>
                <title>Payment | Gadget Heaven</title>
            </Helmet>

            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-10">
                    <h1 className="text-4xl font-bold text-center mb-10">
                        Payment Method
                    </h1>

                    <div className="space-y-5">

                        <label className="flex items-center justify-between border rounded-xl p-5 cursor-pointer hover:border-purple-600">
                            <span>💳 Credit / Debit Card</span>
                            <input
                                type="radio"
                                name="payment"
                                onChange={() => setPaymentMethod("Card")}
                            />
                        </label>

                        <label className="flex items-center justify-between border rounded-xl p-5 cursor-pointer hover:border-purple-600">
                            <span>🟣 bKash</span>
                            <input
                                type="radio"
                                name="payment"
                                onChange={() => setPaymentMethod("bKash")}
                            />
                        </label>

                        <label className="flex items-center justify-between border rounded-xl p-5 cursor-pointer hover:border-purple-600">
                            <span>🟠 Nagad</span>
                            <input
                                type="radio"
                                name="payment"
                                onChange={() => setPaymentMethod("Nagad")}
                            />
                        </label>

                        <label className="flex items-center justify-between border rounded-xl p-5 cursor-pointer hover:border-purple-600">
                            <span>🔵 Rocket</span>
                            <input
                                type="radio"
                                name="payment"
                                onChange={() => setPaymentMethod("Rocket")}
                            />
                        </label>

                        <label className="flex items-center justify-between border rounded-xl p-5 cursor-pointer hover:border-purple-600">
                            <span>💵 Cash On Delivery</span>
                            <input
                                type="radio"
                                name="payment"
                                onChange={() => setPaymentMethod("COD")}
                            />
                        </label>

                    </div>
                    <button
                        onClick={handlePayment}
                        className="btn btn-primary w-full mt-10"
                    >
                        Confirm Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;