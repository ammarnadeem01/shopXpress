import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

function Navbar() {
  const { cartItems } = useSelector((state) => {
    return state.cartReducer;
  });
  useEffect(() => {
    console.log("upon re-rendering cartitems ", cartItems);
  }, [cartItems]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <nav className="sticky top-0 bg-black max-w-full min-w-full text-white h-16 flex justify-between items-center z-50 p-4">
      <div className="logo text-3xl ml-0 lg:ml-5">
        <span className="text-4xl">S</span>HOP
        <span className="text-4xl italic">X</span>PRES
        <span className="text-4xl">S</span>
      </div>

      {/* Menu Icon for Mobile */}
      <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
        {isOpen ? (
          <CloseIcon fontSize="large" />
        ) : (
          <MenuIcon fontSize="large" />
        )}
      </div>

      {/* Navigation Links for Desktop */}
      <div className="hidden lg:flex flex-row items-center w-1/2 justify-between">
        <NavLink
          className="navLink no-underline text-white font-semibold text-xl"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="navLink no-underline text-white font-semibold text-xl"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/products"
        >
          Products
        </NavLink>
        <NavLink
          className="navLink no-underline text-white font-semibold text-xl"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/contact"
        >
          Contact
        </NavLink>
        <NavLink
          className="navLink no-underline text-white font-semibold text-xl"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/about"
        >
          About
        </NavLink>
        {/* Icons for Desktop */}
        <NavLink
          to="/search"
          className="navLink no-underline text-xl lg:text-2xl"
        >
          <SearchIcon />
        </NavLink>
        <NavLink
          aria-label="cart"
          to="/cart"
          className="navLink no-underline text-xl lg:text-2xl"
        >
          <StyledBadge
            badgeContent={cartItems.length === 0 ? 0 : cartItems.length}
            color="secondary"
          >
            <ShoppingCartIcon />
          </StyledBadge>
        </NavLink>
        <NavLink
          to="/user"
          className="navLink no-underline text-xl lg:text-2xl"
        >
          <AccountBoxIcon />
        </NavLink>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col lg:hidden items-center bg-black absolute top-16 left-0 w-full transition-transform duration-300 ease-in-out`}
      >
        <NavLink
          className="navLink no-underline text-white font-semibold text-lg py-2 w-full text-center border-b border-gray-600"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/"
          onClick={toggleMenu}
        >
          Home
        </NavLink>
        <NavLink
          className="navLink no-underline text-white font-semibold text-lg py-2 w-full text-center border-b border-gray-600"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/products"
          onClick={toggleMenu}
        >
          Products
        </NavLink>
        <NavLink
          className="navLink no-underline text-white font-semibold text-lg py-2 w-full text-center border-b border-gray-600"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/contact"
          onClick={toggleMenu}
        >
          Contact
        </NavLink>
        <NavLink
          className="navLink no-underline text-white font-semibold text-lg py-2 w-full text-center border-b border-gray-600"
          style={({ isActive }) => ({
            borderBottom: isActive ? "1px solid white" : "",
          })}
          to="/about"
          onClick={toggleMenu}
        >
          About
        </NavLink>
        {/* Mobile Menu Icons */}
        <NavLink
          to="/search"
          className="navLink no-underline text-xl py-2 w-full text-center border-b border-gray-600"
          onClick={toggleMenu}
        >
          <SearchIcon />
        </NavLink>
        <NavLink
          aria-label="cart"
          to="/cart"
          className="navLink no-underline text-xl py-2 w-full text-center border-b border-gray-600"
          onClick={toggleMenu}
        >
          <StyledBadge
            badgeContent={cartItems.length === 0 ? 0 : cartItems.length}
            color="secondary"
          >
            <ShoppingCartIcon />
          </StyledBadge>
        </NavLink>
        <NavLink
          to="/user"
          className="navLink no-underline text-xl py-2 w-full text-center border-b border-gray-600"
          onClick={toggleMenu}
        >
          <AccountBoxIcon />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
