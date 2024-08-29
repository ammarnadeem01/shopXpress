import { Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../axiosConfig";
import unknown from "../../Images/GraphicImages/unknown.jpeg";

function ReviewCard({ data }) {
  const [name, setName] = useState("User Name");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    // axios
    //   .get(`http://localhost:3000/api/v3/users/${data.reviewedBy}`)
    api
      .get(`api/v3/users/${data.reviewedBy}`)
      .then((results) => {
        console.log(results);
        if (results.data.data.user.active === true) {
          setName(results.data.data.user.name);
          setAvatar(results.data.data.user.avatar);
        } else {
          setName("[Deleted User]");
          setAvatar(unknown);
          console.log("avatar", avatar);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

  return (
    <div className="bg-white md:h-[50vh] overflow-hidden xs:w-full md:w-[25vw] sm:w-[45vw] shadow-md xs:max-sm:mx-2 shadow-gray-400 flex flex-col justify-center items-center p-4">
      <div className="w-[10vw] md:h-[10vw] hidden sm:block rounded-full border-2">
        <img src={avatar} className="rounded-full w-full h-full" />
      </div>
      <p className="font-semibold">{name}</p>
      <Rating
        name="half-rating"
        value={data.ratings}
        precision={0.5}
        readOnly
      />
      <p className="text-gray-700 text-center xs:line-clamp-3 md:line-clamp-5 lg:line-clamp-4 xl:line-clamp-3">
        {data.review}
      </p>
    </div>
  );
}

export default ReviewCard;
