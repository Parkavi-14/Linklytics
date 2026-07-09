import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  FiArrowRight,
  FiLink,
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
} from "react-icons/fi";

import { registerUser } from "../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success(
        "Account created successfully!"
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getPasswordStrength();
  return (

<div className="min-h-screen flex bg-slate-100 dark:bg-slate-950 transition-colors">
{/* Left */}

<div className="hidden lg:flex w-1/2 bg-linear-to-br from-blue-700 via-indigo-700 to-slate-900 text-white">

  <div className="flex flex-col justify-center px-20 w-full">

    <div className="flex items-center gap-5">

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

    <h2 className="text-5xl font-bold mt-14 leading-tight">

      Join the future
      <br />

      of URL
      <br />

      Management

    </h2>

    <p className="mt-8 text-xl text-blue-100 leading-9 max-w-xl">

      Create beautiful short links,
      monitor analytics,
      generate QR Codes,
      and manage everything
      from one dashboard.

    </p>

    <div className="mt-14 space-y-5">

      {[
        "Unlimited URL Shortening",
        "Real-Time Analytics",
        "QR Code Generation",
        "Custom Aliases",
      ].map((item) => (

        <div
          key={item}
          className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10 flex items-center gap-4"
        >

          <FiCheckCircle className="text-green-300" />

          <span>

            {item}

          </span>

        </div>

      ))}

    </div>

  </div>

</div>
{/* Right */}

<div className="flex-1 flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-950">

  <div className="w-full max-w-md">

    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl p-10">

      {/* Logo */}

      <div className="flex justify-center">

        <div className="w-20 h-20 rounded-2xl bg-blue-600 flex justify-center items-center text-white shadow-lg">

          <FiLink size={36} />

        </div>

      </div>

      {/* Heading */}

      <div className="text-center mt-6">

        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">

          Create Account

        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">

          Start managing your URLs today

        </p>

      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-10"
      >
      <div>

      <label className="font-medium text-slate-700 dark:text-slate-300">

      Full Name

      </label>

      <div className="relative mt-2">

      <FiUser
      className="absolute left-4 top-4 text-slate-400"
      />

      <input

      placeholder="John Doe"

      {...register("name",{
      required:"Name is required",
      minLength:{
      value:3,
      message:"Minimum 3 characters"
      }
      })}

      className="
      w-full
      pl-12
      pr-4
      py-3
      rounded-xl
      border
      border-slate-300
      dark:border-slate-700
      bg-white
      dark:bg-slate-800
      text-slate-900
      dark:text-white
      outline-none
      focus:border-blue-600
      "
      />

      </div>

      {errors.name&&(

      <p className="text-red-500 text-sm mt-2">

      {errors.name.message}

      </p>

      )}

      </div>
      <div>

<label className="font-medium text-slate-700 dark:text-slate-300">

Email Address

</label>

<div className="relative mt-2">

<FiMail
className="absolute left-4 top-4 text-slate-400"
/>

<input

type="email"

placeholder="john@gmail.com"

{...register("email",{

required:"Email is required",

pattern:{

value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

message:"Please enter a valid email"

}

})}

className="
w-full
pl-12
pr-4
py-3
rounded-xl
border
border-slate-300
dark:border-slate-700
bg-white
dark:bg-slate-800
text-slate-900
dark:text-white
outline-none
focus:border-blue-600
"
/>

</div>

{errors.email&&(

<p className="text-red-500 text-sm mt-2">

{errors.email.message}

</p>

)}

</div>
<div>

<label className="font-medium text-slate-700 dark:text-slate-300">

Password

</label>

<div className="relative mt-2">

<FiLock
className="absolute left-4 top-4 text-slate-400"
/>

<input

type={showPassword?"text":"password"}

placeholder="Create password"

{...register("password",{

required:"Password is required",

minLength:{

value:8,

message:"Minimum 8 characters"

}

})}

className="
w-full
pl-12
pr-12
py-3
rounded-xl
border
border-slate-300
dark:border-slate-700
bg-white
dark:bg-slate-800
text-slate-900
dark:text-white
outline-none
focus:border-blue-600
"
/>

<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="absolute right-4 top-4 text-slate-500 hover:text-blue-600"

>

{showPassword?<FiEyeOff/>:<FiEye/>}

</button>

</div>

{errors.password&&(

<p className="text-red-500 text-sm mt-2">

{errors.password.message}

</p>

)}
<div className="mt-3">

<div className="flex gap-2">

{[1,2,3,4].map((item)=>(

<div

key={item}

className={`h-2 flex-1 rounded-full

${strength>=item

?strength===1

?"bg-red-500"

:strength===2

?"bg-orange-500"

:strength===3

?"bg-yellow-500"

:"bg-green-500"

:"bg-slate-200 dark:bg-slate-700"

}`}

/>

))}

</div>

<p className="mt-2 text-sm text-slate-500 dark:text-slate-400">

{strength===0&&"Weak"}

{strength===1&&"Weak"}

{strength===2&&"Fair"}

{strength===3&&"Good"}

{strength===4&&"Strong"}

</p>

</div>

</div>
<div>

<label className="font-medium text-slate-700 dark:text-slate-300">

Confirm Password

</label>

<div className="relative mt-2">

<FiLock
className="absolute left-4 top-4 text-slate-400"
/>

<input

type={showConfirmPassword?"text":"password"}

placeholder="Confirm password"

{...register("confirmPassword",{

validate:value=>

value===watch("password")||

"Passwords do not match"

})}

className="
w-full
pl-12
pr-12
py-3
rounded-xl
border
border-slate-300
dark:border-slate-700
bg-white
dark:bg-slate-800
text-slate-900
dark:text-white
outline-none
focus:border-blue-600
"
/>

<button

type="button"

onClick={()=>setShowConfirmPassword(!showConfirmPassword)}

className="absolute right-4 top-4 text-slate-500 hover:text-blue-600"

>

{showConfirmPassword?<FiEyeOff/>:<FiEye/>}

</button>

</div>

{errors.confirmPassword&&(

<p className="text-red-500 text-sm mt-2">

{errors.confirmPassword.message}

</p>

)}

</div>
<button

type="submit"

disabled={loading}

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

{loading?(
"Creating Account..."
):(
<>
Create Account
<FiArrowRight/>
</>
)}

</button>
<div className="mt-8 text-center text-slate-600 dark:text-slate-400">

Already have an account?

<Link

to="/"

className="ml-2 text-blue-600 font-semibold hover:underline"

>

Login

</Link>

</div>

</form>

</div>

</div>

</div>

</div>

);
}

export default Register;
