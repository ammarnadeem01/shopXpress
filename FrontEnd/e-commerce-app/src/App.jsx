import Footer from "./Custom/Footer";
import Home from "./Custom/Home/Home";
import Navbar from "./Custom/Navbar";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Custom/About/About";
import Products from "./Custom/Products/products";
import Contact from "./Custom/Contact/Contact";
import Search from "./Custom/Search/Search";
import Cart from "./Custom/Cart/Cart";
import User from "./Custom/User/User";
import ProductDetails from "./Custom/Products/ProductDetails";

import PageNotFound from "./Custom/PageNotFound";
import MyProfile from "./Custom/User/MyProfile";

import ConfirmOrder from "./Custom/CheckOut/ConfirmOrder";
import OrderPlaced from "./Custom/CheckOut/OrderPlacedMsg";
import Payment from "./Custom/CheckOut/Payment";
import ShippingDetails from "./Custom/CheckOut/ShippingDetails";

//
import UserList from "./Custom/Admin/userList";
import UpdateUser from "./Custom/Admin/UpdateUser";
import Dashboard from "./Custom/Admin/Dashboard";
import AllProducts from "./Custom/Admin/AllProducts";
import CreateProduct from "./Custom/Admin/CreateProduct";
import EditProduct from "./Custom/Admin/EditProduct";
import AllOrders from "./Custom/Admin/AllOrders";
import AllReviews from "./Custom/Admin/AllReviews";
import ShippingInfo from "./Custom/Admin/ShippingInfo";
import EmptyCart from "./Custom/Cart/EmptyCart";
import ForgotPassword from "./Custom/User/ForgotPassword";
import ResetPassword from "./Custom/User/ResetPassword";
import VerifyEmail from "./Custom/User/VerifyEmail";
import EditPassword from "./Custom/User/EditPassword";
import EditProfile from "./Custom/User/EditProfile";
import ViewOrders from "./Custom/CheckOut/ViewOrders";
import Forbidden from "./Custom/Admin/Forbidden";
import LoginRequired from "./Custom/CheckOut/LoginRequired";
//
function App() {
  return (
    <div className="box-border p-0 m-0 w-full">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
          <Route path="/detail" element={<ProductDetails />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/updateuser" element={<UpdateUser />} />
          <Route path="/admin/products" element={<AllProducts />} />
          <Route path="/admin/reviews" element={<AllReviews />} />
          <Route path="/admin/shipping" element={<ShippingInfo />} />
          <Route path="/admin/create" element={<CreateProduct />} />
          <Route path="/admin/editproduct" element={<EditProduct />} />
          <Route path="/admin/orders" element={<AllOrders />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/checkout/confirm" element={<ConfirmOrder />} />
          <Route path="/checkout/payment" element={<Payment />} />
          <Route path="/checkout/shipping" element={<ShippingDetails />} />
          <Route path="/loginrequired" element={<LoginRequired />} />
          <Route path="/orderplaced" element={<OrderPlaced />} />
          <Route path="/empty" element={<EmptyCart />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/editpassword" element={<EditPassword />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/vieworders" element={<ViewOrders />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
