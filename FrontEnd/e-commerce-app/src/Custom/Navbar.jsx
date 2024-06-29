import { NavLink } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function Navbar() {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
    const {cartItems} = useSelector((state)=>{
      return state.cartReducer;
    }) 
  return (
    <nav
      className="
    sticky top-0
    h-16 bg-black text-white
    flex justify-between items-center 
    z-10"
    >
      <div className="logo w-1/3 ml-5 text-3xl ">
        <span className="text-4xl ">S</span>HOP
        <span className="text-4xl italic">X</span>PRES
        <span className="text-4xl ">S</span>
      </div>
      <div className=" flex justify-around w-1/2">
        <NavLink
          className="navLink no-underline text-white font-semibold text-xl "
          style={({ isActive}) => {  
            return {
              borderBottom: isActive ? "1px solid white" : "",
            };
          }}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
        style={({ isActive}) => {
          return {
            borderBottom: isActive ? "1px solid white" : "",
          };
        }}
          className="navLink no-underline text-white font-semibold text-xl "
          to="/products"
        >
          Products
        </NavLink>
        <NavLink
        style={({ isActive}) => {
          return {
            borderBottom: isActive ? "1px solid white" : "",
          };
        }}
          className="navLink no-underline text-white font-semibold text-xl "
          to="/contact"
        >
          Contact
        </NavLink>
        <NavLink
        style={({ isActive}) => {
          return {
            borderBottom: isActive ? "1px solid white" : "",
          };
        }}
          className="navLink no-underline text-white font-semibold text-xl "
          to="/about"
        >
          About
        </NavLink>
      </div>
      <div className=" flex justify-evenly w-1/6">
        <NavLink to="/search" className="navLink no-underline ">
          🔍
        </NavLink>


       
       <NavLink aria-label="cart"  to="/cart" className="navLink no-underline">
        <StyledBadge badgeContent={cartItems.length==0?0:cartItems.length} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
        </NavLink>

        
        <NavLink to="/user" className="no-underline navLink">
          <AccountBoxIcon />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
