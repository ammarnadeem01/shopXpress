import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import LeftBar from "./LeftBar";
import { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useSelector } from "react-redux";
import api from "../../axiosConfig";
import BasicSpeedDial from "../User/SpeedDial";

function AllReviews() {
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [isOpen, setOpen] = useState(true);
  const nav = useNavigate();
  const { accessToken } = useSelector((state) => state.userReducer);

  function searchReviews() {
    let revData;
    // axios
    //   .get(`http://localhost:3000/api/v3/reviews/product/${productId}`, {
    api
      .get(`api/v3/reviews/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((results) => {
        const reviewsData = results.data.data.reviews;
        revData = reviewsData.map(async (review) => {
          let response;
          if (review.reviewedBy) {
            try {
              // response = await axios.get(
              //   `http://localhost:3000/api/v3/users/${review.reviewedBy}`,
              response = await api.get(`api/v3/users/${review.reviewedBy}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
              const userName = response.data.data.user?.name;
              return { ...review, user: userName };
            } catch (error) {
              if (error.response?.status === 404) {
                return { ...review, user: "[Deleted User]" };
              } else {
                // console.error("Error fetching user details:", error);
                return review;
              }
            }
          } else {
            return review;
          }
        });

        Promise.all(revData)
          .then((updatedReviews) => {
            // console.log("updatedReviews", updatedReviews);
            setReviews(updatedReviews);
            setIsLoading(false);
          })
          .catch((error) => {
            // console.error("Error processing reviews:", error);
            // Handle any errors that occur during the Promise.all execution
            nav("/forbidden");
          });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  const deleteReview = (revid) => {
    // axios
    //   .delete(`http://localhost:3000/api/v3/reviews/${revid}`, {
    api
      .delete(`api/v3/reviews/${revid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => searchReviews());
    // .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      {isLoading && (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && (
        <div className="flex w-full min-h-screen bg-gray-100">
          {/* Hamburger for Mobile */}
          <div className="absolute 1150:hidden z-40 p-4">
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
          {/* <div className="text-end w-full absolute pt-16">
            <BasicSpeedDial />
          </div> */}
          <div className="w-4/5 z-20 xs:max-1150:w-full p-6">
            <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
              All Reviews
            </div>

            {/* Search Input */}
            <div className="flex flex-col justify-center items-center gap-3 w-full z-10 h-auto py-5 text-gray-700 font-semibold">
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
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {rev._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        {rev.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {rev.review.length > 50
                          ? `${rev.review.slice(0, 50)}...`
                          : rev.review}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {rev.ratings}
                      </td>
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
                  <div className="text-sm text-gray-500">
                    Comment: {rev.review}
                  </div>
                  <div className="text-sm text-gray-500">
                    Rating: {rev.ratings}
                  </div>
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
      )}
    </Fragment>
  );
}

export default AllReviews;
