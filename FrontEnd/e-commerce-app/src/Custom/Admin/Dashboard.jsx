import { Doughnut, Line } from "react-chartjs-2";
import Hamburger from "hamburger-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import LeftBar from "./LeftBar";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [outOfStockProducts, setOutOfStockProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:3000/api/v3/products").then((response) => {
      setProductCount(response.data.length);
      console.log(response.data.outOfStockProducts);
      setOutOfStockProducts(response.data.outOfStockProductsLength);
      setIsLoading(false);
    });
    axios.get("http://localhost:3000/api/v3/orders").then((response) => {
      setOrderCount(response.data.length);
      setTotalAmount(response.data.totalAmount);
    });
    axios.get("http://localhost:3000/api/v3/users").then((response) => {
      setUserCount(response.data.length);
    });
  }, []);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 1000],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        data: isLoading
          ? [0, 0]
          : [outOfStockProducts, productCount - outOfStockProducts],
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
      },
    ],
    hoverOffset: 4,
  };
  const [isOpen, setOpen] = useState(true);
  return (
    <div className="flex w-max-screen ">
      <div className="absolute 1150:hidden z-10">
        <Hamburger
          direction="right"
          duration={0.8}
          toggled={isOpen}
          toggle={setOpen}
        />
      </div>
      {/*  Left Bar */}
      <LeftBar data={isOpen} />
      {/* Right Bar */}
      <div className={`flex bg-gray-300 w-4/5 h-full xs:max-1150:w-full`}>
        <div className="flex flex-col w-full h-full items-start bg-white">
          <div className="flex justify-center items-center flex-wrap w-full h-auto text-xl text-gray-700 font-semibold">
            <p className="py-8">DASHBOARD</p>
            <div
              className="flex flex-col bg-blue-500 justify-center items-center
        w-full h-auto py-3 text-white"
            >
              <p>Total Amount</p>
              <p>$ {totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex w-full flex-wrap h-auto justify-center gap-8 xs:max-450:gap-2 items-center text-white mt-5 xs:max-450:px-2">
              <NavLink
                to="/admin/products"
                className="xs:max-450:h-auto xs:max-450:py-1 xs:max-450:text-lg no-underline xs:max-450:w-8/12 xs:max-450:rounded-sm 450:max-sm:rounded-lg text-white rounded-full bg-orange-400 h-[25vw] w-[25vw] max-w-[200px] max-h-[200px] min-w-[50px] min-h-[50px] text-center flex items-center justify-center"
              >
                Products <br /> {productCount}
              </NavLink>
              <NavLink
                to="/admin/orders"
                className="xs:max-450:h-auto xs:max-450:py-1 xs:max-450:text-lg no-underline xs:max-450:w-8/12 xs:max-450:rounded-sm 450:max-sm:rounded-lg text-white rounded-full bg-pink-600 h-[25vw] w-[25vw] max-w-[200px] max-h-[200px] min-w-[50px] min-h-[50px] text-center flex items-center justify-center"
              >
                Orders <br /> {orderCount}
              </NavLink>
              <NavLink
                to="/admin/userlist"
                className="xs:max-450:h-auto xs:max-450:py-1 xs:max-450:text-lg no-underline xs:max-450:w-8/12 xs:max-450:rounded-sm 450:max-sm:rounded-lg text-white rounded-full bg-gray-600 h-[25vw] w-[25vw] max-w-[200px] max-h-[200px] min-w-[50px] min-h-[50px] text-center flex items-center justify-center"
              >
                Users <br /> {userCount}
              </NavLink>
            </div>
            <div className="flex justify-center items-center w-[80vw] h-[50vh] 450:mt-10 xs:max-450:mt-2 xs:max-450:px-2 xs:max-450:w-full">
              <Line data={lineState} />
            </div>
            {!isLoading && (
              <div className="flex justify-center items-center w-[80vw] h-[50vh]  450:mt-10 xs:max-450:mt-2 xs:max-450:px-2 xs:max-450:w-full">
                <Doughnut data={doughnutState} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
