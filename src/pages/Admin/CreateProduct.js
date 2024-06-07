import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [frontphoto, setFrontPhoto] = useState("");
  const [backphoto, setBackPhoto] = useState("");
  const [uid, setUid] = useState("");

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  //get all subjects
  const getAllSubjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/subject/subjects");
      if (data?.success) {
        setSubjects(data?.subject);
        console.log(data?.subject);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting subject");
    }
  };

  const getNewUid = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/new-uid");
      setUid(data?.uid);
    } catch (error) {
      toast.error("Something went wrong in getting UID");
    }
  };
  useEffect(() => {
    getAllCategory();
    getAllSubjects();
    getNewUid();
  }, []);

  //create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("author", author);
      productData.append("pages", pages);
      productData.append("subject", subject);
      productData.append("price", price);
      productData.append("isbn", isbn);
      // productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("frontphoto", frontphoto);
      productData.append("backphoto", backphoto);
      productData.append("category", category);

      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        swal("Congrats", "New Product Added SuccessFully", "success");

        navigate("/dashboard/admin/products");
        console.log(productData);
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
            <h1 className="d-flex justify-content-center">Create Product</h1>

            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  type="text"
                  value={uid}
                  placeholder="UID"
                  className="form-control form disabled"
                  disabled
                />
              </div>
              <Select
                bordered={false}
                placeholder="Select the category"
                size="large"
                showSearch
                className="form-select  mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <Select
                bordered={false}
                placeholder="Select Subject"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setSubject(value);
                }}
              >
                {subjects?.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="Butn col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="Butn col-md-12">
                  {frontphoto ? frontphoto.name : "Upload Front Side Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setFrontPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {frontphoto && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(frontphoto)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="Butn col-md-12">
                  {backphoto ? backphoto.name : "Upload Back Side Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setBackPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {backphoto && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(backphoto)}
                      alt="Back_product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  className="form-control form"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Description"
                  className="form-control form"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={author}
                  placeholder="Author Name"
                  className="form-control form"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={pages}
                  placeholder="Pages"
                  className="form-control form"
                  onChange={(e) => setPages(e.target.value)}
                />
              </div>{" "}
              {/* <div className="mb-3">
                <input
                  type="text"
                  value={subject}
                  placeholder="Subject"
                  className="form-control form"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div> */}
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  className="form-control form"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={isbn}
                  placeholder="ISBN Number"
                  className="form-control form"
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  className="form-control form"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div> */}
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Instock"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="Butn" onClick={handleCreate}>
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
