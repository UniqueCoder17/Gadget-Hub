// Get Products
const getStoredProducts = () => {
    const products = localStorage.getItem("products");

    if (products) {
        return JSON.parse(products);
    }

    return [];
};

// Save Products
const saveProducts = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
};

export {
    getStoredProducts,
    saveProducts,
};