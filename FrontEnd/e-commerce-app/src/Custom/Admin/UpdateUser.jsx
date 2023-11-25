import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LeftBar from "./LeftBar";
function UpdateUser() {
  return (
    <div className="flex w-max-screen h-screen">
      {/*  Left Bar */}
      <LeftBar />
      {/* Right Bar */}
      <div className="flex bg-gray-300 w-4/5 h-full ">
        <div className="flex justify-center items-center bg-gray-300 w-full h-full">
          <div className="flex flex-col gap-10 bg-white justify-center items-start py-16 px-8 shadow-black shadow-2xl">
            <p className="text-center text-2xl font-semibold w-full">
              Update User
            </p>
            <div>
              <PersonIcon className="absolute translate-x-2 translate-y-2.5" />
              <input
                className="border-2 border-gray-400 py-2 px-11 rounded-md"
                placeholder="Ammar Nadeem"
              />
            </div>
            <div>
              <EmailIcon className="absolute translate-x-2 translate-y-2.5" />
              <input
                className="border-2 border-gray-400 py-2 px-11 rounded-md"
                placeholder="ammarpk786@gmail.com"
              />
            </div>
            <div>
              <VerifiedUserIcon className="absolute translate-x-2 translate-y-2.5" />
              <input
                className="border-2 border-gray-400 py-2 px-11 rounded-md"
                placeholder="Admin"
              />
            </div>
            <p className="bg-gray-800 hover:bg-gray-600 rounded-md text-center text-white w-full py-1.5">
              UPDATE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
