import { useNavigate } from "react-router-dom";

function ProductCard({ data }) {
  const nav = useNavigate();
  return (
    <div
      className="cursor-pointer max-w-full  h-[450px] w-[20%] flex flex-row flex-wrap rounded-md shadow-lg hover:-translate-y-3"
      onClick={() => nav("/detail", { state: { data: data } })}
    >
      <img
        src={data.productImages[0]}
        alt=""
        className="w-full h-3/5 rounded-t-md"
      />
      <div className="flex flex-wrap pl-2  w-full h-2/5">
        <p className="w-full font-semibold px-0.5">{data.name}</p>
        <p className="w-full line-clamp-2 text-gray-600 text-sm px-0.5">
          {data.description}
        </p>
        <p className="w-full">{data.ratings} ⭐⭐⭐⭐⭐ (1234)</p>
        <p className="w-full text-red-700">$ {data.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
