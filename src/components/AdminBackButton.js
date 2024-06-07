import { IoIosArrowRoundBack } from "react-icons/io";
import "../styles/button.css";
import React from "react";
import { Link } from "react-router-dom";

const AdminBackButton = () => {
  return (
    <Link to={"/dashboard/admin/dashboard"} className="back-button">
      <IoIosArrowRoundBack color="#e0731d" size="2rem" className="fs-6" />
    </Link>
  );
};

export default AdminBackButton;
