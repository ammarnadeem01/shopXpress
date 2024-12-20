import { Slider } from "@mui/material";
import ProductCard from "../Home/ProductCard";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import BasicSpeedDial from "../User/SpeedDial";
import "../../Custom/Loader.css";
import { useSelector } from "react-redux";
import api from "../../../src/axiosConfig.js";
function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const { accessToken } = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [ratingsValue, setRatingsValue] = useState([0.5, 5]);
  const [priceValue, setPriceValue] = useState([0, Infinity]);
  const [prodLength, setProdLength] = useState(0);
  const [filters, setFilters] = useState({
    category: "",
    keyword: "",
    price: { gte: 0, lte: Infinity },
    avgRating: { gte: 0.5, lte: 5 },
    page: 1,
    limit: 8,
  });
  const [category, setCategory] = useState([
    "SmartPhone",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Electronics",
    "Accessories",
  ]);
  function getData() {
    setIsLoading(true);

    // axios.get(
    //   "http://localhost:3000/api/v3/products",
    api
      .get(
        "api/v3/products",
        { params: filters },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        setData(result.data.data.product);
        setProdLength(result.data.filteredProductsCount);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getData();
  }, [filters, currentPage]);

  function clearFilters() {
    setPriceValue([0, Infinity]);
    setCurrentPage(1);
    setCategory("");
    setRatingsValue([0.5, 5]);

    setFilters((prevFilters) => ({
      category: "",
      keyword: "",
      price: { gte: 0, lte: Infinity },
      avgRating: { gte: 0.5, lte: 5 },
      page: 1,
      limit: 8,
    }));
  }
  function handleRatingsChange(e, newValue) {
    setRatingsValue(newValue);
    setFilters((prevFilters) => ({
      ...prevFilters,
      avgRating: { gte: newValue[0], lte: newValue[1] },
    }));
  }

  function handlePriceChange(e, newValue) {
    setPriceValue(newValue);
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: { gte: newValue[0], lte: newValue[1] },
    }));
  }

  function handlePageChange(val) {
    // console.log("val", val);
    setCurrentPage(val);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: val,
    }));
  }

  function handleCategories(selectedCategory) {
    setCategory(selectedCategory);
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: selectedCategory,
    }));
  }

  return (
    <div className="flex flex-wrap justify-center  items-start max-w-full pt-14">
      <div className="w-full text-right absolute ">
        <BasicSpeedDial />
      </div>
      <div className="max-w-full w-screen box-border">
        <p
          className="text-3xl font-semibold text-center mb-5
        border-b-2 border-gray-700
        m-auto w-48 pb-5"
        >
          Products
        </p>
        <div className="flex md:flex-row xs:flex-col justify-center min-w-full h-auto xs:items-center lg:items-start">
          {/* Left */}
          <div className="lg:flex flex-col xs:max-md:-mt-4 md:sticky top-16 left-2 justify-start items-start  xs:w-2/3 450:w-1/2 md:w-1/5 pt-3 px-2 h-auto mt-20">
            <button
              onClick={() => {
                clearFilters();
              }}
              className="hover:bg-orange-500 transition-colors duration-300 hover:text-white border-2  border-orange-500 cursor-pointer px-3 py-2"
            >
              Clear Filters
            </button>
            <div className="px-3 w-full text-lg font-semibold">
              <p>Price</p>
              <Slider
                className="max-w-[200px]"
                value={priceValue}
                onChange={handlePriceChange}
                color="warning"
                valueLabelDisplay="auto"
                max={3900}
                min={0}
                step={50}
              />
            </div>
            <div className="flex flex-col h-auto w-full justify-center items-start px-3">
              <p className="text-lg font-semibold">Categories</p>
              <div className="px-3 flex flex-col mb-2 cursor-pointer">
                {[
                  "SmartPhone",
                  "Laptop",
                  "Footwear",
                  "Bottom",
                  "Tops",
                  "Attire",
                  "Camera",
                  "Electronics",
                  "Accessories",
                ].map((cat) => (
                  <p key={cat} onClick={() => handleCategories(cat)}>
                    {cat}
                  </p>
                ))}
              </div>
            </div>
            <div className="px-3 text-lg font-semibold w-full">
              <p>Ratings Above</p>
              <Slider
                className="max-w-[200px]"
                value={ratingsValue}
                onChange={handleRatingsChange}
                valueLabelDisplay="auto"
                color="warning"
                max={5}
                min={0.5}
                step={0.5}
              />
            </div>
          </div>
          {/* Right */}
          {isLoading && (
            <div className="w-full h-screen flex justify-center items-center ">
              <div className="loader"></div>
            </div>
          )}
          {!isLoading && (
            <div
              id="container"
              className="flex flex-row flex-wrap justify-evenly items-baseline  xs:w-full md:w-4/5 h-auto gap-3 py-10 space-y-2"
            >
              {data.map((product) => (
                <ProductCard key={product._id} data={product} />
              ))}
            </div>
          )}
        </div>
        <div className="w-full flex justify-center items-center my-5">
          <Pagination
            count={Math.ceil(prodLength / 8)}
            color="secondary"
            defaultPage={1}
            page={currentPage}
            onChange={(e, val) => {
              setCurrentPage(val);
              handlePageChange(val);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
