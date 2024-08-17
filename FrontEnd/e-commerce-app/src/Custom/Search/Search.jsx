import { Fragment } from "react";
import ProductCard from "../Home/ProductCard";
import { Slider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import BasicSpeedDial from "../User/SpeedDial";
import api from "../../axiosConfig";
function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [ratingsValue, setRatingsValue] = useState([0.5, 5]);
  const [prodLength, setProdLength] = useState(0);
  const [priceValue, setPriceValue] = useState([0, 2500]);
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
    // axios
    //   .get("http://localhost:3000/api/v3/products", { params: filters })
    api.get("api/v3/products", { params: filters }).then((result) => {
      setData(result.data.data.product);
      setProdLength(result.data.filteredProductsCount);
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
        {/* <div className="text-end w-full absolute pt-16">
          <BasicSpeedDial />
        </div> */}
        <div className="flex w-11/12 h-auto flex-wrap justify-center my-10 items-center space-y-5 rounded-lg shadow-xl bg-white py-10">
          <p className="xs:max-md:text-4xl w-full text-center text-5xl font-semibold">
            Search
          </p>
          <div className="w-full flex  flex-col sm:flex-row  xs:max-md:gap-2 flex-wrap  justify-center items-center ">
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
          <div className="lg:flex flex-col  justify-start items-start  xs:w-2/3 450:w-1/2 md:w-1/5 pt-3 px-2 h-auto mt-20">
            <div className="px-3 w-full text-lg font-semibold">
              <p>Price</p>
              <Slider
                value={priceValue}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={42000}
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
                value={ratingsValue}
                onChange={handleRatingsChange}
                valueLabelDisplay="auto"
                min={0.5}
                step={0.5}
                max={5}
              />
            </div>
          </div>
          {/* Right */}
          <div
            id="container"
            className="flex flex-row flex-wrap justify-evenly items-baseline  xs:w-full md:w-4/5 h-auto gap-3 py-10 space-y-5"
          >
            {data.map((product) => {
              return <ProductCard key={product.id} data={product} />;
            })}
          </div>
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
