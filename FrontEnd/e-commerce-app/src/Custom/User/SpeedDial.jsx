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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import api from "../../axiosConfig.js";

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
  const [login, setLogin] = useState(false);
  const { userId, accessToken, userRole, isLogin } = useSelector(
    (state) => state.userReducer
  );
  // let login;
  const reduxState = localStorage.getItem("reduxState");
  useEffect(() => {
    // console.log("reduxState", );
    const log = JSON.parse(reduxState)?.isLogin;
    // const log = JSON.parse(reduxState).isLogin;

    setLogin(log);
  }, [login]);

  const dispatch = useDispatch();
  const handleActionClick = (action) => {
    if (action.name === "Profile") {
      api
        .get(`api/v3/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // console.log("userId in sd : ", userId);
          // console.log("response in sd : ", response);
          response.data.data.user.token = accessToken;
          nav(action.url, { state: { data: response.data.data.user } });
        });
    } else if (action.name === "Logout") {
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "CART_RESTORE" });
      localStorage.removeItem("reduxState");
      nav(action.url);
    } else {
      nav(action.url);
    }
  };
  const nav = useNavigate();
  return (
    <>
      {isLogin && (
        <Box
          sx={{
            height: userRole === "Admin" ? 320 : 275,
            transform: "translateZ(0px)",
            flexGrow: 1,
          }}
        >
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
      )}
    </>
  );
}
