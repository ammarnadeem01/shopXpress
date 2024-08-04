import { Formik, Form, Field, ErrorMessage } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
const ForgotPassword = () => {
  const nav = useNavigate();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const onSubmit = (values) => {
    axios
      .post("http://localhost:3000/api/v3/users/forgotpassword", values)
      .then((res) => {
        console.log("res", res);
        nav("/verifyEmail");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex bg-gray-50 flex-wrap justify-center items-center w-max-screen h-auto py-10">
      <div className="flex flex-wrap bg-white shadow-lg shadow-slate-500 rounded-md justify-evenly w-1/3 items-center">
        <div className="pt-3">
          <div className="text-center text-9xl font-semibold">
            <SupportAgentIcon fontSize="inherit" />
            <h3> Forgot Password?</h3>
          </div>
          <ul className="list-disc pl-4">
            <li>Enter Email and Submit.</li>
            <li>Follow the instructions provided in the mail.</li>
          </ul>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-wrap justify-center items-center gap-2  mt-2 h-auto w-full py-4">
              <div>
                <EmailIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="border-2 border-gray-600 rounded-md w-full px-14 py-2"
                />
                <ErrorMessage name="email" component="div" />
              </div>
              <button
                type="submit"
                className="w-2/5 mt-2 text-white bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
