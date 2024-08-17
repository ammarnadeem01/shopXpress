import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LeftBar from "./LeftBar";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useSelector } from "react-redux";
import "../../Custom/Loader.css";
function AllProducts() {
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [isOpen, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { accessToken } = useSelector((state) => state.userReducer);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v3/products/admin/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((results) => {
        console.log(results);
        setItems(results.data.data.product);
        setIsLoading(false);
      })
      .catch((err) => {
        nav("/forbidden");
      });
  }, [items]);

  const deleteProduct = (prodId) => {
    axios
      .delete(`http://localhost:3000/api/v3/products/${prodId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
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
              All Products
            </div>

            {/* Table for Large Screens */}
            <div className="hidden 1000:block bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Prod ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-100 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                        <EditIcon
                          className="cursor-pointer text-blue-500 hover:text-blue-700"
                          onClick={() => {
                            nav("/admin/editproduct", { state: item });
                          }}
                        />
                        <DeleteIcon
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => {
                            deleteProduct(item._id);
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
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-2"
                >
                  <div className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500">ID: {item._id}</div>
                  <div className="text-sm text-gray-500">
                    Stock: {item.stock}
                  </div>
                  <div className="text-sm text-gray-500">
                    Price: {item.price}
                  </div>
                  <div className="flex justify-end space-x-4 mt-4">
                    <EditIcon
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        nav("/admin/editproduct", { state: item });
                      }}
                    />
                    <DeleteIcon
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => {
                        deleteProduct(item._id);
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

export default AllProducts;
