import { Doughnut, Line } from "react-chartjs-2";
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
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [true, 100],
      },
    ],
  };
  return (
    <div className="flex w-max-screen ">
      {/*  Left Bar */}
      <LeftBar />
      {/* Right Bar */}
      <div className="flex bg-gray-300 w-4/5 h-full ">
        <div className="flex flex-col w-full h-full items-start bg-white">
          <div className="flex justify-center items-center flex-wrap w-full h-auto text-xl text-gray-700 font-semibold">
            <p className="py-8">DASHBOARD</p>
            <div
              className="flex flex-col bg-blue-500 justify-center items-center
        w-full h-auto py-3 text-white"
            >
              <p>Total Amount</p>
              <p>$ 542.76</p>
            </div>
            <div className="flex w-full h-auto justify-center gap-8 items-center text-white mt-5">
              <p className="rounded-full bg-orange-400 w-1/5 h-auto py-16 text-center">
                Products <br /> 0
              </p>
              <p className="rounded-full bg-pink-600 w-1/5 h-auto py-16 text-center ">
                Orders <br /> 2
              </p>
              <p className="rounded-full bg-gray-600 w-1/5 h-auto py-16 text-center">
                Users <br /> 2
              </p>
            </div>
            <div className="flex justify-center items-center mt-10 w-3/4 h-96 py-3">
              <Line data={lineState} />
            </div>
            <div className="flex justify-center items-center mt-10 w-3/4 h-96 my-3 mb-5">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
