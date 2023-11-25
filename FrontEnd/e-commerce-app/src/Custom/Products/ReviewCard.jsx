import { Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function ReviewCard({ data }) {
  const [name, setName] = useState("User Name");
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v3/users/${data.reviewedBy}`)
      .then((results) => {
        setName(results.data.data.name);
      });
  }, [name]);

  return (
    <div className="bg-white w-1/4 shadow-md shadow-gray-400 flex flex-col justify-center items-center p-4">
      <div className="bg-orange-500 w-1/4 h-20 rounded-full "></div>
      <p className="font-semibold">{name}</p>
      <Rating
        name="half-rating"
        value={data.ratings}
        precision={0.5}
        readOnly
      />
      <p className="text-gray-700 text-center">{data.review}</p>
    </div>
  );
}

export default ReviewCard;
