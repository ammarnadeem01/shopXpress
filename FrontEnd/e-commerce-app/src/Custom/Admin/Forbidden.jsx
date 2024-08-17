import ReportIcon from "@mui/icons-material/Report";
import { NavLink } from "react-router-dom";
function Forbidden() {
  return (
    <div className="flex flex-col justify-center items-center w-max-screen h-96">
      <p className="text-orange-500 text-9xl">
        <ReportIcon fontSize="inherit" />
      </p>
      <p className="text-4xl">You are Not Allowed To View This Page</p>
      <NavLink
        to="/admin/dashboard"
        className="no-underline px-6 py-2 mt-4 bg-gray-500 hover:bg-gray-400 text-white text-center"
      >
        Home
      </NavLink>
    </div>
  );
}

export default Forbidden;
