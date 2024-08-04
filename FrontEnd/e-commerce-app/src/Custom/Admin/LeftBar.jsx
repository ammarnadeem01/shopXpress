// import DashboardIcon from "@mui/icons-material/Dashboard";
// import CategoryIcon from "@mui/icons-material/Category";
// import GradingIcon from "@mui/icons-material/Grading";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import RateReviewIcon from "@mui/icons-material/RateReview";
// import { useNavigate } from "react-router-dom";
// function LeftBar() {
//   const nav = useNavigate();
//   return (
//     <div className="flex flex-col justify-start items-start pl-5 border-r-2 border-gray-300 pb-5 bg-white w-1/5 h-auto gap-10">
//       <p className="font-bold text-2xl my-10">E C O M M E R C E</p>
//       <p
//         className="cursor-pointer"
//         onClick={() => {
//           nav("/admin/dashboard");
//         }}
//       >
//         <DashboardIcon />
//         Dashboard
//       </p>
//       <p
//         className="cursor-pointer"
//         onClick={() => {
//           nav("/admin/products");
//         }}
//       >
//         <CategoryIcon /> Products
//       </p>
//       <p
//         className="cursor-pointer"
//         onClick={() => {
//           nav("/admin/orders");
//         }}
//       >
//         <GradingIcon /> Orders
//       </p>
//       <p
//         className="cursor-pointer"
//         onClick={() => {
//           nav("/admin/updateuser");
//         }}
//       >
//         <PeopleAltIcon /> Users
//       </p>
//       <p
//         className="cursor-pointer"
//         onClick={() => {
//           nav("/admin/reviews");
//         }}
//       >
//         <RateReviewIcon /> Reviews
//       </p>
//     </div>
//   );
// }

// export default LeftBar;

import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import GradingIcon from "@mui/icons-material/Grading";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useNavigate } from "react-router-dom";

function LeftBar() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col justify-start items-start pl-5 border-r-2 border-gray-300 pb-5 bg-white w-full sm:w-1/4 md:w-1/5 h-auto gap-4 md:gap-6 lg:gap-10">
      <p className="font-bold text-xl md:text-2xl my-5 md:my-10">
        E C O M M E R C E
      </p>
      <p
        className="cursor-pointer flex items-center gap-2"
        onClick={() => {
          nav("/admin/dashboard");
        }}
      >
        <DashboardIcon />
        <span className="text-sm md:text-base">Dashboard</span>
      </p>
      <p
        className="cursor-pointer flex items-center gap-2"
        onClick={() => {
          nav("/admin/products");
        }}
      >
        <CategoryIcon />
        <span className="text-sm md:text-base">Products</span>
      </p>
      <p
        className="cursor-pointer flex items-center gap-2"
        onClick={() => {
          nav("/admin/orders");
        }}
      >
        <GradingIcon />
        <span className="text-sm md:text-base">Orders</span>
      </p>
      <p
        className="cursor-pointer flex items-center gap-2"
        onClick={() => {
          nav("/admin/updateuser");
        }}
      >
        <PeopleAltIcon />
        <span className="text-sm md:text-base">Users</span>
      </p>
      <p
        className="cursor-pointer flex items-center gap-2"
        onClick={() => {
          nav("/admin/reviews");
        }}
      >
        <RateReviewIcon />
        <span className="text-sm md:text-base">Reviews</span>
      </p>
    </div>
  );
}

export default LeftBar;
