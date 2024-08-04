import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import LockResetIcon from "@mui/icons-material/LockReset";

const ResetPassword = () => {
  const { token } = useParams();
  console.log("Token:", token);
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
    console.log("Form data", values);
    axios
      .post(`http://localhost:3000/api/v3/users/resetpassword/${token}`, values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="flex bg-gray-50 flex-wrap justify-center items-center w-max-screen h-auto py-10">
      <div className="flex flex-wrap bg-white shadow-lg shadow-slate-500 rounded-md justify-evenly w-1/3 items-center">
        <div className="pt-3">
          <div className="text-center text-9xl font-semibold">
            <LockResetIcon fontSize="inherit" />
            <h3>Reset Password</h3>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex w-3/4 flex-wrap justify-center items-center gap-2  mt-2 h-auto py-4">
              <div className="w-100">
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
              <div className="w-100">
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
                className="w-2/5 text-white bg-gray-700 px-3 py-2 my-2 rounded-md hover:bg-gray-600"
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
