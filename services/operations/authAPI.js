import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import axios from "axios";
import {setUserId} from "../../slices/authSlice";
/*
 const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })
           here "POST" Is request and LOGIN_API is api and input me (emali , password) hai so basically we are making
           a request("POST") to the API("LOGIN_API") and passing input (emali , password)
 
*/

const {SENDOTP_API,  SIGNUP_API, LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API,STUDENT_INFO,TEACHER_INFO,} = endpoints
   
   

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
     const response=await axios.post(SENDOTP_API,{email});
      console.log(response);
      if(!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    }
     catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function signUp(accountType, firstName, lastName, email, password, confirmPassword,  otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response=await axios.post(SIGNUP_API,{role:accountType, firstName,  lastName,  email, password,otp, })
      console.log("SIGNUP API RESPONSE............", response);

      if(!response.data.success) {
        throw new Error(response?.data.message)
      }
      toast.success("Signup Successful");
      dispatch(setUserId(response?.data.user._id));
      navigate(`/${accountType}-info`);
    }
     catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      // const response = await apiConnector("POST", LOGIN_API, {email, password,})
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
        { email, password },
        {
            withCredentials: true,  // Important for cookies
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
      console.log("LOGIN API RESPONSE............", response)
      if(!response){
        throw new Error("Login Error");
      }
      toast.success("Login Successful")
      dispatch(setToken(response?.data?.token))
      const userImage = response?.data?.user?.image ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user))
      let role=response?.data?.user?.userEducationInfo;
      console.log("This is the role",response);
      if(role=="Student"){
          let rollnumber=response?.data?.user?.userEducationInfo?.rollnumber;
          let grade="1"||response?.data?.user?.userEducationInfo?.std;
          localStorage.setItem("rollnumber",toString(rollnumber));
          localStorage.setItem("grade",toString(grade));
      }
      else if(role=="Instructor"){
        let grade="1"||response?.data?.userEducationInfo?.std;
        localStorage.setItem("grade",grade);
      }
      else{
        localStorage.setItem("rollnumber","153");
        localStorage.setItem("grade","1");
      }
      navigate("/dashboard/my-profile")
    }
     catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})
      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}


export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});
      console.log("RESET Password RESPONSE ... ", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
};
export function studentInfo(userId,std,field,rollnumber,navigate){
  const toastId=toast.loading("Loading...");
    return async (dispatch)=>{
      try{
        const response=await axios.post(STUDENT_INFO,{userId,std,field,rollnumber});
        console.log(response);
        if(!response?.data.success){
          throw new Error(response.data.message);
        }
        navigate("/login");
      }
      catch(error) {
        console.log("Error in setting student details", error);
        toast.error("Unable to set Details");
      }
      toast.dismiss(toastId);
    }
}
export function instructorInfo(userId,subjectSpecification,std,navigate){
  console.log(userId,subjectSpecification,std);
  const toastId=toast.loading("Loading...");
    return async (dispatch)=>{
      try{
        const response=await axios.post(TEACHER_INFO,{userId,subjectSpecification,std});
        console.log(response);
        if(!response?.data.success){
          throw new Error(response.data.message);
        }
        navigate("/login");
      }
      catch(error) {
        console.log("Error in setting Instructor details", error);
        toast.error("Unable to set Details");
      }
      toast.dismiss(toastId);
    }
}