import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { studentInfo } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
// import useSelector
function StudentInfo(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }, } = useForm();
    const {userId}=useSelector((state)=>state.auth);
    function submitData(data){
        try{
            dispatch(studentInfo(userId,data.std,data.field,data.rollnumber,navigate)); 
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="customBoxShadow min-h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(submitData)} className="w-[400px] subCustomBoxShadow flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                    <label htmlFor="Standard" className="lable-style">Standard</label>
                    <input  type="text"  name="Standard"  id="Standard" placeholder="Enter your standard" className="form-style"  {...register("std", { required: true })} />           
                    {errors.std && ( <span className="-mt-1 text-[12px] text-yellow-100">  Please enter your standard. </span> )}
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="rollnumber" className="lable-style">Roll Number</label>
                    <input  type="text"  name="Standard"  id="rollnumber" placeholder="Enter student Roll Number" className="form-style"  {...register("rollnumber", { required: true })} />           
                    {errors.std && ( <span className="-mt-1 text-[12px] text-yellow-100">  Please enter student Roll Number. </span> )}
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="Field" className="lable-style"> Field </label>
                    <select  name="Field"  id="Field" className="form-style" placeholder=" Select Your Standard" {...register("field", { required: true })}>
                         <option value="School Student">School Student</option>
                         
                    </select>           
                    {errors.std && ( <span className="-mt-1 text-[12px] text-yellow-100">  Please enter your standard. </span> )}
                    </div>
                    <button  className="commonButton" type="submit">Submit Details</button>
            </form>

        </div>
    )
};
export default StudentInfo