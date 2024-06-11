import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { getConfig, axiosInstance } from "../../utils/request";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import swal from "sweetalert";
const UserDetails = () => {
  const [getUser, setGetUser] = useState([]);
  // get user details
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        await getConfig();
        const res = await axiosInstance.get("/api/v1/auth/get-user");
        setGetUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("error Fetching user details");
      }
    };
    getAllUsers();
  }, []);

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  //Delete User
  const handleDelete = async (pId) => {
    try {
      await getConfig();
      const { data } = await axiosInstance.delete(
        `/api/v1/auth/delete-user/${pId}`
      );
      if (data.success) {
        swal("SuccessFull", "User Deleted Successfully!", "success");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center">All User Details</h1>
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User_Name</th>
                      <th scope="col">User_Email</th>
                      <th scope="col">User_Address</th>
                      <th scope="col">User_phone</th>
                      <th scope="col">Date of Register</th>
                      <th scope="col">Delete User</th>
                      <th scope="col">Block User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getUser.map((u, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td scope="row">{u.name}</td>
                        <td scope="row">{u.email}</td>
                        <td scope="row">
                          {u.address.city}, {u.address.district},
                          {u.address.state}
                        </td>
                        <td scope="row">{u.phone}</td>
                        <td>{formatDateTime(u.createdAt)}</td>
                        <td>
                          <button
                            className="dlt-button ms-2"
                            onClick={() => {
                              handleDelete(u._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button className="edit-button">Block</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserDetails;
