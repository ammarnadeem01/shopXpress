import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../axiosConfig";
import "../../Custom/Loader.css";
import { useNavigate } from "react-router-dom";

function ViewOrders() {
  const nav = useNavigate();
  const { isLogin } = useSelector((state) => state.userReducer);
  // useEffect(() => {
  //   if (!isLogin) {
  //     nav("/user");
  //   }
  // }, [isLogin]);
  const { userId, accessToken } = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  console.log("userId", userId);
  useEffect(() => {
    api
      .get(`api/v3/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data.data.order);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  console.log("data", data);
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  };
  return (
    <Fragment>
      {/* {isLogin } */}
      {isLoading && (
        <div className="w-full bg-white h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && (
        <div className="w-full h-full min-h-screen bg-white">
          <table className="w-full">
            <thead className="bg-orange-400 text-white">
              <tr>
                <th className="px-6 py-3 uppercase text-left text-sm font-semibold ">
                  Order ID
                </th>
                <th className="px-6 py-3 uppercase text-left text-sm font-semibold ">
                  Status
                </th>

                <th className="px-6 py-3 uppercase text-left text-sm font-semibold ">
                  Order Date
                </th>
                <th className="px-6 py-3 uppercase text-left text-sm font-semibold ">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-3 uppercase font-semibold text-left text-sm ">
                    {order._id}
                  </td>
                  <td
                    className={`px-6 py-3 uppercase font-semibold text-left text-sm ${
                      order.status === "Delivered"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-6 py-3 uppercase font-semibold text-left text-sm ">
                    {formatDate(new Date(order.placedDate))}
                  </td>
                  <td className="px-6 py-3 uppercase font-semibold text-left text-sm ">
                    $ {order.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
}

export default ViewOrders;
