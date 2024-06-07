import React, { useEffect, useState } from "react";
import { getConfig, axiosInstance } from "../../utils/request";
import AdminBackButton from "../../components/AdminBackButton";

const CanceledOrders = () => {
  const [canceledOrders, setCanceledOrders] = useState([]);

  // get all canceled orders
  const FetchAllCanceledOrders = async () => {
    try {
      await getConfig();
      const res = await axiosInstance.get("/api/v1/order/get-cancel-orders");
      setCanceledOrders(res.data.orders);
      console.log(res.data.orders);
    } catch (error) {
      console.error("Error fetching canceled orders:", error);
    }
  };

  useEffect(() => {
    FetchAllCanceledOrders();
  }, []);
  return (
    <>
      <div className="position-relative">
        <AdminBackButton />
        <h1 className="text-black d-flex justify-content-center">
          Canceled Orders
        </h1>
      </div>

      <div className="mt-3">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <td>
                  <strong>Order_ID</strong>
                </td>
                <td>
                  <strong>Product_ ID</strong>
                </td>
                <th>
                  <strong>Product_Name</strong>
                </th>
                <td>
                  <strong>Quantity</strong>
                </td>
                <td>
                  <strong>Total Amount to Refund</strong>
                </td>
                <td>
                  <strong>Buyer_name</strong>
                </td>
                <td>
                  <strong>Buyer_Address</strong>
                </td>
              </tr>
            </thead>
            <tbody>
              {canceledOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.products.map((product, index) => (
                      <div key={index}>{`${index + 1} . ${product} `}</div>
                    ))}
                  </td>
                  <td>
                    {order.products_name.map((productName, index) => (
                      <div key={index}>{`${index + 1} . ${productName}`}</div>
                    ))}
                  </td>
                  <td>
                    {order?.quantities.map((item, index) => (
                      <div key={index}>{`${item.quantity}`}</div>
                    ))}
                  </td>
                  <td>{order.payment.toFixed(2)}</td>
                  <td>{order.name}</td>
                  <td>{order.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CanceledOrders;
