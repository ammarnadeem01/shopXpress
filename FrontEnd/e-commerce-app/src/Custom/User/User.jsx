import { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import api from "../../axiosConfig";
import "./Loaderbutton.css";
import ImageCropper from "../../ImageCropper";

const User = () => {
  const getAccessToken = localStorage.getItem("reduxState");
  console.log("getAccessToken", getAccessToken);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [registerForm, setRegisterForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redErrorMessage, setRegErrorMessage] = useState("");
  const nav = useNavigate();
  const [croppedImage, setCroppedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // =================================== Password Show n Hide =============================================
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // =================================== REGISTER =============================================
  const [regFormData, setRegFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  function handleRegSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.set("name", regFormData.name);
    formData.set("email", regFormData.email);
    formData.set("password", regFormData.password);
    formData.set("confirmPassword", regFormData.confirmPassword);
    formData.set("avatar", regFormData.avatar);
    // axios
    //   .post("http://localhost:3000/api/v3/users", formData, {
    api
      .post("api/v3/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log("User Created.");
        nav("/profile", {
          state: { data: res.data.data.newUser },
        });
        setIsLoading(false);
      })

      .catch((error) => {
        setIsLoading(false);
        if (error.response && error.response.data.message) {
          setRegErrorMessage(error.response.data.message);
        } else {
          setRegErrorMessage("An error occurred. Please try again.");
        }
      });
  }
  const handleCropComplete = async (croppedImage) => {
    const response = await fetch(croppedImage);
    const blob = await response.blob();
    const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
    setCroppedImage(croppedImage);
    setRegFormData({ ...regFormData, avatar: file });
  };

  function handleRegChange(e) {
    const { name, value, type, files } = e.target;
    console.log();
    if (type === "file") {
      setImagePreview(URL.createObjectURL(files[0]));
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
    setIsLoading(true);
    // axios
    //   .post(`http://localhost:3000/api/v3/users/login`, logFormData)
    api
      .post(`api/v3/users/login`, logFormData)
      .then((results) => {
        console.log(results);
        setIsLoading(false);
        results.data.user.token = results.data.token;
        results.data.user.expiresIn = results.data.expiresIn;
        nav("/profile", {
          state: { data: results.data.user },
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error Occurred : ", error);
        if (error.response && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
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
    <div className="flex bg-gray-50 flex-wrap justify-center items-center max-w-full min-h-fit py-20">
      {/*login/ register button */}
      <div className="flex flex-wrap bg-white shadow-lg shadow-slate-500 rounded-md justify-evenly xs:w-full sm:w-5/6 800:w-7/12 lg:w-1/2 xl:w-5/12 items-center">
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
            <div className="sm:w-2/3 xs:w-11/12 450:w-2/3 xl:w-2/3">
              {" "}
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
            <div className="sm:w-2/3 xs:w-11/12 450:w-2/3 xl:w-2/3">
              {" "}
              <LockIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="border-2 border-gray-600 rounded-md w-full px-14 py-2"
                name="password"
                onChange={handleLoginChange}
                value={logFormData.password}
              />
              {show && (
                <VisibilityIcon
                  onClick={() => setShow(false)}
                  className=" cursor-pointer absolute -translate-x-8 translate-y-3"
                />
              )}
              {!show && (
                <VisibilityOffIcon
                  onClick={() => setShow(true)}
                  className=" cursor-pointer absolute -translate-x-8 translate-y-3"
                />
              )}
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <p
              onClick={() => {
                nav("/forgotpassword");
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
              {isLoading && <div className="loaderBtn w-5 h-5"></div>}
              {!isLoading && "Login"}
            </button>
          </form>
        )}
        {registerForm && (
          <form
            action=""
            className="flex flex-wrap justify-center items-center gap-2  mt-2 h-auto w-full py-4"
          >
            <div className="sm:w-2/3 xs:w-11/12 450:w-2/3 xl:w-2/3">
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
            <div className="sm:w-2/3 xs:w-11/12 450:w-2/3 xl:w-2/3">
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
            <div className="sm:w-2/3 xs:w-11/12 450:w-2/3 xl:w-2/3">
              <LockIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="border-2 border-gray-600 rounded-md w-full px-14 py-2"
                value={regFormData.password}
                onChange={handleRegChange}
                name="password"
              />

              {show && (
                <VisibilityIcon
                  onClick={() => setShow(false)}
                  className=" cursor-pointer absolute -translate-x-8 translate-y-3"
                />
              )}
              {!show && (
                <VisibilityOffIcon
                  onClick={() => setShow(true)}
                  className=" cursor-pointer absolute -translate-x-8 translate-y-3"
                />
              )}
            </div>

            {/* confirm passswd  */}
            <div className="sm:w-2/3 xs:w-11/12 450:w-2/3 xl:w-2/3">
              <LockIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="border-2 border-gray-600 rounded-md w-full px-14 py-2"
                value={regFormData.confirmPassword}
                onChange={handleRegChange}
                name="confirmPassword"
              />

              {showConfirm && (
                <VisibilityIcon
                  onClick={() => setShowConfirm(false)}
                  className=" cursor-pointer absolute -translate-x-8 translate-y-3"
                />
              )}
              {!showConfirm && (
                <VisibilityOffIcon
                  onClick={() => setShowConfirm(true)}
                  className=" cursor-pointer absolute -translate-x-8 translate-y-3"
                />
              )}
            </div>
            {/* end */}
            <div className="sm:w-2/3 xs:w-11/12 450:w-2/3 xl:w-2/3">
              <input
                type="file"
                placeholder="avatar"
                className="hidden border-2 border-gray-600 rounded-md w-full px-14 py-2"
                name="avatar"
                id="avatar"
                onChange={handleRegChange}
              />
              <label
                htmlFor="avatar"
                className="bg-gray-800 text-white w-full mt-2 text-center py-2 px-4 rounded-md cursor-pointer hover:bg-gray-600"
              >
                Choose Avatar
              </label>
              {imagePreview && (
                <ImageCropper
                  image={imagePreview}
                  onCropComplete={handleCropComplete}
                />
              )}
            </div>
            {redErrorMessage && (
              <p className="w-full text-center" style={{ color: "red" }}>
                {redErrorMessage}
              </p>
            )}
            <button
              type="submit"
              onClick={handleRegSubmit}
              className="block w-2/5 text-white bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600"
            >
              {isLoading && <div className="loaderBtn w-5 h-5"></div>}
              {!isLoading && "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default User;
