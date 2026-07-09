import {
  FiClock,
  FiLink,
  FiMousePointer,
  FiArrowRight,
} from "react-icons/fi";

import { Link } from "react-router-dom";

function RecentActivity({ urls = [] }) {
  const recentUrls = [...urls]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm h-full transition-colors">

      {/* Header */}

      <div className="flex justify-between items-center px-6 py-5 border-b border-slate-200 dark:border-slate-700">

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Recent Activity
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Latest shortened links
          </p>

        </div>

        <Link
          to="/analytics"
          className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-medium"
        >
          View All

          <FiArrowRight />
        </Link>

      </div>

      {/* Empty */}

      {recentUrls.length === 0 ? (

        <div className="h-80 flex flex-col justify-center items-center">

          <FiLink
            size={55}
            className="text-slate-300 dark:text-slate-600"
          />

          <p className="mt-5 text-lg text-slate-500 dark:text-slate-400">
            No recent activity
          </p>

        </div>

      ) : (

        <div className="divide-y divide-slate-200 dark:divide-slate-700">

          {recentUrls.map((url) => (

            <div
              key={url._id}
              className="flex justify-between items-center p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >

              {/* Left */}

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex justify-center items-center">

                  <FiLink
                    size={22}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-slate-900 dark:text-white truncate max-w-sm">

                    {url.originalUrl}

                  </h3>

                  <div className="flex flex-wrap items-center gap-5 mt-2 text-sm text-slate-500 dark:text-slate-400">

                    <span className="flex items-center gap-2">

                      <FiClock />

                      {new Date(
                        url.createdAt
                      ).toLocaleDateString()}

                    </span>

                    <span className="flex items-center gap-2">

                      <FiMousePointer />

                      {url.totalClicks} Clicks

                    </span>

                  </div>

                </div>

              </div>

              {/* Right */}

              <div>

                {url.isExpired ? (

                  <span className="px-3 py-2 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-sm font-semibold">

                    Expired

                  </span>

                ) : (

                  <span className="px-3 py-2 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm font-semibold">

                    Active

                  </span>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default RecentActivity;