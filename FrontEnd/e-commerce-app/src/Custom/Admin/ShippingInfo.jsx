import LeftBar from "./LeftBar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Hamburger from "hamburger-react";
function ShippingInfo() {
  const [orderData, setOrderData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [shippingData, setShippingData] = useState({});
  const loc = useLocation();
  const orderId = loc.state;

  function handleStatus() {
    axios
      .patch(`http://localhost:3000/api/v3/orders/${orderId}`, {
        status: orderData.status == "Processing" ? "Shipped" : "Delivered",
      })
      .then((response) => {
        console.log("response", response);
        if (orderData.status == "Processing") {
          cartItems.map((item) => {
            console.log("item.stock", item.stock);
            console.log("item.quantity", item.quantity);
            const newStock = item.stock - item.quantity;
            console.log(`Updating stock for product ${item.id} to ${newStock}`);
            axios
              .patch(`http://localhost:3000/api/v3/products/${item.id}`, {
                stock: newStock,
              })
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
      const orderResponse = await axios.get(
        `http://localhost:3000/api/v3/orders/${orderId}`
      );
      const order = orderResponse.data.data.order;
      setOrderData(order);

      // Fetch product details for each ordered item
      const itemDetailsPromises = order.orderedItems.map(
        async (orderedItem) => {
          try {
            const productResponse = await axios.get(
              `http://localhost:3000/api/v3/products/${orderedItem.item}`
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
      const userResponse = await axios.get(
        `http://localhost:3000/api/v3/users/${order.placedBy}`
      );
      const user = userResponse.data.data.user;
      setUserData(user);

      // Fetch shipping data
      const shippingResponse = await axios.get(
        `http://localhost:3000/api/v3/shippinginfo/${user._id}`
      );
      const shippingInfo = shippingResponse.data.data.shippingInfo[0];
      setShippingData(shippingInfo);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
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
        <div className="xs:max-md:w-full gap-3  md:border-r-2 xs:max-lg:pt-10 border-gray-300 h-auto flex flex-col justify-center items-start px-10  my-5">
          <p className="text-2xl font-semibold ">Shipping Info</p>
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
          <p className="text-2xl font-semibold ">Your Cart items</p>
          {/* //  Cart Item  */}
          {/* //  For Larger Screens  */}
          <div className="hidden 1000:block shadow-lg rounded-lg w-full overflow-hidden">
            <table className="min-w-full divide-y w-full divide-gray-200">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Price Per Unit
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3  text-left text-sm font-semibold uppercase tracking-wider">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-100 transition">
                    <td className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      <img src={item.image} alt="" className="w-full h-20" />
                    </td>
                    <td className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      {/* {item.name} */}Samsung g20 smtp http
                    </td>
                    <td className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      {item.price}
                    </td>
                    <td className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
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
          {/* Right For smaller devices */}
          {/* {orderData.status != "Delivered" && (
            <div className="xs:max-md:w-1/2 md:max-1350:w-1/3 flex flex-col xs:max-xl:py-4  text-sm h-auto justify-start items-start">
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
          )} */}
        </div>

        {/* Right  */}
        {orderData.status != "Delivered" && (
          <div className="xs:max-md:w-1/2 md:max-1350:w-1/3 flex flex-col xs:max-xl:py-4  text-sm h-auto justify-start items-start">
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
