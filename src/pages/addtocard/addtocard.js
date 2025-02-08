import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router";

const CartPage = () => {
  let navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const [orderStatus, setOrderStatus] = useState(""); // Order status state
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    age: "",
  });
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        setError("Please log in to view your cart");
        return;
      }

      const parsedUser = JSON.parse(userData);
      const userToken = parsedUser.token;

      try {
        const response = await axios.get("http://localhost:8080/addtocard/cart", {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (response.data.length === 1 && response.data[0].message === "Cart is empty.") {
          setIsCartEmpty(true);
        } else {
          setCartItems(response.data.items);
          calculateTotal(response.data.items);
        }
      } catch (err) {
        setError("Error fetching cart items");
      }
    };

    fetchCartItems();
  }, []);

  // Calculate total price
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Increase item quantity
  const increaseQuantity = async (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  // Decrease item quantity
  const decreaseQuantity = async (productId) => {
    const updatedCart = cartItems
      .map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  // Remove item from cart
  const removeItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  // Handle input change for order details
  const handleInputChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  // Place Order
  const placeOrder = async () => {
    setOrderStatus("Pending..."); // Set status to Pending
    const userData = localStorage.getItem("userData");
    if (!userData) {
      setError("Please log in to place an order");
      return;
    }

    const parsedUser = JSON.parse(userData);
    const userToken = parsedUser.token;

    try {
      await axios.post(
        "http://localhost:8080/orders/place",
        {
          ...orderDetails,
          totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      setOrderStatus("Success! Order placed."); // Set status to Success
      alert("Order placed successfully!");
      setCartItems([]); // Clear cart UI
      setTotalPrice(0);
      setOrderDetails({ name: "", address: "", phoneNumber: "", age: "" });
      setIsCartEmpty(false)
      navigate("/order");
    } catch (err) {
      setOrderStatus("Failed to place order."); // Set status to Failed
      setError("Failed to place order");
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />      <br />
      <br />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {/* {error && <p className="text-red-500">{error}</p>} */}

        {isCartEmpty ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <div className="border p-4 rounded-lg shadow-md">
            {cartItems && cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between items-center border-b pb-2 mb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => decreaseQuantity(item.productId)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                  <span className="px-3">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.productId)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                  <button onClick={() => removeItem(item.productId)} className="ml-3 text-red-500">Remove</button>
                </div>
              </div>
            ))}
            <h3 className="text-xl font-bold mt-4">Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        )}

        {/* Order Form */}
        {!isCartEmpty && <div className="mt-6">
          <h3 className="text-xl font-bold mb-3">Delivery Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={orderDetails.name}
            onChange={handleInputChange}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={orderDetails.address}
            onChange={handleInputChange}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={orderDetails.phoneNumber}
            onChange={handleInputChange}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={orderDetails.age}
            onChange={handleInputChange}
            className="border p-2 w-full mb-2 rounded"
          />

          <button
            onClick={placeOrder}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>

          {/* Order Status Message */}
          {orderStatus && (
            <p
              className={`mt-3 text-lg ${orderStatus.includes("Success") ? "text-green-600" : "text-red-600"
                }`}
            >
              {orderStatus}
            </p>
          )}
        </div>}
      </div>
    </div>
  );
};

export default CartPage;
