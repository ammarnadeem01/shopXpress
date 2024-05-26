import { useNavigate } from "react-router-dom";
import M1 from "../../Images/ProductImages/M1.jpg";
import Checkout from "./checkout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function ConfirmOrder() {
  const [shippingCharges,setShippingCharges]=useState(0);
  const [GST,setGST]=useState(0);
  const {shippingData} = useSelector((state)=>{
    return state.shippingReducer;
  }) 
  const {userName} = useSelector((state)=>{
    return state.userReducer;
  }) 
  const { cartItems } = useSelector((state) => {
    return state.cartReducer;
  });
  const { grossTotal } = useSelector((state) => {
    return state.cartReducer;
  });
  const [items, setItems] = useState([]);
  // new code
  useEffect(() => {
    // Create an array of promises for fetching data
    const fetchPromises = cartItems.map(async (cartItem) => {
      const results = await axios
        .get(`http://localhost:3000/api/v3/products/${cartItem.productId}`);
      const item = results.data.data.product;
      item.quantity = cartItem.quantity;
      return item;
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
  }, []);
    useEffect(()=>{
      const country = shippingData.country.toLowerCase();
      if (country=="pakistan") {
           setShippingCharges(20)
      } else if(country=="india" || country=="china" ||country=="iran" ||country=="afghanistan") {
          setShippingCharges(30)
      }
      else{
        setShippingCharges(50)
      }
    },[])
    useEffect(()=>{
      setGST(10/100 * grossTotal);;
    })
  // new code end
  const nav = useNavigate();
  return (
    <div className="flex items-center justify-center bg-gray-50 w-max-screen my-3 h-auto">
      {console.log(items)}
      <div className="bg-white shadow-lg shadow-gray-400 w-11/12 h-full py-3">
        <Checkout step="2" />
        <div className="flex flex-row justify-between items-center flex-wrap w-max-screen h-auto">
          {/* Left */}
          <div className="w-3/4 pl-20  border-r-2 border-gray-300 h-auto flex flex-col justify-center items-start">
            <p className="text-2xl font-semibold ">Shipping Info</p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-black">Name : </span>{userName}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-black">Phone : </span>
              {shippingData.phone}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold text-black">Address : </span>{`${shippingData.address}, ${shippingData.city}, ${shippingData.state}, ${shippingData.country}`}
            </p>
            <p className="text-2xl font-semibold ">Your Cart Items</p>

            {/* Cart Item */}
           {items.map((item)=>(
            
            <div className="flex justify-start items-center w-full h-auto text-sm mb-1 ">
              <img src={M1} alt="" className="w-2/12 h-20" />
              <div className="flex justify-between w-full h-full items-center translate-y-2">
                <p className="w-9/12 text-gray-500">
                  {item.name}
                </p>
                <p className="w-3/12  text-gray-900  ">
                  {item.quantity} * ${item.price} =
                  <span className="font-semibold text-black text-sm">
                    $ {item.quantity * item.price}
                  </span>
                </p>
              </div>
            </div>
           )
           )}
          </div>
          {/* Right */}
          <div className="flex flex-col text-sm w-1/4 h-auto justify-start items-start px-5">
            <p className="text-center w-full text-2xl font-semibold border-b-2 border-gray-300 pb-2">
              Order Summary
            </p>
            <div className="flex w-full justify-between">
              <p>Subtotal : </p>
              <p className="text-gray-500">$ {grossTotal}</p>
            </div>
            <div className="flex w-full justify-between ">
              <p>Shipping Charges : </p>
              <p className="text-gray-500">$ {shippingCharges}</p>
            </div>
            <div className="flex w-full justify-between">
              <p>GST : </p>
              <p className="text-gray-500">$ {GST}</p>
            </div>
            <div className="flex w-full justify-between border-t-2 border-gray-300 pt-2  ">
              <p className="font-semibold text-lg">Total</p>
              <p className="font-semibold text-lg">{(grossTotal + shippingCharges + GST).toFixed(3)}</p>
            </div>
            <button
              className="w-full text-center py-2 text-white text-sm bg-orange-600 hover:bg-orange-500"
              onClick={() => {
                nav("/checkout/payment");
              }}
            >
              Proceed To Payment
            </button>
          </div>
          {/* end */}
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
