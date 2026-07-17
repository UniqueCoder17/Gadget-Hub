import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import bkash from "../../assets/bkash.jpg";
import nagad from "../../assets/nagad.webp";
import rocket from "../../assets/rocket.png";
import { useNavigate } from "react-router-dom";
import { saveOrder } from "../../utility/orderDb";
import {
    getStoredCartList,
    clearStoredCartList,
} from "../../utility/addToDb";
import logo from "../../assets/favicon-16x16.png";
import {
    getStoredProducts,
    saveProducts,
} from "../../utility/productDb";



const Payment = () => {
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("");
    const [gadgets, setGadgets] = useState([]);

    // Load products
    useEffect(() => {
        const storedProducts = getStoredProducts();

        if (storedProducts.length > 0) {
            setGadgets(storedProducts);
        } else {
            fetch("/gadgetsData.json")
                .then((res) => res.json())
                .then((data) => {
                    saveProducts(data);
                    setGadgets(data);
                });
        }
    }, []);

    const handlePayment = () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        // Cart IDs
        const storedCart = getStoredCartList();

        const purchasedProducts = storedCart
            .map((cartItem) => {
                const product = gadgets.find(
                    (item) => item.product_id === cartItem.product_id
                );

                if (!product) return null;

                return {
                    ...product,
                    quantity: cartItem.quantity,
                };
            })
            .filter(Boolean);

        const total = purchasedProducts.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
        );

        const shipping = purchasedProducts.length > 0 ? 20 : 0;
        const vat = total * 0.05;
        const grandTotal = total + shipping + vat;

        // Order Object
        const order = {
            id: Date.now(),
            payment: paymentMethod,
            date: new Date().toLocaleString(),

            items: purchasedProducts.reduce(
                (sum, item) => sum + item.quantity,
                0
            ),

            productsCount: purchasedProducts.length,

            subtotal: total,
            shipping,
            vat,
            total: grandTotal,

            products: purchasedProducts,
        };

        const products = getStoredProducts();

        const updatedProducts = products.map((item) => {
            const boughtProduct = purchasedProducts.find(
                (p) => p.product_id === item.product_id
            );

            if (boughtProduct) {
                return {
                    ...item,

                    // Stock কমবে
                    stock: Math.max(
                        0,
                        Number(item.stock) - boughtProduct.quantity
                    ),

                    // Sold বাড়বে
                    sold:
                        Number(item.sold || 0) +
                        boughtProduct.quantity,
                };
            }

            return item;
        });

        console.log("Before Update:", products);
        console.log("Purchased:", purchasedProducts);
        console.log("After Update:", updatedProducts);

        saveProducts(updatedProducts);

        // State Update
        setGadgets(updatedProducts);

        // Save Order
        saveOrder(order);

        // Clear Cart
        clearStoredCartList();

        navigate("/success");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-16">
            <Helmet>
                <title>Payment | Gadget Heaven</title>
            </Helmet>

            <div className="max-w-6xl mx-auto px-5">

                <div className="mb-8 border-b pb-6">
                    <div className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="Gadget Heaven Logo"
                            className="w-6 h-6 rounded-xl object-cover"
                        />

                        <h1 className="text-3xl font-bold text-gray-800">
                            Gadget Heaven
                        </h1>
                    </div>

                    <p className="text-gray-500 mt-2">
                        <p className="text-gray-500 ml-12 mt-1">
                            Fast • Secure • Trusted Checkout Experience
                        </p>
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Payment Methods */}

                    <div className="lg:col-span-2 bg-gradient-to-b from-[#b776ec] to-blue-300 rounded-3xl shadow-2xl p-8">

                        <h2 className="text-2xl font-bold mb-8">
                            Payment Methods
                        </h2>

                        <div className="space-y-5">

                            {/* Card */}

                            <label className={`flex justify-between items-center border-2 rounded-2xl p-5 cursor-pointer transition duration-300 hover:border-purple-600 ${paymentMethod === "Card"
                                ? "border-purple-700 bg-purple-50"
                                : "border-gray-200"
                                }`}>

                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-3xl">
                                        💳
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-lg">
                                            Credit / Debit Card
                                        </h3>

                                        <p className="text-black text-sm">
                                            Visa • Mastercard • American Express
                                        </p>
                                    </div>
                                </div>

                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "Card"}
                                    onChange={() => setPaymentMethod("Card")}
                                />

                            </label>

                            {/* bKash */}

                            <label className={`flex justify-between items-center border-2 rounded-2xl p-5 cursor-pointer transition duration-300 hover:border-pink-500 ${paymentMethod === "bKash"
                                ? "border-pink-500 bg-pink-50"
                                : "border-gray-200"
                                }`}>

                                <div className="flex items-center gap-5">

                                    <img
                                        src={bkash}
                                        className="w-14 h-14 rounded-xl object-cover"
                                        alt=""
                                    />

                                    <div>
                                        <h3 className="font-bold text-lg">
                                            bKash
                                        </h3>

                                        <p className="text-black text-sm">
                                            Fast Mobile Banking
                                        </p>
                                    </div>

                                </div>

                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "bKash"}
                                    onChange={() => setPaymentMethod("bKash")}
                                />

                            </label>

                            {/* Nagad */}

                            <label className={`flex justify-between items-center border-2 rounded-2xl p-5 cursor-pointer transition duration-300 hover:border-orange-500 ${paymentMethod === "Nagad"
                                ? "border-orange-500 bg-orange-50"
                                : "border-gray-200"
                                }`}>

                                <div className="flex items-center gap-5">

                                    <img
                                        src={nagad}
                                        className="w-14 h-14 rounded-xl object-cover"
                                        alt=""
                                    />

                                    <div>
                                        <h3 className="font-bold text-lg">
                                            Nagad
                                        </h3>

                                        <p className="text-black text-sm">
                                            Digital Payment
                                        </p>
                                    </div>

                                </div>

                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "Nagad"}
                                    onChange={() => setPaymentMethod("Nagad")}
                                />

                            </label>

                            {/* Rocket */}

                            <label className={`flex justify-between items-center border-2 rounded-2xl p-5 cursor-pointer transition duration-300 hover:border-purple-700 ${paymentMethod === "Rocket"
                                ? "border-purple-700 bg-purple-50"
                                : "border-gray-200"
                                }`}>

                                <div className="flex items-center gap-5">

                                    <img
                                        src={rocket}
                                        className="w-14 h-14 rounded-xl object-cover"
                                        alt=""
                                    />

                                    <div>
                                        <h3 className="font-bold text-lg">
                                            Rocket
                                        </h3>

                                        <p className="text-black text-sm">
                                            Dutch Bangla Mobile Banking
                                        </p>
                                    </div>

                                </div>

                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "Rocket"}
                                    onChange={() => setPaymentMethod("Rocket")}
                                />

                            </label>

                            {/* COD */}

                            <label className={`flex justify-between items-center border-2 rounded-2xl p-5 cursor-pointer transition duration-300 hover:border-green-600 ${paymentMethod === "COD"
                                ? "border-green-600 bg-green-50"
                                : "border-gray-200"
                                }`}>

                                <div className="flex items-center gap-5">

                                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-3xl">
                                        💵
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-lg">
                                            Cash On Delivery
                                        </h3>

                                        <p className="text-black text-sm">
                                            Pay after receiving your order
                                        </p>
                                    </div>

                                </div>

                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "COD"}
                                    onChange={() => setPaymentMethod("COD")}
                                />

                            </label>

                        </div>

                    </div>

                    {/* Summary */}

                    <div className="bg-gradient-to-b from-[#bb75f5] to-blue-300 rounded-3xl shadow-2xl p-8 h-fit sticky top-24">

                        <h2 className="text-2xl font-bold mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span>Products</span>
                                <span>{getStoredCartList().length}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>$20</span>
                            </div>

                            <div className="flex justify-between">
                                <span>VAT</span>
                                <span>5%</span>
                            </div>

                            <hr />

                            <p className="text-white font-semibold">
                                🔒 Secure SSL Encrypted Payment
                            </p>

                        </div>

                        <button
                            onClick={handlePayment}
                            className="w-full mt-8 py-4 rounded-2xl bg-purple-600 hover:bg-purple-800 text-white font-bold text-lg transition duration-300"
                        >
                            Confirm Payment
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Payment;