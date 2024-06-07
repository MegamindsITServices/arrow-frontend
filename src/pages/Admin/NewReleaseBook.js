import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { axiosInstance, getConfig } from "../../utils/request";
import swal from "sweetalert";
import toast from "react-hot-toast";
import axios from "axios";

const NewReleaseBook = () => {
  const [bookphoto, setBookPhoto] = useState("");
  const [booktitle, setBookTitle] = useState("");
  //create book post photo
  const handleCreateNewRelease = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("bookphoto", bookphoto);
      formData.append("booktitle", booktitle);
      await getConfig();
      const { data } = await axios.post(
        "/api/v1/new-release/create-new-release",
        formData
      );
      if (data?.success) {
        toast.success("Book image upload successfully");
        swal(
          "Congrats",
          "New Release Product Uploaded SuccessFully",
          "success"
        );
        setBookPhoto("");
        setBookTitle("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
            <h1 className="mb-5">New Release Book Controller</h1>

            <form onSubmit={handleCreateNewRelease}>
              <div className="m-1 w-75">
                <div className="mb-3">
                  <label className="Butn col-md-12">
                    {bookphoto
                      ? bookphoto.name
                      : "Upload New Release Book Photo"}

                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setBookPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {bookphoto && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(bookphoto)}
                        alt="banner-image"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={booktitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="New Release Title"
                    className="form-control form"
                  />
                </div>
                <div className="mt-4  d-flex justify-content-center ">
                  <button className="Butn" type="submit">
                    Create New Release
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewReleaseBook;
