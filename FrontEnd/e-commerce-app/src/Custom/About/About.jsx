import "../../index.css"
import aboutImg from '../../Images/GraphicImages/aboutImage.jpg'
function About() {
  return (
    <div className="about flex bg-gray-50 justify-center items-center p-20">
    <div className="flex sm:flex-col md:flex-row bg-white z-9 justify-center content-center items-center flex-wrap w-3/4 h-5/6 shadow-2xl shadow-black ">
     
      <p className="text-3xl p-2 text-red-700 w-full text-center">About Us</p>
{/* Left side */}
      <div className="w-1/2 flex flex-wrap justify-center items-center border-r-2  border-gray-300  space-y-3 h-auto my-6 p-10">
          <div className="w-full flex justify-center items-center ">
              <img src={aboutImg} alt="" className="w-60 h-60  text-center rounded-full" />  
          </div>     
          <p className="w-full text-xl text-center">Ammar Nadeem</p>  
          <p className="w-full text-center">Visit Instagram</p>  
          <p className="text-gray-600 text-sm  w-full text-center">This is an E-commerce website made by Ammar Nadeem just to get his hands dirty with some MERN (MongoDB, Express.js, React.js, Node.js) practice.</p>  
      </div>

{/* Right side */}
        <div className="w-1/2 flex flex-wrap justify-center items-center  h-auto m-auto p-10">

       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero asperiores maxime repellat corporis, mollitia at itaque dolorum fugiat corrupti nesciunt tenetur vero a, molestias consectetur commodi, nisi facilis doloribus odio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolorem aperiam odio quisquam. Expedita quasi quidem minus ullam veniam ipsam tenetur aspernatur necessitatibus quibusdam, commodi, illo doloribus reprehenderit cupiditate animi.</p>

        </div>



    </div>
    </div>
  )
}

export default About