import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";

const Search = () => {
  const [values] = useSearch();

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
                    <Link to={"/product/" + p?.uid} className="Butn ms-1 mb-3">
                      More Details
                    </Link>
                    <Link to={"/product/" + p?.uid} className="Butn ms-1">
                      ADD TO CART
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
