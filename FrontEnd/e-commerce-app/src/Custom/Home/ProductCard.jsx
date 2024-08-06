import { useNavigate } from "react-router-dom";

function ProductCard({ data }) {
  const nav = useNavigate();
  return (
    <div
      className="cursor-pointer md:h-[175px]  lg:h-[450px] bg-white xs:h-[100px] sm:h-[150px] lg:w-1/5 w-11/12  flex flex-row flex-wrap rounded-md shadow-lg hover:-translate-y-3"
      onClick={() => nav("/detail", { state: { data: data } })}
    >
      <div className="max-w-full xs:flex xs:flex-row lg:block">
        <img
          src={data.productImages[0]}
          alt=""
          className="lg:w-full lg:h-3/5  xs:h-1/2 sm:h-full xs:w-1/6 sm:w-1/4  rounded-t-md"
        />
        <div className="flex flex-wrap pl-2 xs:h-full xs:w-5/6 md:h-full sm:w-3/4 lg:w-full lg:h-2/5">
          <p className="w-full font-semibold px-0.5 xs:text-sm sm:text-base">
            {data.name}
          </p>
          <p className="w-full xs:text-xs md:text-base xs:line-clamp-1 overflow-hidden md:line-clamp-2 text-gray-600 text-sm px-0.5">
            {data.description}
          </p>
          <p className="w-fullxs: ">
            {data.ratings} ⭐⭐⭐⭐⭐
            <span className="xs:text-xs md:text-lg">(1234)</span>
          </p>
          <p className="w-full text-red-700 xs:text-xs sm:text-sm md:text-base">
            $ {data.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
