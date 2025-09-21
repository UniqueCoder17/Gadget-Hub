import React from 'react';
import Gadgets from '../Gadgets/Gadgets';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Gadget Heaven</title>
            </Helmet>
            <Gadgets></Gadgets>
        </div>
    );
};

export default Home;