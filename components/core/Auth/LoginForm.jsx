import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  function handleOnChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  }

  // Autofill login credentials for student & instructor
  function fillCredentials(role) {
    if (role === "student") {
      setFormData({
        email: "112215153@cse.iiitp.ac.in",
        password: "123",
      });
    } else if (role === "instructor") {
      setFormData({
        email: "suyashrajpoot01@gmail.com",
        password: "123",
      });
    }
  }

  return (
    <div className="subCustomBoxShadow">
      <form onSubmit={handleOnSubmit} className="flex flex-col w-full gap-y-4 mt-6">
        <label className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            name="email"
            style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-2 border-[#999999]"
          />
        </label>

        <label className="relative">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            name="password"
            style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-2 border-[#999999]"
          />
          <span
            className="absolute right-3 top-[38px] cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <Link to="/forgot-password">
            <p className="text-xs mt-1 text-[rgba(18,83,191,1)] font-bold max-w-max ml-auto">
              Forgot Password
            </p>
          </Link>
        </label>

        {/* New Quick Login Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => fillCredentials("student")}
          >
            Demo Login (Student)
          </button>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => fillCredentials("instructor")}
          >
            Demo Login (Instructor)
          </button>
        </div>

        <button className="bg-indigo-600 rounded-[8px] font-bold text-white px-[12px] py-[8px] mt-6">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
