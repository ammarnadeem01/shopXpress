import aboutImg from "../../Images/GraphicImages/aboutImage.jpg";
import BasicSpeedDial from "../User/SpeedDial";

function About() {
  return (
    <div className="flex flex-wrap justify-center  items-start max-w-full pt-14">
      <div className="w-full text-right absolute ">
        <BasicSpeedDial />
      </div>
      <div className="about flex bg-gray-50 justify-center items-center p-1 my-3 lg:p-20 w-screen max-w-full">
        <div className="flex flex-col sm:flex-row bg-white z-9 justify-center content-center items-center flex-wrap w-full sm:w-11/12 lg:w-3/4 h-5/6 shadow-2xl shadow-black ">
          {/* Left side */}
          <div className="w-full sm:w-1/2 flex flex-wrap justify-center items-center lg:border-r-2  border-gray-300  space-y-3 h-auto my-6 px-5">
            <div className="w-full flex justify-center items-center ">
              <img
                src={aboutImg}
                alt=""
                className="w-60 h-60  text-center rounded-full"
              />
            </div>
            <p className="w-full text-xl font-semibold text-center text-red-800">
              Ammar Nadeem{" "}
              {console.log(
                import.meta.env.REACT_APP_API_BASE_URL_PROD + "api/v3/products"
              )}
            </p>
            <p className="w-full text-center  text-blue-700">Visit Instagram</p>
            <p className="text-gray-600 text-sm  w-full text-center">
              This is an E-commerce website made by Ammar Nadeem just to get his
              hands dirty with some MERN (MongoDB, Express.js, React.js,
              Node.js) practice.
            </p>
          </div>

          {/* Right side */}
          <div className="w-full sm:w-1/2 flex flex-wrap justify-center items-center  h-auto p-7 lg:p-10">
            <p className="text-justify hyphens-auto">
              Welcome to my <strong>E-Commerce</strong> project! This platform
              is a <strong>full-stack </strong>
              application developed using the <strong>MERN</strong> stack,
              showcasing my ability to build <strong>robust</strong> and
              <strong> scalable </strong> web applications. The site includes
              features such as <strong>product listings</strong>,
              <strong> user authentication</strong>, and a seamless shopping
              experience.
            </p>
            <br />
            <p className="text-justify hyphens-auto">
              My aim with this project was to deepen my understanding of both
              <strong> frontend </strong> and <strong> backend </strong>{" "}
              technologies, while also creating a practical and
              <strong> user-friendly interface</strong>. I hope you enjoy
              exploring the site as much as I enjoyed building it!
            </p>
            <br />
            <p className="text-justify hyphens-auto">
              Stay tuned for more updates as I continue to
              <strong> enhance</strong> the platform with new features and
              improvements. <strong>Thank you for visiting!</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
