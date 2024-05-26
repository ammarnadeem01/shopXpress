import Rating from "@mui/material/Rating";
import { Fragment, useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import M1 from "../../Images/ProductImages/M1.jpg";
import M2 from "../../Images/ProductImages/M2.jpg";
import M3 from "../../Images/ProductImages/M3.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ProductDetails = () => {
  const [allReviews, setAllReviews] = useState([]);
  function handleReviewSubmission() {
    axios
      .post("http://localhost:3000/api/v3/reviews", {
        productId: location.state.data._id,
        userId,
        review,
        ratings,
      })
      .then((results) => {
        console.log("new review", results.data.data);
        handleClose();
      });
  }
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => {
    return state.userReducer;
  });
  console.log(userId);
  const [count, setCount] = useState(1);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const infoForCart = {
    productId: location.state.data._id,
    quantity: count,
  };
  const nav = useNavigate();
  function AddedToCartFunction() {
    console.log("Order added to cart");
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: infoForCart,
    });
    dispatch({
      type: "UPDATE_ITEM_IN_CART",
      payload: infoForCart,
    });
    
    nav("/products");
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v3/reviews/${location.state.data._id}`)
      .then((results) => {
        console.log(results.data.data.specificProductReviews);
        setAllReviews(results.data.data.specificProductReviews);
      });
  }, [allReviews]);

  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(0);
  return (
    <Fragment>
      <div className="flex w-max-screen h-auto  justify-center items-center flex-wrap  bg-gray-100 pt-10">
        <div className="flex w-4/5 h-4/5 rounded-md shadow-lg flex-wrap">
          {/* image  */}
          <div className="w-1/2">
            <Carousel>
              <Carousel.Item>
                <img src={M1} alt="IMAGE 1" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={M2} className="w-full h-full" alt="IMAGE 1" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={M3} alt="IMAGE 1" />
              </Carousel.Item>
            </Carousel>
          </div>

          {/* detail */}
          <div className="w-1/2 p-6 flex flex-col bg-white justify-evenly items-start">
            <p className="text-2xl font-semibold">{location.state.data.name}</p>
            <p className="text-xs text-gray-400">
              Product # {location.state.data._id}
            </p>
            <div className="flex items-center border-y-2 border-gray-200 w-3/4 py-2">
              <Rating
                name="half-rating"
                defaultValue={2.5}
                readOnly
                precision={0.5}
              />
              <p className="ml-2 mt-3 text-xs">(1 Reviews)</p>
            </div>
            <p className="text-2xl font-semibold mb-2">
              {location.state.data.price}
            </p>
            <div className="flex mb-2 ">
              <p
                className="bg-gray-500 text-white w-5 text-center cursor-pointer"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                +
              </p>
              <p className="w-auto px-2 ">{count}</p>
              <p
                className="bg-gray-500 text-white w-5 text-center cursor-pointer"
                onClick={() => {
                  setCount(count - 1);
                }}
              >
                -
              </p>
              <p
                className="bg-orange-600 cursor-pointer hover:bg-orange-500 ml-3  text-center text-xs flex items-center text-white px-4 rounded-3xl"
                onClick={AddedToCartFunction}
              >
                Add to Cart
              </p>
            </div>
            <p className="border-y-2 border-gray-200 w-3/4 py-2">
              Status :
              <span className="text-green-600 font-semibold ml-2">InStock</span>
            </p>
            <p>
              <span className="text-lg font-semibold">
                Description : <br />
              </span>
              {location.state.data.description}
            </p>
            {/* start */}

            <button
              onClick={handleClickOpen}
              className="bg-orange-600 w-1/4 py-1.5 px-0.5 mt-2 hover:bg-orange-500  text-center text-xs text-white rounded-lg"
            >
              Submit Review
            </button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Rating
                    name="half-rating"
                    value={+ratings}
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
                  id="name"
                  label="Email Address"
                  type="email"
                  name="review"
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleReviewSubmission}>Submit</Button>
              </DialogActions>
            </Dialog>
            {/* end */}
          </div>
        </div>
        <div className="flex justify-evenly gap-4 space-y-10 mb-10 w-screen items-center flex-wrap mt-10">
          <div className="w-full flex justify-center text-2xl font-semibold ">
            <p className="w-auto  border-b-2 border-gray-500 pb-3 px-5">
              REVIEWS
            </p>
          </div>
          {/* REVIEWS */}
          {allReviews.map((review) => (
            <ReviewCard data={review} key={review.id} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
