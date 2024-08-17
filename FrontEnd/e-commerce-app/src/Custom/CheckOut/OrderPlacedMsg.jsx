import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import ViewOrders from "./ViewOrders";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

function OrderPlaced() {
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const location = useLocation();

  const userId = location.state;
  console.log(userId);
  const { accessToken } = useSelector((state) => state.userReducer);

  const handleOpen = () => {
    setOpen(!open);
    axios
      .get(`http://localhost:3000/api/v3/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.order);
        setOrderData(res.data.data.order);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-w-full max-w-full h-screen">
      <p className="text-orange-500 text-9xl">
        <CheckCircleIcon fontSize="inherit" />
      </p>
      <p className="text-4xl">Your Order Has Been Placed Successfully</p>
      <button
        onClick={handleOpen}
        className="px-6 py-2 mt-4 bg-gray-500 hover:bg-gray-400 text-white text-center cursor-pointer"
      >
        View Orders
      </button>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "95vh",
            width: "90vw",
            minWidth: "90vw",
            minHeight: "95vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ViewOrders data={orderData} />
        </Box>
      </Modal>
    </div>
  );
}

export default OrderPlaced;
