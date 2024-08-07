import { useNavigate } from "react-router-dom";
import M1 from "../../Images/ProductImages/M1.jpg";
import Checkout from "./Checkout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ConfirmOrder() {
  const [shippingCharges, setShippingCharges] = useState(0);
  const [GST, setGST] = useState(0);
  const [grossTotal, setGrossTotal] = useState(0); // Initialize grossTotal state
  const [total, setTotal] = useState(0); // Initialize total state
  const { shippingData } = useSelector((state) => state.shippingReducer);
  const { userName } = useSelector((state) => state.userReducer);
  const { cartItems } = useSelector((state) => state.cartReducer);

  const [items, setItems] = useState([]);

  // Fetch product details for items in the cart
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchPromises = cartItems.map(async (cartItem) => {
          const response = await axios.get(
            `http://localhost:3000/api/v3/products/${cartItem.productId}`
          );
          const item = response.data.data.product;
          item.quantity = cartItem.quantity;
          return item;
        });

        const fetchedItems = await Promise.all(fetchPromises);
        setItems(fetchedItems);

        // Calculate and set the gross total
        const total = fetchedItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setGrossTotal(total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, [cartItems]);

  // Set shipping charges based on country
  useEffect(() => {
    const country = shippingData.country.toLowerCase();
    if (country === "pakistan") {
      setShippingCharges(20);
    } else if (["india", "china", "iran", "afghanistan"].includes(country)) {
      setShippingCharges(30);
    } else {
      setShippingCharges(50);
    }
  }, [shippingData.country]);

  // Calculate GST whenever grossTotal changes
  useEffect(() => {
    setGST(0.1 * grossTotal);
  }, [grossTotal]);

  // Calculate total whenever grossTotal, shippingCharges, or GST changes
  useEffect(() => {
    setTotal(grossTotal + shippingCharges + GST);
  }, [grossTotal, shippingCharges, GST]);

  const nav = useNavigate();

  return (
    <div className="flex items-center justify-center bg-gray-50 w-max-screen my-3 h-auto">
      <div className="bg-white shadow-lg shadow-gray-400 w-11/12 h-full py-3">
        <Checkout step={2} />
        <div className="flex 900:flex-row xs:max-900:flex-col justify-between items-center flex-wrap w-max-screen h-auto">
          {/* Left */}
          <div className="xs:max-md:w-full sm:w-2/3 900:w-3/4 xs:max-900:pl-4 pl-20 900:border-r-2 gap-2 border-gray-300 h-auto flex flex-col justify-center items-start">
            <p className="text-2xl font-semibold">Shipping Info</p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-black">Name: </span>
              {userName}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-black">Phone: </span>
              {shippingData.phone}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold text-black">Address: </span>
              {`${shippingData.address}, ${shippingData.city}, ${shippingData.state}, ${shippingData.country}`}
            </p>
            <p className="text-2xl font-semibold">Your Cart Items</p>

            {/* Cart Items */}
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-start items-center w-full h-auto text-sm mb-1"
              >
                <img src={M1} alt="" className="w-2/12 h-20" />
                <div className="flex justify-between w-full h-full items-center translate-y-2">
                  <p className="w-9/12 text-gray-500">{item.name}</p>
                  <p className="w-3/12 text-gray-900">
                    {item.quantity} * ${item.price} ={" "}
                    <span className="font-semibold text-black text-sm">
                      $ {item.quantity * item.price}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="flex flex-col text-sm xs:max-sm:w-2/3 w-1/3 900:w-1/4 h-auto gap-2 justify-start items-start md:px-1 lg:px-5">
            <p className="text-center w-full text-2xl font-semibold border-b-2 border-gray-300 pb-2">
              Order Summary
            </p>
            <div className="flex w-full justify-between">
              <p>Subtotal:</p>
              <p className="text-gray-500">$ {grossTotal.toFixed(2)}</p>
            </div>
            <div className="flex w-full justify-between">
              <p>Shipping Charges:</p>
              <p className="text-gray-500">$ {shippingCharges}</p>
            </div>
            <div className="flex w-full justify-between">
              <p>GST:</p>
              <p className="text-gray-500">$ {GST.toFixed(2)}</p>
            </div>
            <div className="flex w-full justify-between border-t-2 border-gray-300 pt-2">
              <p className="font-semibold text-lg">Total:</p>
              <p className="font-semibold text-lg">$ {total.toFixed(2)}</p>
            </div>
            <button
              className="w-full text-center py-2 text-white text-sm bg-orange-600 hover:bg-orange-500"
              onClick={() =>
                nav("/checkout/payment", { state: { items, total } })
              }
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
