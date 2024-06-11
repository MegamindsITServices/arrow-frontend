import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";
import { FaHome } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout title={"User Dashboard - Arrow Publication pvt ltd."}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9 mt-3">
              <div class="card-7 ms-3" style={{ width: "50%" }}>
                <div class="card-body">
                  <div class="card-row">
                    <h5 class="card-title">
                      {" "}
                      <IoPerson /> Name : {auth?.user?.name}
                    </h5>
                  </div>
                  <div class="card-row">
                    <h5 class="admin-name text-dark">
                      <MdMarkEmailRead /> Email : {auth?.user?.email}
                    </h5>
                  </div>
                  <div class="card-row">
                    <h5 class="admin-name text-dark">
                      <FaPhone /> Phone : {auth?.user?.phone}
                    </h5>
                  </div>
                  <div className="card-row">
                    <h5 class="admin-name text-dark">
                      <FaHome /> Address : {auth?.user?.address.city},
                      {auth?.user?.address.district},{" "}
                      {auth?.user?.address.state}, {auth?.user?.address.pincode}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
