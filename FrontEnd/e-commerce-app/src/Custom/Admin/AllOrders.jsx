import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LeftBar from "./LeftBar";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useSelector } from "react-redux";
import "../../Custom/Loader.css";
import api from "../../axiosConfig";

function AllOrders() {
  const nav = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setOpen] = useState(true);
  const { accessToken } = useSelector((state) => state.userReducer);
  useEffect(() => {
    // axios
    //   .get("http://localhost:3000/api/v3/orders", {
    api
      .get("api/v3/orders", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setOrders(res.data.data.order);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        nav("/forbidden");
      });
  }, [accessToken]);

  const deleteOrder = (orderId) => {
    // axios
    //   .delete(`http://localhost:3000/api/v3/orders/${orderId}`)
    api
      .delete(`api/v3/orders/${orderId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {isLoading && (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && (
        <div className="flex w-full min-h-screen bg-gray-100">
          {/* Hamburger for Mobile */}
          <div className="absolute 1150:hidden z-10 p-4">
            <Hamburger
              direction="right"
              duration={0.8}
              toggled={isOpen}
              toggle={setOpen}
              color="#ff5722"
            />
          </div>

          {/* Left Bar */}
          <LeftBar data={isOpen} />

          {/* Right Bar */}
          <div className="w-4/5 xs:max-1150:w-full p-6">
            <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
              All Orders
            </div>

            {/* Table for Large Screens */}
            <div className="hidden 1000:block bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-100 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${order.totalPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                        <EditIcon
                          className="cursor-pointer text-blue-500 hover:text-blue-700"
                          onClick={() => {
                            nav("/admin/shipping", { state: order._id });
                          }}
                        />
                        <DeleteIcon
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => {
                            deleteOrder(order._id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card View for Small Screens */}
            <div className="block 1000:hidden space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-2"
                >
                  <div className="text-lg font-semibold text-gray-800">
                    Order ID: {order._id}
                  </div>
                  <div className="text-sm text-gray-500">
                    Status: {order.status}
                  </div>
                  <div className="text-sm text-gray-500">
                    Amount: ${order.totalPrice}
                  </div>
                  <div className="flex justify-end space-x-4 mt-4">
                    <EditIcon
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        nav("/admin/shipping", { state: order._id });
                      }}
                    />
                    <DeleteIcon
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => {
                        deleteOrder(order._id);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default AllOrders;
