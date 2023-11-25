import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function OrderPlaced() {
  return (
    <div className="flex flex-col justify-center items-center w-max-screen h-screen">
      <p className="text-orange-500 text-9xl">
        <CheckCircleIcon fontSize="inherit" />
      </p>
      <p className="text-4xl">Your Order Has Been Placed Successfully</p>
      <p className="px-6 py-2 mt-4 bg-gray-500 hover:bg-gray-400 text-white text-center">
        View Orders
      </p>
    </div>
  );
}

export default OrderPlaced;
