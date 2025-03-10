import { Fragment } from "react";
import ProductCard from "../Home/ProductCard";
import { Slider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import BasicSpeedDial from "../User/SpeedDial";
import api from "../../axiosConfig";
import { useSelector } from "react-redux";
import "../../Custom/Loader.css";
function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [ratingsValue, setRatingsValue] = useState([0.5, 5]);
  const [prodLength, setProdLength] = useState(0);
  const [priceValue, setPriceValue] = useState([0, Infinity]);
  const { accessToken } = useSelector((state) => state.userReducer);
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
    // axios
    //   .get("http://localhost:3000/api/v3/products", { params: filters })
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
  }, [filters]);

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
    setCurrentPage(val);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: val,
    }));
  }
  function clearFilters() {
    setPriceValue([0, Infinity]);
    setCurrentPage(1);
    setCategory("");
    setRatingsValue([0.5, 5]);
    setKeyword("");

    setFilters((prevFilters) => ({
      category: "",
      keyword: "",
      price: { gte: 0, lte: Infinity },
      avgRating: { gte: 0.5, lte: 5 },
      page: 1,
      limit: 8,
    }));
  }
  function handleCategories(selectedCategory) {
    setCategory(selectedCategory);
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: selectedCategory,
    }));
  }

  function handleSearch() {
    setFilters((prevFilters) => ({
      ...prevFilters,
      keyword,
    }));
  }

  return (
    <Fragment>
      {/* Search  */}
      <div className="flex justify-center flex-wrap w-max-screen bg-gray-100">
        <div className="flex w-11/12 h-auto flex-wrap justify-center my-10 items-center space-y-5 rounded-lg shadow-xl bg-white py-10">
          <div className="text-end w-full absolute pt-32">
            <BasicSpeedDial />
          </div>
          <p className="xs:max-md:text-4xl w-full text-center text-5xl font-semibold">
            Search
          </p>
          <div className="w-full flex z-40  flex-col sm:flex-row  xs:max-md:gap-2 flex-wrap  justify-center items-center ">
            <input
              type="search"
              name=""
              className="md:rounded-l-lg w-4/5 md:w-3/5 xs:max-sm:rounded-md border-2 outline-none border-gray-400 active:border-gray-700 px-2 xs:max-md:text-base text-xl xs:max-dm:py-1 py-2.5"
              id=""
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <button
              type="button"
              className="xs:max-sm:text-base xs:max-md:rounded-sm text-2xl md:rounded-r-lg bg-gray-800 hover:bg-gray-700 text-white px-7 py-2.5 font-semibold"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* Start */}
      <div className="my-16">
        <p
          className=" m-auto pb-3 text-5xl font-semibold text-center mb-5
    border-b-2  border-gray-700
     w-56 
    "
        >
          {data.length}
          <span className="text-white ml-2  bg-gray-700 p-1 rounded-md text-xl ">
            Results
          </span>
        </p>
        {/* <div className="flex flex-row justify-center h-auto items-start"> */}
        <div className="flex md:flex-row xs:flex-col justify-center h-auto xs:items-center lg:items-start">
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
                valueLabelDisplay="auto"
                min={0}
                max={42000}
                color="warning"
              />
            </div>
            <div className="flex flex-col h-auto w-full justify-center items-start px-3">
              <p className="text-lg  font-semibold">Categories</p>
              <div className="px-3 cursor-pointer">
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
                min={0.5}
                step={0.5}
                max={5}
                color="warning"
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
              className="flex flex-row flex-wrap justify-evenly items-baseline  xs:w-full md:w-4/5 h-auto gap-3 py-10 space-y-5"
            >
              {data.length !== 0 &&
                data.map((product) => {
                  return <ProductCard key={product.id} data={product} />;
                })}
              {data.length === 0 && (
                <div className="flex w-[40vw] font-semibold text-3xl">
                  NO PRODUCTS FOUND
                </div>
              )}
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
      {/* End */}
    </Fragment>
  );
}

export default Search;
