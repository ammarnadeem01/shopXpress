import { useEffect } from "react";
import M1 from "../../Images/ProductImages/M1.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function Cart() {
  const nav = useNavigate();
  const [grossTotal, setGrossTotal] = useState(0);
  const { cartItems } = useSelector((state) => {
    return state.cartReducer;
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Create an array of promises for fetching data
    const fetchPromises = cartItems.map((cartItem) => {
      return axios
        .get(`http://localhost:3000/api/v3/products/${cartItem.productId}`)
        .then((results) => {
          const item = results.data.data.product;
          item.quantity = cartItem.quantity;
          return item;
        });
    });

    // Wait for all promises to resolve
    Promise.all(fetchPromises)
      .then((fetchedItems) => {
        // Update the items state with the fetched data
        setItems(fetchedItems);

        // Calculate the gross total
        const total = fetchedItems.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
        setGrossTotal(total);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [cartItems]);

  useEffect(() => {}, []);

  return (
    <div className="flex justify-center items-center bg-gray-50 w-max--screen h-auto flex-wrap py-10">
      {/* title Bar starts*/}
      <div className="flex bg-orange-500 py-1 rounded-md shadow-md w-11/12 h-4/5 items-center justify-evenly flex-wrap">
        <p className="w-4/6  text-white translate-y-1.5 pl-2">Product</p>
        <p className="w-1/6  text-white translate-y-1.5">Quantity</p>
        <p className="w-1/6  text-white translate-y-1.5 text-right pr-2">
          Subtotal
        </p>
      </div>
      {/* Items starts */}
      {items.map((item) => (
        <div
          className="flex h-auto items-center rounded-md shadow-md w-11/12 justify-start"
          key={item && item.id}
        >
          {console.log("item: ", item)}
          <div className="w-4/6 flex items-center justify-start">
            <img src={M1} alt="Camera" className="w-2/12 h-24 bg-black" />
            <div className="flex w-10/12 flex-col justify-center items-start pt-1">
              {/* <p>{item.name}</p> */}
              {item && <p>{item.name}</p>}
              <p className="text-sm text-gray-500">
                {" "}
                Price : {item && item.price}
              </p>
              <p className="text-xs text-red-500">Remove</p>
            </div>
          </div>
          <div className="flex w-1/6 items-center">
            <p
              className="bg-gray-500 text-white w-5 h-7 text-center cursor-pointer"
              onClick={() => {
                debugger;
                const promises = items.map((prevItem) => ({
                  ...prevItem,
                  quantity:
                    prevItem._id === item._id
                      ? item.quantity + 1
                      : prevItem.quantity,
                }));
                Promise.all(promises).then((allItems) => {
                  setItems(allItems);
                  const total = items.reduce((acc, i) => {
                    return acc + i.price * i.quantity;
                  }, 0);
                  setGrossTotal(total);
                });
              }}
            >
              +
            </p>
            <p className="w-auto px-2 ">{item && item.quantity}</p>
            <p
              className="bg-gray-500 text-white w-5 h-7 text-center cursor-pointer"
              onClick={async () => {
                const promises = await items.map(
                  (prevItem) =>
                    new Promise((resolve) => {
                      resolve({
                        ...prevItem,
                        quantity:
                          prevItem._id === item._id
                            ? item.quantity - 1
                            : prevItem.quantity,
                      });
                    })
                );

                setItems(promises);
                const total = items.reduce((acc, i) => {
                  return acc + i.price * i.quantity;
                }, 0);
                setGrossTotal(total);

                // Promise.all(promises).then((allItems) => {
                //   setItems(allItems);
                //   const total = items.reduce((acc, i) => {
                //     return acc + i.price * i.quantity;
                //   }, 0);
                //   setGrossTotal(total);
                // });
              }}
            >
              -
            </p>
          </div>
          <p className="w-1/6 flex items-center justify-end font-semibold pr-2">
            {`${item.quantity} * ${item.price} = ${(
              item.quantity * item.price
            ).toFixed(3)}`}
          </p>
        </div>
      ))}

      {/* Items ends */}

      {/* Total portion starts here */}
      <div className="flex bg-white py-3 rounded-md shadow-md w-11/12 h-4/5 justify-evenly items-center flex-wrap">
        <div className="w-full justify-end items-center flex flex-wrap py-3">
          <div className="flex flex-col justify-between  w-2/6 border-t-4 border-orange-400 mr-1">
            <div className="w-full flex justify-between py-3">
              <p className="font-semibold text-lg">Gross Total</p>
              <p className="font-semibold text-lg">{grossTotal}</p>
            </div>
            <p
              className="py-1.5 px-8 rounded-2xl text-xs flex w-2/6 justify-center items-center cursor-pointer text-white bg-orange-500"
              onClick={() => nav("/checkout/shipping")}
            >
              Check Out
            </p>
          </div>
        </div>
      </div>
      {/* Total portion ends here */}
    </div>
  );
}

export default Cart;
