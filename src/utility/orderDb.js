const getStoredOrders = () => {
    const storedOrders = localStorage.getItem("orders");

    if (storedOrders) {
        return JSON.parse(storedOrders);
    }

    return [];
};

// Save New Order
const saveOrder = (order) => {
    const orders = getStoredOrders();


    orders.unshift(order);

    localStorage.setItem("orders", JSON.stringify(orders));
};

// Delete Order
const deleteOrder = (id) => {
    const orders = getStoredOrders();

    const remaining = orders.filter(order => order.id !== id);

    localStorage.setItem("orders", JSON.stringify(remaining));
};

// Clear All Orders
const clearOrders = () => {
    localStorage.removeItem("orders");
};

export {
    getStoredOrders,
    saveOrder,
    deleteOrder,
    clearOrders,
};