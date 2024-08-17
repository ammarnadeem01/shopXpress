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
import { useSelector } from "react-redux";
import api from "../../axiosConfig";

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
  const [ordertotalAmount, setOrderTotalAmount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [outOfStockProducts, setOutOfStockProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [labels, setLabels] = useState(["", "", "", "", "", "", ""]);
  const { accessToken } = useSelector((state) => state.userReducer);
  useEffect(() => {
    const now = new Date();
    const dateWeekAgo = new Date(now);
    dateWeekAgo.setDate(now.getDate() - 7);
    now.setHours(0, 0, 0, 0);

    const initialData = Array(7).fill(0);
    const prev7daysNames = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (7 - i));
      return date.toDateString();
    });
    setLabels(prev7daysNames);

    const orderTotals = initialData.slice();

    // axios
    //   .get("http://localhost:3000/api/v3/products", {
    api
      .get("api/v3/products", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setProductCount(response.data.length);
        setOutOfStockProducts(response.data.outOfStockProductsLength);
        setIsLoading(false);
      });
    // axios
    //   .get("http://localhost:3000/api/v3/orders", {
    api
      .get("api/v3/orders", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const orders = response.data.data.order;
        setOrderCount(response.data.length);
        setTotalAmount(response.data.totalAmount);
        orders
          .filter(({ placedDate }) => {
            const utcDate = new Date(placedDate);
            const correctedDate = new Date(
              utcDate.getUTCFullYear(),
              utcDate.getUTCMonth(),
              utcDate.getUTCDate()
            );
            const placedDateObject = correctedDate;
            dateWeekAgo.setHours(0, 0, 0, 0);
            return placedDateObject >= dateWeekAgo;
          })
          .forEach(({ totalPrice, placedDate }) => {
            const utcDate = new Date(placedDate);
            const correctedDate = new Date(
              utcDate.getUTCFullYear(),
              utcDate.getUTCMonth(),
              utcDate.getUTCDate()
            );
            const orderDate = correctedDate;
            now.setHours(0, 0, 0, 0);
            const dayIndex =
              7 - Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
            if (dayIndex >= 0 && dayIndex < 7) {
              orderTotals[dayIndex] += totalPrice;
            }
          });

        setOrderTotalAmount(orderTotals);
        console.log(orderTotals);
      });
    // axios
    //   .get("http://localhost:3000/api/v3/users", {
    api
      .get("pi/v3/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUserCount(response.data.length);
      });
  }, []);
  const lineState = {
    labels: labels,
    datasets: [
      {
        label: "Order Total (Last 7 days)",
        data: ordertotalAmount || [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
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
