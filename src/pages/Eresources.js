import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
const Eresources = () => {
  return (
    <Layout>
      <h1 className="d-flex justify-content-center align-items-middle mt-4">
        <div className="pnf">
          <img src="images/page-maintainance.jpeg" className="w-100" />
          <Link to="/" className="pnf-btn">
            Back to Home
          </Link>
        </div>
      </h1>
    </Layout>
  );
};

export default Eresources;
