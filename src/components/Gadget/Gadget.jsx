import React from 'react';
import { Link } from 'react-router-dom';

const Gadget = ({ gadget }) => {

    const { product_id, product_image, product_title, price } = gadget;

    return (
        <div className="card bg-base-100 w-80 shadow-xl mx-auto">
            <figure>
                <img
                    className='h-[250px] w-72 rounded-xl border-2 m-4'
                    src={product_image}
                    alt="product" />
            </figure>
            <div className="card-body pl-4">
                <h2 className="card-title">{product_title}</h2>
                <p>Price: <span className='font-bold'>${price}</span></p>
                <div className="card-actions">
                    <Link to={`/gadgets/${product_id}`}>
                        <button className="btn rounded-3xl text-[#9538E2] border-[#9538E2] border-2">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Gadget;