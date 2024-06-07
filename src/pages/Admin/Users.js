import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import "../../styles/adminuserorder.css";
import AdminBackButton from "../../components/AdminBackButton";

const Users = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const res = await axios.get("/api/v1/order/get-all-order");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `/api/v1/order/update-order/${orderId}`,
        { status: newStatus }
      );
      const updatedOrder = response.data;

      // Update the local state with the updated order
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          {/* <div className="col-md-3">
            <AdminMenu />
          </div> */}
          <div className="col-md-12">
            <div className="position-relative">
              <AdminBackButton />
              <h1 className="text-center">All Orders</h1>
            </div>
            <div className="border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Buyer Name</th>
                    <th scope="col">Shipping Address</th>
                    <th scope="col">Products Name</th>
                    <th scope="col">Quantities</th>{" "}
                    <th scope="col">No. of Products</th>
                    <th scope="col">Date of Order</th>
                    <th scope="col">Order Total</th>
                    <th scope="col">Status</th>
                    <th scope="col">Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <>
                      {order.status !== "Cancelled" && (
                        <tr key={order._id}>
                          <td>
                            <strong>{index + 1}</strong>
                          </td>
                          <td>{order.name}</td>
                          <td className="add">{order.address}</td>
                          <td>
                            {order.products_name.map((productName, idx) => (
                              <div key={idx}>{`${
                                idx + 1
                              } . ${productName}`}</div>
                            ))}
                          </td>
                          {/* <td>
                        {order.quantities.map((item, idx) => (
                          <div key={idx}>
                            {item.product}: {item.quantity}
                          </div>
                        ))}
                      </td> */}
                          <td>
                            {order.quantities.map((item, idx) => (
                              <div key={idx}>{item.quantity}</div>
                            ))}
                          </td>
                          <td>{order.products.length}</td>
                          <td>{formatDateTime(order.createdAt)}</td>
                          <td>
                            <b>₹{order.payment.toFixed(2)}</b>
                          </td>
                          <td>{order.status}</td>
                          <td>
                            <div className="dropdown">
                              <button
                                type="button"
                                id={`dropdownMenuButton-${index}`}
                                className="active-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                style={{ border: "none" }}
                              >
                                Change Status
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby={`dropdownMenuButton-${index}`}
                              >
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleStatusChange(
                                        order._id,
                                        "Processing"
                                      )
                                    }
                                  >
                                    Processing
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleStatusChange(order._id, "Shipped")
                                    }
                                  >
                                    Shipped
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleStatusChange(order._id, "Delivered")
                                    }
                                  >
                                    Delivered
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleStatusChange(order._id, "Cancelled")
                                    }
                                  >
                                    Cancelled
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
