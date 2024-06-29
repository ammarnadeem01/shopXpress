import { SocialIcon } from 'react-social-icons';
function Footer() {
  return (
    <div className="flex max-w-screen flex-wrap h-[40vh] bg-[#1A1919]">
          <div className="flex w-2/5 h-3/4  flex-wrap content-center space-y-3.5 pl-9">
                 <p className="w-full text-gray-100 text-xl font-semibold">Follow Us</p>
                 <div className="w-full flex justify-start  space-x-4 ">
                 <SocialIcon url="https://youtube.com/in/jaketrent"  fgColor='white' style={{width:"25px", height:"25px"}}/>
                 <SocialIcon url="https://twitter.com/in/jaketrent"  fgColor='white' style={{width:"25px", height:"25px"}}/>
                 <SocialIcon url="https://facebook.com/in/jaketrent" fgColor='white'  style={{width:"25px", height:"25px"}}/>
                 <SocialIcon url="https://upwork.com/in/jaketrent"   fgColor='white'  style={{width:"25px", height:"25px"}}/>
                 <SocialIcon url="https://linkedin.com/in/jaketrent" fgColor='white'  style={{width:"25px", height:"25px"}}/>
                 </div>
                 <p className="w-full text-gray-400">E-commerce App v1.0.0</p>
          </div>
          <div  className="flex w-3/5 h-3/4 flex-wrap content-center space-y-4">
          <div>
                 <p className='text-xl text-white font-semibold w-full'>Donations</p>
          </div>
          <div>
                <p className='text-white w-full'><br />Donations are very much appreciated. Please consider donating to keep the website development going.</p>
                <p className='text-gray-500 w-full'>Download App for Android and IOS mobile phone</p>
          </div>
          </div>
          <hr className='text-white w-3/4 m-auto'/>
          <div className='h-1/4 w-full flex justify-center items-center'>
            <p className='text-gray-500 '>Copyright © 2023 All rights reserved</p>
          </div>
    </div>
  )
}

export default Footer