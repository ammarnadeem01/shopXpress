import ReportIcon from "@mui/icons-material/Report";
import { NavLink } from "react-router-dom";

function LoginRequired() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-50 p-6">
      <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-lg max-w-sm text-center border border-gray-200">
        <div className="bg-orange-100 p-4 rounded-full mb-6">
          <p className="text-orange-500 text-9xl">
            <ReportIcon fontSize="inherit" />
          </p>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Login Required
        </h1>

        <NavLink
          to="/user"
          className="inline-block px-6 py-2 bg-gray-500 hover:bg-gray-400 text-white text-lg font-medium rounded-md transition-colors duration-300"
        >
          Login / Sign Up
        </NavLink>
      </div>
    </div>
  );
}

export default LoginRequired;
