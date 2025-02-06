import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../../Components/Navbar";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                const userToken = parsedUser.token;

                try {
                    const response = await axios.get('http://localhost:8080/addtocard/cart/all', {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    });

                    setCartItems(response.data); // Assuming the response returns the products array
                } catch (err) {
                    setError('Error fetching cart items');
                }
            } else {
                setError('Please log in to view cart');
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div>
            <Navbar />
            <br/>
            <br/>
            <br/><br/>
            <br/>
            <br/><br/>
            <br/>
            <br/>
            <h1>Your Cart</h1>
            {error && <p>{error}</p>}
            <ul>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <li key={index}>
                            <p>Product Name: {item.productId.name}</p>
                            <p>Quantity: {item.quantity}</p>
                        </li>
                    ))
                ) : (
                    <p>No items in your cart</p>
                )}
            </ul>
        </div>
    );
};

export default Cart;
