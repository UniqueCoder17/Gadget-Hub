import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
    FaBoxOpen,
    FaShoppingBag,
    FaDollarSign,
    FaWarehouse,
} from "react-icons/fa";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { getStoredProducts } from "../../utility/productDb";
import { getStoredOrders } from "../../utility/orderDb";

const Statistics = () => {

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setProducts(getStoredProducts());
        setOrders(getStoredOrders());
    }, []);

    const totalProducts = products.length;

    const totalStock = products.reduce(
        (sum, item) => sum + Number(item.stock || 0),
        0
    );

    const totalSold = products.reduce(
        (sum, item) => sum + Number(item.sold || 0),
        0
    );

    const totalRevenue = orders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
    );

    const chartData = [
        {
            name: "Products",
            value: totalProducts,
        },
        {
            name: "Sold",
            value: totalSold,
        },
        {
            name: "Stock",
            value: totalStock,
        },
    ];

    const pieData = [
        {
            name: "Sold",
            value: totalSold,
        },
        {
            name: "Stock",
            value: totalStock,
        },
    ];

    const COLORS = ["#9333EA", "#3B82F6"];

    const topProducts = [...products]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5);

    const today = new Date().toLocaleDateString();

    const todaysOrders = orders.filter(
        (order) =>
            new Date(order.date).toLocaleDateString() === today
    );

    const todaysRevenue = todaysOrders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
    );

    const averageOrderValue =
        orders.length > 0 ? totalRevenue / orders.length : 0;

    const bestSellingProduct =
        products.length > 0
            ? [...products].sort((a, b) => b.sold - a.sold)[0]
            : null;

    const lowStockProducts = products.filter(
        (item) => Number(item.stock) <= 5
    );

    return (
        <div>
            <Helmet>
                <title>Statistics | Gadget Heaven</title>
            </Helmet>

            <div className="text-white bg-[#b06be9] pb-5 space-y-5">
                <h1 className="text-2xl md:text-3xl font-bold text-center pt-5">
                    Statistics
                </h1>

                <p className="w-[400px] lg:w-[650px] text-center mx-auto">
                    Explore the latest gadgets that will take your experience to the next
                    level.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-5 py-10">

                <h2 className="text-4xl font-bold text-gray-800 mb-10">
                    Statistics Dashboard
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Total Products */}
                    <div className="bg-gradient-to-b from-[#b776ec] to-blue-300 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8">
                        <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                            <FaBoxOpen className="text-4xl text-purple-600" />
                        </div>

                        <p className="text-black text-lg">
                            Total Products
                        </p>

                        <h1 className="text-5xl font-bold mt-2 text-gray-800">
                            {totalProducts}
                        </h1>
                    </div>

                    {/* Products Sold */}
                    <div className="bg-gradient-to-b from-[#b776ec] to-blue-300 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8">
                        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
                            <FaShoppingBag className="text-4xl text-green-600" />
                        </div>

                        <p className="text-black text-lg">
                            Products Sold
                        </p>

                        <h1 className="text-5xl font-bold mt-2 text-gray-800">
                            {totalSold}
                        </h1>
                    </div>

                    {/* Revenue */}
                    <div className="bg-gradient-to-b from-[#b776ec] to-blue-300 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8">
                        <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center mb-6">
                            <FaDollarSign className="text-4xl text-yellow-500" />
                        </div>

                        <p className="text-black text-lg">
                            Sell
                        </p>

                        <h1 className="text-4xl font-bold mt-2 text-gray-800">
                            ${totalRevenue.toFixed(2)}
                        </h1>
                    </div>

                    {/* Available Stock */}
                    <div className="bg-gradient-to-b from-[#b776ec] to-blue-300 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8">
                        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                            <FaWarehouse className="text-4xl text-blue-600" />
                        </div>

                        <p className="text-black text-lg">
                            Available Stock
                        </p>

                        <h1 className="text-5xl font-bold mt-2 text-gray-800">
                            {totalStock}
                        </h1>
                    </div>

                </div>

                <div className="grid lg:grid-cols-2 gap-8 mt-10">

                    <div className="bg-gradient-to-b from-[#b776ec] to-gray-200 rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

                        <h2 className="text-2xl font-bold mb-5">
                            🏆 Best Selling Product
                        </h2>

                        {
                            bestSellingProduct ? (

                                <div className="flex items-center gap-5">

                                    <img
                                        src={bestSellingProduct.product_image}
                                        className="w-28 h-28 rounded-xl object-cover"
                                    />

                                    <div>

                                        <h1 className="text-2xl font-bold">
                                            {bestSellingProduct.product_title}
                                        </h1>

                                        <p className="text-gray-500 mt-2">
                                            Sold : {bestSellingProduct.sold}
                                        </p>

                                        <p className="text-purple-600 font-bold">
                                            Stock : {bestSellingProduct.stock}
                                        </p>

                                    </div>

                                </div>

                            ) : (
                                <p>No sales yet.</p>
                            )
                        }

                    </div>

                    <div className="bg-gradient-to-b from-[#b776ec] to-gray-200 rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

                        <h2 className="text-2xl font-bold mb-5">
                            📈 Today's Statistics
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span>Today's Orders</span>
                                <span className="font-bold">
                                    {todaysOrders.length}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Today's Sell</span>
                                <span className="font-bold text-green-600">
                                    ${todaysRevenue.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Average Order</span>
                                <span className="font-bold">
                                    ${averageOrderValue.toFixed(2)}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>
                <div className="grid lg:grid-cols-2 gap-8 mt-10">

                    {/* Bar Chart */}

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-2xl font-bold mb-5">
                            Sales Overview
                        </h2>

                        <div className="h-80">

                            <ResponsiveContainer width="100%" height="100%">

                                <BarChart data={chartData}>

                                    <XAxis dataKey="name" />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar
                                        dataKey="value"
                                        fill="#9333EA"
                                        radius={[10, 10, 0, 0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                    {/* Pie Chart */}

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-2xl font-bold mb-5">
                            Inventory Distribution
                        </h2>

                        <div className="h-80">

                            <ResponsiveContainer width="100%" height="100%">

                                <PieChart>

                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        outerRadius={100}
                                        label
                                    >

                                        {pieData.map((entry, index) => (

                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />

                                        ))}

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

                    <h2 className="text-2xl font-bold mb-6">
                        🏆 Top Selling Products
                    </h2>

                    {
                        topProducts.map(product => (

                            <div
                                key={product.product_id}
                                className="flex justify-between items-center border-b py-4"
                            >

                                <div className="flex items-center gap-4">

                                    <img
                                        src={product.product_image}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />

                                    <div>

                                        <h3 className="font-bold">
                                            {product.product_title}
                                        </h3>

                                        <p className="text-gray-500">
                                            Stock : {product.stock}
                                        </p>

                                    </div>

                                </div>

                                <div className="font-bold text-green-600">

                                    Sold : {product.sold}

                                </div>

                            </div>

                        ))
                    }

                </div>
                <div className="bg-gradient-to-b from-[#b776ec] to-blue-300 rounded-2xl shadow-lg p-6 mt-10">

                    <h2 className="text-2xl font-bold mb-6">
                        Recent Orders
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Payment</th>

                                    <th>Date</th>

                                    <th>Total</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    orders.slice(0, 5).map(order => (

                                        <tr key={order.id}>

                                            <td>{order.id}</td>

                                            <td>{order.payment}</td>

                                            <td>{order.date}</td>

                                            <td>${order.total.toFixed(2)}</td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>
                <div className="bg-gradient-to-b from-[#b776ec] to-blue-300 rounded-3xl shadow-lg p-8 mt-10">

                    <h2 className="text-2xl font-bold mb-6">
                        ⚠️ Low Stock Products
                    </h2>

                    {
                        lowStockProducts.length > 0 ? (

                            lowStockProducts.map(product => (

                                <div
                                    key={product.product_id}
                                    className="flex justify-between border-b py-4"
                                >

                                    <span className="font-semibold">
                                        {product.product_title}
                                    </span>

                                    <span className="text-red-600 font-bold">
                                        {product.stock} Left
                                    </span>

                                </div>

                            ))

                        ) : (

                            <h2 className="text-green-600 text-xl font-bold">
                                All Products Have Enough Stock ✅
                            </h2>

                        )
                    }

                </div>

            </div>

        </div>
    );
};

export default Statistics;