// import DeleteIcon from "@mui/icons-material/Delete";
// import StarIcon from "@mui/icons-material/Star";
// import LeftBar from "./LeftBar";
// import { useState } from "react";
// import axios from "axios";

// function AllReviews() {
//   const [productId, setProductId] = useState("");
//   const [reviews, setReviews] = useState([]);
//   function searchReviews() {
//     axios
//       .get(`http://localhost:3000/api/v3/reviews/product/${productId}`)
//       .then((results) => {
//         const reviewsData = results.data.data.reviews;
//         Promise.all(
//           reviewsData.map((review) =>
//             axios
//               .get(`http://localhost:3000/api/v3/users/${review.reviewedBy}`)
//               .then((response) => {
//                 const userName = response.data.data.user.name;
//                 return { ...review, user: userName };
//               })
//           )
//         )
//           .then((updatedReviews) => {
//             setReviews(updatedReviews);
//           })
//           .catch((error) => {
//             console.error("Error fetching user names:", error);
//           });
//       })
//       .catch((error) => {
//         console.error("Error fetching reviews:", error);
//       });
//   }

//   const deleteReview = (revid) => {
//     axios
//       .delete(`http://localhost:3000/api/v3/reviews/${revid}`)
//       .then((res) => searchReviews())
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="flex w-max-screen ">
//       {/*  Left Bar */}
//       <LeftBar />
//       {/* Right Bar */}
//       <div className="flex bg-gray-300 w-4/5 h-full ">
//         <div className="flex flex-col w-full h-full items-start bg-white">
//           <div className="flex flex-col justify-center items-center gap-3 w-full h-auto py-5  text-gray-700 font-semibold">
//             <p className="text-2xl">ALL REVIEWS</p>
//             <div className="">
//               <StarIcon className="absolute translate-y-2.5 translate-x-1" />
//               <input
//                 className="border-2 border-gray-300 pl-8 rounded-md pr-2 py-2 text-lg"
//                 placeholder="Enter Product's Id"
//                 value={productId}
//                 onChange={(e) => {
//                   setProductId(e.target.value);
//                 }}
//               />
//             </div>
//             <p
//               className="cursor-pointer bg-orange-600 py-1.5 px-16 rounded-md hover:bg-orange-500 text-white"
//               onClick={searchReviews}
//             >
//               Search
//             </p>
//           </div>
//           <div className="flex w-full h-auto bg-orange-600 text-white justify-evenly items-center flex-wrap py-2">
//             <p className="w-2/12  text-start ">Review ID</p>
//             <p className="w-2/12 text-start  ">User</p>
//             <p className="w-2/5  text-start ">Comment</p>
//             <p className="w-1/12 text-start  ">Rating</p>
//             <p className="w-1/12 text-start  ">Actions</p>
//           </div>
//           {console.log(reviews)}
//           {reviews.map((rev) => (
//             <div
//               className="flex w-full h-auto bg-gray-300 justify-evenly items-center flex-wrap py-2 text-sm"
//               key={rev._id}
//             >
//               <p className="w-2/12 text-gray-500 text-start">{rev._id}</p>
//               <p className="w-2/12 pl-2 text-start ">{rev.user}</p>
//               <p className="w-2/5  text-start">{rev.review}</p>
//               <p className="w-1/12 pl-4">{rev.ratings}</p>
//               <p className="w-1/12 pl-4 text-xs">
//                 <DeleteIcon
//                   className="cursor-pointer"
//                   onClick={() => {
//                     deleteReview(rev._id);
//                   }}
//                 />
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AllReviews;

import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import LeftBar from "./LeftBar";
import { useState } from "react";
import axios from "axios";
import Hamburger from "hamburger-react";

function AllReviews() {
  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isOpen, setOpen] = useState(true);

  function searchReviews() {
    let revData;
    axios
      .get(`http://localhost:3000/api/v3/reviews/product/${productId}`)
      .then((results) => {
        const reviewsData = results.data.data.reviews;
        revData = reviewsData.map(async (review) => {
          const response = await axios.get(
            `http://localhost:3000/api/v3/users/${review.reviewedBy}`
          );
          const userName = response.data.data.user.name;
          console.log({ ...review, user: userName });
          return { ...review, user: userName };
        });
        Promise.all(revData)
          .then((updatedReviews) => {
            console.log("updatedReviews", updatedReviews);
            setReviews(updatedReviews);
          })
          .catch((error) => {
            console.error("Error fetching user names:", error);
          });
      });
  }

  const deleteReview = (revid) => {
    axios
      .delete(`http://localhost:3000/api/v3/reviews/${revid}`)
      .then((res) => searchReviews())
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      {/* Hamburger for Mobile */}
      <div className="absolute 1150:hidden z-10 p-4">
        <Hamburger
          direction="right"
          duration={0.8}
          toggled={isOpen}
          toggle={setOpen}
          color="#ff5722"
        />
      </div>

      {/* Left Bar */}
      <LeftBar data={isOpen} />

      {/* Right Bar */}
      <div className="w-4/5 xs:max-1150:w-full p-6">
        <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All Reviews
        </div>

        {/* Search Input */}
        <div className="flex flex-col justify-center items-center gap-3 w-full h-auto py-5 text-gray-700 font-semibold">
          <div className="relative">
            <StarIcon className="absolute translate-y-2.5 translate-x-1 text-gray-500" />
            <input
              className="border-2 border-gray-300 pl-8 rounded-md pr-2 py-2 text-lg"
              placeholder="Enter Product's ID"
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
              }}
            />
          </div>
          <p
            className="cursor-pointer bg-orange-600 py-1.5 px-16 rounded-md hover:bg-orange-500 text-white"
            onClick={searchReviews}
          >
            Search
          </p>
        </div>

        {/* Table for Large Screens */}
        <div className="hidden 1000:block bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Review ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Comment
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reviews.map((rev) => (
                <tr key={rev._id} className="hover:bg-gray-100 transition">
                  {console.log(rev)}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {rev._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">{rev.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rev.review.length > 50
                      ? `${rev.review.slice(0, 50)}...`
                      : rev.review}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{rev.ratings}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <DeleteIcon
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => {
                        deleteReview(rev._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card View for Small Screens */}
        <div className="block 1000:hidden space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-2"
            >
              <div className="text-lg font-semibold text-gray-800">
                Review ID: {rev._id}
              </div>
              <div className="text-sm text-gray-500">User: {rev.user}</div>
              <div className="text-sm text-gray-500">Comment: {rev.review}</div>
              <div className="text-sm text-gray-500">Rating: {rev.ratings}</div>
              <div className="flex justify-end space-x-4 mt-4">
                <DeleteIcon
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => {
                    deleteReview(rev._id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllReviews;
