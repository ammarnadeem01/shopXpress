// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import LeftBar from "./LeftBar";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// function UserList() {
//   const [users, setUsers] = useState([]);
//   const nav = useNavigate();

//   const deleteUser = (userid) => {
//     axios
//       .delete(`http://localhost:3000/api/v3/users/${userid}`)
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   };
//   const { accessToken } = useSelector((state) => {
//     return state.userReducer;
//   });

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/v3/users", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((result) => {
//         console.log("users", result);
//         setUsers(result.data.data.users);
//       })
//       .catch((err) => {
//         console.log("Error Fetching Data", err);
//       });
//   }, [users, accessToken]);

//   return (
//     <div className="flex w-max-screen ">
//       {/*  Left Bar */}
//       <LeftBar />
//       {/* Right Bar */}
//       <div className="flex bg-gray-300 w-4/5 h-full ">
//         <div className="flex flex-col w-full h-full items-start bg-white">
//           <div className="flex justify-center items-center w-full h-auto py-5 text-2xl text-gray-700 font-semibold">
//             <p>ALL USERS</p>
//           </div>
//           <div className="flex w-full h-auto bg-orange-600 text-white justify-center items-center flex-wrap py-2">
//             <p className="w-1/4  ">User ID</p>
//             <p className="w-1/4  ">Email</p>
//             <p className="w-1/4  ">Name</p>
//             <p className="w-1/12 ">Role</p>
//             <p className="w-1/12">Actions</p>
//           </div>
//           {users.map((user) => (
//             <div
//               key={user._id}
//               className="flex w-full h-auto bg-gray-300 justify-center items-center flex-wrap py-2"
//             >
//               <p className="w-1/4  ">{user._id}</p>
//               <p className="w-1/4  ">{user.email}</p>
//               <p className="w-1/4  ">{user.name}</p>
//               <p className="w-1/12 ">{user.role}</p>
//               <p className="w-1/12 flex gap-2">
//                 <EditIcon
//                   className="cursor-pointer"
//                   onClick={() => {
//                     nav("/admin/updateuser", {
//                       state: {
//                         name: user.name,
//                         email: user.email,
//                         role: user.role,
//                       },
//                     });
//                   }}
//                 />
//                 <DeleteIcon
//                   className="cursor-pointer"
//                   onClick={() => {
//                     deleteUser(user._id);
//                   }}
//                 />
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserList;

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LeftBar from "./LeftBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const nav = useNavigate();

  const deleteUser = (userid) => {
    axios
      .delete(`http://localhost:3000/api/v3/users/${userid}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const { accessToken } = useSelector((state) => {
    return state.userReducer;
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v3/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log("users", result);
        setUsers(result.data.data.users);
      })
      .catch((err) => {
        console.log("Error Fetching Data", err);
      });
  }, [users, accessToken]);

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left Bar */}
      <LeftBar />
      {/* Right Bar */}
      <div className="flex flex-col bg-gray-300 w-full md:w-3/4 lg:w-4/5">
        <div className="flex justify-center items-center w-full py-5 text-lg md:text-2xl text-gray-700 font-semibold">
          <p>ALL USERS</p>
        </div>
        <div className="flex w-full bg-orange-600 text-white justify-between py-2 px-2 md:px-5">
          <p className="w-1/4 text-xs md:text-sm lg:text-base">User ID</p>
          <p className="w-1/4 text-xs md:text-sm lg:text-base">Email</p>
          <p className="w-1/4 text-xs md:text-sm lg:text-base">Name</p>
          <p className="w-1/12 text-xs md:text-sm lg:text-base">Role</p>
          <p className="w-1/12 text-xs md:text-sm lg:text-base">Actions</p>
        </div>
        {users.map((user) => (
          <div
            key={user._id}
            className="flex w-full bg-gray-300 justify-between py-2 px-2 md:px-5"
          >
            <p className="w-1/4 text-xs md:text-sm lg:text-base">{user._id}</p>
            <p className="w-1/4 text-xs md:text-sm lg:text-base">
              {user.email}
            </p>
            <p className="w-1/4 text-xs md:text-sm lg:text-base">{user.name}</p>
            <p className="w-1/12 text-xs md:text-sm lg:text-base">
              {user.role}
            </p>
            <p className="w-1/12 flex gap-2">
              <EditIcon
                className="cursor-pointer"
                onClick={() => {
                  nav("/admin/updateuser", {
                    state: {
                      name: user.name,
                      email: user.email,
                      role: user.role,
                    },
                  });
                }}
              />
              <DeleteIcon
                className="cursor-pointer"
                onClick={() => {
                  deleteUser(user._id);
                }}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
