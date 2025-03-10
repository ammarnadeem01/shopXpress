import Rating from "@mui/material/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";

function ProductCard({ data }) {
  const [reviewsLength, setReviewsLength] = useState(0);
  const { accessToken } = useSelector((state) => state.userReducer);

  const nav = useNavigate();
  useEffect(() => {
    // axios
    //   .get(`http://localhost:3000/api/v3/reviews/product/${data._id}`, {
    api
      .get(`api/v3/reviews/product/${data._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setReviewsLength(response.data.length);
      });
  });

  return (
    <div
      className="cursor-pointer md:h-[175px]  lg:h-[450px] bg-white xs:h-[100px] sm:h-[150px] lg:w-1/4 xl:w-1/5 w-11/12  flex flex-row flex-wrap rounded-md shadow-lg hover:-translate-y-3"
      onClick={() => nav(`/product/${data._id}`)}
    >
      <div className="max-w-full xs:flex xs:flex-row lg:block">
        <img
          src={data.productImages[0]}
          alt=""
          className="lg:w-full lg:h-3/5  xs:h-1/2 sm:h-full xs:w-1/6 sm:w-1/4  rounded-t-md"
        />
        <div className="flex flex-wrap pl-2 xs:h-full xs:w-5/6 md:h-full sm:w-3/4 lg:w-full lg:h-2/5">
          <p className="w-full font-semibold px-0.5 xs:text-sm sm:text-base">
            {data.name}
          </p>
          <p className="w-full xs:text-xs md:text-base line-clamp-3  overflow-hidden  text-gray-600 text-sm px-0.5">
            {data.description}
          </p>
          <p className="w-full flex justify-start items-center ">
            <Rating
              name="half-rating"
              defaultValue={data.avgRating}
              readOnly
              precision={0.5}
              value={data.avgRating}
            />
            <span className="xs:text-xs md:text-sm">
              ( {reviewsLength} reviews)
            </span>
          </p>
          <p className="w-full text-red-700 xs:text-xs sm:text-sm md:text-base">
            $ {data.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
