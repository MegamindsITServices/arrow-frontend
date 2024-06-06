import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminMenu from "./components/Layout/AdminMenu";
import AdminDash from "./pages/Admin/AdminDash";
import AdminRoute from "./components/Routes/AdminRoute";
import Orders from "./pages/user/Orders";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";
import ReadAndGrow from "./pages/ReadAndGrow";
import TeamArrow from "./pages/TeamArrow";
import GrowthPathArrow from "./pages/GrowthPathArrow";
import TextBookGallery from "./pages/TextBookGallery";
import Eresources from "./pages/Eresources";
import DealerNetwork from "./pages/DealerNetwork";
import CreateDealer from "./pages/Admin/CreateDealer";
import ViewDealers from "./pages/Admin/ViewDealers";
import Newreleases from "./pages/Newreleases";
import ArrowActivity from "./pages/ArrowActivity";
import WriteReview from "./pages/Admin/WriteReview";
import BlogPost from "./pages/Admin/BlogPost";
import UserDetails from "./pages/Admin/UserDetails";
import OwnerDetails from "./pages/Admin/OwnerDetails";
import ViewPosts from "./pages/Admin/ViewPosts";
import UploadCSV from "./pages/Admin/UploadCSV";
import CreateAdmin from "./pages/Admin/CreateAdmin";
import UpdateAdmin from "./pages/Admin/UpdateAdmin";
import CanceledOrders from "./pages/Admin/CanceledOrders";
import UpdatePosts from "./pages/Admin/UpdatePosts";
import CreateSubject from "./pages/Admin/CreateSubject";
import Banner from "./pages/Admin/Banner";
import ViewBanner from "./pages/Admin/ViewBanner";
import UpdateBanner from "./pages/Admin/UpdateBanner";
import HomePageBookPost from "./pages/Admin/HomePageBookPost";
import ViewHomePageBook from "./pages/Admin/ViewHomePageBook";
import CreateDealerState from "./pages/Admin/CreateDealerState";
import ViewDealerNetwork from "./pages/ViewDealerNetwork";
import SearchAdmin from "./pages/Admin/SearchAdmin";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
// import OwnerRoute from "./components/Routes/OwnerRoutes";
// import OwnerDashboard from "./pages/Owners/OwnerDashboard";

function App() {
  return (
    <>
      {/* <HashRouter> */}
      <ScrollToTopButton />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:uid" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin-search" element={<SearchAdmin />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/textbook-gallery" element={<TextBookGallery />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/dashboard" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        {/* <Route path="/dashboard" element={<OwnerRoute />}>
          <Route path="owner" element={<OwnerDashboard />} />
          <Route path="owner/dashboard" element={<OwnerDashboard />} />
        </Route> */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDash />} />
          <Route path="admin/dashboard" element={<AdminDash />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/view_dealers" element={<ViewDealers />} />
          <Route path="admin/view_posts" element={<ViewPosts />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-subject" element={<CreateSubject />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/write_review" element={<WriteReview />} />
          <Route path="admin/blog_post" element={<BlogPost />} />
          <Route path="admin/product/:uid" element={<UpdateProduct />} />
          <Route path="admin/user_details" element={<UserDetails />} />
          <Route path="admin/owner_details" element={<OwnerDetails />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/dealernetwork" element={<CreateDealer />} />
          <Route path="admin/signup_admin" element={<CreateAdmin />} />
          <Route path="admin/update_admin_details" element={<UpdateAdmin />} />
          <Route path="admin/canceled_orders" element={<CanceledOrders />} />
          <Route path="admin/csv" element={<UploadCSV />} />
          <Route path="admin/posts/:slug" element={<UpdatePosts />} />
          <Route path="admin/banner" element={<Banner />} />
          <Route path="admin/view_banner" element={<ViewBanner />} />
          <Route path="admin/banner/:id" element={<UpdateBanner />} />
          <Route
            path="admin/create_dealer_state"
            element={<CreateDealerState />}
          />
          <Route
            path="admin/homepage_book_post"
            element={<HomePageBookPost />}
          />
          <Route path="admin/view_home_book" element={<ViewHomePageBook />} />
        </Route>
        <Route path="/adminmenu" element={<AdminMenu />} />
        <Route path="/read_grow" element={<ReadAndGrow />} />
        <Route path="/arrow_activity" element={<ArrowActivity />} />
        <Route path="/e_resources" element={<Eresources />} />
        <Route path="/new_release" element={<Newreleases />} />
        <Route path="/dealer_network" element={<DealerNetwork />} />
        <Route path="/GrowPath" element={<GrowthPathArrow />} />
        <Route path="/Team-Arrow" element={<TeamArrow />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/view-dealer-network" element={<ViewDealerNetwork />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="/*" element={<Pagenotfound />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      {/* </HashRouter> */}
    </>
  );
}

export default App;
