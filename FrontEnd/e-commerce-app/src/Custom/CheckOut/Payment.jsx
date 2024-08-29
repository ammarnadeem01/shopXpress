import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyIcon from "@mui/icons-material/Key";
import Checkout from "./Checkout";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../axiosConfig";
import LoginRequired from "./LoginRequired";
function Payment() {
  const [orders, setOrders] = useState([]);
  const loc = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  let items = null;
  // let payment = 0;
  const { isLogin } = useSelector((state) => state.userReducer);
  const { cartItems } = useSelector((state) => state.cartReducer);
  // useEffect(() => {
  //   if (!isLogin) {
  //     nav("/user");
  //   }
  // }, [isLogin]);
  // console.log("loc.state", loc.state);
  // if (isLogin) {
  let payment = loc?.state?.total;
  items = loc?.state?.items;
  // }
  // console.log("items", items);
  const { userId } = useSelector((state) => {
    return state.userReducer;
  });

  const { accessToken } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (isLogin) {
      const newOrders = items.map((i) => ({
        item: i._id,
        quantity: i.quantity,
      }));

      setOrders(newOrders);
    }
  }, [items]);

  function setOrder(e) {
    e.preventDefault();
    // console.log("userId", userId);
    // axios
    //   .post(
    //     "http://localhost:3000/api/v3/orders",
    api
      .post(
        "api/v3/orders",
        {
          orderedItems: orders,
          placedBy: userId,
          totalPrice: payment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        dispatch({ type: "CART_RESTORE" });
        nav("/orderplaced", { state: userId });
        // console.log("userId", userId);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Fragment>
      {!isLogin && cartItems?.length === 0 && <LoginRequired></LoginRequired>}
      <div className="flex items-center justify-center bg-gray-50 w-max-screen my-3 h-auto">
        <div className="bg-white shadow-lg shadow-gray-400 xs:max-450:w-full w-11/12 h-full py-3">
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
                  placeholder="Account Number"
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
                Pay - {payment?.toFixed(2)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Payment;
