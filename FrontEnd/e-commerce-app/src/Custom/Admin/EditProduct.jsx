import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LeftBar from "./LeftBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import { useSelector } from "react-redux";

function EditProduct() {
  const loc = useLocation();
  const { accessToken } = useSelector((state) => state.userReducer);
  const [errMsg, setErrMsg] = useState("");
  const nav = useNavigate();
  const [productData, setProductData] = useState({
    name: loc.state?.name,
    price: loc.state?.price,
    description: loc.state?.description,
    category: loc.state?.category,
    stock: loc.state?.stock,
    productImages: loc.state?.productImages,
  });
  function handleChange(e) {
    const { name, value, type, files } = e.target;
    console.log(files);
    if (type == "file") {
      setProductData({ ...productData, [name]: Array.from(files) });
    } else {
      console.log(name, value);
      setProductData({ ...productData, [name]: value });
    }
  }
  function handleUpdateProduct(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("stock", productData.stock);
    formData.append("category", productData.category);
    formData.append("price", productData.price);

    productData.productImages.map((img) => {
      formData.append("productImages", img);
    });
    console.log("formData", formData);
    //  axios
    //     .put(`http://localhost:3000/api/v3/products/${loc.state._id}`, formData,{
    api
      .put(`api/v3/products/${loc.state._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log("Product Updated.");
        nav("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err.response.data.message);
      });
  }

  return (
    <div className="flex w-max-screen ">
      {/*  Left Bar */}
      <LeftBar />
      {/* Right Bar */}
      <div className="flex bg-gray-300 w-4/5 h-full ">
        <div className="flex justify-center items-center w-full h-screen flex-wrap">
          <div className="w-1/4 h-3/5 flex flex-col justify-evenly items-center ">
            <p className="text-2xl font-semibold">Edit Product</p>

            <div className="w-full h-auto">
              <SpellcheckIcon className="absolute translate-x-2 translate-y-2.5" />
              <input
                type="string"
                className="border-2 border-gray-400 w-full py-2 pl-10 rounded-md"
                placeholder="Product's Name"
                value={productData.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="w-full h-auto">
              <AttachMoneyIcon className="absolute translate-x-2 translate-y-2.5" />
              <input
                type="number"
                className="border-2 border-gray-400 w-full py-2 pl-10 rounded-md"
                placeholder="Price"
                onChange={handleChange}
                value={productData.price}
                name="price"
              />
            </div>
            <div className="w-full h-auto">
              <DescriptionIcon className="absolute translate-x-2 translate-y-2.5" />
              <input
                type="string"
                className="border-2 border-gray-400 w-full py-2 pl-10 rounded-md"
                placeholder="Description"
                onChange={handleChange}
                value={productData.description}
                name="description"
              />
            </div>
            <div className="w-full h-auto">
              <AccountTreeIcon className="absolute translate-x-2 translate-y-2.5" />
              <select
                name="category"
                id=""
                className="border-2 border-gray-400 w-full py-2 pl-10 rounded-md"
                value={productData.category}
                onChange={handleChange}
              >
                <option value="Laptop">Laptop</option>
                <option value="Footwear">Footwear</option>
                <option value="Bottom">Bottom</option>
                <option value="Tops">Tops</option>
                <option value="Attire">Attire</option>
                <option value="Camera">Camera</option>
                <option value="SmartPhone">SmartPhone</option>
              </select>
            </div>
            <div className="w-full h-auto">
              <StorageIcon className="absolute translate-x-2 translate-y-2.5" />
              <input
                type="string"
                className="border-2 border-gray-400 w-full py-2 pl-10 rounded-md"
                placeholder="Stocks"
                onChange={handleChange}
                value={productData.stock}
                name="stock"
              />
            </div>
            <div className="w-full h-auto">
              <input
                type="file"
                multiple
                className="hidden"
                id="productImages"
                name="productImages"
                onChange={handleChange}
                // value={productData.productImages}
              />
              <label
                htmlFor="productImages"
                className="bg-gray-800 text-white w-full mt-2 text-center py-2 px-4 rounded-md cursor-pointer hover:bg-gray-600"
              >
                Choose Images
              </label>
            </div>
            {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
            <button
              className="bg-gray-800 mt-2 cursor-pointer  hover:bg-gray-600 rounded-md text-center text-white w-full py-1.5"
              onClick={handleUpdateProduct}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
