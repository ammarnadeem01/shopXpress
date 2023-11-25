import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LeftBar from "./LeftBar";
function UserList() {
  return (
    <div className="flex w-max-screen ">
      {/*  Left Bar */}
      <LeftBar />
      {/* Right Bar */}
      <div className="flex bg-gray-300 w-4/5 h-full ">
        <div className="flex flex-col w-full h-full items-start bg-white">
          <div className="flex justify-center items-center w-full h-auto py-5 text-2xl text-gray-700 font-semibold">
            <p>ALL USERS</p>
          </div>
          <div className="flex w-full h-auto bg-orange-600 text-white justify-center items-center flex-wrap py-2">
            <p className="w-1/4  ">User ID</p>
            <p className="w-1/4  ">Email</p>
            <p className="w-1/4  ">Name</p>
            <p className="w-1/12 ">Role</p>
            <p className="w-1/12">Actions</p>
          </div>
          <div className="flex w-full h-auto bg-gray-300 justify-center items-center flex-wrap py-2">
            <p className="w-1/4  ">12c67g987dm976wer</p>
            <p className="w-1/4  ">ammarnadeempk786@gmail.com</p>
            <p className="w-1/4  ">Ammar Nadeem</p>
            <p className="w-1/12 ">admin</p>
            <p className="w-1/12 flex gap-2">
              <EditIcon />
              <DeleteIcon />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
