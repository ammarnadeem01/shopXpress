import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import LeftBar from "./LeftBar";
import { useState } from "react";
import axios from "axios";

function AllReviews() {
  const [productId,setProductId]=useState("");
  const [reviews,setReviews]=useState([]);
  function searchReviews() {
    axios.get(`http://localhost:3000/api/v3/reviews/${productId}`)
    .then((results) => {
      const reviewsData = results.data.data.specificProductReviews;
      Promise.all(reviewsData.map((review) =>
        axios.get(`http://localhost:3000/api/v3/users/${review.reviewedBy}`)
          .then((response) => {
            const userName = response.data.data.user.name;
            return { ...review, user: userName };
          })
      ))
        .then((updatedReviews) => {
          setReviews(updatedReviews);
        })
        .catch((error) => {
          console.error("Error fetching user names:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
    });
  }
  

  return (
    <div className="flex w-max-screen ">
      {/*  Left Bar */}
      <LeftBar />
      {/* Right Bar */}
      <div className="flex bg-gray-300 w-4/5 h-full ">
        <div className="flex flex-col w-full h-full items-start bg-white">
          <div className="flex flex-col justify-center items-center gap-3 w-full h-auto py-5  text-gray-700 font-semibold">
            <p className="text-2xl">ALL REVIEWS</p>
            <div className="">
              <StarIcon className="absolute translate-y-2.5 translate-x-1" />
              <input
                className="border-2 border-gray-300 pl-8 rounded-md pr-2 py-2 text-lg"
                placeholder="Enter Product's Id"
                value={productId}
                onChange={(e)=>{setProductId(e.target.value)}}
              />
            </div>
            <p className="bg-orange-600 py-1.5 px-16 rounded-md hover:bg-orange-500 text-white"
             onClick={searchReviews}
            >
              Search
            </p>
          </div>
          <div className="flex w-full h-auto bg-orange-600 text-white justify-evenly items-center flex-wrap py-2">
            <p className="w-2/12  text-start ">Review ID</p>
            <p className="w-2/12 text-start  ">User</p>
            <p className="w-2/5  text-start ">Comment</p>
            <p className="w-1/12 text-start  ">Rating</p>
            <p className="w-1/12 text-start  ">Actions</p>
          </div>
          {console.log(reviews)}
          {reviews.map((rev)=>(
          <div className="flex w-full h-auto bg-gray-300 justify-evenly items-center flex-wrap py-2 text-sm" key={rev._id}>
            <p className="w-2/12 text-gray-500 text-start">{rev._id}</p>
            <p className="w-2/12 pl-2 text-start ">{rev.user}</p>
            <p className="w-2/5  text-start">{rev.review}</p>
            <p className="w-1/12 pl-4">{rev.ratings}</p>
            <p className="w-1/12 pl-4 text-xs">
              <DeleteIcon />
            </p>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllReviews;
