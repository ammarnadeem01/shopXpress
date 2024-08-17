import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LeftBar from "./LeftBar";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useSelector } from "react-redux";
import "../../Custom/Loader.css";

function UserList() {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [isOpen, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { accessToken } = useSelector((state) => state.userReducer);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v3/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((results) => {
        console.log(results);
        setUsers(results.data.data.users);
        setIsLoading(false);
      })
      .catch((err) => {
        nav("/forbidden");
      });
  }, [users]);

  const deleteUser = (userid) => {
    axios
      .delete(`http://localhost:3000/api/v3/users/${userid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => nav("/forbidden"));
  };

  return (
    <Fragment>
      {isLoading && (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && (
        <div className="flex w-full min-h-screen bg-gray-100">
          {/* Hamburger for Mobile */}
          <div className="absolute 1150:hidden z-10 p-4">
            <Hamburger
              direction="right"
              duration={0.8}
              toggled={isOpen}
              toggle={setOpen}
              color="#ff5722"
            />
          </div>

          {/* Left Bar */}
          <LeftBar data={isOpen} />

          {/* Right Bar */}
          <div className="w-4/5 xs:max-1150:w-full p-6">
            <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
              All Users
            </div>

            {/* Table for Large Screens */}
            <div className="hidden 1000:block bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-100 transition "
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                        <EditIcon
                          className="cursor-pointer text-blue-500 hover:text-blue-700"
                          onClick={() => {
                            nav("/admin/updateuser", {
                              state: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                              },
                            });
                          }}
                        />
                        <DeleteIcon
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card View for Small Screens */}
            <div className="block 1000:hidden space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-2"
                >
                  <div className="text-lg font-semibold text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500">ID: {user._id}</div>
                  <div className="text-sm text-gray-500">
                    Email: {user.email}
                  </div>
                  <div className="text-sm text-gray-500">Role: {user.role}</div>
                  <div className="flex justify-end space-x-4 mt-4">
                    <EditIcon
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
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
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default UserList;
