import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { NavLink } from "react-router-dom";
function EmptyCart() {
  return (
    <div className="flex flex-col justify-center items-center w-max-screen h-screen">
      <p className="text-orange-500 text-9xl">
      <ProductionQuantityLimitsIcon fontSize='inherit'/>
      </p>
      <p className="text-4xl">No Products In the Cart</p>
      <NavLink to="/products" className="no-underline px-6 py-2 mt-4 bg-gray-500 hover:bg-gray-400 text-white text-center">
        Browse Products
      </NavLink>
    </div>
  )
}

export default EmptyCart