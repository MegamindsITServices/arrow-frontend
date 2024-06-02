import React,{useState} from "react";
import Layout from "../../components/Layout/Layout.js";
import { useSearch } from "../../context/search";
import { Link, useNavigate } from "react-router-dom";
import {getConfig,axiosInstance} from '../../utils/request.js'
import swal from "sweetalert"

const SearchAdmin = () => {
    const [values] = useSearch();
    const [id, setId] = useState("");
    const navigate = useNavigate()
  //delete a product
  const handleDelete = async () => {
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
        await getConfig();
        const { data } = await axiosInstance.delete(
          `/api/v1/product/delete-product/${id}`
        );
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
    <Layout title={"Search results - Arrow"}>
    <div className="container">
      <div className="text-center">
        <h1>Search Results</h1>
        <h6>
          {values?.result.length < 1
            ? "No Products Found"
            : `Found ${values?.result.length}`}
        </h6>
        <div className="d-flex flex-wrap mt-4">
          {values?.result.map((p) => (
            <div className="row container product-details mt-3">
              <div className="col-md-6">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="product-details-img"
                />
              </div>
              <div className="col-md-6 product-details-info">
                <div className="card-body">
                  <h4 className="text-center">{p.name}</h4>
                  {/* <p>{p.description.substring(0, 30)}...</p> */}
                  <p>{p.description}</p>
                  <h4>
                    Price : {""}
                    {p?.price?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h4>
                  <Link
                   to={`/dashboard/admin/product/${p.uid}`}
                  //  className="product-link"
                  >
                  <button className="Butn ms-1 mb-3">Edit</button>
                  
                  </Link>

                  <div>

                  <button className="Butn ms-1"  onClick={handleDelete}>Delete</button>
                  </div>
                
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default SearchAdmin
