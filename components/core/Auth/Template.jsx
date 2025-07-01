import { useSelector } from "react-redux"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"




function Template({ title, description1, description2, image, formType }){

  const { loading } = useSelector((state) => state.auth)

  return (

    <div className="w-full flex justify-center shadow-md p-2">

      { loading ? ( <div className="spinner"></div> ) : (
         
          

            <div className="mt-10  p-4  shadow-[0_0_20px_rgba(67,56,202,0.6)] rounded-lg w-[450px]  md:mx-0">

                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5"> {title} </h1>        
                <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                  <span className="text-richblack-100">{description1}</span> {" "}
                  <span className="font-edu-sa font-bold italic text-blue-100 description2 "> {description2} </span>
                </p>

                {formType === "signup" ? <SignupForm /> : <LoginForm />}

            </div>
          
        )
     }

    </div>
  
 )}

export default Template