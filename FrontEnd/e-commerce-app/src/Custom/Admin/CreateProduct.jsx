import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LeftBar from "./LeftBar";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Forbidden from "./Forbidden";
import api from "../../axiosConfig";

function CreateProduct() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { accessToken, userId } = useSelector((state) => state.userReducer);
  useEffect(() => {
    api
      .get(`api/v3/users/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setIsAdmin(res.data.data.user.role === "Admin");
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [accessToken]);

  const nav = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "Laptop",
    stock: 1,
    productImages: [],
  });
  function handleChange(e) {
    const { name, value, type, files } = e.target;
    // console.log(files);
    if (type == "file") {
      setProductData({ ...productData, [name]: Array.from(files) });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  }
  function handleCreateProduct(e) {
    console.log("productData", productData);
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.set("name", productData.name);
    formData.set("description", productData.description);
    formData.set("stock", productData.stock);
    formData.set("category", productData.category);
    formData.set("price", productData.price);

    productData.productImages.map((img) => {
      formData.append("productImages", img);
    });

    // axios
    //   .post("http://localhost:3000/api/v3/products", formData, {
    api
      .post("api/v3/products", formData, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        setIsSubmitting(false);
        nav("/admin/products");
        // console.log("Product Created.");
      })
      .catch((err) => {
        setIsSubmitting(false);
        if (err.response.data.status === 400) {
          setErrMsg(err.response.data.message);
        } else {
          console.log(err);
          nav("/forbidden");
        }
      });
  }
  const [isOpen, setOpen] = useState(true);
  return (
    <Fragment>
      {isLoading && (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && (
        <Fragment>
          {!isAdmin && <Forbidden />}
          {isAdmin && (
            <div className="flex w-max-screen ">
              <div className="absolute 1150:hidden z-40 p-4">
                <Hamburger
                  direction="right"
                  duration={0.8}
                  toggled={isOpen}
                  toggle={setOpen}
                  color="#ff5722"
                />
              </div>
              {/*  Left Bar */}
              <LeftBar data={isOpen} />
              {/* Right Bar */}
              <div className="flex z-20 bg-gray-300 w-4/5 h-full xs:max-1150:w-full">
                <div className="flex justify-center items-center w-full h-screen flex-wrap">
                  <div className="w-1/4 xs:max-450:w-5/6 450:max-sm:w-2/3 sm:max-900:w-1/2 900:max-lg:w-1/2 lg:max-2xl:w-1/3 h-3/5 flex flex-col justify-evenly items-center ">
                    <p className="text-2xl font-semibold">Create Product</p>

                    <div className="w-full h-auto">
                      <SpellcheckIcon className="absolute translate-x-2 translate-y-2.5" />
                      <input
                        type="string"
                        className="border-2 border-gray-400 w-full py-2 pl-10 "
                        placeholder="Product's Name"
                        onChange={handleChange}
                        name="name"
                      />
                    </div>
                    <div className="w-full h-auto">
                      <AttachMoneyIcon className="absolute translate-x-2 translate-y-2.5" />
                      <input
                        type="number"
                        className="border-2 border-gray-400 w-full py-2 pl-10"
                        placeholder="Price"
                        onChange={handleChange}
                        name="price"
                      />
                    </div>
                    <div className="w-full h-auto">
                      <DescriptionIcon className="absolute translate-x-2 translate-y-2.5" />
                      <input
                        type="string"
                        className="border-2 border-gray-400 w-full py-2 pl-10 "
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
                        className="border-2 border-gray-400 w-full py-2 pl-10 "
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
                        className="border-2 border-gray-400 w-full py-2 pl-10 "
                        placeholder="Stocks"
                        onChange={handleChange}
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
                      onClick={handleCreateProduct}
                    >
                      {isSubmitting && (
                        <div className="loaderBtn w-5 h-5"></div>
                      )}
                      {!isSubmitting && "Create"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default CreateProduct;
