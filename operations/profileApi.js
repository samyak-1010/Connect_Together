import toast from "react-hot-toast";





export async function getUserEnrolledCourses(token){
       let result=[]
       try{
        const response=await fetch(`${process.env.REACT_APP_BASE_URL}/profile/getEnrolledCourses`,{
             method:"GET",
             headers:{
                "Content-Type":"application/json"
             }
        })
        
        const res=await response.json();
        if(res.success){
           result=res.data;
        }     
       }catch(error){
          console.log("Error in fetching courses: ",error);
          toast.error("Can not fetch courses")
       }
       return result;
}