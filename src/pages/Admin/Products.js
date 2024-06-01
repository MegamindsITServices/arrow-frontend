import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/product.css";
import swal from "sweetalert";
import SearchInput from "../../components/Form/SearchInput";
import AdminSearchInput from "../../components/Form/AdminSearchInput";
import { getConfig, axiosInstance } from "../../utils/request.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  //delete a product
  const handleDelete = async (pid) => {
    try {
      // Trigger SweetAlert confirmation dialog
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      // If the user confirms deletion
      if (willDelete) {
        // await getConfig();
        const { data } = await axiosInstance.delete(
          `/api/v1/product/delete-product/${pid}`
        );
        getAllProducts();
        navigate("/dashboard/admin/products");
      } else {
        // If the user cancels deletion
        swal("Your product is safe!", {
          icon: "info",
        });
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 product-grid">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex justify-content-center mb-4">
              {/* <SearchInput /> */}
              <AdminSearchInput />
            </div>
            <div className="row">
              {products?.map((p, index) => (
                <div key={p._id} className="col-sm-6 col-lg-3 col-xxl-2">
                  <div className="card-6 mb-3">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top admin-product-img"
                      alt={p.name}
                    />
                    <div className="card-body-product">
                      <h5 className="p-name">{p.name}</h5>
                      <p className="p-desc">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="">
                        <strong>Price: </strong> <b>{p.price}</b>
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/dashboard/admin/product/${p.uid}`}
                    className="product-link"
                  >
                    <button className="Butn mb-4 ms-4"> Edit</button>
                  </Link>

                  <button
                    className="Butn ms-2"
                    onClick={async () => {
                      handleDelete(p._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
