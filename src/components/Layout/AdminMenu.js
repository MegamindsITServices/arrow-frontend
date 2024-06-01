import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
const AdminMenu = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");

    localStorage.clear();

    toast.success("Logout Successfully");
  };

  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h6 className="mt-3">Admin Panel - Welcome {auth?.user?.name}</h6>
          <nav className="sidebar-nav scroll-sidebar" data-simplebar>
            <ul id="sidebarnav">
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/dashboard"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-layout-dashboard" />
                  </span>
                  <span className="hide-menu">Dashboard</span>
                </NavLink>
              </li>

              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/create-category"
                  aria-expanded="false"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-category-plus"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 4h6v6h-6zm10 0h6v6h-6zm-10 10h6v6h-6zm10 3h6m-3 -3v6" />
                    </svg>
                  </span>
                  <span className="hide-menu">Create Class</span>
                </NavLink>
              </li>

              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/create-subject"
                  aria-expanded="false"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                      <path d="M9 12h6" />
                      <path d="M12 9v6" />
                    </svg>
                  </span>
                  <span className="hide-menu">Create Subject</span>
                </NavLink>
              </li>
              <li className="sidebar-item d-none">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/banner"
                  aria-expanded="false"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-photo-scan"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 8h.01" />
                      <path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" />
                      <path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" />
                      <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                      <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                      <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
                    </svg>
                  </span>
                  <span className="hide-menu">Banner Controller</span>
                </NavLink>
              </li>
             

              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/homepage_book_post"
                  aria-expanded="false"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-photo-up"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 8h.01" />
                      <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
                      <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3.5 3.5" />
                      <path d="M14 14l1 -1c.679 -.653 1.473 -.829 2.214 -.526" />
                      <path d="M19 22v-6" />
                      <path d="M22 19l-3 -3l-3 3" />
                    </svg>
                  </span>
                  <span className="hide-menu">HomePage Book Post</span>
                </NavLink>
              </li>

              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/create-product"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-cards" />
                  </span>
                  <span className="hide-menu">Create Product</span>
                </NavLink>
              </li>

              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/CSV"
                  aria-expanded="false"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-file-spreadsheet"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                      <path d="M8 11h8v7h-8z" />
                      <path d="M8 15h8" />
                      <path d="M11 11v7" />
                    </svg>
                  </span>
                  <span className="hide-menu">Upload Product CSV Data</span>
                </NavLink>
              </li>

              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/create_dealer_state"
                  aria-expanded="false"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-home-plus"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M19 12h2l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h5.5" />
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2" />
                      <path d="M16 19h6" />
                      <path d="M19 16v6" />
                    </svg>
                  </span>
                  <span className="hide-menu">Add Executive State</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/dealernetwork"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-file-description" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M16 19h6" />
                      <path d="M19 16v6" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                    </svg>
                  </span>
                  <span className="hide-menu">Add Executive</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/write_review"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-file-description" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-message-2-star"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 9h8" />
                      <path d="M8 13h4.5" />
                      <path d="M10 19l-1 -1h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" />
                      <path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
                    </svg>
                  </span>
                  <span className="hide-menu">Write Review</span>
                </NavLink>
              </li>

              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/blog_post"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-typography" />
                  </span>
                  <span className="hide-menu">Post Arrow Activity</span>
                </NavLink>
              </li>
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">View</span>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/products"
                  aria-expanded="false"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-brand-producthunt"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 16v-8h2.5a2.5 2.5 0 1 1 0 5h-2.5" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    </svg>
                  </span>
                  <span className="hide-menu">View Products</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/view_posts"
                  aria-expanded="false"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-brand-producthunt"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 16v-8h2.5a2.5 2.5 0 1 1 0 5h-2.5" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    </svg>
                  </span>
                  <span className="hide-menu">View Posts</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/view_banner"
                  aria-expanded="false"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-brand-producthunt"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 16v-8h2.5a2.5 2.5 0 1 1 0 5h-2.5" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    </svg>
                  </span>
                  <span className="hide-menu">View/Update Banners</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/view_home_book"
                  aria-expanded="false"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-photo"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 8h.01" />
                      <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
                      <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
                      <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
                    </svg>
                  </span>
                  <span className="hide-menu">View HomePage Books </span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/view_dealers"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-user-plus" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-users-group"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                      <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                      <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                    </svg>
                  </span>
                  <span className="hide-menu">View Executives</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/user_details"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-user-plus" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-user-square"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 10a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                      <path d="M6 21v-1a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v1" />
                      <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
                    </svg>
                  </span>
                  <span className="hide-menu">User Details</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/owner_details"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-user-plus" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-crown"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
                    </svg>
                  </span>
                  <span className="hide-menu">Ownership Details</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/users"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-user-plus" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-truck-delivery"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                      <path d="M3 9l4 0" />
                    </svg>
                  </span>
                  <span className="hide-menu">View Orders</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/canceled_orders"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-user-plus" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-truck-return"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v6h-5l2 2m0 -4l-2 2" />
                      <path d="M9 17l6 0" />
                      <path d="M13 6h5l3 5v6h-2" />
                    </svg>
                  </span>
                  <span className="hide-menu">Canceled Orders</span>
                </NavLink>
              </li>
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">AUTH</span>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/signup_admin"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-user-plus" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-user-check"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                      <path d="M15 19l2 2l4 -4" />
                    </svg>
                  </span>
                  <span className="hide-menu">Create New Admin</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/dashboard/admin/update_admin_details"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-user-plus" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-user-edit"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                      <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" />
                    </svg>
                  </span>
                  <span className="hide-menu">Edit Profile</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to="/" aria-expanded="false">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-logout-2"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                      <path d="M15 12h-12l3 -3" />
                      <path d="M6 15l-3 -3" />
                    </svg>
                  </span>
                  <span className="hide-menu" onClick={handleLogout}>
                    Logout
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
