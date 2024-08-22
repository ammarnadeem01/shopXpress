import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BasicSpeedDial from "./SpeedDial.jsx";
import api from "../../axiosConfig.js";
function MyProfile() {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.userReducer);
  const [data, setData] = useState({ name: "", email: "", avatar: null });
  useEffect(() => {
    dispatch({
      type: "SET_USER_ID",
      payload: location.state.data._id,
    });
    dispatch({
      type: "SET_ACCESS_TOKEN_EXPIRY",
      payload: location.state.data.expiresIn,
    });
    dispatch({
      type: "SET_USER_NAME",
      payload: location.state.data.name,
    });
    dispatch({
      type: "SET_ACCESS_TOKEN",
      payload: location.state.data.token,
    });
    dispatch({
      type: "SET_USER_ROLE",
      payload: location.state.data.role,
    });
    if (userId) {
      console.log("UserId", userId);
      // axios
      //   .get(`http://localhost:3000/api/v3/users/${userId}`)
      api
        .get(`api/v3/users/${userId}`)
        .then((data) => {
          console.log(data);
          setData({
            name: data.data.data.user.name,
            email: data.data.data.user.email,
            createdAt: data.data.data.user.createdAt,
            avatar: data.data.data.user.avatar,
          });
        })
        .catch((err) => console.log(err));
    }
    // });
  }, [location.state.data, dispatch, userId]);

  return (
    <div className="flex flex-wrap justify-center  items-start max-w-full pt-14">
      <div className="w-full text-right absolute ">
        <BasicSpeedDial />
      </div>
      <div className="flex w-max-screen h-auto  justify-center flex-wrap items-center py-5">
        <p className="text-4xl font-semibold w-full text-center mb-5">
          My Profile
        </p>
        <div className="flex flex-col sm:flex-row xs:w-full sm:w-11/12  h-full items-center justify-center bg-white ">
          {/* LHS */}
          <div className="flex flex-row flex-wrap w-full sm:w-1/2 justify-evenly pb-5 items-center gap-3">
            <img
              src={data.avatar}
              className="xs:rounded-full xs:w-1/2  sm:max-lg:w-10/12 xl:w-1/2  h-3/4"
            />
            <div
              className="sm:py-2 md:py-3 xs:py-1 sm:px-5 xs:px-3  w-1/2 bg-orange-600 hover:bg-orange-500 text-white text-center cursor-pointer"
              onClick={() => {
                nav("/editprofile", { state: data });
              }}
            >
              Edit Profile
            </div>
          </div>
          {/* RHS */}
          <div className="flex sm:flex-col w-full sm:w-1/2 xs:space-y-2 flex-wrap  sm:justify-evenly sm:items-start xs:justify-center xs:items-center">
            <div className="w-7/12">
              <p className="text-xl font-semibold">Full Name</p>
              <p className="text-gray-700">{data.name}</p>
            </div>
            <div className="w-7/12">
              <p className="text-xl font-semibold">Email</p>
              <p className="text-gray-700">{data.email}</p>
            </div>
            <div className="w-7/12">
              <p className="text-xl font-semibold">Joined On</p>
              <p className="text-gray-700">
                {new Date(data.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="xs:w-2/3 sm:w-full">
              <p className="text-white text-center mb-3 bg-gray-700 hover:bg-gray-600 w-full sm:w-1/2 py-2 cursor-pointer">
                My Orders
              </p>
              <p
                className="text-white text-center  bg-gray-700 hover:bg-gray-600 w-full sm:w-1/2 py-2 cursor-pointer"
                onClick={() => {
                  nav("/editpassword");
                }}
              >
                Change Password
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
