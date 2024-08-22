import Rating from "@mui/material/Rating";
import { Fragment, useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "flowbite-react";
import api from "../../../src/axiosConfig.js";
import "../../Custom/Loader.css";

const ProductDetails = () => {
  const location = useLocation();
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reviewId, setReviewId] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [purchased, setPurchased] = useState(false);
  const [existingReview, setExistingReview] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.userReducer);
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(0);
  const [avgRating, setAvgRating] = useState(0.5);
  const nav = useNavigate();
  const { accessToken } = useSelector((state) => state.userReducer);
  useEffect(() => {
    const productId = location.state.data._id;
    setAvgRating(location.state.data.avgRating);

    // axios
    //   .get(`http://localhost:3000/api/v3/reviews/product/${productId}`, {

    api
      .get(`api/v3/reviews/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((results) => {
        setAllReviews(results.data.data.reviews);
        const userReview = results.data.data.reviews.find((r) => {
          setReviewId(r._id);
          return r.reviewedBy == userId;
        });
        if (userReview) {
          setExistingReview(true);
          setReview(userReview.review);
          setRatings(userReview.ratings);
        }
      })
      .catch((err) => console.log(err));
    // axios
    //   .get(`http://localhost:3000/api/v3/orders/user/${userId}`, {
    api
      .get(`api/v3/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((results) => {
        const orders = results.data.data.order;
        const hasPurchased = orders.some((order) =>
          order.orderedItems.some((product) => product.item === productId)
        );
        setPurchased(hasPurchased);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrMsg("Please Login Again...");
      });
  }, [location.state.data._id, avgRating, userId, open, isLoading]);

  const handleReviewSubmission = () => {
    setIsLoading(true);
    handleClose();
    const reviewData = {
      productId: location.state.data._id,
      userId,
      review,
      ratings,
    };
    const patchReviewData = {
      review,
      ratings,
    };
    console.log("patchReviewData", patchReviewData);
    console.log("reviewData", reviewData);

    // const reviewApi = existingReview ? axios.patch : axios.post;
    // const reviewUrl = `http://localhost:3000/api/v3/reviews${
    const reviewApi = existingReview ? api.patch : api.post;
    const reviewUrl = `api/v3/reviews${existingReview ? `/${reviewId}` : ""}`;
    const reqBody = existingReview ? patchReviewData : reviewData;
    reviewApi(reviewUrl, reqBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((results) => {
        setIsLoading(false);
        console.log("results", results);
        setAllReviews((prevReviews) =>
          existingReview
            ? prevReviews.map((r) =>
                r.reviewedBy === userId ? results.data.data : r
              )
            : [...prevReviews, results.data.data]
        );
      })
      .catch((err) => console.log(err));
  };

  const AddedToCartFunction = () => {
    console.log("Order added to cart");
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: {
        productId: location.state.data._id,
        quantity: count,
      },
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // =======================================================================================================
    //  updation In Code -updated cart to avoid redundancy
    dispatch({
      type: "UPDATE_ITEM_IN_CART",
      payload: {
        productId: location.state.data._id,
        quantity: count,
      },
    });
    // =======================================================================================================
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    nav("/products");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <div className="flex w-max-screen justify-center items-center flex-wrap bg-gray-100 pt-10">
        <div className="flex w-4/5 rounded-md xs:max-md:flex-col shadow-lg flex-wrap">
          <div className="w-1/2  xs:max-md:w-full xs:max-md:h-[50vh]">
            <Carousel>
              {location.state.data.productImages.map((image, index) => (
                <img src={image} className="h-full w-full" />
              ))}
            </Carousel>
          </div>

          {/* detail */}
          <div className="w-1/2  bg-white p-6 flex xs:max-md:w-full flex-col  justify-evenly items-start detail-container">
            <p className="text-2xl font-semibold">{location.state.data.name}</p>
            <p className="text-xs text-gray-400">
              Product # {location.state.data._id}
            </p>
            <div className="flex items-center border-y-2 border-gray-200 w-3/4 py-2">
              <Rating
                name="half-rating"
                defaultValue={avgRating}
                readOnly
                precision={0.5}
                value={avgRating}
              />
              <p className="ml-2 mt-3 text-xs">({allReviews.length} Reviews)</p>
            </div>
            <p className="text-2xl font-semibold mb-2">
              {location.state.data.price}
            </p>
            <div className="flex mb-2">
              <p
                className="bg-gray-500 text-white w-5 text-center cursor-pointer"
                onClick={() =>
                  setCount(
                    count < location.state.data.stock ? count + 1 : count
                  )
                }
              >
                +
              </p>
              <p className="w-auto px-2">{count}</p>
              <p
                className="bg-gray-500 text-white w-5 text-center cursor-pointer"
                onClick={() => setCount(count > 1 ? count - 1 : count)}
              >
                -
              </p>
              <button
                className={`cursor-pointer ml-3 text-center text-xs flex items-center text-white px-4 rounded-3xl ${
                  location.state.data.stock === 0
                    ? "bg-orange-300"
                    : "bg-orange-600 hover:bg-orange-500"
                }`}
                disabled={location.state.data.stock === 0}
                onClick={AddedToCartFunction}
              >
                Add to Cart
              </button>
            </div>
            <p className="border-y-2 border-gray-200 w-3/4 py-2">
              Status:
              <span
                className={`font-semibold ml-2 ${
                  location.state.data.stock === 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {location.state.data.stock === 0 ? "Out Of Stock" : "In Stock"}
              </span>
            </p>
            <p>
              <span className="text-lg font-semibold">
                Description: <br />
              </span>
              {location.state.data.description}
            </p>
            <button
              disabled={!purchased}
              onClick={handleClickOpen}
              className={`w-1/4 py-1.5 px-0.5 mt-2 text-center text-xs text-white rounded-lg ${
                purchased
                  ? "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                  : "bg-orange-200"
              }`}
            >
              Submit Review
            </button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Rating
                    name="half-rating"
                    value={ratings}
                    precision={0.5}
                    onChange={(e) => setRatings(+e.target.value)}
                  />
                </DialogContentText>
                <textarea
                  autoFocus
                  placeholder="Enter your review"
                  className="outline outline-1 outline-gray-200 p-2"
                  cols="30"
                  rows="5"
                  name="review"
                  onChange={(e) => setReview(e.target.value)}
                  value={review}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleReviewSubmission}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        {isLoading && <div className=".loader"></div>}
        {!isLoading && (
          <div className="flex justify-evenly sm:gap-1 md:gap-2 lg:gap-3 xs:space-y-2 md:space-y-10 mb-10 w-screen items-center flex-wrap mt-10">
            <div className="w-full flex justify-center text-2xl font-semibold">
              <p
                className={`w-auto border-b-2 border-gray-500 pb-3 px-5 ${
                  allReviews.length === 0 ? "hidden" : "block"
                }`}
              >
                REVIEWS
              </p>
            </div>

            {allReviews.map((review) => (
              <ReviewCard key={review._id} data={review} />
            ))}
          </div>
        )}
      </div>
      <style>{`
        .carousel-image {
          width: 100%;
          height: 600px; 
          object-fit: cover;
        }
        .detail-container {
          height: 600px; 
        }
      `}</style>
    </Fragment>
  );
};

export default ProductDetails;
