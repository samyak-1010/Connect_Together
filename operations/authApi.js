import toast from 'react-hot-toast';
import {setLoading, setToken} from '../../slices/authSlice'
import { setUser } from '../../slices/profileSlice';


export function sendOtp(email,navigate){
  return async(dispatch)=>{
    try{
      dispatch(setLoading(true));
      const response=await fetch(`${process.env.REACT_APP_BASE_URL}/auth/sendotp`,{
         method:"POST",
         headers:{
          'Content-Type':'application/json'
         },
         body:JSON.stringify({email})
      })
      const result=await response.json();
      console.log("Result: ",result);
      if(result.success){
         toast.success("OTP send successfully")
         navigate('/verify-email')
      }
      if(!result.success){
        console.log("Message: ",result.message);
        toast.error(result.message);
        navigate('/signup')
      }

    }catch(error){
      console.log("Failed to send OTP: ",error);
      toast.error("Failed to send otp")
    }
    dispatch(setLoading(false));
  }
}

export function signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate){
  return async(dispatch)=>{
    try{
         dispatch(setLoading(true));
         const response=await fetch(`${process.env.REACT_APP_BASE_URL}/auth/signup`,{
             method:"POST",
             headers:{
              'Content-Type':'application/json'
             },
             body:JSON.stringify({firstName,lastName,email,password,confirmPassword,accountType,otp})
         })
         const result=await response.json();
         console.log("Signup result: ",result);
         if(result.success){
           toast.success("SignUp Successfull");
           navigate("/login");
         }
         if(!result.success){
          toast.error("Failed to SignUp")
         }
    }catch(error){
         console.log("Error during signup: ",error);
    }
    dispatch(setLoading(false));
  }
}

export function login(email,password,navigate){
     return async(dispatch)=>{
          try{
            setLoading(true);
            const response=await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`,{
              method:"POST",
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({email,password}),
              credentials:'include'
              
            })
            const result=await response.json();
            console.log("Result: ",result);
            if(result.success){
              toast.success("Login Successfull")
              dispatch(setToken(result.token));
              dispatch(setUser(result.user));
              localStorage.setItem("token",JSON.stringify(result.token));
              localStorage.setItem("user",JSON.stringify(result.user));
              navigate("/");
            }
            if(!result.success){
              toast.error("Failed to login");
            }
            
          }catch(error){
              console.log("Error during login: ",error);
              toast.error("Login failed");
          }
          dispatch(setLoading(false));
     }
}

export function logout(navigate){
  return async(dispatch)=>{
       setLoading(true);
       dispatch(setToken(null));
       dispatch(setUser(null));
       localStorage.removeItem("token");
       localStorage.removeItem("user");
       toast.success("Logout successfull");
       navigate("/");
  }
}


export function getResetPasswordToken(email,setEmailSent){
    return async(dispatch)=>{
           try{
              dispatch(setLoading(true));
              console.log(email);
              const response=await fetch(`${process.env.REACT_APP_BASE_URL}/auth/reset-password-token`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email})

              })
              const data=await response.json();
              if(!data.success){
                console.log("Can not post email in reset password token")
                toast.warning("Failed to send Email")
              }
              else{
                setEmailSent(true);
                toast.success("Email send successfully")
              }
           }catch(error){
              console.log("Error in sending email for reset password: ",error)
           }
           dispatch(setLoading(false));
    }
}

export function resetPassword(password,confirmPassword,token){
  return async(dispatch)=>{
         try{
              console.log(password)
              dispatch(setLoading(true));
              const response=await fetch(`${process.env.REACT_APP_BASE_URL}/auth/reset-password`,{
                method:"POST",
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify({password,confirmPassword,token})
              })
              const result=await response.json();
              console.log("result: ",result)
              if(!result.success){
                console.log("Cannot reset password")
                toast.warning("Error in reset password")
              }
              else{
                toast.success("Password reset successfully")
              }
              console.log("Result:",result)
         }catch(error){
              console.log("Error in reseting password: ",error);
         }
         dispatch(setLoading(false));
  }
}