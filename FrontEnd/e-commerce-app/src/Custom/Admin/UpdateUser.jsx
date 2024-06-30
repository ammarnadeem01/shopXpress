import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LeftBar from "./LeftBar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function UpdateUser() {
  const loc=useLocation();
  function editUser(){
    console.log("userData",userData)
    axios.patch(`http://localhost:3000/api/v3/users/${userData.email}`,userData,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      console.log("res",res)
      console.log("userData",userData)

    })
    .catch((err)=>console.error("Error:", err.response ? err.response.data : err.message))
  }
  const [userData, setUserData] = useState({
    name:loc.state?.name ,
    email:loc.state?.email,
    role:loc.state?.role 
  })
  function handleFormChange(event)
  {
    const { name, value } = event.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));

  }
  return (
    <div className="flex w-max-screen h-screen">
      {/*  Left Bar */}
      <LeftBar />
      {/* Right Bar */}
      <div className="flex bg-gray-300 w-4/5 h-full ">
        <div className="flex justify-center items-center bg-gray-300 w-full h-full">
          <div className="flex flex-col gap-10 bg-white justify-center items-start py-16 px-8 shadow-black shadow-2xl">
            <p className="text-center text-2xl font-semibold w-full">
              Update User
            </p>
            <div>
              <PersonIcon className="absolute translate-x-2 translate-y-2.5" />
              <input
                className="border-2 border-gray-400 py-2 px-11 rounded-md"
                value={userData.name}
                name="name"
                placeholder="Name"
                onChange={handleFormChange}
              />
            </div>
            <div>
              <EmailIcon className="absolute translate-x-2 translate-y-2.5" />
              <input
                className="border-2 border-gray-400 py-2 px-11 rounded-md"
                value={userData.email}
                name="email"
                placeholder="Email"
                onChange={handleFormChange}
              />
            </div>
            <div className="w-full">

              <VerifiedUserIcon className="absolute translate-x-2 translate-y-2.5" />
               <select
                id="role"
                name="role"
               onChange={handleFormChange}
               value={userData.role}
               className="w-full border-2 border-gray-400 py-2 px-11 rounded-md">
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <button onClick={editUser} className="bg-gray-800 hover:bg-gray-600 rounded-md text-center text-white w-full py-1.5">
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
