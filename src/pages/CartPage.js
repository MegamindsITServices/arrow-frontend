import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import "../styles/button.css";
import axios from "axios";
import swal from "sweetalert";
import "../styles/cart.css";
import useRazorpay from "react-razorpay";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [Razorpay] = useRazorpay();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const savedQuantities =
      JSON.parse(localStorage.getItem("cartQuantities")) || {};
    setQuantities(savedQuantities);
  }, [cart]);

  // Function to handle increasing quantity
  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[productId] = (newQuantities[productId] || 1) + 1;
      return newQuantities;
    });
  };

  // Function to handle decreasing quantity
  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[productId] = Math.max(
        1,
        (newQuantities[productId] || 1) - 1
      );
      return newQuantities;
    });
  };

  // Function to calculate total price based on quantities
  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * (quantities[item._id] || 1);
    });
    return total.toFixed(2);
  };

  useEffect(() => {
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));
  }, [quantities]);

  // remove item
  const removeCartItem = async (pid) => {
    try {
      const { data } = await axios.post("/api/v1/product/cart/remove-item", {
        userID: auth?.user.userID,
        productID: pid,
      });
      setCart(data.cart);
      localStorage.setItem("cart", JSON.stringify(data.cart));
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    let totalPrice = 0;
    let productIDs = [];
    let products_name = [];
    let quantityData = {};
    cart.forEach((item) => {
      totalPrice += item.price * quantities[item._id];
      productIDs.push(item._id);
      products_name.push(item.name);
      quantityData[item._id] = quantities[item._id];
    });

    const shippingAddress = `${auth?.user?.address.landmark}, ${auth?.user?.address.locality}, ${auth?.user?.address.city}, ${auth?.user?.address.district}, ${auth?.user?.address.state}, ${auth?.user?.address.pincode}`;
    const orderData = {
      products: productIDs,
      products_name: products_name,
      quantities: Object.keys(quantityData).map((productId) => ({
        product: productId,
        quantity: quantityData[productId],
      })),
      payment: totalPrice,
      name: auth?.user?.name,
      address: shippingAddress,
      buyer: auth.user.userID,
      status: "Unprocessed",
    };

    try {
      const response = await axios.post(
        "/api/v1/order/create-order",
        orderData
      );
      console.log("Order saved successfully:", response.data);
      // Handle success
    } catch (error) {
      console.error("Error saving order:", error);
      // Handle error
    }
  };

  // handle payments
  const handlePayment = async () => {
    try {
      if (cart.length < 1) {
        return toast.error("Cart is empty");
      }
      let totalQuantity = 0;
      let productPrice = 0;

      cart.forEach((item) => {
        totalQuantity += quantities[item._id];
        productPrice += item.price * quantities[item._id];
      });
      const totalAmountInPaise = Math.max(productPrice * 100, 100);

      var options = {
        key: "rzp_live_LJWUAjysqEQ62P",
        amount: totalAmountInPaise,
        currency: "INR",
        name: "Your Shop",
        description: "Product Description",
        image:
          "https://arrowpublicationsindia.com/wp-content/uploads/2019/12/logo-new.png",
        handler: function (response) {
          console.log("Payment success: Order Placed", response);
          placeOrder();
          swal("Congrats!", "Payment Success : Order Placed!", "success");
          navigate("/dashboard/user/orders");
          setLoading(false);
          localStorage.removeItem("cart");
          setCart([]);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9876543210",
        },
      };
      var rzp = new Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert(response.error.code);
      });

      rzp.open();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="row ">
        <div className="col-md-12">
          <h3 className="text-center p-2 mb-1">
            {!auth?.user
              ? "Hello Guest"
              : `Hello, ${auth?.token && auth?.user?.name}!`}
            <p className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart. ${
                    auth?.token ? "" : "please login to checkout !"
                  }`
                : " Your cart is empty."}
            </p>
          </h3>
        </div>
      </div>
      <div className="col-lg-11 mx-auto">
        <div className="row justify-content-between cart-wrapper">
          <div className="col-lg-7">
            <div className="row">
              {cart?.map((p) => (
                <React.Fragment key={p._id}>
                  <div className="row p-3 card-cart flex-row">
                    <div className="col-sm-4">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="mb-1 mt-1"
                        alt={p.name}
                      />
                    </div>
                    <div className="col-sm-8 card-body">
                      <h6>
                        <b>Name : {p.name}</b>
                      </h6>
                      <div className="quantity-controls">
                        <h4>Price : ₹{p.price}</h4>
                        <div>
                          <button
                            className="quantity-btn"
                            onClick={() => decreaseQuantity(p._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#090101"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon-plus-minus icon-tabler icons-tabler-outline icon-tabler-minus"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l14 0" />
                            </svg>
                          </button>
                          <span className="quantity">
                            <strong>{quantities[p._id] || 1}</strong>
                          </span>
                          <button
                            className="quantity-btn"
                            onClick={() => increaseQuantity(p._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#090101"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon-plus-minus icon-tabler icons-tabler-outline icon-tabler-plus"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 5l0 14" />
                              <path d="M5 12l14 0" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="col-lg-4 cart-col text-center">
            <div className="auth-content">
              <h2>Cart summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4 className="text-dark">Total: ₹{totalPrice()}</h4>
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h4>Current Address:</h4>
                  <h5>{auth?.user?.address?.shippingAddress}</h5>
                  <div className="d-flex flex-column justify-content-start">
                    <div className="d-flex justify-content-center flex-wrap m-0">
                      <span>{auth?.user?.address?.landmark},</span>
                      <span>{auth?.user?.address?.locality}, </span>
                    </div>
                    <div className="d-flex justify-content-center flex-wrap m-0">
                      <span>{auth?.user?.address?.city}, </span>
                      <span>{auth?.user?.address?.district}, </span>
                      <span>{auth?.user?.address?.state},</span>
                    </div>
                    <p>{auth?.user?.address?.pincode}</p>
                  </div>
                  <button
                    className="Butn"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              )}
              {cart && cart?.length > 0 && (
                <div className="mt-2">
                  <button
                    className="Butn"
                    onClick={() => handlePayment()}
                    type="button"
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
