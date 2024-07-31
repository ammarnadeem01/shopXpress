import { Slider } from "@mui/material";
import ProductCard from "../Home/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [reviewsData, setReviewsData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [ratingsValue, setRatingsValue] = useState([0.5, 5]);
  const [priceValue, setPriceValue] = useState([0, 43000]);
  const [category, setCategory] = useState([
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhone",
  ]);

  // useEffect(() => {
  //   filterData(ratingsValue, priceValue, category);
  // }, [ratingsValue, priceValue, category]);

  // function handleRatingsChange(e, newValue) {
  //   setRatingsValue(newValue);
  // }

  // function handlePriceChange(e, newValue) {
  //   setPriceValue(newValue);
  // }

  // function handleCategories(selectedCategory) {
  //   setCategory(selectedCategory);
  // }

  // async function filterData(newRatingsValue, newPriceValue, newCategory) {
  //   console.log(newRatingsValue, newPriceValue, newCategory);
  //   let currentData = originalData;

  //   // Filter by category
  //   if (newCategory.length > 0) {
  //     currentData = currentData.filter((product) =>
  //       newCategory.includes(product.category)
  //     );
  //   }

  //   // Filter by price
  //   currentData = currentData.filter((product) => {
  //     return (
  //       product.price >= newPriceValue[0] && product.price <= newPriceValue[1]
  //     );
  //   });

  //   // Fetch reviews
  //   const fetchPromises = currentData.map(async (data) => {
  //     const results = await axios.get(
  //       `http://localhost:3000/api/v3/reviews/product/${data._id}`
  //     );
  //     console.log("results", results);
  //     const item = results.data.data.productReviews;
  //     return { ...data, reviews: item };
  //   });

  //   const fetchedItems = await Promise.all(fetchPromises);
  //   console.log("fetchedItems", fetchedItems);
  //   setReviewsData(fetchedItems);

  //   // Filter by rating
  //   currentData = fetchedItems.filter((product) => {
  //     return (
  //       product.rating >= newRatingsValue[0] &&
  //       product.rating <= newRatingsValue[1]
  //     );
  //   });

  //   setFilteredData(currentData);
  // }

  useEffect(() => {
    axios.get("http://localhost:3000/api/v3/products").then((result) => {
      setOriginalData(result.data.data.product);
      setFilteredData(result.data.data.product);
    });
  }, []);

  function handleRatingsChange(e, newValue) {
    setRatingsValue(newValue);
    filterData(ratingsValue, priceValue, category);
  }

  function handlePriceChange(e, newValue) {
    setPriceValue(newValue);
    filterData(ratingsValue, priceValue, category);
  }

  function handleCategories(selectedCategory) {
    setCategory(selectedCategory);
    filterData(ratingsValue, priceValue, category);
  }

  function filterData(newRatingsValue, newPriceValue, newCategory) {
    console.log(newRatingsValue, newPriceValue, newCategory);
    let currentData = originalData;
    currentData = currentData.filter((product) =>
      newCategory.includes(product.category)
    );

    currentData = currentData.filter((product) => {
      return (
        product.price >= newPriceValue[0] && product.price <= newPriceValue[1]
      );
    });

    const fetchPromises = currentData.map(async (data) => {
      const results = await axios.get(
        `http://localhost:3000/api/v3/reviews/product/${data._id}`
      );
      console.log("results", results);
      const item = results.data.data.productReviews;
      return item;
    });

    Promise.all(fetchPromises).then((fetchedItems) => {
      console.log("fetchedItems", fetchedItems[0]);
      setReviewsData(fetchedItems[0]);
    });

    // old start

    // function handleRatingsChange(e, newValue) {
    //   setRatingsValue(newValue);
    //   filterData({ newRatingsValue: newValue });
    // }

    // function handlePriceChange(e, newValue) {
    //   setPriceValue(newValue);
    //   filterData({ newPriceValue: newValue });
    // }

    // function handleCategories(selectedCategory) {
    //   setCategory(selectedCategory);
    //   filterData({ newCategory: selectedCategory });
    // }

    // function filterData({ newRatingsValue = ratingsValue, newPriceValue = priceValue, newCategory = category }={}) {
    //   console.log(newRatingsValue,priceValue,category)
    //   let currentData = originalData;
    //   if (newCategory) {
    //     currentData = currentData.filter(product => product.category === newCategory);
    //   }

    //   currentData = currentData.filter((product) => {
    //     return product.price >= newPriceValue[0] && product.price <= newPriceValue[1];
    //   });

    //   const fetchPromises = currentData.map(async (data) => {
    //     const results=await axios.get(`http://localhost:3000/api/v3/reviews/product/${data._id}`);
    //     console.log("results",results)
    //     const item = results.data.data.productReviews;
    //     return item;
    //   });

    //   Promise.all(fetchPromises)
    //   .then((fetchedItems)=>{
    //     console.log("fetchedItems",fetchedItems[0])
    //     setReviewsData(fetchedItems[0])
    //   })

    //   currentData = currentData.filter((product) => {
    //     return product.price >= rev[0] && product.price <= newPriceValue[1];
    //   });

    // old end

    currentData = currentData.filter((product) => {
      return (
        product.rating >= newRatingsValue[0] &&
        product.rating <= newRatingsValue[1]
      );
    });
    setFilteredData(currentData);
  }

  return (
    <div className="my-16">
      <p
        className="text-3xl font-semibold text-center mb-5
        border-b-2 border-gray-700
        m-auto w-48 pb-5"
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
              max={42000}
              min={0}
            />
          </div>
          <div className="flex flex-col h-auto w-full justify-center items-start px-3">
            <p className="text-lg font-semibold">Categories</p>
            <div className="px-3 flex flex-col mb-2 cursor-pointer">
              {[
                "Laptop",
                "Footwear",
                "Bottom",
                "Tops",
                "Attire",
                "Camera",
                "SmartPhone",
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
              max={5}
              min={0.5}
              step={0.5}
            />
          </div>
        </div>
        {/* Right */}
        <div
          id="container"
          className="flex flex-row flex-wrap justify-evenly items-baseline w-4/5 h-auto gap-3 py-10 space-y-5"
        >
          {filteredData.map((product) => (
            <ProductCard key={product._id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
