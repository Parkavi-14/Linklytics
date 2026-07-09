import {
  FiLink,
  FiBarChart2,
  FiGlobe,
} from "react-icons/fi";

function WelcomeCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 transition-all">

      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

        {/* Left */}

        <div className="flex-1">

          <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1 text-sm font-semibold">

            Dashboard Overview

          </span>

          <h1 className="mt-5 text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">

            Welcome to Linklytics

          </h1>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-8">

            Create, manage and monitor all your shortened URLs
            from one modern dashboard.

          </p>

          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-8">

            Track clicks, generate QR codes, edit links,
            and analyze visitor activity in real time.

          </p>

        </div>

        {/* Right */}

        <div className="hidden lg:flex">

          <div className="w-40 h-40 rounded-3xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center">

            <FiLink
              className="text-blue-600"
              size={72}
            />

          </div>

        </div>

      </div>

      {/* Features */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        {/* Short Links */}

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6 transition hover:-translate-y-1 hover:shadow-lg">

          <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">

            <FiLink
              className="text-blue-600"
              size={28}
            />

          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">

            Short URLs

          </h3>

          <p className="mt-3 text-slate-600 dark:text-slate-400 leading-7">

            Create secure and memorable short links
            for websites, documents and campaigns.

          </p>

        </div>

        {/* Analytics */}

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6 transition hover:-translate-y-1 hover:shadow-lg">

          <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">

            <FiBarChart2
              className="text-green-600"
              size={28}
            />

          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">

            Analytics

          </h3>

          <p className="mt-3 text-slate-600 dark:text-slate-400 leading-7">

            Monitor clicks, visitor history,
            devices and performance using
            detailed analytics.

          </p>

        </div>

        {/* Public Sharing */}

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6 transition hover:-translate-y-1 hover:shadow-lg">

          <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">

            <FiGlobe
              className="text-purple-600"
              size={28}
            />

          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">

            Public Sharing

          </h3>

          <p className="mt-3 text-slate-600 dark:text-slate-400 leading-7">

            Share your links instantly and
            let anyone access them through
            a clean short URL.

          </p>

        </div>

      </div>

    </div>
  );
}

export default WelcomeCard;