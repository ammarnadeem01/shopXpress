import LeftBar from "./LeftBar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Hamburger from "hamburger-react";
import api from "../../axiosConfig";
import { useSelector } from "react-redux";
function ShippingInfo() {
  const [orderData, setOrderData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [shippingData, setShippingData] = useState({});
  const { accessToken } = useSelector((state) => state.userReducer);
  const loc = useLocation();
  const orderId = loc.state;

  function handleStatus() {
    // axios
    //   .patch(`http://localhost:3000/api/v3/orders/${orderId}`, {
    api
      .patch(
        `api/v3/orders/${orderId}`,
        {
          status: orderData.status == "Processing" ? "Shipped" : "Delivered",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        if (orderData.status == "Processing") {
          cartItems.map((item) => {
            console.log("item.stock", item.stock);
            console.log("item.quantity", item.quantity);
            const newStock = item.stock - item.quantity;
            // axios
            //   .patch(`http://localhost:3000/api/v3/products/${item.id}`, {
            api
              .patch(
                `api/v3/products/${item.id}`,
                {
                  stock: newStock,
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchOrderDetails = async () => {
    try {
      // Fetch order data
      // const orderResponse = await axios.get(
      //   `http://localhost:3000/api/v3/orders/${orderId}`
      // );
      const orderResponse = await api.get(`api/v3/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const order = orderResponse.data.data.order;
      setOrderData(order);

      // Fetch product details for each ordered item
      const itemDetailsPromises = order.orderedItems.map(
        async (orderedItem) => {
          try {
            // const productResponse = await axios.get(
            //   `http://localhost:3000/api/v3/products/${orderedItem.item}`
            // );
            const productResponse = await api.get(
              `api/v3/products/${orderedItem.item}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            const productDetails = productResponse.data.data.product;
            console.log("productResponse", productResponse);
            console.log("productDetails", productDetails);
            return {
              id: productDetails._id,
              name: productDetails.name,
              quantity: orderedItem.quantity,
              price: productDetails.price,
              image: productDetails.productImages[0],
              stock: productDetails.stock,
            };
          } catch (error) {
            console.error(
              `Error fetching details for item ${orderedItem.item}:`,
              error
            );
            return null;
          }
        }
      );

      const itemDetails = await Promise.all(itemDetailsPromises);
      console.log("validItemDetails", itemDetails);
      setCartItems(itemDetails);

      // Fetch user data
      // const userResponse = await axios.get(
      //   `http://localhost:3000/api/v3/users/${order.placedBy}`
      // );
      console.log("order.placedBy", order.placedBy);
      const userResponse = await api.get(`api/v3/users/${order.placedBy}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const user = userResponse.data.data.user;
      setUserData(user);
      console.log("user", user);

      // Fetch shipping data
      // const shippingResponse = await axios.get(
      //   `http://localhost:3000/api/v3/shippinginfo/${user._id}`
      // );
      const shippingResponse = await api.get(
        `api/v3/shippinginfo/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const shippingInfo = shippingResponse.data.data.shippingInfo[0];
      console.log("shippingInfo", shippingInfo);
      setShippingData(shippingInfo);
    } catch (error) {}
  };

  useEffect(() => {
    console.log("status", status);
    fetchOrderDetails();
  }, [orderId]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-max-screen ">
      {/* Hamburger for Mobile */}
      <div className="absolute 1150:hidden z-10 p-4">
        <Hamburger
          direction="right"
          duration={0.8}
          toggled={isOpen}
          toggle={setIsOpen}
          color="#ff5722"
        />
      </div>
      {/* Left Bar */}
      <LeftBar data={isOpen} />
      <div className="flex xs:max-md:flex-col flex-wrap justify-center bg-white items-center h-full w-full">
        {/* //  Center   */}
        {/* <div
          className={`xs:max-1350:w-full 1350:w-3/4  gap-3 ${
            status !== "Delivered" ? "1350:border-r-2" : "1350:border-r-0"
          }  xs:max-lg:pt-10 border-gray-300 h-auto flex sm:max-1350:flex-row sm:max-1350:justify-evenly flex-col flex-wrap  justify-center items-start px-10  my-5`}
        > */}
        <div
          className={`xs:max-1350:w-full  gap-3
            ${
              orderData.status !== "Delivered"
                ? "1350:border-r-2"
                : "1350:border-r-0"
            }
            ${
              orderData.status !== "Delivered" ? "1350:w-w-3/4" : "1350:w-full"
            } xs:max-lg:pt-10 border-gray-300 h-auto flex sm:max-1350:flex-row sm:max-1350:justify-evenly flex-col flex-wrap justify-center items-start px-10 my-5`}
        >
          <div className="w-6/12 xs:max-sm:w-full  xs:max-sm:pl-5 flex gap-3 flex-wrap flex-col">
            <p className="text-2xl font-semibold">Shipping Info</p>
            <div className="xl:pl-8">
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-black">Name : </span>
                {userData.name}
              </p>
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-black">Phone : </span>
                {shippingData.phone}
              </p>
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-black">Address : </span>
                {`${shippingData.address}, ${shippingData.city}, ${shippingData.state}, ${shippingData.country}.`}
              </p>
            </div>
            <p className="text-2xl font-semibold ">Payment</p>
            <div className="xl:pl-8">
              <p className="text-green-800 font-semibold">PAID</p>
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-black">Amount : </span>$
                {orderData.totalPrice}
              </p>
            </div>
            <p className="text-2xl font-semibold ">Order Status</p>
            <div className="xl:pl-8">
              <p
                className={`font-semibold ${
                  orderData.status == "Delivered"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {orderData.status}
              </p>
            </div>
          </div>
          {/* Right For smaller devices */}
          <div className="w-5/12 md:w-1/3 hidden sm:max-1350:block ">
            {orderData.status != "Delivered" && (
              <div className="w-full flex flex-col xs:max-xl:py-4  text-sm h-auto justify-start items-start">
                <p className="text-center w-full text-2xl font-semibold border-b-2 border-gray-300 pb-2">
                  Process Order
                </p>
                <select className="border-2 border-gray-400 w-full py-1">
                  <option value="Shipped">
                    {orderData.status == "Processing" ? "Shipped" : "Delivered"}
                  </option>
                </select>
                <button
                  onClick={handleStatus}
                  className="cursor-pointer w-full text-center py-2 text-white text-sm mt-2 bg-orange-600 hover:bg-orange-500"
                >
                  Process
                </button>
              </div>
            )}
          </div>
          <p className="text-2xl font-semibold ">Your Cart items</p>
          {/* //  Cart Item  */}
          {/* //  For Larger Screens  */}
          <div className="hidden 1000:block shadow-lg rounded-lg w-full overflow-hidden">
            <table className="divide-y w-full divide-gray-200">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-2 py-2 text-left text-sm font-semibold uppercase tracking-wider">
                    Product
                  </th>
                  <th className=" px-2 py-2 text-left text-sm font-semibold uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-2 py-2 text-left text-sm font-semibold uppercase tracking-wider">
                    Price Per Unit
                  </th>
                  <th className="px-2 py-2 text-left text-sm font-semibold uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-2 py-2 text-left text-sm font-semibold uppercase tracking-wider">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100 transition">
                    <td className="px-3 py-3  text-left text-sm font-semibold uppercase tracking-wider">
                      <img
                        src={item.image}
                        alt=""
                        className="w-1/2 h-15 sm:h-10"
                      />
                    </td>
                    <td className="px-3 py-3  text-left text-sm font-semibold uppercase tracking-wider">
                      {/* {item.name} */}Samsung g20 smtp http
                    </td>
                    <td className="px-3 py-3  text-left text-sm font-semibold uppercase tracking-wider">
                      {item.price}
                    </td>
                    <td className="px-3 py-3  text-left text-sm font-semibold uppercase tracking-wider">
                      {item.quantity}
                    </td>
                    <td className="px-3 py-3  text-left text-sm font-semibold uppercase tracking-wider">
                      {item.quantity} * ${item.price} =
                      <span className="font-semibold text-black">
                        $ {item.quantity * item.price}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* For Mobile * */}
          <div className="flex flex-row flex-wrap 1000:hidden justify-evenly items-center">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white m-3 rounded-lg shadow-md flex xs:max-800:w-full w-5/12 h-40  flex-row "
              >
                <div className="w-1/4 text-gray-500">
                  <img src={item.image} alt="Image" />
                </div>
                <div className="w-3/4 xs:max-800:ml-5">
                  <div className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500">Name: {item.name}</div>
                  <div className="text-sm text-gray-500">
                    Price: {item.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </div>
                  <div className="text-sm text-gray-500">
                    Total Price: {item.price * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right  */}
        {orderData.status != "Delivered" && (
          <div className="1350:w-1/5 mx-auto sm:max-1350:hidden flex flex-col xs:max-xl:py-4  text-sm h-auto justify-start items-start">
            <p className="text-center w-full text-2xl font-semibold border-b-2 border-gray-300 pb-2">
              Process Order
            </p>
            <select className="border-2 border-gray-400 w-full py-1">
              <option value="Shipped">
                {orderData.status == "Processing" ? "Shipped" : "Delivered"}
              </option>
            </select>
            <button
              onClick={handleStatus}
              className="cursor-pointer w-full text-center py-2 text-white text-sm mt-2 bg-orange-600 hover:bg-orange-500"
            >
              Process
            </button>
          </div>
        )}
      </div>
      {/* end */}
    </div>
  );
}

export default ShippingInfo;
