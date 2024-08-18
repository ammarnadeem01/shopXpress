import ProductCard from "./ProductCard";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../Custom/Loader.css";
import axios from "axios";
import api from "../../axiosConfig";
function FeaturedProds() {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useSelector((state) => state.userReducer);
  const [datais, setdatais] = useState([]);
  useEffect(() => {
    console.log("URL-p", import.meta.env.REACT_APP_API_BASE_URL_PROD);
    console.log("URL-d", import.meta.env.REACT_APP_API_BASE_URL_DEV);

    // axios
    //   .get("http://localhost:3000/api/v3/products/highest-rated-products", {
    api
      .get("api/v3/products/highest-rated-products", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        setdatais(result.data.data.product);
        setIsLoading(false);
        console.log(result.data.data.product);
      });
  }, []);
  return (
    <Fragment>
      {isLoading && (
        <div className="w-full h-52 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && (
        <div className="my-16">
          <p
            id="container"
            className="pt-20 text-3xl font-semibold text-center mb-5
    border-b-2  border-gray-700
    m-auto w-80 pb-5
    "
          >
            Featured Products
          </p>
          <div className="flex flex-row justify-center">
            <div className="flex flex-row flex-wrap justify-evenly items-baseline xs:w-full md:w-5/6 h-auto gap-3 py-10 space-y-5">
              {datais.map((product) => {
                return <ProductCard key={product._id} data={product} />;
              })}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default FeaturedProds;
