// ========================= CART =========================

const getStoredCartList = () => {
    const storedListStr = localStorage.getItem("cart-list");

    if (storedListStr) {
        return JSON.parse(storedListStr);
    }

    return [];
};

const addTOStoredCartList = (id, quantity = 1) => {
    const storedList = getStoredCartList();

    const existingProduct = storedList.find(
        item => item.product_id === id
    );

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        storedList.push({
            product_id: id,
            quantity: quantity,
        });
    }

    localStorage.setItem("cart-list", JSON.stringify(storedList));
};

const increaseCartQuantity = (id) => {
    const storedList = getStoredCartList();

    const product = storedList.find(item => item.product_id === id);

    if (product) {
        product.quantity += 1;
    }

    localStorage.setItem("cart-list", JSON.stringify(storedList));
};

const decreaseCartQuantity = (id) => {
    let storedList = getStoredCartList();

    storedList = storedList.map(item => {
        if (item.product_id === id) {
            return {
                ...item,
                quantity: Math.max(1, item.quantity - 1),
            };
        }

        return item;
    });

    localStorage.setItem("cart-list", JSON.stringify(storedList));
};

const updateCartQuantity = (id, quantity) => {
    const storedList = getStoredCartList();

    const updated = storedList.map(item => {
        if (item.product_id === id) {
            return {
                ...item,
                quantity,
            };
        }

        return item;
    });

    localStorage.setItem("cart-list", JSON.stringify(updated));
};

const removeStoredCartList = (id) => {
    const storedList = getStoredCartList();

    const remaining = storedList.filter(
        item => item.product_id !== id
    );

    localStorage.setItem("cart-list", JSON.stringify(remaining));
};

const clearStoredCartList = () => {
    localStorage.removeItem("cart-list");
};

// ========================= WISHLIST =========================

const getStoredWishList = () => {
    const storedListStr = localStorage.getItem("wish-list");

    if (storedListStr) {
        return JSON.parse(storedListStr);
    }

    return [];
};

const addTOStoredWishList = (id) => {
    const storedList = getStoredWishList();

    if (!storedList.includes(id)) {
        storedList.push(id);
        localStorage.setItem("wish-list", JSON.stringify(storedList));
    }
};

const removeStoredWishList = (id) => {
    const storedList = getStoredWishList();

    const remaining = storedList.filter(item => item !== id);

    localStorage.setItem("wish-list", JSON.stringify(remaining));
};

const clearStoredWishList = () => {
    localStorage.removeItem("wish-list");
};

export {
    getStoredCartList,
    addTOStoredCartList,
    increaseCartQuantity,
    decreaseCartQuantity,
    updateCartQuantity,
    removeStoredCartList,
    clearStoredCartList,

    getStoredWishList,
    addTOStoredWishList,
    removeStoredWishList,
    clearStoredWishList,
};