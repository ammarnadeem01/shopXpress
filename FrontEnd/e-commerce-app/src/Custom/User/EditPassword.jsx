import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useSelector } from "react-redux";
import api from "../../axiosConfig";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChanged from "./PasswordChanged";
import LoginRequired from "../CheckOut/LoginRequired";
const EditPassword = () => {
  const { isLogin } = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const [showPasswdChnaged, setShowPasswdChanged] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { accessToken } = useSelector((state) => {
    return state.userReducer;
  });
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);
    console.log("Form data", values);
    // axios
    //   .patch(`http://localhost:3000/api/v3/users/updatePassword`, values, {
    api
      .patch(`api/v3/users/updatePassword`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setShowPasswdChanged(true);
        setTimeout(() => {
          setShowPasswdChanged(false);
          nav("/");
        }, 3000);
      })
      .catch((err) => {
        setIsLoading(false);

        setErrMsg(err.response.data.message);
      });
    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  };

  return (
    <Fragment>
      {!isLogin && <LoginRequired></LoginRequired>}
      {showPasswdChnaged && <PasswordChanged />}
      <div className="flex bg-gray-50 flex-wrap justify-center max-w-full items-center w-max-screen h-auto py-10">
        <div className="flex flex-wrap bg-white shadow-lg shadow-slate-500 rounded-md justify-evenly xs:w-full md:w-1/2 lg:w-5/12 items-center">
          <div className="pt-3">
            <div className="text-center text-9xl font-semibold">
              <LockResetIcon fontSize="inherit" />
              <p className="text-2xl xs:mb-2 sm:mb-3 md:mb-5 lg:mb-7">
                Reset Password
              </p>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-wrap justify-center items-center gap-2 mt-2 h-auto w-full py-4">
                <div className="sm:w-2/3 xs:w-11/12 md:w-10/12 450:w-2/3 lg:w-3/4 xl:2/3 2xl:w-1/2">
                  <label
                    className="font-semibold text-xl"
                    htmlFor="currentPassword"
                  >
                    Current Password
                  </label>
                  <Field
                    className="border-2 border-gray-600 rounded-md w-full px-3 py-2"
                    type={show ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
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
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="sm:w-2/3 xs:w-11/12 md:w-10/12 450:w-2/3 lg:w-3/4 xl:2/3 2xl:w-1/2">
                  <label
                    className="font-semibold text-xl"
                    htmlFor="newPassword"
                  >
                    New Password
                  </label>

                  <Field
                    className="border-2 border-gray-600 rounded-md w-full px-3 py-2"
                    type={showNew ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                  />
                  {showNew && (
                    <VisibilityIcon
                      onClick={() => setShowNew(false)}
                      className=" cursor-pointer absolute -translate-x-8 translate-y-3"
                    />
                  )}
                  {!showNew && (
                    <VisibilityOffIcon
                      onClick={() => setShowNew(true)}
                      className=" cursor-pointer absolute -translate-x-8 translate-y-3"
                    />
                  )}
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="sm:w-2/3 xs:w-11/12 md:w-10/12 450:w-2/3 lg:w-3/4 xl:2/3 2xl:w-1/2 lg:mx-10">
                  <label
                    className="font-semibold text-xl"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <Field
                    className="border-2 border-gray-600 rounded-md w-full px-3 py-2"
                    type={showConfirm ? "text" : "password"}
                    id="confirmPassword"
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
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {errMsg && (
                  <p className="text-red-500 w-full text-center">{errMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/5 text-white bg-gray-700 px-3 py-2 my-2 rounded-md hover:bg-gray-600"
                >
                  {isLoading && <div className="loaderBtn w-5 h-5"></div>}
                  {!isLoading && " Reset Password"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default EditPassword;
