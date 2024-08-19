import ReportIcon from "@mui/icons-material/Report";

function VerifyEmail() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-50 p-6">
      <div className="flex flex-col items-center bg-white p-10 rounded-md shadow-lg max-w-lg border border-gray-200">
        <div className="bg-orange-100 p-4 rounded-full mb-6">
          <ReportIcon fontSize="large" className="text-orange-500" />
        </div>
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">
          Check Your E-mail
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          We've sent a verification link to your email address. Please check
          your inbox and follow the instructions to verify your account.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;
