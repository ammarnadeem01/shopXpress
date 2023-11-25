import DeleteIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import LeftBar from "./LeftBar";

function AllReviews() {
  return (
    <div className="flex w-max-screen ">
      {/*  Left Bar */}
      <LeftBar />
      {/* Right Bar */}
      <div className="flex bg-gray-300 w-4/5 h-full ">
        <div className="flex flex-col w-full h-full items-start bg-white">
          <div className="flex flex-col justify-center items-center gap-3 w-full h-auto py-5  text-gray-700 font-semibold">
            <p className="text-2xl">ALL REVIEWS</p>
            <div className="">
              <StarIcon className="absolute translate-y-2.5 translate-x-1" />
              <input
                className="border-2 border-gray-300 pl-8 rounded-md pr-2 py-2 text-lg"
                value={"IdN23na09b1234ns7002n"}
              />
            </div>
            <p className="bg-orange-600 py-1.5 px-16 rounded-md hover:bg-orange-500 text-white">
              Search
            </p>
          </div>
          <div className="flex w-full h-auto bg-orange-600 text-white justify-evenly items-center flex-wrap py-2">
            <p className="w-2/12  text-start ">Review ID</p>
            <p className="w-2/12 text-start  ">User</p>
            <p className="w-2/5  text-start ">Comment</p>
            <p className="w-1/12 text-start  ">Rating</p>
            <p className="w-1/12 text-start  ">Actions</p>
          </div>
          <div className="flex w-full h-auto bg-gray-300 justify-evenly items-center flex-wrap py-2 text-sm">
            <p className="w-2/12  text-start">12345678ijhvcxa</p>
            <p className="w-2/12 text-start ">Ammar Nadeem</p>
            <p className="w-2/5  text-start">
              shut up i dont like this kind of stuff
            </p>
            <p className="w-1/12 pl-4">5</p>
            <p className="w-1/12 pl-4 text-xs">
              <DeleteIcon />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllReviews;
