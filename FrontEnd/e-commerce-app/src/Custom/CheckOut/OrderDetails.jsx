import { useEffect, useState } from "react";
import api from "../../axiosConfig";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderDetails() {
  const { id } = useParams();
  const { userId, accessToken } = useSelector((state) => state.userReducer);
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [shippingData, setShippingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const fetchProducts = (items) => {
    const promises = items.map((item) => {
      return api.get(`api/v3/products/${item.item}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });
    Promise.all(promises)
      .then((responses) => {
        const allProducts = responses.map((response, index) => {
          const product = response.data.data.product;
          const quantity = items[index].quantity;
          return { ...product, quantity };
        });
        setCartItems(allProducts);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fetchUser = (id) => {
    api
      .get(`api/v3/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data.data.user);
      })
      .catch((err) => {
        // setIsLoading(false);
      });
  };
  useEffect(() => {
    api
      .get(`api/v3/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        const orders = result.data.data.order;
        setOrderData(orders);
        fetchUser(orders.placedBy);
        fetchShippingInfo(orders.placedBy);
        fetchProducts(orders.orderedItems);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);
  const fetchShippingInfo = (id) => {
    api
      .get(`api/v3/shippingInfo/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setShippingData(response.data.data.shippingInfo);
      })
      .catch((err) => {
        // setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && (
        <div className="w-full bg-white h-[70vh] flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && (
        <div className="min-h-[75vh] py-5 flex flex-col items-center gap-y-10 px-5">
          <div className="flex flex-col sm:flex-row sm:justify-evenly gap-5 w-full sm:max-w-3xl mx-auto">
            {/* Shipping Info */}
            <div className="flex-1 p-4 border border-gray-200 rounded-md shadow-sm space-y-4">
              <p className="text-2xl font-semibold">Shipping Info</p>
              <div>
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
            </div>

            {/* Payment Info */}
            <div className="flex-1 p-4 border border-gray-200 rounded-md shadow-sm space-y-4">
              <p className="text-2xl font-semibold">Payment</p>
              <div>
                <p className="text-green-800 font-semibold">PAID</p>
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold text-black">Amount : </span>$
                  {orderData.totalPrice}
                </p>
              </div>
            </div>

            {/* Order Status */}
            <div className="flex-1 p-4 border border-gray-200 rounded-md shadow-sm space-y-4">
              <p className="text-2xl font-semibold">Order Status</p>
              <div>
                <p
                  className={`font-semibold ${
                    orderData.status === "Delivered"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {orderData.status}
                </p>
              </div>
            </div>
          </div>
          {/* // start */}
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
                        src={item.productImages[0]}
                        alt=""
                        className="w-1/2 h-15 sm:h-10"
                      />
                    </td>
                    <td className="px-3 py-3  text-left text-sm font-semibold uppercase tracking-wider">
                      {item.name}
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
          <div className="flex flex-row flex-wrap 1000:hidden justify-evenly w-full items-center">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white m-3 rounded-lg shadow-md flex xs:max-800:w-full w-5/12 h-40  flex-row "
              >
                <div className="w-1/4 text-gray-500">
                  <img src={item.productImages[0]} alt="Image" />
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
          {/* // end */}
        </div>
      )}
    </>
  );
}

export default OrderDetails;
