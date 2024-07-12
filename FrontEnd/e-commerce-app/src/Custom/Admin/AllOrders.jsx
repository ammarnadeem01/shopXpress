import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LeftBar from "./LeftBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function AllOrders() {
  const nav = useNavigate()
  const [orders, setOrders] = useState([])
  function deleteOrder(orderId) {
    axios.delete(`http://localhost:3000/api/v3/orders/${orderId}`)
    .then((res)=>console.log(res))
    .catch((err)=>{console.log(err)})
  }
  useEffect(() => {
    axios.get("http://localhost:3000/api/v3/orders")
    .then((res)=>{
      console.log(res)
       setOrders(res.data.data.order)
      //  console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [orders])
  
  return (
    <div className="flex w-max-screen ">
      {/*  Left Bar */}
      <LeftBar />
      {/* Right Bar */}
      <div className="flex bg-gray-300 w-4/5 h-full ">
        <div className="flex flex-col w-full h-full items-start bg-white">
          <div className="flex justify-center items-center w-full h-auto py-5 text-2xl text-gray-700 font-semibold">
            <p>ALL ORDERS</p>
          </div>
          <div className="flex w-full h-auto bg-orange-600 text-white justify-center items-center flex-wrap py-2">
            <p className="w-4/12 ">Order ID</p>
            <p className="w-2/12 ">Status</p>
            <p className="w-2/12 ">Amount</p>
            <p className="w-2/12 ">Actions</p>
          </div>
          {
            orders.map((order)=>(
           <div key={order._id} className="flex w-full h-auto bg-gray-300 justify-evenly items-center flex-wrap py-2">
            <p className="w-4/12  ">{order._id}</p>
            <p className="w-2/12  ">{order.status}</p>
            <p className="w-2/12  ">$ {order.totalPrice}</p>
            <p className="w-2/12 flex gap-2">
              <EditIcon className="cursor-pointer" onClick={()=>{nav("/admin/shipping",{state:order._id})}}/>
              <DeleteIcon className="cursor-pointer" onClick={()=>{deleteOrder(order._id)}}/>
            </p>
          </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default AllOrders;
