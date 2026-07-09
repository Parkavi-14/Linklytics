import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  FiLink,
  FiArrowRight,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
} from "react-icons/fi";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const response = await loginUser(formData);

      login(response.token, response.user);

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950 transition-colors">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-linear-to-br from-blue-700 via-indigo-700 to-slate-900 text-white">

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex flex-col justify-center px-20">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex justify-center items-center">

              <FiLink size={34} />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                Linklytics

              </h1>

              <p className="text-blue-200 mt-2">

                Smart URL Management

              </p>

            </div>

          </div>

          <h2 className="text-5xl font-bold leading-tight mt-14">

            Shorten.
            <br />
            Track.
            <br />
            Grow.

          </h2>

          <p className="mt-8 text-xl text-blue-100 leading-9 max-w-xl">

            Create branded short URLs, generate QR codes,
            monitor analytics, and manage all your links
            from one beautiful dashboard.

          </p>

          <div className="mt-16 space-y-5">

            {[
              "Unlimited URL Shortening",
              "Real-Time Analytics",
              "QR Code Generation",
              "Public Statistics",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl px-6 py-5"
              >

                <FiCheckCircle className="text-green-300" />

                <span className="text-lg">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </div>

      </div>
      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-950 transition-colors">

        <div className="w-full max-w-md">

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl p-10">

            {/* Logo */}

            <div className="flex justify-center">

              <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">

                <FiLink size={38} />

              </div>

            </div>

            {/* Title */}

            <div className="text-center mt-6">

              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">

                Welcome Back

              </h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">

                Sign in to your Linklytics account

              </p>

            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 space-y-6"
            >

              {/* Email */}

              <div>

                <label className="font-medium text-slate-700 dark:text-slate-300">

                  Email Address

                </label>

                <div className="relative mt-2">

                  <FiMail
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />

                  <input
                    type="email"
                    placeholder="john@gmail.com"

                    {...register("email", {
                      required: "Email is required",

                      pattern: {
                        value:
                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

                        message:
                          "Please enter a valid email",
                      },
                    })}

                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    dark:border-slate-700
                    bg-white
                    dark:bg-slate-800
                    text-slate-900
                    dark:text-white
                    pl-12
                    pr-4
                    py-3
                    outline-none
                    focus:border-blue-600
                  "
                  />

                </div>

                {errors.email && (

                  <p className="text-red-500 text-sm mt-2">

                    {errors.email.message}

                  </p>

                )}

              </div>

              {/* Password */}

              <div>

                <label className="font-medium text-slate-700 dark:text-slate-300">

                  Password

                </label>

                <div className="relative mt-2">

                  <FiLock
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }

                    placeholder="••••••••"

                    {...register("password", {
                      required:
                        "Password is required",

                      minLength: {
                        value: 6,

                        message:
                          "Minimum 6 characters",
                      },
                    })}

                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    dark:border-slate-700
                    bg-white
                    dark:bg-slate-800
                    text-slate-900
                    dark:text-white
                    pl-12
                    pr-12
                    py-3
                    outline-none
                    focus:border-blue-600
                  "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }

                    className="
                      absolute
                      right-4
                      top-4
                      text-slate-500
                      hover:text-blue-600
                    "
                  >

                    {showPassword ? (

                      <FiEyeOff />

                    ) : (

                      <FiEye />

                    )}

                  </button>

                </div>

                {errors.password && (

                  <p className="text-red-500 text-sm mt-2">

                    {errors.password.message}

                  </p>

                )}

              </div>

              {/* Remember */}

              <div className="flex justify-between items-center">

                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() =>
                      setRemember(!remember)
                    }
                  />

                  Remember Me

                </label>

                <Link
                  to="/forgot-password"
                  className="text-blue-600 text-sm hover:underline"
                >

                  Forgot Password?

                </Link>

              </div>

              {/* Button */}

              <button
                disabled={loading}
                type="submit"
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:bg-blue-400
                  text-white
                  py-3
                  rounded-xl
                  font-semibold
                  flex
                  justify-center
                  items-center
                  gap-2
                  transition
                "
              >

                {loading ? (

                  "Signing In..."

                ) : (

                  <>
                    Login

                    <FiArrowRight />
                  </>

                )}

              </button>

            </form>

            <div className="mt-8 text-center text-slate-600 dark:text-slate-400">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 text-blue-600 font-semibold hover:underline"
              >

                Register

              </Link>

            </div>

          </div>

        </div>

      </div>

     </div>
  );
}
export default Login;