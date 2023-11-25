import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

function Navbar() {
  return (
    <nav
      className="
    sticky top-0
    h-16 bg-black text-white
    flex justify-between items-center 
    z-10"
    >
      <div className="logo w-1/3 ml-5 text-3xl ">
        <span className="text-5xl ">S</span>HOP
        <span className="text-5xl italic">X</span>PRES
        <span className="text-5xl ">S</span>
      </div>
      <div className=" flex justify-around w-1/2">
        <NavLink className="navLink no-underline" to="/">
          Home
        </NavLink>
        <NavLink className="navLink no-underline" to="/products">
          Products
        </NavLink>
        <NavLink className="navLink no-underline" to="/contact">
          Contact
        </NavLink>
        <NavLink className="navLink no-underline" to="/about">
          About
        </NavLink>
      </div>
      <div className=" flex justify-evenly w-1/6">
        <NavLink to="/search" className="navLink no-underline ">
          🔍
        </NavLink>
        <NavLink to="/cart" className="navLink no-underline ">
          <ShoppingCartIcon />
        </NavLink>
        <NavLink to="/user" className="no-underline navLink">
          <AccountBoxIcon />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
