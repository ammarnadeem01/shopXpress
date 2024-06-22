import { Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function ReviewCard({ data }) {
  const [name, setName] = useState("User Name");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v3/users/${data.reviewedBy}`)
      .then((results) => {
        setName(results.data.data.user.name);
        console.log("results.data.data.user : ",results.data.data.user)
        setAvatar(results.data.data.user.avatar);
      });
  }, [name]);

  return (
    <div className="bg-white w-1/4 shadow-md shadow-gray-400 flex flex-col justify-center items-center p-4">
      <div className="w-2/3 h-2/3 rounded-full border-2 border-orange-600">
      <img src={avatar} className="w-full h-full rounded-full "/>
      </div>
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
