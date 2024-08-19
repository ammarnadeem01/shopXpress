import { Field, Form, Formik, ErrorMessage } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import BasicSpeedDial from "../User/SpeedDial";
import api from "../../axiosConfig";

function Contact() {
  const messageData = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  };
  const [errMsg, setErrMsg] = useState("");
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters")
      .max(30, "Username must be less than 30 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    message: Yup.string()
      .required("Message is required")
      .min(1, "Bio must be at least 1 character")
      .max(300, "Message cannot exceeds 300 characters"),
  });
  function handleFormSubmit(values, { resetForm }) {
    // axios
    //   .post("http://localhost:3000/api/v3/message", values)
    api
      .post("api/v3/message", values)
      .then((result) => {
        console.log(result);
        resetForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <div className="flex flex-wrap justify-center  items-start max-w-full pt-14">
      <div className="w-full text-right absolute ">
        <BasicSpeedDial />
      </div>
      <div className="flex justify-center max-w-screen h-auto items-center bg-white">
        <div className="flex flex-col lg:flex-row justify-center xs:w-full md:w-5/6 h-auto p-1 lg:p-10 bg-white shadow-2xl items-center">
          {/* left side */}
          <div className="flex w-full border-b-2 pb-5 lg:pb-0 lg:border-b-0 border-b-gray-700 lg:w-1/2 max-h-full lg:mx-10 justify-center items-center ">
            <Formik
              initialValues={messageData}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              <Form
                action=""
                method="get"
                className="flex flex-col gap-3 justify-center items-center"
              >
                <p className="text-3xl text-center mb-7 font-semibold">
                  Leave A Message
                </p>
                <div className="relative">
                  <label htmlFor="" className="text-xl font-semibold">
                    Name :
                  </label>
                  <br />
                  <Field
                    type="text"
                    name="name"
                    className="w-80 p-2 rounded-md"
                    style={{ border: "0.5px solid gray" }}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="absolute text-red-500"
                    style={{ top: "100%", left: "0" }}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="" className="text-xl font-semibold">
                    Email :
                  </label>
                  <br />
                  <Field
                    type="email"
                    name="email"
                    className="w-80 p-2 rounded-md"
                    style={{ border: "0.5px solid gray" }}
                  ></Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="absolute text-red-500"
                    style={{ top: "100%", left: "0" }}
                  />
                  <br />
                </div>
                <div className="relative">
                  <label htmlFor="" className="text-xl font-semibold">
                    Phone Number :
                  </label>
                  <br />
                  <Field
                    type="text"
                    name="phoneNumber"
                    className="w-80 p-2 rounded-md"
                    style={{ border: "0.5px solid gray" }}
                  ></Field>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="absolute text-red-500"
                    style={{ top: "100%", left: "0" }}
                  />
                  <br />
                </div>
                <div className="relative">
                  <label htmlFor="" className="text-xl font-semibold">
                    Message
                  </label>
                  <br />
                  <Field
                    as="textarea"
                    name="message"
                    className="w-80 p-2 rounded-md"
                    style={{ border: "0.5px solid gray", resize: "none" }}
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="absolute text-red-500"
                    style={{ top: "100%", left: "0" }}
                  />
                  <br />
                </div>
                {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
                <div>
                  <button
                    type="submit"
                    className="py-2 px-5 mt-2 text-white bg-gray-800 rounded-md hover:bg-gray-700"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

          {/* right side */}
          <div className="flex mt-4 w-full sm:gap-1 lg:gap-0 lg:w-1/2 flex-wrap h-full justify-center items-center">
            {/* </div> */}
            <p className="text-3xl w-full text-center mb-7 font-semibold">
              Contact Details
            </p>
            {/* email */}
            <div className="sm:w-1/2 xs:w-3/4 lg:w-full flex rounded-md ">
              <div className="w-1/6 flex flex-col flex-wrap justify-center">
                <EmailIcon fontSize="large" />
              </div>
              <div className="flex flex-col flex-wrap justify-center">
                <p className="w-full font-semibold text-lg">Email</p>
                <p className="w-full">ammarnadeem@gmail.com</p>
              </div>
            </div>

            {/* phone */}
            {/* xs:ml-10 sm:ml-32 md:ml-32 */}
            <div className="sm:w-1/2 xs:w-3/4 lg:w-full flex rounded-md">
              <div className="w-1/6 ">
                <CallIcon fontSize="large" />
              </div>
              <div className="flex flex-col flex-wrap justify-center items-center">
                <p className="w-full font-semibold text-lg">Phone</p>
                <p className="w-full">0322-8696218</p>
              </div>
            </div>
            {/* mail office */}

            <div className="sm:w-1/2 xs:w-3/4 lg:w-full flex rounded-md">
              <div className="w-1/6">
                <LocationOnIcon fontSize="large" />
              </div>
              <div className="flex flex-col flex-wrap justify-center items-center">
                <p className="w-full font-semibold text-lg">Mail Office</p>
                <p className="w-full">
                  Sultan Ahmed Road <br /> Rehmanpura, Lahore
                </p>
              </div>
            </div>

            {/* map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.725460352245!2d74.30784987484141!3d31.504229247940756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190387afc3755d%3A0x6eceb431209fcd35!2sUniversity%20Of%20The%20Punjab%2C%20Main%20Campus%20Lahore.!5e0!3m2!1sen!2s!4v1689428121632!5m2!1sen!2s"
              style={{
                border: 0,
                width: "75%",
                height: "50%",
                marginTop: "10px",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
