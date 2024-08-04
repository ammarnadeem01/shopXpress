import ReportIcon from "@mui/icons-material/Report";
// import { NavLink } from "react-router-dom";
function VerifyEmail() {
  return (
    <div className="flex flex-col justify-center items-center w-max-screen h-96">
      <p className="text-orange-500 text-9xl">
        <ReportIcon fontSize="inherit" />
      </p>
      <p className="text-4xl">Please Check Your E-mail</p>
    </div>
  );
}

export default VerifyEmail;
