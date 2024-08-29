import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import LockResetIcon from "@mui/icons-material/LockReset";
import api from "../../axiosConfig";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ResetPassword = () => {
  const nav = useNavigate();
  // const { isLogin } = useSelector((state) => state.userReducer);
  // useEffect(() => {
  //   if (!isLogin) {
  //     nav("/user");
  //   }
  // }, [isLogin]);
  const { token } = useParams();
  // console.log("Token:", token);
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // console.log("Form data", values);
    // axios
    //   .post(`http://localhost:3000/api/v3/users/resetpassword/${token}`, values)
    api
      .post(`api/v3/users/resetpassword/${token}`, values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        nav("/user");
        console.log(err);
      });
    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  };

  return (
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
                <label className="font-semibold text-xl" htmlFor="newPassword">
                  New Password
                </label>
                <Field
                  className="border-2 border-gray-600 rounded-md w-full px-3 py-2"
                  type="password"
                  id="newPassword"
                  name="newPassword"
                />
                <ErrorMessage name="newPassword" component="div" />
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
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                />
                <ErrorMessage name="confirmPassword" component="div" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/5 text-white mt-2 bg-gray-700 px-3 py-2 my-2 rounded-md hover:bg-gray-600"
              >
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
