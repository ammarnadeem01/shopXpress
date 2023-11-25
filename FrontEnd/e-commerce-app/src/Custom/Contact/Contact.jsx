import { Field, Form, Formik } from "formik"
import gmailIcon from "../../Images/GraphicImages/gmailIcon.jpg"
import postOffice from "../../Images/GraphicImages/postOffice.jpg"
import phoneIcon from "../../Images/GraphicImages/phoneIcon.png"
function Contact() {
  return (
    <div className="flex justify-center max-w-screen h-auto items-center p-10">
    
    <div className="flex justify-center w-5/6 h-auto p-10 bg-white shadow-2xl items-center">
   
    {/* left side */}
    <div  className="flex w-1/2 max-h-full justify-center items-center ">
        <Formik
         initialValues={{}}
         >
        <Form action="" method="get" className="flex flex-col gap-2 justify-center items-center">
            <p className="text-3xl text-center mb-7 font-semibold">Leave A Message</p>
            <div>
           <label htmlFor="" className="text-xl font-semibold">Name : </label><br />
           <Field type="text" name="name" className="w-80 p-2 rounded-md" style={{border:"0.5px solid gray"}}></Field> <br /></div>
           <div> <label htmlFor="" className="text-xl font-semibold">Email : </label><br />
           <Field type="email" name="email" className="w-80 p-2 rounded-md" style={{border:"0.5px solid gray"}}></Field> <br /></div>
           <div><label htmlFor="" className="text-xl font-semibold">Phone Number : </label><br />
           <Field type="text" name="number" className="w-80 p-2 rounded-md" style={{border:"0.5px solid gray"}}></Field> <br /></div>
           <div> <label htmlFor="" className="text-xl font-semibold">Comment</label><br />
           <Field as="textarea" name="comment" className="w-80 p-2 rounded-md" style={{border:"0.5px solid gray"}}></Field> <br /></div>
           <div > <button type="submit" className="py-2 px-5 mt-2 text-white bg-gray-800 rounded-md hover:bg-gray-700">Submit</button></div>
        </Form>
        </Formik>
      </div>



      {/* right side */}
      <div  className="flex flex-wrap w-1/2 h-full justify-center items-center">
       {/* </div> */}
        <p className="w-full text-2xl font-semibold">Contact Detail</p>
        {/* email */}
        <div className="w-full flex rounded-md">
           <div className="w-1/6">
               <img src={gmailIcon} alt=""/>
           </div>            
            <div className="flex flex-col flex-wrap justify-center items-center">
               <p className="w-full font-semibold text-lg">Email</p>
               <p className="w-full">ammarnadeem@gmail.com</p>
            </div>
        </div>

        {/* phone */}
     
        <div className="w-full flex rounded-md ">
           <div className="w-1/6">
            <img src={phoneIcon} alt=""/>
           </div>  
            <div className="flex flex-col flex-wrap justify-center items-center">
               <p className="w-full font-semibold text-lg">Phone</p>
               <p className="w-full">0322-8696218</p>
            </div>
        </div>
        {/* mail office */}
        
        <div className="w-full flex rounded-md ">
           <div className="w-1/6" >
            <img src={postOffice} alt=""/>
           </div> 
            <div className="flex flex-col flex-wrap justify-center items-center">
               <p className="w-full font-semibold text-lg">Mail Office</p>
               <p className="w-full">Sultan Ahmed Road <br /> Rehmanpura, Lahore</p>
            </div>
        </div>

       {/* map */}
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.725460352245!2d74.30784987484141!3d31.504229247940756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190387afc3755d%3A0x6eceb431209fcd35!2sUniversity%20Of%20The%20Punjab%2C%20Main%20Campus%20Lahore.!5e0!3m2!1sen!2s!4v1689428121632!5m2!1sen!2s"  style={{border:0,width:"75%",height:"50%",marginTop:"10px"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" ></iframe>


      </div>
      
      
      
      
      
      
      
      
    </div>
    </div>
  )
}

export default Contact