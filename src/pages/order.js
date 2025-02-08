import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        setError("Please log in to view your orders");
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(userData);
      const userToken = parsedUser.token;

      try {
        const response = await axios.get("http://localhost:8080/orders", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

        {loading && <p>Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Order ID: {order._id}</h3>
                <p className="text-gray-700"><strong>Name:</strong> {order.name}</p>
                <p className="text-gray-700"><strong>Address:</strong> {order.address}</p>
                <p className="text-gray-700"><strong>Phone:</strong> {order.phoneNumber}</p>
                <p className="text-gray-700"><strong>Age:</strong> {order.age}</p>
                <p className="text-gray-700"><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                <p className={`text-lg font-bold mt-2 ${order.status === "Pending" ? "text-yellow-600" :
                    order.status === "Completed" ? "text-green-600" :
                      "text-red-600"
                  }`}>
                  Status: {order.status}
                </p>

                {/* Order Items */}
                <h4 className="font-semibold mt-3">Items:</h4>
                <ul className="list-disc ml-6">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item.name} - ${item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
