import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FiMail,
  FiArrowRight,
  FiLink,
} from "react-icons/fi";

import { forgotPassword } from "../api/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword(email);

      toast.success(
        "Password reset link sent to your email."
      );

      setEmail("");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Unable to send email"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex justify-center items-center p-8">

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-10">

        <div className="flex justify-center">

          <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex justify-center items-center">

            <FiLink size={36} />

          </div>

        </div>

        <h1 className="text-3xl font-bold text-center mt-6 text-slate-900 dark:text-white">

          Forgot Password

        </h1>

        <p className="text-center mt-2 text-slate-500 dark:text-slate-400">

          Enter your registered email.

        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div>

            <label className="font-medium text-slate-700 dark:text-slate-300">

              Email

            </label>

            <div className="relative mt-2">

              <FiMail className="absolute left-4 top-4 text-slate-400" />

              <input
                type="email"
                placeholder="john@gmail.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-600"
              />

            </div>

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 flex justify-center items-center gap-2"
          >

            {loading ? (
              "Sending..."
            ) : (
              <>
                Send Reset Link

                <FiArrowRight />

              </>
            )}

          </button>

        </form>

        <div className="mt-8 text-center">

          <Link
            to="/"
            className="text-blue-600 hover:underline"
          >

            Back to Login

          </Link>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;