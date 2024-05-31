import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { getConfig, axiosInstance } from "../../utils/request";
const { Option } = Select;
const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [subject, setSubject] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [frontphoto, setFrontPhoto] = useState("");
  const [backphoto, setBackPhoto] = useState("");
  const [id, setId] = useState("");
  const [subjects, setSubjects] = useState([]);

  //get single product
  const slug = params.slug;
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
      setName(data?.product.name);
      setId(data?.product._id);
      setDescription(data?.product.description);
      setAuthor(data?.product.author);
      setPages(data?.product.pages);
      setIsbn(data?.product.isbn);
      setPrice(data?.product.price);
      setQuantity(data?.product.quantity);
      setShipping(data?.product.shipping);
      setCategory(data.product.category._id);
      setSubject(data.product.subject._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      if (data?.success) {
        setCategories(data?.category);
        console.log(data?.category);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong in getting category");
    }
  };
  //get all subjects
  const getAllSubjects = async () => {
    try {
      const { data } = await axios.get("/api/v1/subject/subjects");
      if (data?.success) {
        setSubjects(data.subject);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong in getting subject");
    }
  };
  useEffect(() => {
    getAllCategory();
    getAllSubjects();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
       if (!subject) {
        toast.error("Please select a subject");
        return;
      }

      if (!category) {
        toast.error("Please select a category");
        return;
      }
      if (!name || !description || !author || !isbn || !pages || !price) {
        toast.error("Please fill all the fields");
        return;
      }
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("author", author);
      productData.append("pages", pages);
      productData.append("subject", subject);
      productData.append("isbn", isbn);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      frontphoto && productData.append("frontphoto", frontphoto);
      backphoto && productData.append("backphoto", backphoto);
      productData.append("category", category);
      await getConfig();
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
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
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <label htmlFor="fname">Category</label>
              <Select
                bordered={false}
                placeholder="Select the category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <label htmlFor="fname">Subject</label>
              <Select
                bordered={false}
                placeholder="select subject"
                size="large"
                showSearch
                defaultValue={subject?.name}
                className="form-select  mb-3"
                onChange={(value) => {
                  setSubject(value);
                }}
                value={subject}
              >
                {Array.isArray(subjects) &&
                  subjects.length > 0 &&
                  subjects.map((s) => (
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
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="Butn col-md-12">
                  {frontphoto ? frontphoto.name : "Upload Photo"}
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
                {frontphoto ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(frontphoto)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-frontphoto/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="Butn col-md-12">
                  {backphoto ? backphoto.name : "Upload Photo"}
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
                {backphoto ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(backphoto)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-backphoto/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="fname">Name</label>
                <input
                  type="text"
                  value={name}
                  // placeholder="write a name"
                  className="form-control form"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fname">Description</label>
                <textarea
                  type="text"
                  value={description}
                  // placeholder="write a description"
                  className="form-control form"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fname">Author Name</label>
                <input
                  type="text"
                  value={author}
                  // placeholder="write a name"
                  className="form-control form"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fname">Pages</label>
                <input
                  type="text"
                  value={pages}
                  // placeholder="write a name"
                  className="form-control form"
                  onChange={(e) => setPages(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
              <label htmlFor="fname">Name</label>
                <input
                  type="text"
                  value={subject}
                  placeholder="write a name"
                  className="form-control form"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div> */}
              <div className="mb-3">
                <label htmlFor="fname">Price</label>
                <input
                  type="number"
                  value={price}
                  // placeholder="write a Price"
                  className="form-control form"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fname">ISBN Number</label>
                <input
                  type="text"
                  value={isbn}
                  // placeholder="write a name"
                  className="form-control form"
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </div>
              // <div className="mb-3">
              //   <label htmlFor="fname">Quantity</label>
              //   <input
              //     type="number"
              //     value={quantity}
              //     // placeholder="write a quantity"
              //     className="form-control form"
              //     onChange={(e) => setQuantity(e.target.value)}
              //   />
              // </div>

              <div className="mb-3">
                <label htmlFor="fname">InStock</label>
                <Select
                  bordered={false}
                  // placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="edit-button" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="dlt-button" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
