import React from "react";
import { Helmet } from "react-helmet";
import {
  FaLaptop,
  FaMobileAlt,
  FaShippingFast,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

      <Helmet>
        <title>About Us | Gadget Heaven</title>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#8a2cd6] to-gray-100 text-white py-20">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h1 className="text-5xl font-bold mb-5">
            Welcome to Gadget Heaven
          </h1>

          <p className="text-lg text-gray-800 max-w-3xl mx-auto">
            Gadget Heaven is one of the most trusted online gadget stores in
            Bangladesh. We provide premium quality smartphones, laptops,
            smartwatches and accessories with fast delivery and secure payment.
          </p>
        </div>
      </div>

      {/* Services */}

      <div className="max-w-6xl mx-auto py-16 px-5">

        <h2 className="text-4xl font-bold text-center mb-10">
          Our Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaMobileAlt className="text-5xl text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Smartphones</h3>
            <p>Latest Android & iPhone with official warranty.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaLaptop className="text-5xl text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Laptops</h3>
            <p>Gaming, Office and Student laptops.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaShippingFast className="text-5xl text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
            <p>Nationwide delivery within 24-72 hours.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FaHeadset className="text-5xl text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">24/7 Support</h3>
            <p>Our support team is always ready to help you.</p>
          </div>

        </div>
      </div>

      {/* Why Choose Us */}

      <div className="bg-white py-16">

        <div className="max-w-6xl mx-auto px-5">

          <h2 className="text-4xl font-bold text-center mb-10">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <p><FaCheckCircle className="inline text-green-500 mr-2" />100% Genuine Products</p>

            <p><FaCheckCircle className="inline text-green-500 mr-2" />Secure Online Payment</p>

            <p><FaCheckCircle className="inline text-green-500 mr-2" />Fast Home Delivery</p>

            <p><FaCheckCircle className="inline text-green-500 mr-2" />Easy Return Policy</p>

            <p><FaCheckCircle className="inline text-green-500 mr-2" />Official Warranty</p>

            <p><FaCheckCircle className="inline text-green-500 mr-2" />24/7 Customer Support</p>

          </div>

        </div>

      </div>

      {/* Order Process */}

      <div className="max-w-6xl mx-auto py-16 px-5">

        <h2 className="text-4xl font-bold text-center mb-10">
          How To Order
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-purple-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold">1</h3>
            <p>Create Account</p>
          </div>

          <div className="bg-purple-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold">2</h3>
            <p>Select Product</p>
          </div>

          <div className="bg-purple-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold">3</h3>
            <p>Add to Cart</p>
          </div>

          <div className="bg-purple-100 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold">4</h3>
            <p>Confirm Order</p>
          </div>

        </div>

      </div>

      {/* Company Info */}

      <div className="bg-[#9538E2] text-white py-16">

        <div className="max-w-6xl mx-auto px-5">

          <h2 className="text-4xl font-bold text-center mb-10">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>
              <FaMapMarkerAlt className="text-4xl mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Address</h3>
              <p>House #25, Road #10</p>
              <p>Dhanmondi, Dhaka-1205</p>
              <p>Bangladesh</p>
            </div>

            <div>
              <FaPhoneAlt className="text-4xl mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Phone</h3>
              <p>+880 1712-345678</p>
            </div>

            <div>
              <FaEnvelope className="text-4xl mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Email</h3>
              <p>support@gadgetheaven.com</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;