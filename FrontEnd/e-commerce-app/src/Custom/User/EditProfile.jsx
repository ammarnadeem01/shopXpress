import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .matches("^[^@s]+@[^@s]+.[^@s]+$", "Invalid email format")
      .required("Email is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    // if (values.password) formData.append("password", values.password);
    if (values.avatar) formData.append("avatar", values.avatar);
    console.log(values);

    axios
      .patch(`http://localhost:3000/api/v3/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Profile updated successfully.");
        //
        //
        //

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
          payload: location.state.data.name,
        });

        //
        //
        //
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
    <div className="flex bg-gray-50 flex-wrap justify-center items-center w-full h-auto py-10">
      <div className="flex flex-wrap bg-white shadow-lg shadow-slate-500 rounded-md justify-evenly w-1/3 items-center">
        <div className="pt-3">
          <h1 className="font-semibold">Edit Profile</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex w-3/4 flex-wrap justify-center items-center gap-2 mt-2 h-auto py-4">
              <div className="w-full relative">
                <BadgeIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
                <Field
                  type="text"
                  placeholder="Name"
                  className="border-2 border-gray-600 rounded-md w-full pl-14 py-2"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>
              <div className="w-full relative">
                <EmailIcon className="absolute translate-x-1 translate-y-2 ml-2.5" />
                <Field
                  type="text"
                  placeholder="Email"
                  className="border-2 border-gray-600 rounded-md w-full pl-14 py-2"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>
              <div className="w-full">
                <input
                  type="file"
                  className="hidden"
                  id="avatar"
                  name="avatar"
                  onChange={(event) =>
                    setFieldValue("avatar", event.currentTarget.files[0])
                  }
                />
                <label
                  htmlFor="avatar"
                  className="bg-gray-800 text-white w-full mt-2 text-center py-2 px-4 rounded-md cursor-pointer hover:bg-gray-600"
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
