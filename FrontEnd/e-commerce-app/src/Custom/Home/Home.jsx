import { FiArrowDown } from "react-icons/fi";
import "./Home.css";
import FeaturedProds from "./FeaturedProds";
import { Fragment } from "react";

function Home() {
  return (
    <Fragment>
      {/* Welcome Screen */}
      <Fragment>
        <div className="flex min-w-screen min-h-screen ">
          <div className="imgDiv  min-w-full min-h-full flex flex-col no-underline text-white justify-center items-center  gap-16">
            <p className="text-2xl font-semibold">Welcome To E-commerce</p>
            <p className="text-4xl font-semibold text-center">
              FIND AMAZING PRODUCTS BELOW
            </p>
            <a
              className="flex justify-center items-center bg-white hover:bg-transparent
        outline outline-1 outline-white
        hover:transition ease-in-out 
        transition-colors duration-1000   
        px-7 py-2
        text-black hover:text-white"
              href="#container"
            >
              Scroll &nbsp;
              <FiArrowDown className="font-extrabold " />
            </a>
          </div>
        </div>
      </Fragment>

      {/* Featured Products */}
      <FeaturedProds />
    </Fragment>
  );
}

export default Home;
