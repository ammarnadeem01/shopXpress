import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../axiosConfig";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.userReducer);
  const { accessToken } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const initialValues = {
    name: location.state.name,
    email: location.state.email,
    avatar: location.state.avatar,
  };
  function setAvatar(e) {
    const { name, value, type, files } = e.target;
    console.log(name, value, type, files);
    if (type === "file") {
      initialValues.avatar = files[0];
    }
  }
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .matches(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
        "Invalid email format"
      )
      .required("Email is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    console.log("values", values);
    // axios
    //   .patch(`http://localhost:3000/api/v3/users/${userId}`, formData, {
    api
      .patch(`api/v3/users/${userId}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Profile updated successfully.");
        console.log(res);
        dispatch({
          type: "SET_USER_NAME",
          payload: res.data.data.updatedUser.name,
        });
        navigate("/profile", {
          state: { data: res.data.data.updatedUser },
        });
      })
      .catch((err) => {
        console.log("Error updating profile", err);
      });

    setSubmitting(false);
  };

  return (
    <div className="flex bg-gray-50 flex-wrap justify-center max-w-full items-center w-max-screen h-auto py-10">
      <div className="flex flex-wrap bg-white shadow-lg shadow-slate-500 rounded-md justify-evenly xs:w-full md:w-1/2 lg:w-5/12 items-center">
        <div className="pt-3">
          <div className="text-center  border-b-4 px-4 border-b-gray-600 text-9xl font-semibold">
            <p className="text-3xl mb-2">Edit Profile</p>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex bg-black flex-wrap justify-center items-center gap-2 mt-2 h-auto   w-full py-4">
              <div className="sm:w-2/3 xs:w-11/12 md:w-10/12 450:w-2/3 lg:w-3/4  xl:2/3 2xl:w-3/5">
                <BadgeIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
                <Field
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="border-2 border-gray-600 rounded-md w-full pl-14 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="sm:w-2/3 xs:w-11/12 md:w-10/12 450:w-2/3 lg:w-3/4 xl:2/3 2xl:w-3/5">
                <EmailIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
                <Field
                  type="email"
                  placeholder="Email"
                  className="border-2 border-gray-600 rounded-md w-full pl-14 py-2"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="sm:w-2/3 xs:w-11/12 md:w-10/12 450:w-2/3 lg:w-3/4 xl:2/3 2xl:w-3/5 lg:mx-10">
                <input
                  type="file"
                  className="hidden"
                  id="avatar"
                  name="avatar"
                  onChange={(e) => {
                    setAvatar(e);
                  }}
                />
                <label
                  htmlFor="avatar"
                  className="border-2 text-center text-white border-gray-600 rounded-md w-full px-3 py-2 cursor-pointer hover:bg-gray-600 bg-gray-800"
                >
                  Choose Avatar
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/5 text-white bg-gray-700 px-3 py-2 my-2 rounded-md hover:bg-gray-600"
              >
                Update Profile
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfile;
