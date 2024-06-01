import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../../styles/CSV.css";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { getConfig, axiosInstance } from "../../utils/request.js";
import toast from "react-hot-toast";
const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!file) {
        return toast.error("Please select a file");
      }
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      await getConfig();
      await axiosInstance.post("/api/v1/product/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      swal("Congrats", "File Uploaded", "success");
      setFileName("");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
    setLoading(false);
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
              Upload Products Via CSV
            </h1>
            <div className="upload-container">
              <div className="upload-wrapper">
                <label htmlFor="file-upload" className="upload-icon">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>{fileName || "Choose a file"}</span>
                </label>
                <input
                  type="file"
                  id="file-upload"
                  className="file-upload-input"
                  onChange={handleChange}
                />
              </div>
              {loading ? (
                <button className="upload-button disabled" disabled>
                  Uploading....
                </button>
              ) : (
                <button onClick={handleSubmit} className="upload-button">
                  Upload File
                </button>
              )}
              <div>
                <a
                  href="/excel_demo_uid2024.csv"
                  className="download-link"
                  download
                >
                  Download Sample CSV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadCSV;
