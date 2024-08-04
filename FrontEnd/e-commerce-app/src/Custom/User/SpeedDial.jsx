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

const actions = [
  { icon: <DashboardIcon />, name: "dashboard", url: "/admin/dashboard" },
  { icon: <ArticleIcon />, name: "Orders", url: "/orders" },
  { icon: <AccountCircleIcon />, name: "Profile", url: "/profile" },
  { icon: <ShoppingCartIcon />, name: "Cart", url: "/cart" },
  { icon: <LogoutIcon />, name: "Logout", url: "/user" },
];

export default function BasicSpeedDial() {
  const nav = useNavigate();
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        direction="down"
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => nav(action.url)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
