import ReportIcon from "@mui/icons-material/Report";
import { NavLink } from "react-router-dom";

function Forbidden() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-50 p-6">
      <div className="flex flex-col items-center bg-white p-12 rounded-lg shadow-lg max-w-md text-center border border-gray-200">
        <div className="bg-orange-100 p-4 rounded-full mb-6">
          <p className="text-orange-500 text-9xl">
            <ReportIcon fontSize="inherit" />
          </p>
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          You Are Not Allowed To View This Page
        </h1>
        <p className="text-base text-gray-600 mb-6">
          It seems you don't have permission to access this page. Please contact
          support if you believe this is an error.
        </p>
        <NavLink
          to="/"
          className="inline-block px-6 py-2 bg-gray-500 hover:bg-gray-400 text-white text-lg font-medium rounded-md transition-colors duration-300"
        >
          Go to Home
        </NavLink>
      </div>
    </div>
  );
}

export default Forbidden;
