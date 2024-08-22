import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const actions = [
  {
    icon: <DashboardIcon />,
    name: "dashboard",
    url: "/admin/dashboard",
    adminOnly: true,
  },
  { icon: <ArticleIcon />, name: "Orders", url: "/vieworders" },
  { icon: <AccountCircleIcon />, name: "Profile", url: "/profile" },
  { icon: <ShoppingCartIcon />, name: "Cart", url: "/cart" },
  { icon: <LogoutIcon />, name: "Logout", url: "/user" },
];

export default function BasicSpeedDial() {
  const dispatch = useDispatch();
  const handleActionClick = (action) => {
    if (action.name === "Logout") {
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "CART_RESTORE" });
      localStorage.removeItem("reduxState");
    }
    nav(action.url);
  };
  const { userRole } = useSelector((state) => state.userReducer);
  const nav = useNavigate();
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        direction="down"
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map(
          (action) =>
            (!action.adminOnly || userRole === "Admin") && (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleActionClick(action)}
              />
            )
        )}
      </SpeedDial>
    </Box>
  );
}
