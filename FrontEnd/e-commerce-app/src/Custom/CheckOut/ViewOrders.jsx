import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../axiosConfig";
import "../../Custom/Loader.css";
import { useNavigate } from "react-router-dom";

function ViewOrders() {
  const nav = useNavigate();
  const { isLogin } = useSelector((state) => state.userReducer);
  const { userId, accessToken } = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get(`api/v3/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setData(response.data.data.order);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
    // }, [userId, accessToken]);
  });

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
      {isLoading && (
        <div className="w-full bg-white h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && (
        <div className="w-full h-full min-h-screen bg-white p-4">
          {/* Table for Larger Screens */}
          <div className="hidden lg:block bg-white shadow-lg rounded-lg overflow-hidden ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-400 text-white">
                <tr>
                  <th className="px-6 py-3 uppercase text-left text-sm font-semibold">
                    Order ID
                  </th>
                  <th className="px-6 py-3 uppercase text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-3 uppercase text-left text-sm font-semibold">
                    Order Date
                  </th>
                  <th className="px-6 py-3 uppercase text-left text-sm font-semibold">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((order) => (
                  <tr
                    key={order._id}
                    onClick={() => {
                      nav(`/order/${order._id}`);
                    }}
                    className="cursor-pointer hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-3 uppercase font-semibold text-left text-sm">
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
                    <td className="px-6 py-3 uppercase font-semibold text-left text-sm">
                      {formatDate(new Date(order.placedDate))}
                    </td>
                    <td className="px-6 py-3 uppercase font-semibold text-left text-sm">
                      $ {order.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View for Smaller Screens */}
          <div className="block lg:hidden space-y-4">
            {data.map((order) => (
              <div
                onClick={() => {
                  nav(`/order/${order._id}`);
                }}
                key={order._id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-2 cursor-pointer"
              >
                <div className="text-lg font-semibold text-gray-800">
                  Order ID: {order._id}
                </div>
                <div className="text-sm text-gray-500">
                  Status: {order.status}
                </div>
                <div className="text-sm text-gray-500">
                  Order Date: {formatDate(new Date(order.placedDate))}
                </div>
                <div className="text-sm text-gray-500">
                  Total Price: $ {order.totalPrice}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default ViewOrders;
