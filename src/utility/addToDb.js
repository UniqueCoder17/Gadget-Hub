// Cart

const getStoredCartList = () => {
    const storedListStr = localStorage.getItem("cart-list");

    if (storedListStr) {
        return JSON.parse(storedListStr);
    }

    return [];
};

const addTOStoredCartList = (id) => {
    const storedList = getStoredCartList();

    if (!storedList.includes(id)) {
        storedList.push(id);
        localStorage.setItem("cart-list", JSON.stringify(storedList));
    }
};

const removeStoredCartList = (id) => {
    const storedList = getStoredCartList();

    const remaining = storedList.filter(item => item !== id);

    localStorage.setItem("cart-list", JSON.stringify(remaining));
};

const clearStoredCartList = () => {
    localStorage.removeItem("cart-list");
};



// Wishlist

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
    removeStoredCartList,
    clearStoredCartList,

    getStoredWishList,
    addTOStoredWishList,
    removeStoredWishList,
    clearStoredWishList,
};