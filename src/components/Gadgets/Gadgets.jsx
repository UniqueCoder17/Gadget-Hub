import React, { useEffect, useState } from 'react';
import Gadget from '../Gadget/Gadget';
import { getStoredProducts, saveProducts } from "../../utility/productDb";


const Gadgets = () => {
    const [gadgets, setGadgets] = useState([]);
    const [filteredGadgets, setFilteredGadgets] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Product');

    useEffect(() => {
        const storedProducts = getStoredProducts();

        if (storedProducts.length > 0) {
            setGadgets(storedProducts);
            setFilteredGadgets(storedProducts);
        } else {
            fetch("./gadgetsData.json")
                .then((res) => res.json())
                .then((data) => {
                    saveProducts(data);

                    setGadgets(data);
                    setFilteredGadgets(data);
                });
        }
    }, []);

    const handleFilter = (category) => {
        setSelectedCategory(category);
        if (category === 'All Product') {
            setFilteredGadgets(gadgets);
        } else {
            const filtered = gadgets.filter(gadget => gadget.category === category);
            setFilteredGadgets(filtered);
        }
    };

    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-2xl lg:text-4xl text-center font-bold'>Explore Cutting-Edge Gadgets</h1>
            <div className='flex flex-col lg:flex-row gap-10'>
                <div className='card-body flex flex-col mt-10 shadow-xl h-[420px] space-y-1 rounded-3xl'>
                    {['All Product', 'Laptops', 'Phones', 'Accessories', 'Smart Watches', 'MacBook'].map(category => (
                        <button
                            key={category}
                            onClick={() => handleFilter(category)}
                            className={`btn text-xl rounded-3xl font-bold w-[300px] ${selectedCategory === category ? 'bg-[#9538E2] text-white' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
                    {filteredGadgets.length > 0 ? (
                        filteredGadgets.map(gadget => <Gadget gadget={gadget} key={gadget.product_id} />)
                    ) : (
                        <p className='text-center text-4xl text-[#9538E2] font-bold w-[400px] lg:w-[700px] mt-20'>
                            No products found in this category.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Gadgets;