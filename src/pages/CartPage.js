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
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [Razorpay] = useRazorpay();
  const [quantities, setQuantities] = useState({});
  // add quantity
  // Initialize quantities state with the current quantities in cart
  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item._id] = 1; // Initial quantity for each item is 1
    });
    setQuantities(initialQuantities);
  }, [cart]);
  // Function to handle increasing quantity
  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  // Function to handle decreasing quantity
  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] - 1),
    }));
  };
  //total price
  // Function to calculate total price based on quantities
  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * (quantities[item._id] || 1);
    });
    // Check if the total has a decimal part
    const hasDecimals = total % 1 !== 0;
    // If there are decimals, calculate and append them
    const decimals = hasDecimals
      ? Math.ceil((total - Math.floor(total)) * 100)
      : 0;
    // Return the total with appended decimals
    return `${Math.floor(total)}.${decimals.toLocaleString("en-IN", {
      minimumIntegerDigits: 2,
    })}`;
  };
  useEffect(() => {
    const savedQuantities = JSON.parse(localStorage.getItem("cartQuantities"));
    if (savedQuantities) {
      console.log("Saved quantities:", savedQuantities); // Log the saved quantities
      setQuantities(savedQuantities);
    } else {
      // If no quantities are saved in localStorage, initialize with default values
      const initialQuantities = {};
      cart.forEach((item) => {
        initialQuantities[item._id] = 1; // Initial quantity for each item is 1
      });
      setQuantities(initialQuantities);
      localStorage.setItem("cartQuantities", JSON.stringify(initialQuantities));
    }
  }, []);
  // Update localStorage whenever quantities change
  useEffect(() => {
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));
  }, [quantities]);
  // remove item
  const removeCartItem1 = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = async (pid) => {
    try {
      console.log(cart);
      const { data } = await axios.post("/api/v1/product/cart/remove-item", {
        userID: auth?.user.userID,
        productID: pid,
      });

      console.log(data.cart);
      setCart(data.cart);
      localStorage.setItem("cart", JSON.stringify(data.cart));
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  // const getToken = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/product/braintree/token");
  //     setClientToken(data?.clientToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);

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
    // console.log(auth.user.name);
    // console.log(auth.user.userID);
    // console.log(productIDs);
    // console.log(totalPrice);
    // console.log(products_name);
    // console.log(auth.user.address);
    // console.log(quantities);
    const orderData = {
      products: productIDs,
      products_name: products_name,
      quantities: Object.keys(quantityData).map((productId) => ({
        product: productId,
        quantity: quantityData[productId],
      })),
      payment: totalPrice,
      name: auth?.user?.name,
      address: auth?.user?.address,
      buyer: auth.user.userID,
      status: "Unprocessed",
    };
    console.log(orderData);

    const res = await axios
      .post("/api/v1/order/create-order", orderData)
      .then((response) => {
        console.log("Order saved successfully:", response.data);
        // Handle success
      })
      .catch((error) => {
        console.error("Error saving order:", error);
        // Handle error
      });
  };

  // handle payments
  const handlePayment = async () => {
    try {
      // placeOrder();
      const cartLen = cart.length;
      if (cartLen < 1) {
        return toast.error("Cart is empty");
      }
      let productName = "";
      let productImage =
        "https://arrowpublicationsindia.com/wp-content/uploads/2019/12/logo-new.png";
      let productDescription = "";
      let productPrice = 0;
      let totalQuantity = 0;

      cart.forEach((item) => {
        totalQuantity += quantities[item._id];
        productPrice += item.price * quantities[item._id];
      });
      const totalAmountInPaise = Math.max(productPrice * 100, 100);
      // if (cartLen > 0 && cartLen === 1) {
      //   const data = cart[0];
      //   productName = data.name;
      //   productDescription = data.description;
      //   productPrice = data.price;
      // }
      // Set product details
      if (cartLen === 1) {
        const data = cart[0];
        productName = data.name;
        productDescription = data.description;
      }
      // if (cartLen > 0 && cartLen !== 1) {
      //   productName = "";
      //   productDescription = "";
      //   let totalPrice = 0;
      //   cart.forEach((item) => {
      //     totalPrice += item.price;
      //     productPrice = totalPrice;
      //   });
      // }
      // placeOrder();
      var options = {
        key: "rzp_live_LJWUAjysqEQ62P",
        amount: totalAmountInPaise,
        currency: "INR",
        name: productName,
        description: productDescription.slice(0, 100),
        image: productImage,
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
          <h3 className="text-center auth-content p-2 mb-1">
            {!auth?.user
              ? "Hello Guest"
              : `Hello. ${auth?.token && auth?.user?.name}`}
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
      <div className="col-md-9">
        <div className="row">
          <div className="col-md-7">
            <div className="row">
              {cart?.map((p) => (
                <React.Fragment key={p._id}>
                  <div className="row mt-3 p-3 card-cart auth-content flex-row">
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="mb-3 mt-3"
                        alt={p.name}
                      />
                    </div>
                    <div className="col-md-8 card-body">
                      <h6>
                        <b>Name : {p.name}</b>
                      </h6>
                      <h6>{p.description.substring(0, 80)}</h6>
                      <h4>Price : ₹{p.price}</h4>
                      <div className="quantity-controls">
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
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon-plus-minus icon-tabler icons-tabler-outline icon-tabler-minus"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                          </svg>
                        </button>
                        <span className="quantity">
                          <strong>{quantities[p._id]}</strong>
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
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon-plus-minus icon-tabler icons-tabler-outline icon-tabler-plus"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                          </svg>
                        </button>
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

          <div className="col-md-5 cart-col text-center">
            <div className="row">
              <div className="col-md-14 auth-content">
                <h2>Cart summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr />
                <h4 className="text-dark">Total: {totalPrice()}</h4>
                {auth?.user?.address ? (
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
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
      </div>
    </Layout>
  );
};
export default CartPage;
