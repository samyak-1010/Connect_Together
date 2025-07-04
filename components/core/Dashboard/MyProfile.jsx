import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"
import { useContext,useMemo,useEffect } from "react"
import { AppContext } from "../../../Context/AppContextProvider"
import App from "../../../App"
export default function MyProfile(){
  const { user } = useSelector((state) => state.profile)
const {socket}=useContext(AppContext);
  useMemo(()=>{socket.emit("join-room",user?._id);
console.log("room joined",user?._id)},[]);
useEffect(()=>{
socket.on("askdoubt",(msg)=>{
  console.log("ask doubt",msg);
});
socket.on("instructorreached",(msg)=>{
  console.log("instructorreached",msg);
});
},[])
  
  const navigate = useNavigate()
 

  return (

    <>
      <h1 className="mb-14 text-3xl font-medium text-indigo-600"> My Profile </h1>
        
      <div className="flex items-center justify-between rounded-md border-2 border-indigo-600 bg-indigo-200 p-8 px-12">
       
        <div className="flex items-center gap-x-4">
          <img src={user?.image} alt={`profile-${user?.firstName}`} className="aspect-square w-[78px] rounded-full object-cover"  />
          
          <div className="space-y-1">
            <p className="text-lg font-bold text-indigo-600"> {user?.firstName + " " + user?.lastName} </p>
            <p className="text-sm font-bold text-indigo-600">{user?.email}</p>
          </div>
        </div>
        <IconBtn text="Edit" onclick={() => {navigate("/dashboard/settings")}} >
          <RiEditBoxLine />
        </IconBtn>

      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-2 border-indigo-600 bg-indigo-200 p-8 px-12">
     
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn text="Edit" onclick={() => {navigate("/dashboard/settings")}}>
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p className={`font-semibold text-indigo-600 text-sm`} >
          {user?.profile?.about ?? "Write Something About Yourself"}
        </p>

      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-2 border-indigo-600 bg-indigo-200 p-8 px-12">
       
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5"> Personal Details </p>
          <IconBtn text="Edit" onclick={() => {navigate("/dashboard/settings")}} >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between">

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-bold text-indigo-600"> {user?.firstName} </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-bold text-indigo-600"> {user?.email} </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-bold text-indigo-600"> {user?.additionalDetails?.gender ?? "Add Gender"} </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-bold text-indigo-600"> {user?.lastName} </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-bold text-indigo-600"> {user?.additionalDetails?.contactNumber ?? "Add Contact Number"} </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-bold text-indigo-600">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??  "Add Date Of Birth"}   
              </p>
            </div>
          </div>
          
        </div>

      </div>

    </>
  
)}