import { useEffect, useState } from "react";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../axiosConfig";

function Cart() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [grossTotal, setGrossTotal] = useState(0);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [items, setItems] = useState([]);

  function checkOutHandle() {
    dispatch({
      type: "SET_TOTAL",
      payload: grossTotal,
    });
    nav("/checkout/shipping");
  }
  const { accessToken } = useSelector((state) => state.userReducer);

  useEffect(() => {
    const fetchPromises = cartItems.map(
      async (cartItem) => {
        // const results = await axios.get(
        //   `http://localhost:3000/api/v3/products/${cartItem.productId}`,
        const results = await api.get(`api/v3/products/${cartItem.productId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const item = results.data.data.product;
        item.quantity = cartItem.quantity;
        return item;
      },
      [cartItems]
    );

    Promise.all(fetchPromises)
      .then((fetchedItems) => {
        setItems(fetchedItems);
        const total = fetchedItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setGrossTotal(total);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [cartItems]);

  useEffect(() => {
    const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    setGrossTotal(total);
  }, [items]);

  function updateQuantity(_id, quantity) {
    const cartInfo = { productId: _id, quantity };
    dispatch({
      type: "UPDATE_ITEM_IN_CART",
      payload: cartInfo,
    });
  }

  function removeItem(id) {
    dispatch({
      type: "DELETE_ITEM_FROM_CART",
      payload: { id },
    });
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="flex justify-center items-center bg-gray-50 w-max--screen h-auto flex-wrap py-10">
      <div className="flex bg-orange-500 py-1 rounded-md shadow-md sm:w-11/12 xs:w-full xs:px-1 h-4/5 items-center justify-evenly flex-wrap">
        <p className="w-1/2 sm:w-4/6 text-white translate-y-1.5 pl-2">
          Product
        </p>
        <p className="w-1/4 sm:w-1/6 text-white translate-y-1.5">Quantity</p>
        <p className="w-1/4 sm:w-1/6 text-white translate-y-1.5 text-right pr-2">
          Subtotal
        </p>
      </div>
      {items.map((item) => (
        <div
          className="flex h-auto items-center rounded-md shadow-md sm:w-11/12 xs:w-full xs:px-1 justify-start"
          key={item._id}
        >
          <div className="w-1/2 sm:w-4/6 h-24  flex items-center justify-start">
            <img
              src={item.productImages[0]}
              alt="Camera"
              className="xs:1/5 sm:w-1/6 sm:h-24 xs:h-16 "
            />
            <div className="flex pl-1 w-10/12 flex-col justify-center items-start pt-1">
              <p className="line-clamp-1">{item.name}</p>
              <p className="text-sm text-gray-500">Price: {item.price}</p>
              <button
                type="button"
                className="text-xs cursor-pointer text-red-500"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="flex w-1/4 sm:w-1/6 items-center">
            <p
              className="bg-gray-500 text-white w-5 h-7 text-center cursor-pointer"
              onClick={() => {
                const updatedItems = items.map((prevItem) => ({
                  ...prevItem,
                  quantity:
                    prevItem._id === item._id &&
                    prevItem.quantity < prevItem.stock
                      ? prevItem.quantity + 1
                      : prevItem.quantity,
                }));

                const newQuantity =
                  item.quantity < item.stock
                    ? item.quantity + 1
                    : item.quantity;

                setItems(updatedItems);
                updateQuantity(item._id, newQuantity);
              }}
            >
              +
            </p>

            <p className="w-auto px-2">{item.quantity}</p>

            <p
              className="bg-gray-500 text-white w-5 h-7 text-center cursor-pointer"
              onClick={() => {
                const updatedItems = items.map((prevItem) => ({
                  ...prevItem,
                  quantity:
                    prevItem._id === item._id && prevItem.quantity > 1
                      ? prevItem.quantity - 1
                      : prevItem.quantity,
                }));

                const newQuantity =
                  item.quantity > 1 ? item.quantity - 1 : item.quantity;

                setItems(updatedItems);
                updateQuantity(item._id, newQuantity);
              }}
            >
              -
            </p>
          </div>

          <div className="w-1/4 sm:w-1/6 flex items-center flex-wrap justify-end font-semibold xs:pr-1 md:pr-2">
            <p className="text-end">
              {`${item.quantity} * ${item.price} = ${(
                item.quantity * item.price
              ).toFixed(2)}`}
            </p>
          </div>
        </div>
      ))}
      <div className="flex bg-white py-3 rounded-md shadow-md sm:w-11/12 xs:w-full xs:px-1 h-4/5 justify-evenly items-center flex-wrap">
        <div className="w-full justify-end items-center flex flex-wrap py-3">
          <div className="flex flex-col justify-between w-2/6 border-t-4 border-orange-400 mr-1">
            <div className="w-full flex justify-between py-3">
              <p className="font-semibold text-lg">Gross Total</p>
              <p className="font-semibold text-lg">{grossTotal.toFixed(2)}</p>
            </div>
            <button
              className={`py-1.5 px-8 rounded-2xl text-xs flex xs:w-full sm:w-1/2 md:8/12 lg:w-1/2 2xl:w-1/3 800:w-2/3 md:w-2/6 justify-center items-center cursor-pointer text-white ${
                grossTotal === 0 ? "bg-orange-300" : "bg-orange-500"
              }`}
              disabled={grossTotal === 0}
              onClick={checkOutHandle}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
