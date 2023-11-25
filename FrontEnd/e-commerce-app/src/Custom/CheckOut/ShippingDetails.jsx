import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Checkout from "./checkout";
import { useNavigate } from "react-router-dom";
function ShippingDetails() {
  const nav = useNavigate();
  return (
    <div className="flex items-center justify-center bg-gray-50 w-max-screen my-3 h-auto">
      <div className="bg-white shadow-lg shadow-gray-400 w-11/12 h-full py-3">
        <Checkout step="1" />
        <div className="flex flex-col justify-center gap-2 items-center flex-wrap w-max-screen h-auto">
          <p className="text-xl font-semibold pb-2 border-b-2 border-gray-500 px-4">
            Shipping Details
          </p>
          <form
            action=""
            className="flex flex-col flex-wrap justify-evenly items-center gap-2 "
          >
            <div>
              <HomeIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                placeholder="Address"
                type="text"
                // value={"Ammar Nadeem"}
              />
            </div>

            <div>
              <ApartmentIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                placeholder="City"
                type="text"
                // value={"Islamabad"}
              />
            </div>

            <div>
              <LocationOnIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                placeholder="PIN Code"
                type="number"
                // value={40001}
              />
            </div>

            <div>
              <PhoneEnabledIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                placeholder="Phone Number"
                type="text"
                // value={"0324 - 5677889"}
              />
            </div>
            <div>
              <PublicIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                placeholder="Country"
                type="text"
                // value={"Pakistan"}
              />
            </div>
            <div>
              <LocationCityIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                placeholder="State"
                type="text"
                // value={"Punjab"}
              />
            </div>

            <button
              type="submit"
              className="text-center w-full text-sm my-3 text-white bg-orange-600 hover:bg-orange-500 py-2 px-5"
              onClick={() => {
                nav("/checkout/confirm");
              }}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ShippingDetails;
