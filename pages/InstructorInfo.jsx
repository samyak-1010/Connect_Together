import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import axios from 'axios';
import { useDispatch } from "react-redux";
import {instructorInfo} from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

// import useSelector
function InstructorInfo(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }, } = useForm();
    const {userId}=useSelector((state)=>state.auth);
    function submitData(data){
        const std = [];
  
    for (const key in data) {
        if(key=="subjectSpecification")
            continue;
        if (data.hasOwnProperty(key) && data[key]) {
        std.push(data[key]);
        }
    }
    try{
        dispatch(instructorInfo(userId,data.subjectSpecification,std,navigate));
    }catch(err){
        console.log(err);
    }
    }
    return(
        <div className="customBoxShadow min-h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(submitData)} className="w-[400px] subCustomBoxShadow flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                    <label htmlFor="Standard" className="lable-style">Subject Specification</label>
                    <input  type="text"  name="Standard"  id="Standard" placeholder="Enter your subject specification" className="form-style"  {...register("subjectSpecification", { required: true })} />           
                    {errors.std && ( <span className="-mt-1 text-[12px] text-yellow-100">  Please enter your standard. </span> )}
                    </div>
                    <div className="grid grid-cols-2 ">
                    <div className="flex flex-row gap-2">
                    <label htmlFor="NUR" className="label-style">NUR</label>
                    <input type="checkbox" name="std"  id="nur" value="nur" {...register("nur")}></input>
                    </div>
                    <div className="flex flex-row gap-2">
                    <label htmlFor="LKG" className="label-style">LKG</label>
                    <input type="checkbox" name="std"  id="lkg" value="lkg" {...register("lkg")}></input>
                    </div>
                    <div className="flex flex-row  gap-2">
                    <label htmlFor="UKG" className="label-style">UKG</label>
                    <input type="checkbox" name="std"  id="ukg" value="ukg" {...register("ukg")}></input>
                    </div>
                    <div className="flex flex-row gap-2">
                    <label htmlFor="one" className="label-style">1</label>
                    <input type="checkbox" name="std"  id="one" value="1" {...register("1")}></input>
                    </div>
                    <div className="flex flex-row  gap-2">
                    <label htmlFor="eleventh" className="label-style">2</label>
                    <input type="checkbox" name="std"  id="eleventh" value="2" {...register("2")}></input>
                    </div>
                    <div className="flex flex-row gap-2">
                    <label htmlFor="eleventh" className="label-style">3</label>
                    <input type="checkbox" name="std"  id="eleventh" value="3" {...register("3")}></input>
                    </div>
                    <div className="flex flex-row gap-2">
                    <label htmlFor="eleventh" className="label-style">4</label>
                    <input type="checkbox" name="std"  id="eleventh" value="4" {...register("4")}></input>
                    </div>
                    <div className="flex flex-row gap-2">
                    <label htmlFor="eleventh" className="label-style">5</label>
                    <input type="checkbox" name="std"  id="eleventh" value="5" {...register("5")}></input>
                    </div>
                    </div>
                    <button  className="commonButton" type="submit">Submit Details</button>
            </form>

        </div>
    )
};
export default InstructorInfo;