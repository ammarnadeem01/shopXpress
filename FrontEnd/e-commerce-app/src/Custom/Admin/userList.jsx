import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LeftBar from "./LeftBar";
import { useEffect, useState } from "react";
import axios from "axios";
function UserList() {
  const [users, setUsers] = useState([])
  useEffect(() => {
     axios.get("http://localhost:3000/api/v3/users").then((result)=>{
      setUsers(result.data.data.users)
     }).catch((err)=>{
      console.log("Error Fetching Data")
     })
  }, [])
  
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
          {
            users.map((user)=>(
            <div key={user._id} className="flex w-full h-auto bg-gray-300 justify-center items-center flex-wrap py-2">
            <p className="w-1/4  ">{user._id}</p>
            <p className="w-1/4  ">{user.email}</p>
            <p className="w-1/4  ">{user.name}</p>
            <p className="w-1/12 ">{user.role}</p>
            <p className="w-1/12 flex gap-2">
              <EditIcon />
              <DeleteIcon />
            </p>
          </div>
            ))
          } 
        </div>
      </div>
    </div>
  );
}

export default UserList;
