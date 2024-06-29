import M1 from "../../Images/ProductImages/M1.jpg";
import LeftBar from "./LeftBar";
function ShippingInfo() {
  return (
    <div className="flex w-max-screen ">

      <LeftBar />

      <div className="flex flex-wrap justify-center bg-white items-center h-full w-full">

        <div className="w-4/6 pl-4 border-r-2 border-gray-300 h-auto flex flex-col justify-center items-start my-5">
          <p className="text-2xl font-semibold ">Shipping Info</p>
          <div className="pl-8">
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-black">Name : </span> Ammar
              Nadeem
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-black">Phone : </span>
              0345-1234654
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-black">Address : </span>
              H#12, S # 11, Wahdat Colony, Lahore.
            </p>
          </div>
          <p className="text-2xl font-semibold ">Payment</p>
          <div className="pl-8">
            <p className="text-gray-500 text-sm">PAID</p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-black">Amount : </span>$
              567.43
            </p>
          </div>
          <p className="text-2xl font-semibold ">Order Status</p>
          <div className="pl-8">
            <p className="text-gray-500 text-sm">Processing</p>
          </div>
          <p className="text-2xl font-semibold ">Your Cart items</p>
          {/* Cart Item */}
          <div className="flex justify-start items-center w-full h-auto text-xs mb-1 pr-1 ">
            <img src={M1} alt="" className="w-2/12 h-20" />
            <div className="flex justify-between w-full h-full items-center translate-y-2">
              <p className="w-9/12 text-gray-500">
                Apple MacBook Pro(8GB RAM, 256 GB SSD, 33.78cm, Space Gray)
              </p>
              <p className="w-4/12  text-gray-700  ">
                10 * $34235.56 =
                <span className="font-semibold text-black">$3452324.6</span>
              </p>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col w-2/6 text-sm w- h-auto justify-start items-start px-5">
          <p className="text-center w-full text-2xl font-semibold border-b-2 border-gray-300 pb-2">
            Process Order
          </p>
          <select className="border-2 border-gray-400 w-full py-1">
            <option disabled selected>
              Choose Category
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <button className="w-full text-center py-2 text-white text-sm mt-2 bg-orange-600 hover:bg-orange-500">
            Process
          </button>
        </div>
      </div>
      {/* end */}
    </div>
  );
}

export default ShippingInfo;
