import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyIcon from "@mui/icons-material/Key";
import Checkout from "./checkout";
function Payment() {
  return (
    <div className="flex items-center justify-center bg-gray-50 w-max-screen my-3 h-auto">
      <div className="bg-white shadow-lg shadow-gray-400 w-11/12 h-full py-3">
        <Checkout step="3" />
        <div className="flex flex-col justify-center gap-3 items-center flex-wrap w-max-screen h-auto">
          <p className="text-xl font-semibold pb-2 border-b-2 border-gray-500 px-4">
            Card Info
          </p>
          <form
            action=""
            className="flex flex-col flex-wrap justify-evenly items-center gap-3 "
          >
            <div>
              <AccountBalanceWalletIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                type="text"
                placeholder="1234 1234 1234"
                value={"1234 1234 1234"}
              />
            </div>

            <div>
              <CalendarMonthIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                type="string"
                placeholder="dd/mm/yy"
                value={"dd/mm/yy"}
              />
            </div>

            <div>
              <KeyIcon className="absolute translate-y-1 ml-3" />
              <input
                className="border-2 pl-12 border-gray-300 py-1"
                type="string"
                placeholder="CVC"
                value={"CVC"}
              />
            </div>
            <button
              type="submit"
              className="text-center w-full text-sm my-3 text-white bg-orange-600 hover:bg-orange-500 py-2 px-5"
            >
              Pay - $ 560.75
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
