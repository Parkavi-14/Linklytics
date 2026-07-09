import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import QRCode from "react-qr-code";
import toast from "react-hot-toast";

import {
  FiExternalLink,
  FiLink,
  FiMousePointer,
  FiClock,
  FiSearch,
  FiBarChart2,
} from "react-icons/fi";

import { getPublicStats } from "../api/publicApi";
import { useTheme } from "../context/ThemeContext";

// Directly importing your structural sub-layout components
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function PublicStats() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputCode, setInputCode] = useState("");

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const gridColor = isDark ? "#334155" : "#E2E8F0"; 
  const tickColor = isDark ? "#94A3B8" : "#64748B";

  useEffect(() => {
    if (shortCode) {
      loadStats();
    } else {
      setStats(null);
    }
  }, [shortCode]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getPublicStats(shortCode);
      setStats(data);
    } catch (err) {
      toast.error("Unable to find statistics for this short code");
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      toast.error("Please enter a short code");
      return;
    }
    navigate(`/public/${inputCode.trim()}`);
  };

  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // --- RENDERING LANDING SEARCH LOOKUP VIEW ---
  if (!shortCode) {
    return (
      <div className="h-screen flex bg-slate-50 dark:bg-[#020617] overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto flex flex-col bg-slate-50 dark:bg-[#020617]">
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-6">
              <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-6">
                  <FiBarChart2 size={32} />
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Public Statistics
                </h1>
                
                <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
                  Enter a shortened URL code below to see total click analytics, creation dates, and trends.
                </p>

                <form onSubmit={handleSearchSubmit} className="mt-6 space-y-4">
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. abc123"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-200 flex items-center justify-center gap-2"
                  >
                    <FiBarChart2 />
                    View Insights
                  </button>
                </form>
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    );
  }

  // --- RENDERING LOADING STATE ---
  if (loading) {
    return (
      <div className="h-screen flex bg-slate-50 dark:bg-[#020617] overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto flex flex-col justify-center items-center bg-slate-50 dark:bg-[#020617]">
            <h2 className="text-3xl font-bold text-slate-700 dark:text-white animate-pulse">
              Loading Statistics...
            </h2>
          </main>
        </div>
      </div>
    );
  }

  // --- RENDERING ERROR STATE ---
  if (!stats) {
    return (
      <div className="h-screen flex bg-slate-50 dark:bg-[#020617] overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto flex flex-col justify-center items-center bg-slate-50 dark:bg-[#020617] px-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Statistics Not Found
            </h2>
            <button
              onClick={() => navigate("/public")}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition"
            >
              Go Back to Search
            </button>
          </main>
        </div>
      </div>
    );
  }

  const shortUrl = `${BASE_URL}/api/url/${stats.shortCode}`;
  const chartData = (stats.recentVisits || []).map((visit, index) => ({
    visit: `Visit ${index + 1}`,
    clicks: index + 1,
  }));

  // --- RENDERING FULL STATS CONTENT PAGE ---
  return (
    <div className="h-screen flex bg-slate-50 dark:bg-[#020617] overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto flex flex-col bg-slate-50 dark:bg-[#020617]">
          <div className="flex-1 max-w-[1550px] w-full mx-auto px-6 py-6 space-y-6">
            
            {/* Hero */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Public URL Statistics
                </h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  Public performance insights tracking live metrics.
                </p>
              </div>
              <button
                onClick={() => navigate("/public")}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition text-sm"
              >
                Lookup Another Link
              </button>
            </div>

            {/* Cards */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Clicks */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-7">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Total Clicks</p>
                    <h2 className="text-4xl font-bold mt-3 text-blue-600">{stats.totalClicks || 0}</h2>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FiMousePointer size={28} className="text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Short URL */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-7">
                <div className="flex justify-between items-center">
                  <div className="truncate pr-4 flex-1">
                    <p className="text-slate-500 dark:text-slate-400">Short URL</p>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline break-all font-semibold"
                    >
                      {stats.shortCode}
                      <FiExternalLink className="shrink-0" />
                    </a>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                    <FiLink size={28} className="text-green-600" />
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex flex-col items-center justify-center">
                <div className="p-2 bg-white rounded-xl border border-slate-100">
                  <QRCode value={shortUrl} size={90} />
                </div>
                <p className="mt-2 font-medium text-slate-500 dark:text-slate-400 text-xs">Scan QR Code</p>
              </div>
            </div>

            {/* Original URL */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <FiExternalLink className="text-blue-600" size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Original URL</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Destination Target Website</p>
                </div>
              </div>
              <a
                href={stats.originalUrl}
                target="_blank"
                rel="noreferrer"
                className="break-all text-blue-600 dark:text-blue-400 hover:underline text-lg font-medium"
              >
                {stats.originalUrl}
              </a>
            </div>

            {/* Click Trend */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <FiMousePointer className="text-emerald-600" size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Click Trend</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Recent visitor timeline activity</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="clickGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="visit" tick={{ fill: tickColor }} />
                  <YAxis tick={{ fill: tickColor }} />
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
                    stroke="#2563eb"
                    strokeWidth={3}
                    fill="url(#clickGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Visit History */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-8 py-6 border-b border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <FiClock size={22} className="text-violet-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Visit History</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Chronological log of traffic visits</p>
                </div>
              </div>

              {!chartData.length ? (
                <div className="py-20 text-center">
                  <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">No Visits Yet</h3>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">This URL hasn't tracked interaction clicks yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                      <tr className="text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left px-6 py-4">#</th>
                        <th className="text-left px-6 py-4">Date</th>
                        <th className="text-left px-6 py-4">IP Address</th>
                        <th className="text-left px-6 py-4">Browser / Client</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(stats.recentVisVisits || stats.recentVisVisits || stats.recentVisits || []).map((visit, index) => (
                        <tr
                          key={visit._id || index}
                          className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                        >
                          <td className="px-6 py-5 font-semibold text-slate-900 dark:text-white">{index + 1}</td>
                          <td className="px-6 py-5 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            {new Date(visit.visitedAt || visit.createdAt).toLocaleString("en-IN")}
                          </td>
                          <td className="px-6 py-5">
                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium font-mono text-xs">
                              {visit.ip || "0.0.0.0"}
                            </span>
                          </td>
                          <td className="px-6 py-5 break-all text-slate-600 dark:text-slate-400 text-sm">
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

export default PublicStats;