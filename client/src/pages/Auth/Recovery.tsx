/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Recovery() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [tokenFind, setTokenFind] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      setTokenFind(true);
      setToken(token);
    } else {
      setTokenFind(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, newPassword, c_password } = Object.fromEntries(formData) as {
      email: string;
      newPassword: string;
      c_password: string;
    };    

    if (tokenFind) {
      if (!newPassword || !c_password) {
        return toast.warn("password fields are empty");
      }

      if (newPassword !== c_password) {
        return toast.warn("The passwords do not match");
      }
    } else {
      if (!email) {
        return toast.warn("email fields are empty");
      }
    }

    try {

      if (tokenFind && token) {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        });

        const data = await res.json();

        if (data.success === false) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          navigate("/");
        }
      } else {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Error sending email");
        } else {
          toast.success("A letter with a link has been sent to your email");
        }
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
          Forgot your password?
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-[300px] w-full mt-[40px]"
        >
          <label className="w-full block">
            <input
              disabled={tokenFind}
              type="text"
              placeholder="Email"
              name="email"
              className={`w-full h-40px p-3 rounded-[8px] !border !border-solid !border-[#E5E5E5] ${tokenFind ? 'bg-[#504f4f]' : 'bg-[#F5F5F5]'}`}
            />
          </label>
          <label className="w-full block mt-4 relative">
            <input
              disabled={!tokenFind}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="newPassword"
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
              disabled={!tokenFind}
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
            Recovery
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
