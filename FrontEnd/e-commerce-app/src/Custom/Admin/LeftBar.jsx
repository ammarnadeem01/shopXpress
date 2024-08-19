import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import GradingIcon from "@mui/icons-material/Grading";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CreateIcon from "@mui/icons-material/Create";
import InventoryIcon from "@mui/icons-material/Inventory";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function LeftBar({ data }) {
  const [showMenu, setShowMenu] = useState(data);
  const [showProductsSubmenu, setShowProductsSubmenu] = useState(false);
  useEffect(() => {
    setShowMenu(data);
    if (data) {
      document.body.classList.add("xs:max-1150:overflow-y-hidden");
    } else {
      document.body.classList.remove("xs:max-1150:overflow-y-hidden");
    }
  }, [data]);

  return (
    <div
      className={`z-10 flex flex-col justify-start items-start pl-5 border-r-2 border-gray-300 pb-5 bg-white xs:max-lg:w-2/5 w-1/5   gap-5
        ${
          data === true
            ? "xs:max-1150:flex xs:max-1150:absolute min-h-screen"
            : "xs:max-1150:hidden"
        }`}
    >
      <p className="font-bold xs:max-500:text-white text-xl pt-4 xl:text-2xl my-10">
        E C O M M E R C E
      </p>
      <NavLink to="/admin/dashboard">
        <DashboardIcon />
        Dashboard
      </NavLink>
      <div
        className="menu-item cursor-pointer"
        onClick={() => {
          setShowProductsSubmenu(!showProductsSubmenu);
        }}
      >
        <CategoryIcon />
        Products
      </div>
      {showProductsSubmenu && (
        <div className="pl-6 flex flex-col -my-5 gap-2">
          <NavLink className="menu-item" to="/admin/create">
            <CreateIcon /> Create Product
          </NavLink>
          <NavLink to="/admin/products">
            <InventoryIcon />
            All Products
          </NavLink>
        </div>
      )}
      <NavLink to="/admin/orders">
        <GradingIcon />
        Orders
      </NavLink>
      <NavLink to="/admin/userlist">
        <PeopleAltIcon />
        Users
      </NavLink>
      <NavLink to="/admin/reviews">
        <RateReviewIcon />
        Reviews
      </NavLink>
    </div>
  );
}

export default LeftBar;
