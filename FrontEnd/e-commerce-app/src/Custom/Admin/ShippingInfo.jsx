import LeftBar from "./LeftBar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function ShippingInfo() {
  const [orderData, setOrderData] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [userData, setUserData] = useState({})
  const [shippingData, setShippingData] = useState({})
  const loc=useLocation()
  const orderId=loc.state;
 
  function handleStatus() {
    axios.patch(`http://localhost:3000/api/v3/orders/${orderId}`,{
      status:orderData.status=="Processing"?"Shipped":"Delivered"
    })
    .then((response)=>{
      console.log("response",response)
      if(orderData.status=="Processing")
        {
          cartItems.map((item)=>{
            console.log("item.stock",item.stock)
            console.log("item.quantity",item.quantity)
            const newStock = item.stock-item.quantity
            console.log(`Updating stock for product ${item.id} to ${newStock}`);
            axios.patch(`http://localhost:3000/api/v3/products/${item.id}`,{
              stock:newStock
              })
              .then((response)=>{console.log(response)})
              .catch((err)=>{console.log(err)})
              })
              
              }
        // window.location.reload();
              })
    .catch((err)=>{console.log(err)})
  }

  const fetchOrderDetails = async () => {
    try {
      // Fetch order data
      const orderResponse = await axios.get(`http://localhost:3000/api/v3/orders/${orderId}`);
      const order = orderResponse.data.data.order;
      setOrderData(order);

      // Fetch product details for each ordered item
      const itemDetailsPromises = order.orderedItems.map(async (orderedItem) => {
        try {
          const productResponse = await axios.get(`http://localhost:3000/api/v3/products/${orderedItem.item}`);
          const productDetails = productResponse.data.data.product;
          console.log("productResponse",productResponse)
          console.log("productDetails",productDetails)
          return {
            id:productDetails._id,
            name: productDetails.name,
            quantity: orderedItem.quantity,
            price: productDetails.price,
            image:productDetails.productImages[0],
            stock:productDetails.stock
          };
        } catch (error) {
          console.error(`Error fetching details for item ${orderedItem.item}:`, error);
          return null;
        }
      });

      const itemDetails = await Promise.all(itemDetailsPromises);
      console.log("validItemDetails",itemDetails)
      setCartItems(itemDetails);

      // Fetch user data
      const userResponse = await axios.get(`http://localhost:3000/api/v3/users/${order.placedBy}`);
      const user = userResponse.data.data.user;
      setUserData(user);

      // Fetch shipping data
      const shippingResponse = await axios.get(`http://localhost:3000/api/v3/shippinginfo/${user._id}`);
      const shippingInfo = shippingResponse.data.data.shippingInfo[0];
      setShippingData(shippingInfo);

    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };


  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]); 
  return (
    <div className="flex w-max-screen ">

      <LeftBar />

      <div className="flex flex-wrap justify-center bg-white items-center h-full w-full">

        <div className="w-4/6 pl-4 border-r-2 border-gray-300 h-auto flex flex-col justify-center items-start my-5">
          <p className="text-2xl font-semibold ">Shipping Info</p>
          <div className="pl-8">
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-black">Name : </span> {userData.name}
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
          <div className="pl-8">
            <p className="text-green-800 font-semibold">PAID</p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-black">Amount : </span>$
              {orderData.totalPrice}
            </p>
          </div>
          <p className="text-2xl font-semibold ">Order Status</p>
          <div className="pl-8">
            <p className={`font-semibold ${orderData.status=="Delivered"?"text-green-800":"text-red-800"}`}>{orderData.status}</p>
          </div>
          <p className="text-2xl font-semibold ">Your Cart items</p>
          {/* Cart Item */}
          {cartItems.map((item)=>(

          <div key={item._id} className="flex justify-start items-center w-full h-auto text-xs mb-1 pr-1 ">
            <img src={item.image} alt="" className="w-2/12 h-20" />
            <div className="flex justify-between w-full h-full items-center translate-y-2">
              <p className="w-9/12 text-gray-500">
                {item.name}
              </p>
              <p className="w-4/12  text-gray-700  ">
              {item.quantity} * ${item.price} = 
                <span className="font-semibold text-black">$ {item.quantity * item.price}</span>
              </p>
            </div>
          </div>

          ))
          }
          
        </div>
        {/* Right */}
        {orderData.status != "Delivered" &&
        <div className="flex flex-col w-2/6 text-sm w- h-auto justify-start items-start px-5">
          <p className="text-center w-full text-2xl font-semibold border-b-2 border-gray-300 pb-2">
            Process Order
          </p>
          <select  className="border-2 border-gray-400 w-full py-1">
            <option value="Shipped">{orderData.status=="Processing"?"Shipped":"Delivered"}</option>
          </select>
          <button onClick={handleStatus} className="cursor-pointer w-full text-center py-2 text-white text-sm mt-2 bg-orange-600 hover:bg-orange-500">
            Process
          </button>
        </div>
        }
      </div>
      {/* end */}
    </div>
  );
}

export default ShippingInfo;
