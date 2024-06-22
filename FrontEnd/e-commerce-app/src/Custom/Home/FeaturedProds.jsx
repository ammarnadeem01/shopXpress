import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
function FeaturedProds() {
  const [datais, setdatais] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/v3/products").then((result) => {
      setdatais(result.data.data.product);
    });
  }, []);
  return (
    <div className="my-16">
      <p
        id="container"
        className="pt-20 text-3xl font-semibold text-center mb-5
    border-b-2  border-gray-700
    m-auto w-80 pb-5
    "
      >
        Featured Products
      </p>
      <div className="flex flex-row justify-center">
        <div className="flex flex-row flex-wrap justify-evenly items-baseline w-5/6 h-auto gap-3 py-10 space-y-5">
         
          {datais.map((product) => {
            return <ProductCard key={product._id} data={product} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProds;
