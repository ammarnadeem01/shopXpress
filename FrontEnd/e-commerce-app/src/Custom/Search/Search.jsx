import { Fragment } from "react";
import ProductCard from "../Home/ProductCard";
import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
function Search() {
  const [datais, setdatais] = useState([]);
  const [search, setSearch] = useState("");
  const [originalData, setoriginalData] = useState([]);
  const [ratingsValue, setRatingsValue] = useState([10, 70]);
  const [priceValue, setPriceValue] = useState([0, 70000]);

  function handleCategories(category) {
    setdatais(
      originalData.filter((product) => {
        return product.category === category;
      })
    );
  }
  function handleRatingsChange(e, newValue) {
    setRatingsValue(newValue);
  }
  function handlePriceChange(e, newValue) {
    setPriceValue(newValue);
  }
  useEffect(() => {
    axios.get("http://localhost:3000/api/v3/products").then((result) => {
      setdatais(result.data.data.product);
      setoriginalData(result.data.data.product);
    });
  }, []);

  function handleSearch() {
    setdatais(
      originalData.filter((product) => {
        return product.description
          .toLocaleLowerCase()
          .includes(search.trim().toLocaleLowerCase());
      })
    );
  }

  return (
    <Fragment>
      {/* Search  */}
      <div className="flex justify-center flex-wrap w-max-screen bg-gray-100">
        <div className="flex w-11/12 h-auto flex-wrap justify-center my-10 items-center space-y-5 rounded-lg shadow-xl bg-white py-10">
          <p className="w-full text-center text-5xl font-semibold">Search</p>
          <div className="w-full flex flex-wrap  justify-center items-center ">
            <input
              type="search"
              name=""
              className="rounded-l-lg w-3/5 border-2 outline-none border-gray-400 active:border-gray-700 px-2 text-xl py-2.5"
              id=""
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              type="button"
              className="text-2xl rounded-r-lg bg-gray-800 hover:bg-gray-700 text-white px-7 py-2.5 font-semibold"
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
          1256
          <span className="text-white ml-2  bg-gray-700 p-1 rounded-md text-xl ">
            Results
          </span>
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
                min={0}
                max={42000}
              />
            </div>
            <div className="flex flex-col h-auto w-full justify-center items-start px-3">
              <p className="text-lg  font-semibold">Categories</p>
              <div className="px-3 cursor-pointer">
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
                min={0.5}
                max={5}
              />
            </div>
          </div>
          {/* Right */}
          <div
            id="container"
            className="flex flex-row flex-wrap justify-evenly items-baseline w-4/5 h-auto gap-3 py-10 space-y-5"
          >
            {datais.map((product) => {
              return <ProductCard key={product.id} data={product} />;
            })}
            {/* <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard /> */}
          </div>
        </div>
      </div>
      {/* End */}
    </Fragment>
  );
}

export default Search;
