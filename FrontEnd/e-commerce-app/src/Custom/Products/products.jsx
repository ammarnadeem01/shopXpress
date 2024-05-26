import { Slider } from "@mui/material";
import ProductCard from "../Home/ProductCard";
import { useEffect, useState } from "react";
// import { fetchData } from "../../Reducers/productsReducers";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
function Products() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [ratingsValue, setRatingsValue] = useState([0, 5]);
  const [priceValue, setPriceValue] = useState([10, 60]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/v3/products").then((result) => {
      setData(result.data.data.product);
      setOriginalData(result.data.data.product);
    });
  }, []);
  function handleRatingsChange(e, newValue) {
    setRatingsValue(newValue);
    actionOnRatingChange();
  }
  function handlePriceChange(e, newValue) {
    setPriceValue(newValue);
    actionOnPriceRange();
  }
  function handleCategories(category) {
    setData(
      originalData.filter((product) => {
        return product.category === category;
      })
    );
  }
  function actionOnPriceRange() {
    setData(
      originalData.filter((product) => {
        return product.price >= priceValue[0] && product.price <= priceValue[1];
      })
    );
    console.log("After Price Change : ", data);
  }
  function actionOnRatingChange() {
    setData(
      originalData.filter((product) => {
        return product.range >= priceValue[0] && product.range <= priceValue[1];
      })
    );
    console.log("After ratings change : ", data);
  }
  return (
    <div className="my-16">
      <p
        className="text-3xl font-semibold text-center mb-5
    border-b-2  border-gray-700
    m-auto w-48 pb-5
    "
      >
        Products
      </p>
      <div className="flex flex-row justify-center h-auto items-start">
        {/* Left */}
        <div className="flex flex-col justify-start items-start w-1/5 pt-3 px-2 h-auto mt-20">
          <div className="px-3 w-full text-lg font-semibold">
            <p>Price</p>
            <Slider
              value={priceValue}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              max={500}
              min={100}
            />
          </div>
          <div className="flex flex-col h-auto w-full justify-center items-start px-3">
            <p className="text-lg  font-semibold">Categories</p>
            <div className="px-3 flex flex-col mb-2 cursor-pointer">
              <p
                onClick={() => {
                  handleCategories("Laptop");
                }}
              >
                Laptop
              </p>
              <p
                onClick={() => {
                  handleCategories("Footwear");
                }}
              >
                Footwear
              </p>
              <p
                onClick={() => {
                  handleCategories("Bottom");
                }}
              >
                Bottom
              </p>
              <p
                onClick={() => {
                  handleCategories("Tops");
                }}
              >
                Tops
              </p>
              <p
                onClick={() => {
                  handleCategories("Attire");
                }}
              >
                Attire
              </p>
              <p
                onClick={() => {
                  handleCategories("Camera");
                }}
              >
                Camera
              </p>
              <p
                onClick={() => {
                  handleCategories("Smartphone");
                }}
              >
                Smartphone
              </p>
            </div>
          </div>
          <div className="px-3 text-lg font-semibold w-full">
            <p>Ratings Above</p>
            <Slider
              value={ratingsValue}
              onChange={handleRatingsChange}
              valueLabelDisplay="auto"
              max={5}
              min={0}
            />
          </div>
        </div>
        {/* Right */}
        <div
          id="container"
          className="flex flex-row flex-wrap justify-evenly items-baseline w-4/5 h-auto gap-3 py-10 space-y-5 "
        >
          {data.map((product) => {
            return <ProductCard key={product.id} data={product} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
