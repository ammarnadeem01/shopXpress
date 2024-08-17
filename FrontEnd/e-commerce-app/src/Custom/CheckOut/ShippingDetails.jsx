import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "./Checkout";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import api from "../../axiosConfig";

function ShippingDetails() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => {
    console.log(state.userReducer);
    return state.userReducer;
  });
  const nav = useNavigate();
  const { accessToken } = useSelector((state) => state.userReducer);

  const [shippingFormData, setShippingFormData] = useState({
    address: "",
    city: "",
    pin: "",
    phone: "",
    country: "",
    state: "",
    customer: userId,
  });

  function handleShippingFormChange(e) {
    const { name, value } = e.target;
    setShippingFormData({ ...shippingFormData, [name]: value });
  }

  function handleShippingFormSubmit(e) {
    e.preventDefault();
    console.log(shippingFormData);
    // axios
    //   .post("http://localhost:3000/api/v3/shippinginfo", shippingFormData, {
    api
      .post("api/v3/shippinginfo", shippingFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("response: ", response);
        console.log("response.data: ", response.data);
        console.log("response.data.data: ", response.data.data);
        console.log(
          "response.data.data.newShippingInfo: ",
          response.data.data.newShippingInfo
        );
        dispatch({
          type: "SET_SHIPPING_DATA",
          payload: response.data.data.newShippingInfo,
        });
        nav("/checkout/confirm");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex items-center min-w-full max-w-full justify-center bg-gray-50 w-max-screen my-3 h-auto">
      <div className="bg-white shadow-lg shadow-gray-400 w-11/12 h-full py-3">
        <Checkout step={1} />
        <div className="flex flex-col justify-center gap-2 items-center flex-wrap w-max-screen h-auto">
          <p className="text-xl font-semibold pb-2 border-b-2 border-gray-500 px-4">
            Shipping Details
          </p>
          <form
            action=""
            className="flex flex-col xs:max-sm:w-11/12 flex-wrap justify-evenly items-center gap-2 "
          >
            <div className="relative w-11/12 sm:w-5/6">
              <HomeIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 w-full pl-12 border-gray-300 py-1"
                placeholder="Address"
                type="text"
                name="address"
                value={shippingFormData.address}
                onChange={handleShippingFormChange}
              />
            </div>

            <div className="relative w-11/12 sm:w-5/6">
              <LocationOnIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 w-full pl-12 border-gray-300 py-1"
                placeholder="PIN Code"
                type="number"
                name="pin"
                value={shippingFormData.pin}
                onChange={handleShippingFormChange}
              />
            </div>

            <div className="relative w-11/12 sm:w-5/6">
              <PhoneEnabledIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 w-full pl-12 border-gray-300 py-1"
                placeholder="Phone Number"
                type="text"
                name="phone"
                value={shippingFormData.phone}
                onChange={handleShippingFormChange}
              />
            </div>

            <div className="relative w-11/12 sm:w-5/6">
              <PublicIcon className="absolute translate-y-1 ml-3" />
              <select
                className="border-2 min-w-full max-w-full pl-12 border-gray-300 py-1"
                name="country"
                value={shippingFormData.country}
                onChange={handleShippingFormChange}
              >
                <option value="" disabled>
                  Choose Country
                </option>
                {Country.getAllCountries().map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-11/12 sm:w-5/6">
              <LocationCityIcon className="absolute translate-y-1 ml-3" />
              <select
                className="border-2 min-w-full max-w-full pl-12 border-gray-300 py-1"
                name="state"
                value={shippingFormData.state}
                onChange={handleShippingFormChange}
              >
                <option value="" disabled>
                  Choose State
                </option>
                {State.getStatesOfCountry(shippingFormData.country).map(
                  (state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="relative w-11/12 sm:w-5/6">
              <ApartmentIcon className="absolute translate-y-1 ml-3" />
              <select
                className="border-2 min-w-full max-w-full pl-12 border-gray-300 py-1"
                name="city"
                value={shippingFormData.city}
                onChange={handleShippingFormChange}
              >
                <option value="" disabled>
                  Choose City
                </option>
                {City.getCitiesOfState(
                  shippingFormData.country,
                  shippingFormData.state
                ).map((city) => (
                  <option key={city.isoCode} value={city.isoCode}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="text-center w-5/6 text-sm my-3 text-white bg-orange-600 hover:bg-orange-500 py-2 px-5"
              onClick={handleShippingFormSubmit}
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
