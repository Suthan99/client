import Destination from "../Components/Destination";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero"
import Navbar from "../Components/Navbar"
import Course from "../Components/Course";
import HomeImg from "../assets/homebanner2.png"
import { useState } from "react";
import axios from "axios";

function Home() {
    const [quantity, setQuantity] = useState(1); // Default quantity is 1
    const [message, setMessage] = useState(''); // To display success or error message
    const [loading, setLoading] = useState(false); // To h

    // const onAddToCartss = (data) => {
    //     // setQuantity(data.)
    //     console.log("hello",data);
    //     handleAddToCart(data)

    // };

  // Handle Add to Cart button click
  const onAddToCart = async (data) => {
    if (quantity <= 0) {
      setMessage('Quantity should be greater than 0');
      return;
    }

    setLoading(true);
    try {
        const userData = localStorage.getItem('userData');

        const parsedUser = JSON.parse(userData);
        const userToken = parsedUser.token;
        const userId = String(parsedUser._id);
      console.log(userToken);
      
      const productId = String(data.id) // Get user token from localStorage (or sessionStorage)

      if (!userToken) {
        setMessage('Please log in first');
        setLoading(false);
        return;
      }
      const response = await axios.post(
        'http://localhost:8080/addtocard/add', // Assuming your backend route to add to cart is /api/cart
        {userId, productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Pass the JWT token in the headers
          },
        }
      );

      if (response.status === 200) {
        setMessage('Item added to cart successfully');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };
    return (
        <>
            <Navbar />
            <br />
            <br />
            <br />

            <Course onAddToCart={onAddToCart} />
            <Footer />
        </>
    )
}

export default Home;