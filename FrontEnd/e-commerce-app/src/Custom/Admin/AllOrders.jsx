import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LeftBar from "./LeftBar";
function AllOrders() {
  return (
    <div className="flex w-max-screen ">
      {/*  Left Bar */}
      <LeftBar />
      {/* Right Bar */}
      <div className="flex bg-gray-300 w-4/5 h-full ">
        <div className="flex flex-col w-full h-full items-start bg-white">
          <div className="flex justify-center items-center w-full h-auto py-5 text-2xl text-gray-700 font-semibold">
            <p>ALL ORDERS</p>
          </div>
          <div className="flex w-full h-auto bg-orange-600 text-white justify-center items-center flex-wrap py-2">
            <p className="w-4/12 ">Products ID</p>
            <p className="w-2/12 ">Status</p>
            <p className="w-2/12 ">Items Qty</p>
            <p className="w-2/12 ">Amount</p>
            <p className="w-2/12 ">Actions</p>
          </div>
          <div className="flex w-full h-auto bg-gray-300 justify-evenly items-center flex-wrap py-2">
            <p className="w-4/12  ">12c67g987dm976wer</p>
            <p className="w-2/12  ">Processing</p>
            <p className="w-2/12  ">100</p>
            <p className="w-2/12 ">$1233</p>
            <p className="w-2/12 flex gap-2">
              <EditIcon />
              <DeleteIcon />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllOrders;
