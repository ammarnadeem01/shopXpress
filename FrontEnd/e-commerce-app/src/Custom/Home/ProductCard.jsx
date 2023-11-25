import { useNavigate } from "react-router-dom";
import img from "./cover.jfif";
import { useEffect } from "react";

function ProductCard({ data }) {
  useEffect(() => {
    console.log("product : ", data);
  });

  const nav = useNavigate();

  return (
    <div
      className="h-auto w-[20%] flex flex-row flex-wrap rounded-md shadow-lg hover:-translate-y-3"
      onClick={() => nav("/detail", { state: { data: data } })}
    >
      <img src={img} alt="" className="w-full h-64 rounded-t-md" />
      <div className="ml-2 w-full">
        <p className="w-full font-semibold line-clamp-3 px-0.5">
          {data.description}
        </p>
        <p className="w-full">{data.ratings} (Reviews)</p>
        <p className="w-full text-red-700">{data.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
