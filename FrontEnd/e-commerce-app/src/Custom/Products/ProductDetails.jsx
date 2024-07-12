import Rating from "@mui/material/Rating";
import { Fragment, useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ProductDetails = () => {
  const location = useLocation();
  const [allReviews, setAllReviews] = useState([]);
  const [purchased, setPurchased] = useState(false);
  const [existingReview, setExistingReview] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.userReducer);
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const productId = location.state.data._id;

    // Fetch product reviews
    axios
      .get(`http://localhost:3000/api/v3/reviews/product/${productId}`)
      .then((results) => {
        setAllReviews(results.data.data.reviews);
        const userReview = results.data.data.reviews.find((r) => r.reviewedBy == userId);
        if (userReview) {
          setExistingReview(true);
          setReview(userReview.review);
          setRatings(userReview.ratings);
        }
      })
      .catch((err) => console.log(err));
    console.log("userId",userId)
    // Check if user has purchased the product
    axios
      .get(`http://localhost:3000/api/v3/orders/user/${userId}`)
      .then((results) => {
        console.log("results",results)
        const orders = results.data.data.order;
        const hasPurchased = orders.some(order => order.orderedItems.some(product => product.item === productId));
        console.log(hasPurchased)
        setPurchased(hasPurchased);
      })
      .catch((err) => console.log(err));
  }, [location.state.data._id, userId]);









  const handleReviewSubmission = () => {
    const reviewData = {
      productId: location.state.data._id,
      userId,
      review,
      ratings,
    };
    const Put_reviewData = {
      review,
      ratings,
    };

       const reviewApi = existingReview ? axios.put : axios.post;
       const reviewUrl = `http://localhost:3000/api/v3/reviews${existingReview ? `/${reviewData.id}` : ''}`;
       const reqBody=existingReview ? Put_reviewData : reviewData
       reviewApi(reviewUrl, reqBody)
         .then((results) => {
           console.log("results", results);
           handleClose();
           setAllReviews((prevReviews) =>
             existingReview
               ? prevReviews.map((r) => (r.reviewedBy === userId ? results.data.data: r))
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
        <div className="flex w-4/5 h-4/5 rounded-md shadow-lg flex-wrap">
          {/* image */}
          <div className="w-1/2">
            <Carousel>
              {location.state.data.productImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <img src={image} className="carousel-image" alt={`IMAGE ${index + 1}`} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* detail */}
          <div className="w-1/2 p-6 flex flex-col bg-white justify-evenly items-start detail-container">
            <p className="text-2xl font-semibold">{location.state.data.name}</p>
            <p className="text-xs text-gray-400">Product # {location.state.data._id}</p>
            <div className="flex items-center border-y-2 border-gray-200 w-3/4 py-2">
              <Rating name="half-rating" defaultValue={2.5} readOnly precision={0.5} />
              <p className="ml-2 mt-3 text-xs">({allReviews.length} Reviews)</p>
            </div>
            <p className="text-2xl font-semibold mb-2">{location.state.data.price}</p>
            <div className="flex mb-2">
              <p
                className="bg-gray-500 text-white w-5 text-center cursor-pointer"
                onClick={() => setCount(count < location.state.data.stock ? count + 1 : count)}
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
              <p
                className="bg-orange-600 cursor-pointer hover:bg-orange-500 ml-3 text-center text-xs flex items-center text-white px-4 rounded-3xl"
                onClick={AddedToCartFunction}
              >
                Add to Cart
              </p>
            </div>
            <p className="border-y-2 border-gray-200 w-3/4 py-2">
              Status:
              <span
                className={`font-semibold ml-2 ${
                  location.state.data.stock === 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {location.state.data.stock === 0 ? "Out Of Stock" : "In Stock"}
              </span>
            </p>
            <p>
              <span className="text-lg font-semibold">Description: <br /></span>
              {location.state.data.description}
            </p>
            <button
              disabled={!purchased}
              onClick={handleClickOpen}
              className={`w-1/4 py-1.5 px-0.5 mt-2 text-center text-xs text-white rounded-lg ${
                purchased ? "bg-orange-500 hover:bg-orange-600 cursor-pointer" : "bg-orange-200"
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
        <div className="flex justify-evenly gap-4 space-y-10 mb-10 w-screen items-center flex-wrap mt-10">
          <div className="w-full flex justify-center text-2xl font-semibold">
            <p className="w-auto border-b-2 border-gray-500 pb-3 px-5">REVIEWS</p>
          </div>
          {allReviews.map((review) => (
            <ReviewCard key={review._id} data={review} />
          ))}
        </div>
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