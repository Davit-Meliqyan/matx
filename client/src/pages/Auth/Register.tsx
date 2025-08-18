/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { fullName, email, password, c_password } = Object.fromEntries(
      formData
    ) as {
      fullName: string;
      email: string;
      password: string;
      c_password: string;
    };

    if (!fullName) {
      return toast.warn("username fields are empty");
    }

    if (!email) {
      return toast.warn("email fields are empty");
    }

    if (!password || !c_password) {
      return toast.warn("password fields are empty");
    }

    if (password !== c_password) {
      return toast.warn("The passwords do not match");
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/");
      }
      
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="h-screen bg-[#ffffff] dark:bg-[#1c1c1d] p-[16px] flex items-center justify-center">
      <div className="max-w-[570px] w-full rounded-2xl bg-[#ffffff] dark:bg-[#1c1c1d] py-10 px-5 shadow-[0_0_4px_0_#B5B5BE] flex flex-col items-center">
        <h1 className="text-[32px] text-[#000000] dark:text-[#E2E8F0] font-bold">
          SANE
        </h1>
        <p className="text-[20px] text-[#000000] dark:text-[#E2E8F0] mt-[10px]">
          Sign Up to your account
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-[300px] w-full mt-[40px]"
        >
          <label className="w-full block">
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              className="w-full h-40px p-3 bg-[#F5F5F5] rounded-[8px] !border !border-solid !border-[#E5E5E5]"
            />
          </label>
          <label className="w-full block mt-4">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="w-full h-40px p-3 bg-[#F5F5F5] rounded-[8px] !border !border-solid !border-[#E5E5E5]"
            />
          </label>
          <label className="w-full block mt-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="w-full h-40px p-[12px_28px_12px_12px] bg-[#F5F5F5] rounded-[8px] !border !border-solid !border-[#E5E5E5]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-[33%]"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </label>
          <label className="w-full block mt-4 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="c_password"
              className="w-full h-40px p-[12px_28px_12px_12px] bg-[#F5F5F5] rounded-[8px] !border !border-solid !border-[#E5E5E5]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-[33%]"
            >
              {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </label>

          <button className="w-full h-[50px] mt-8 flex items-center justify-center text-[#ffffff] bg-[#000000] dark:bg-[#33373D] p-[10px] rounded-lg">
            Sign Up
          </button>
        </form>

        <p className="mt-5 flex gap-2 items-center text-[#000000] dark:text-[#ffffff]">
          You have an account?
          <Link to="/sign-in" className="font-bold text-lg">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
