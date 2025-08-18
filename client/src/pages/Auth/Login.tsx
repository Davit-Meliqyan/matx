/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../../store/useAuthStore";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { email, password } = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };

    if (!email) {
      return toast.warn("email field is empty");
    }

    if (!password) {
      return toast.warn("password field is empty");
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setUser({ user: data.user, token: data.token });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen bg-[#ffffff] dark:bg-[#1c1c1d] p-[16px] flex items-center justify-center">
      <div className="max-w-[570px] w-full rounded-2xl bg-[#ffffff] dark:bg-[#1c1c1d] py-10 px-5 shadow-[0_0_4px_0_#B5B5BE] flex flex-col items-center">
        <h1 className="text-[32px] text-[#000000] dark:text-[#E2E8F0] font-bold">
          SANE
        </h1>
        <p className="text-[20px] text-[#000000] dark:text-[#E2E8F0] mt-[10px]">
          Sign in to your account
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-[300px] w-full mt-[40px]"
        >
          <label className="w-full block">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="w-full h-[46px] p-3 bg-[#F5F5F5] rounded-[8px] !border !border-solid !border-[#E5E5E5]"
            />
          </label>
          <label className="w-full block mt-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="w-full h-[46px] p-[12px_28px_12px_12px] bg-[#F5F5F5] rounded-[8px] !border !border-solid !border-[#E5E5E5]"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-[33%]"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </label>

          <button className="w-full h-[50px] mt-8 flex items-center justify-center text-[#ffffff] bg-[#000000] dark:bg-[#33373D] p-[10px] rounded-lg">
            Sign In
          </button>
        </form>

        <p className="mt-5 flex gap-2 items-center text-[#000000] dark:text-[#ffffff]">
          Don't have an account?{" "}
          <Link to="/sign-up" className="font-bold text-lg">
            Sign up
          </Link>
        </p>
        <Link to={"/recovery"} className="text-red-600 mt-5 ml-auto">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
