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
import AllOrders from "./Custom/Admin/AllOrders";
import AllReviews from "./Custom/Admin/AllReviews";
import ShippingInfo from "./Custom/Admin/ShippingInfo";
import EmptyCart from "./Custom/Cart/EmptyCart";
//
function App() {
  return (
    <>
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
          <Route path="/admin/orders" element={<AllOrders />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/checkout/confirm" element={<ConfirmOrder />} />
          <Route path="/checkout/payment" element={<Payment />} />
          <Route path="/checkout/shipping" element={<ShippingDetails />} />
          <Route path="/placed" element={<OrderPlaced />} />
          <Route path="/empty" element={<EmptyCart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
