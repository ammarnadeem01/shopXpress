import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LeftBar from "./LeftBar";
import axios from "axios";
import { useState } from "react";

function CreateProduct() {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "Laptop",
    stock: 1,
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  }
  function handleCreateProduct(e) {
    e.preventDefault();
    console.log(productData);
    axios
      .post("http://localhost:3000/api/v3/products", productData)
      .then(() => {
        console.log("Product Created.");
      })
      .catch((err) => {
        console.log("Error Occurred.", err);
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
            <p className="text-2xl font-semibold">Create Product</p>

            <div className="w-full h-auto">
              <SpellcheckIcon className="absolute translate-x-2 translate-y-2.5" />
              <input
                type="string"
                className="border-2 border-gray-400 w-full py-2 pl-10 rounded-md"
                placeholder="Product's Name"
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
                name="stock"
              />
            </div>
            <div className="w-full h-auto">
              <input
                type="string"
                className="border-2 border-gray-400 py-2 px-11 text-center rounded-md"
                placeholder="Choose File"
              />
            </div>
            <button
              className="bg-gray-800 mt-2 cursor-pointer  hover:bg-gray-600 rounded-md text-center text-white w-full py-1.5"
              onClick={handleCreateProduct}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
