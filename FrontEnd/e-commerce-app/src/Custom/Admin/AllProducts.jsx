import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LeftBar from "./LeftBar";
import { useEffect, useState } from "react";
import axios from "axios";

function AllProducts() {
     const [items,setItems]=useState([])
     useEffect(()=>{
        axios.get("http://localhost:3000/api/v3/products")
        .then((results)=>{
          console.log(results)
          setItems(results.data.data.product);
        }).catch((err)=>{
          console.log("Error Occurred.")
        })
     },[])
  return (
    <div className="flex w-max-screen ">
      {/*  Left Bar */}
      <LeftBar />
      {/* Right Bar */}
      <div className="flex bg-gray-300 w-4/5 h-full ">
        <div className="flex flex-col w-full h-full items-start bg-white">
          <div className="flex justify-center items-center w-full h-auto py-5 text-2xl text-gray-700 font-semibold">
            <p>ALL PRODUCTS</p>
          </div>
          <div className="flex w-full h-auto bg-orange-600 text-white justify-evenly items-center flex-wrap py-2">
            <p className="w-1/5 ">Products ID</p>
            <p className="w-2/5 ">Name</p>
            <p className="w-1/12 ">Stock</p>
            <p className="w-2/12 ">Price</p>
            <p className="w-1/12 ">Actions</p>
          </div>
          {items.map((item)=>(
          <div className="flex w-full h-auto bg-gray-300 justify-evenly items-center flex-wrap py-2" key={item._id}>
            <p className="w-1/5  ">{item._id}</p>
            <p className="w-2/5  ">{item.name}</p>
            <p className="w-1/12  ">{item.stock}</p>
            <p className="w-2/12 ">${item.price}</p>
            <p className="w-1/12 flex gap-2">
              <EditIcon />
              <DeleteIcon />
            </p>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
