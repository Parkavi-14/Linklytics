import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"; 

// Import your ThemeContext to detect current theme state
import { ThemeContext } from "../context/ThemeContext";

import { getAnalytics } from "../api/analyticsApi";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  FiMousePointer,
  FiClock,
  FiActivity,
  FiLink,
  FiTrendingUp,
} from "react-icons/fi";

function Analytics() {
  const { id } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consume your existing theme context
  const { theme } = useContext(ThemeContext);

  // Determine colors dynamically for Recharts based on theme state
  const isDark = theme === "dark";
  const gridColor = isDark ? "#334155" : "#E2E8F0"; // slate-700 vs slate-200
  const tickColor = isDark ? "#94A3B8" : "#64748B"; // slate-400 vs slate-500

  useEffect(() => {
    if (id) {
      loadAnalytics();
    }
  }, [id]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAnalytics(id);
      
      // ✨ THE CRITICAL FIX: Safe extraction layer checks both unwrapped object and nested structures cleanly
      if (data && data.shortCode) {
        setAnalytics(data); // Already unwrapped by API helper
      } else if (data && data.data) {
        setAnalytics(data.data); // Fallback for raw Axios payloads
      } else {
        setAnalytics(null);
      }
    } catch (err) {
      console.error("Error reading analytics route context:", err);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50 dark:bg-[#0B1120]">
        <h2 className="text-3xl font-bold text-slate-700 dark:text-white">
          Loading Analytics...
        </h2>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-[#0B1120] p-6 text-center">
        <h2 className="text-3xl font-bold text-slate-700 dark:text-white">
          Analytics Not Found
        </h2>
        <p className="mt-2 text-slate-400 text-sm max-w-xs">
          Unable to pull metrics for this database ID record. Ensure your Render backend is live.
        </p>
        <Link to="/analytics" className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition">
          Back to List
        </Link>
      </div>
    );
  }

  const recentVisits = analytics.recentVisits || [];

  const chartData = recentVisits.map((visit, index) => ({
    visit: `#${index + 1}`,
    clicks: index + 1,
  }));

  const isLocalHost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const shortUrl = isLocalHost
    ? `http://localhost:5000/api/url/${analytics.shortCode}`
    : `https://linklytics-4r2v.onrender.com/api/url/${analytics.shortCode}`;

  return (
    <div className="h-screen flex bg-slate-50 dark:bg-[#0B1120] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto flex flex-col pt-20 md:pt-0 bg-slate-50 dark:bg-[#0B1120]">
          <div className="flex-1 max-w-[1550px] w-full mx-auto px-6 py-5 space-y-5">
            {/* Hero */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md px-8 py-7">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Analytics Dashboard
              </h1>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Monitor clicks, visitor activity and performance of your
                shortened URL.
              </p>
            </div>

            {/* URL Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FiLink size={20} className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Short URL
                    </p>

                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline font-semibold break-all"
                    >
                      {shortUrl}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
              {/* Total Clicks */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Total Clicks
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-blue-600">
                      {analytics.totalClicks || 0}
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FiMousePointer size={22} className="text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Last Visit */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Last Visit
                    </p>

                    <h3 className="text-base font-semibold mt-3 text-slate-900 dark:text-white">
                      {analytics.lastVisited
                        ? new Date(analytics.lastVisited).toLocaleString()
                        : "Never"}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <FiClock size={22} className="text-amber-600" />
                  </div>
                </div>
              </div>

              {/* Visits */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Recent Visits
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-purple-600">
                      {recentVisits.length}
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <FiActivity size={22} className="text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Performance
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-emerald-600">
                      100%
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <FiTrendingUp size={22} className="text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Click Analytics Trend Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Click Trend
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Recent click activity over time
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-sm font-medium">
                    Live
                  </span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="analyticsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#2563EB"
                        stopOpacity={0.35}
                      />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

                  <XAxis
                    dataKey="visit"
                    tick={{
                      fill: tickColor,
                    }}
                  />

                  <YAxis
                    tick={{
                      fill: tickColor,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="#2563EB"
                    strokeWidth={3}
                    fill="url(#analyticsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Visit History Log Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Visit History
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Complete list of recent visitors
                  </p>
                </div>

                <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {recentVisits.length}
                  </span>
                  <span className="ml-2 text-slate-500 dark:text-slate-400">
                    Records
                  </span>
                </div>
              </div>

              {recentVisits.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center">
                  <FiActivity
                    size={48}
                    className="text-slate-300 dark:text-slate-700"
                  />
                  <h3 className="mt-5 text-2xl font-bold text-slate-700 dark:text-slate-300">
                    No Visits Yet
                  </h3>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Visitor history will appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                          #
                        </th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                          Visit Time
                        </th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                          IP Address
                        </th>
                        <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                          Browser
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentVisits.map((visit, index) => (
                        <tr
                          key={visit._id || index}
                          className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                        >
                          <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                            {index + 1}
                          </td>

                          <td className="px-6 py-4 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                            {new Date(visit.visitedAt || visit.createdAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>

                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                              {visit.ip || "0.0.0.0"}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-slate-600 dark:text-slate-300 break-all">
                            {visit.userAgent || "Unknown User Agent"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Analytics;