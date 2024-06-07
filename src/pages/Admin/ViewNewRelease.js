import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { axiosInstance, getConfig } from "../../utils/request";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ViewNewRelease = () => {
  const [getnewRelease, setGetnewRelease] = useState([]);
  const navigate = useNavigate();

  const getAllBookImage = async () => {
    try {
      const { data } = await axios.get("/api/v1/new-release/get-new-release");
      setGetnewRelease(data.newRelease);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBookImage();
  }, []);

  // delete picture
  const handleDelete = async (pid) => {
    try {
      await getConfig();
      const { data } = await axiosInstance.delete(
        `/api/v1/new-release/delete-new-release/${pid}`
      );
      if (data?.success) {
        swal("SuccessFull", "New Release deleted successfully", "success");
        getAllBookImage();
      }
    } catch (error) {
      toast.error("Something went wrong", error);
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="d-flex justify-content-center">
              View New Release Books
            </h1>
            {getnewRelease.map((book, index) => (
              <div key={index}>
                <div className="mb-3">
                  <img
                    src={`/api/v1/new-release/get-new-release-image/${book._id}`}
                    alt={book.booktitle}
                    className="banner-img"
                  />
                  <button
                    className="Butn mb-4 ms-4"
                    onClick={() => handleDelete(book._id)}
                  >
                    {" "}
                    Delete
                  </button>
                  {/* <button className="Butn mb-4 ms-4"> Edit</button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewNewRelease;
