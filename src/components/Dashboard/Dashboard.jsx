import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData, useNavigate } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStoredProducts, saveProducts } from "../../utility/productDb";


import {
    getStoredCartList,
    getStoredWishList,
    addTOStoredCartList,
    removeStoredCartList,
    removeStoredWishList,
    increaseCartQuantity,
    decreaseCartQuantity,
} from "../../utility/addToDb";



const Dashboard = () => {

    const [allGadgets, setAllGadgets] = useState([]);

    useEffect(() => {
        const storedProducts = getStoredProducts();

        if (storedProducts.length > 0) {
            setAllGadgets(storedProducts);
        } else {
            fetch("/gadgetsData.json")
                .then(res => res.json())
                .then(data => {
                    saveProducts(data);
                    setAllGadgets(data);
                });
        }
    }, []);
    const navigate = useNavigate();

    const [cartList, setCartList] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [view, setView] = useState("cart");
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {

        const storedCart = getStoredCartList();

        const updatedCart = storedCart
            .map((cartItem) => {

                const product = allGadgets.find(
                    item => item.product_id === cartItem.product_id
                );

                if (!product) return null;

                return {
                    ...product,
                    quantity: cartItem.quantity,
                };

            })
            .filter(Boolean);

        setCartList(updatedCart);

        const storedWish = getStoredWishList();

        const updatedWish = allGadgets.filter(product =>
            storedWish.includes(product.product_id)
        );

        setWishList(updatedWish);

    }, [allGadgets]);

    useEffect(() => {

        if (view === "cart") {

            const total = cartList.reduce(

                (sum, item) =>

                    sum + item.price * item.quantity,

                0

            );

            setTotalCost(total);

        }

        else {

            const total = wishList.reduce(

                (sum, item) =>

                    sum + item.price,

                0

            );

            setTotalCost(total);

        }

    }, [cartList, wishList, view]);

    const handleDelete = (id) => {

        const gadget = (view === "cart" ? cartList : wishList).find(
            gadget => gadget.product_id === id
        );

        if (view === "cart") {

            removeStoredCartList(id);

            const updated = cartList.filter(
                gadget => gadget.product_id !== id
            );

            setCartList(updated);

            toast.warning(`${gadget.product_title} removed from cart`);
        }

        else {

            removeStoredWishList(id);

            const updated = wishList.filter(
                gadget => gadget.product_id !== id
            );

            setWishList(updated);

            toast.warning(`${gadget.product_title} removed from wishlist`);
        }
    };

    const handleSortByPrice = () => {

        if (view === "cart") {

            const sorted = [...cartList].sort(

                (a, b) =>

                    (b.price * b.quantity) -

                    (a.price * a.quantity)

            );

            setCartList(sorted);

        }

        else {

            const sorted = [...wishList].sort(

                (a, b) =>

                    b.price - a.price

            );

            setWishList(sorted);

        }

    };

    const handleDecreaseQuantity = (id) => {

        decreaseCartQuantity(id);

        setCartList(prev =>
            prev.map(item =>

                item.product_id === id
                    ? {
                        ...item,
                        quantity: Math.max(1, item.quantity - 1)
                    }
                    : item

            )
        );

    };

    const handleIncreaseQuantity = (id) => {

        increaseCartQuantity(id);

        setCartList(prev =>
            prev.map(item =>
                item.product_id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    const handleAddToCart = (id) => {

        const gadget = wishList.find(
            gadget => gadget.product_id === id
        );

        if (!gadget) return;

        addTOStoredCartList(id, 1);

        setCartList(prev => [
            ...prev,
            {
                ...gadget,
                quantity: 1,
            },
        ]);

        removeStoredWishList(id);

        setWishList(prev =>
            prev.filter(item => item.product_id !== id)
        );

        toast.success(`${gadget.product_title} added to cart`);
    };

    const handlePurchase = () => {

        if (cartList.length === 0) {

            toast.error("Cart is empty!");

            return;

        }

        navigate("/checkout");

    };


    return (
        <div>
            <Helmet>
                <title>Dashboard | Gadget Heaven</title>
            </Helmet>
            <ToastContainer position="top-center" />
            <div className='w-11/12 mx-auto'>
                <div className='text-white bg-[#9538E2] pb-5 space-y-5'>
                    <h1 className="text-2xl md:text-3xl font-bold text-center pt-5">Dashboard</h1>
                    <p className='w-[400px] lg:w-[650px] text-center mx-auto'>
                        Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!
                    </p>
                    <div className='text-center'>
                        <button className='btn px-10 mr-5 py-1 rounded-3xl' onClick={() => setView('cart')}>Cart</button>
                        <button className='btn px-10 py-1 rounded-3xl' onClick={() => setView('wishlist')}>Wish List</button>
                    </div>
                </div>

                <div>


                    {/* Dashboard Top */}

                    <div className="mt-8">

                        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

                            <h1 className="text-3xl font-bold">

                                {view === "cart" ? "Shopping Cart" : "Wishlist"}

                            </h1>

                            {
                                view === "cart" && (

                                    <div className="flex flex-col lg:flex-row gap-4">

                                        {/* Purchase Summary */}

                                        <div className="bg-base-100 shadow-lg rounded-xl p-5 min-w-[280px]">

                                            <h2 className="text-xl font-bold mb-3">

                                                Order Summary

                                            </h2>

                                            <div className="space-y-2">

                                                <div className="flex justify-between">

                                                    <span>Total Products</span>

                                                    <span>{cartList.length}</span>

                                                </div>

                                                <div className="flex justify-between">

                                                    <span>Total Quantity</span>

                                                    <span>

                                                        {

                                                            cartList.reduce(

                                                                (sum, item) =>

                                                                    sum + item.quantity,

                                                                0

                                                            )

                                                        }

                                                    </span>

                                                </div>

                                                <div className="divider my-2"></div>

                                                <div className="flex justify-between text-xl font-bold">

                                                    <span>Total</span>

                                                    <span className="text-[#9538E2]">

                                                        ${totalCost.toFixed(2)}

                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                        {/* Buttons */}

                                        <div className="flex flex-col gap-3">

                                            <button

                                                onClick={handleSortByPrice}

                                                className="btn btn-outline border-[#9538E2] text-[#9538E2]"

                                            >

                                                Sort By Price

                                            </button>

                                            <button

                                                onClick={handlePurchase}

                                                className="btn bg-[#9538E2] text-white hover:bg-purple-700"

                                            >

                                                Purchase

                                            </button>

                                        </div>

                                    </div>

                                )

                            }

                        </div>

                    </div>

                    <div className="flex flex-col gap-6 mt-10">

                        {(view === "cart" ? cartList : wishList).map((gadget) => (

                            <div
                                key={gadget.product_id}
                                className="bg-white rounded-2xl shadow-lg border p-5 flex flex-col lg:flex-row justify-between items-center gap-6 hover:shadow-xl duration-300"
                            >

                                {/* Left Side */}

                                <div className="flex flex-col md:flex-row gap-5 flex-1">

                                    <img
                                        src={gadget.product_image}
                                        alt={gadget.product_title}
                                        className="w-36 h-36 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">

                                        <h2 className="text-2xl font-bold">
                                            {gadget.product_title}
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            {gadget.description}
                                        </p>

                                        <p className="font-bold text-[#9538E2] mt-3 text-xl">
                                            Price : ${gadget.price}
                                        </p>

                                        {/* Cart Section */}

                                        {
                                            view === "cart" && (

                                                <>

                                                    {/* Quantity */}

                                                    <div className="flex items-center gap-4 mt-4">

                                                        <button
                                                            onClick={() => handleDecreaseQuantity(gadget.product_id)}
                                                            className="btn btn-circle btn-outline"
                                                        >
                                                            -
                                                        </button>

                                                        <span className="text-xl font-bold">
                                                            {gadget.quantity}
                                                        </span>

                                                        <button
                                                            onClick={() => handleIncreaseQuantity(gadget.product_id)}
                                                            className="btn btn-circle btn-outline"
                                                            disabled={
                                                                gadget.stock &&
                                                                gadget.quantity >= gadget.stock
                                                            }
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                    {/* Stock */}

                                                    <div className="mt-3">

                                                        {
                                                            gadget.stock === 0 ? (

                                                                <p className="text-red-500 font-bold">
                                                                    ❌ Out Of Stock
                                                                </p>

                                                            ) : (

                                                                <p className="text-green-600 font-semibold">
                                                                    Stock : {gadget.stock ?? "Unlimited"}
                                                                </p>

                                                            )
                                                        }

                                                    </div>

                                                    {/* Subtotal */}

                                                    <p className="text-lg font-bold text-green-600 mt-3">

                                                        Subtotal :
                                                        {" "}
                                                        ${(gadget.price * gadget.quantity).toFixed(2)}

                                                    </p>

                                                </>

                                            )
                                        }

                                        {/* Wishlist */}

                                        {
                                            view === "wishlist" && (

                                                <button
                                                    onClick={() => handleAddToCart(gadget.product_id)}
                                                    className="btn bg-[#9538E2] text-white mt-5 rounded-full"
                                                >
                                                    Add To Cart
                                                </button>

                                            )
                                        }

                                    </div>

                                </div>

                                {/* Delete */}

                                <button
                                    onClick={() => handleDelete(gadget.product_id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <TiDeleteOutline className="w-12 h-12" />
                                </button>

                            </div>

                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;