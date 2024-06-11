import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/Auth";
import { FaHome } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import "../../styles/AdminDash.css";

import Chart from "chart.js/auto";
import axios from "axios";

const AdminDash = () => {
  const [auth] = useAuth();
  const [payment, setPayment] = useState([]);
  const [products, setProducts] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [totalAmountRecieved, setTotalAmountRecieved] = useState(0);
  const [lastAmountRecieved, setLastAmountRecieved] = useState(0);

  // get all orders
  const getPayment = async () => {
    try {
      const res = await axios.get("/api/v1/order/get-all-order");
      setPayment(res.data);

      calculateTotalAmountReceived(res.data);
      generateDayWiseSalesGraph(res.data); // Call function to generate day-wise sales graph
      generateMonthlySalesGraph(res.data); // Call function to generate monthly sales graph
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getPayment();
  }, [auth?.token]);

  // day wise sales graph
  const generateDayWiseSalesGraph = (orders) => {
    const salesByDay = {};
    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      salesByDay[date] = salesByDay[date]
        ? salesByDay[date] + order.payment
        : order.payment;
    });

    const labels = Object.keys(salesByDay);
    const data = Object.values(salesByDay);

    const ctx = document.getElementById("dayWiseSalesChart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Day-wise Sales",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  // monthly sales graph
  const generateMonthlySalesGraph = (orders) => {
    const salesByMonth = {};
    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthYear = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      salesByMonth[monthYear] = salesByMonth[monthYear]
        ? salesByMonth[monthYear] + order.payment
        : order.payment;
    });

    const labels = Object.keys(salesByMonth);
    const data = Object.values(salesByMonth);

    const ctx = document.getElementById("monthlySalesChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Monthly Sales",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  // Function to calculate total amount received
  const calculateTotalAmountReceived = (orders) => {
    const sortedOrders = orders.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const totalAmount = orders.reduce((acc, order) => acc + order.payment, 0);
    setTotalAmountRecieved(totalAmount);
    setLastAmountRecieved(
      sortedOrders.length > 0 ? sortedOrders[0].payment : 0
    );
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
      createChart(data.products);
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  //display price information

  const createChart = (products) => {
    const pName = products.map((product) => product.name);
    const pPrices = products.map((product) => product.price);

    const ctx = document.getElementById("productChart");

    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: pName,
        datasets: [
          {
            label: "Prices",
            data: pPrices,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChartInstance(newChartInstance);
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-3">
            <div className="row">
              <div className="col-md-6">
                <div className="card-7 ms-3" style={{ width: "80%" }}>
                  <div className="card-body">
                    <div className="card-row">
                      <h5 className="card-title">
                        {" "}
                        <IoPerson /> Name : {auth?.user?.name}
                      </h5>
                    </div>
                    <div className="card-row">
                      <h5 className="admin-name">
                        <MdMarkEmailRead /> Email : {auth?.user?.email}
                      </h5>
                    </div>
                    <div className="card-row">
                      <h5 className="admin-name">
                        <FaPhone /> Phone : {auth?.user?.phone}
                      </h5>
                    </div>
                    <div className="card-row">
                      <h5 className="admin-name">
                        <FaHome /> Address : {auth?.user?.address.district},{" "}
                        {auth?.user?.address.state}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card-amount amount-rec mb-2">
                  <div class="card-header">
                    <h5 className="mt-2">Total Amount Received:</h5>
                  </div>
                  <hr className="card-hr" />
                  <div className="amount-body">
                    <h3> ₹{totalAmountRecieved.toFixed(2)}</h3>
                  </div>
                </div>

                <div className="card-amount amount-rec">
                  <div className="card-header">
                    <h5 className="mt-2">Last Amount Received:</h5>
                  </div>
                  <hr className="card-hr" />
                  <div className="amount-body">
                    <h3>₹{lastAmountRecieved.toFixed(2)}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3 chart">
              {/* <div className="col-md-6">
                <canvas id="productChart"></canvas>
              </div> */}
              <div className="col-md-6">
                <canvas id="dayWiseSalesChart"></canvas>
              </div>

              <div className="col-md-6">
                <canvas id="monthlySalesChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDash;
