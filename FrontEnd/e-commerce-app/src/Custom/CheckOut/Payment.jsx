import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyIcon from "@mui/icons-material/Key";
import Checkout from "./Checkout";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function Payment() {
  const [orders, setOrders] = useState([]);
  const loc = useLocation();
  // console.log("loc.state", loc.state);
  const payment = loc.state.total;
  const items = loc.state.items;
  // console.log("items", items);
  const { userId } = useSelector((state) => {
    return state.userReducer;
  });
  // console.log("userId1", userId);
  // useEffect(() => {
  //   items.map((i) => {
  //     setOrders(...orders, { item: i._id, quantity: i.quantity });
  //   });
  // }, []);
  useEffect(() => {
    const newOrders = items.map((i) => ({
      item: i._id,
      quantity: i.quantity,
    }));
    setOrders(newOrders);
  }, [items]);

  function setOrder(e) {
    e.preventDefault();
    // console.log("userId", userId);
    axios
      .post("http://localhost:3000/api/v3/orders", {
        orderedItems: orders,
        placedBy: userId,
        totalPrice: payment,
      })
      .then((res) => {
        console.log("res", res);
        // console.log("userId", userId);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="flex items-center justify-center bg-gray-50 w-max-screen my-3 h-auto">
      <div className="bg-white shadow-lg shadow-gray-400 w-11/12 h-full py-3">
        <Checkout step={3} />
        <div className="flex flex-col justify-center gap-3 items-center flex-wrap w-max-screen h-auto">
          <p className="text-xl font-semibold pb-2 border-b-2 border-gray-500 px-4">
            Card Info
          </p>
          <form
            action=""
            className="flex flex-col flex-wrap justify-evenly items-center gap-3 "
            onSubmit={setOrder}
          >
            <div>
              <AccountBalanceWalletIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                type="text"
                placeholder="1234 1234 1234"
                value={"1234 1234 1234"}
              />
            </div>

            <div>
              <CalendarMonthIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                type="string"
                placeholder="dd/mm/yy"
                value={"dd/mm/yy"}
              />
            </div>

            <div>
              <KeyIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                type="string"
                placeholder="CVC"
                value={"CVC"}
              />
            </div>
            <button
              type="submit"
              className="text-center w-full text-sm my-3 text-white bg-orange-600 hover:bg-orange-500 py-2 px-5"
            >
              Pay - {payment.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
