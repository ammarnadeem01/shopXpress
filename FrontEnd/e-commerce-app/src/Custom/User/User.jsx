import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
const User = () => {
  const [loginForm, setLoginForm] = useState(true);
  const [registerForm, setRegisterForm] = useState(false);
  const nav = useNavigate();

  // =================================== REGISTER =============================================
  const [regFormData, setRegFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  function handleRegSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v3/users", regFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("User Created.");
        nav("/profile", {
          state: { data: res.data.data.newUser },
        });
      })
      .catch((err) => {
        console.log("Error Ocurred.", err);
      });
  }
  // function handleFileChange(){

  // }
  function handleRegChange(e) {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setRegFormData({ ...regFormData, [name]: files[0] });
    } else {
      setRegFormData({ ...regFormData, [name]: value });
    }
  }

  // =================================== LOGIN =============================================
  const [logFormData, setLogFormData] = useState({
    email: "",
    password: "",
  });
  function handleLoginSubmit(e) {
    e.preventDefault();
    axios
      .get(`http://localhost:3000/api/v3/users/${logFormData.email}`)
      .then((results) => {
        nav("/profile", {
          state: { data: results.data.data.user },
        });
      })
      .catch((err) => {
        console.log("Error Occurred : ", err);
      });
  }
  function handleLoginChange(e) {
    const { name, value } = e.target;
    setLogFormData({ ...logFormData, [name]: value });
  }
  // ========================================================================================
  // ========================================================================================
  function displayFormControl(e) {
    if (e === "login") {
      setLoginForm(true);
      setRegisterForm(false);
    }
    if (e === "register") {
      setLoginForm(false);
      setRegisterForm(true);
    }
  }

  return (
    <div className="flex bg-gray-50 flex-wrap justify-center items-center w-max-screen h-auto py-10">
      {/*login/ register button */}
      <div className="flex flex-wrap bg-white shadow-lg shadow-slate-500 rounded-md justify-evenly w-1/3 items-center">
        <NavLink
          className="w-1/2 no-underline text-center text-2xl active:text-white active:bg-gray-500 py-2 font-semibold"
          onClick={() => {
            displayFormControl("login");
          }}
        >
          LOGIN
        </NavLink>
        <NavLink
          className="w-1/2 no-underline text-center text-2xl active:text-white active:bg-gray-500 py-2 font-semibold"
          onClick={() => {
            displayFormControl("register");
          }}
        >
          REGISTER
        </NavLink>

        {loginForm && (
          <form
            action=""
            className="flex flex-wrap justify-center items-center gap-2  mt-2 h-auto w-full py-4"
          >
            <div className="w-2/3">
              <EmailIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
              <input
                type="text"
                placeholder="Email"
                className="border-2 border-gray-600 rounded-md w-full pl-14 py-2"
                name="email"
                onChange={handleLoginChange}
                value={logFormData.email}
              />
            </div>
            <div className="w-2/3">
              <LockIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
              <input
                type="password"
                placeholder="Password"
                className="border-2 border-gray-600 rounded-md w-full px-14 py-2"
                name="password"
                onChange={handleLoginChange}
                value={logFormData.password}
              />
              <RemoveRedEyeIcon className="absolute -translate-x-8 translate-y-3" />
            </div>
            <p
              onClick={() => {
                displayFormControl("register");
              }}
              className="no-underline w-full text-center cursor-pointer text-blue-600"
            >
              Forgot passwod?
            </p>
            <button
              type="submit"
              className="w-1/5 text-white bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600"
              onClick={handleLoginSubmit}
            >
              Login
            </button>
          </form>
        )}
        {registerForm && (
          <form
            action=""
            className="flex flex-wrap justify-center items-center gap-2  mt-2 h-auto w-full py-4"
          >
            <div className="w-2/3">
              <BadgeIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
              <input
                type="text"
                placeholder="Name"
                className="border-2 border-gray-600 rounded-md w-full pl-14 py-2"
                value={regFormData.name}
                onChange={handleRegChange}
                name="name"
              />
            </div>
            <div className="w-2/3">
              <EmailIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
              <input
                type="text"
                placeholder="Email"
                className="border-2 border-gray-600 rounded-md w-full pl-14 py-2"
                value={regFormData.email}
                onChange={handleRegChange}
                name="email"
              />
            </div>
            <div className="w-2/3">
              <LockIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
              <input
                type="password"
                placeholder="Password"
                className="border-2 border-gray-600 rounded-md w-full px-14 py-2"
                value={regFormData.password}
                onChange={handleRegChange}
                name="password"
              />
              <RemoveRedEyeIcon className="absolute -translate-x-8 translate-y-3" />
            </div>
            <div className="w-2/3">
              <input
                type="file"
                placeholder="avatar"
                className="hidden border-2 border-gray-600 rounded-md w-full px-14 py-2"
                name="avatar"
                id="avatar"
                onChange={handleRegChange}
              />
              <label htmlFor="avatar"
              className="bg-gray-800 text-white w-full mt-2 text-center py-2 px-4 rounded-md cursor-pointer hover:bg-gray-600">
                Choose Avatar
              </label>
            </div>
            <button
              type="submit"
              onClick={handleRegSubmit}
              className="w-2/5 text-white bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default User;
