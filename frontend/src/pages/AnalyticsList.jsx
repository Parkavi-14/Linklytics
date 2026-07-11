import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"; 

// Import your custom theme hook
import { useTheme } from "../context/ThemeContext";

import { getMyUrls } from "../api/urlApi";

import {
  FiSearch,
  FiRefreshCw,
  FiBarChart2,
  FiExternalLink,
  FiTrendingUp,
  FiLink,
  FiMousePointer,
} from "react-icons/fi";

function AnalyticsList() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Consume the global theme context state
  const { theme } = useTheme();

  // ✨ PRODUCTION URL SYNC: Maps to short link redirection paths correctly
  const isLocalHost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const BASE_URL = isLocalHost
    ? "http://localhost:5000/api/url/r"
    : "https://linklytics-4r2v.onrender.com/api/url/r";

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await getMyUrls();
      setUrls(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const totalUrls = urls.length;
  const totalClicks = urls.reduce(
    (sum, url) => sum + (url.totalClicks || 0),
    0
  );
  const activeUrls = urls.filter((url) => !url.isExpired).length;

  const filteredUrls = useMemo(() => {
    let data = [...urls];

    if (search.trim()) {
      data = data.filter((url) =>
        url.originalUrl.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "active") {
      data = data.filter((url) => !url.isExpired);
    }

    if (filter === "expired") {
      data = data.filter((url) => url.isExpired);
    }

    switch (sortBy) {
      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "clicks":
        data.sort((a, b) => b.totalClicks - a.totalClicks);
        break;
      default:
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return data;
  }, [urls, search, filter, sortBy]);

  return (
    <div className="h-screen flex bg-slate-50 dark:bg-[#020617] overflow-hidden">
      <Sidebar urls={urls} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto flex flex-col pt-20 md:pt-0 bg-slate-50 dark:bg-[#020617]">
          <div className="flex-1 max-w-[1550px] w-full mx-auto px-6 py-6 space-y-6">
            {/* Header */}
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-lg p-7">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Analytics Dashboard
              </h1>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Monitor every shortened URL and view detailed click analytics.
              </p>
            </section>

            {/* Statistics */}
            <section className="grid lg:grid-cols-3 gap-5">
              {/* Total URLs */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-600 transition shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Total URLs
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                      {totalUrls}
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <FiLink size={22} className="text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Total Clicks */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-green-600 transition shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Total Clicks
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                      {totalClicks}
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <FiMousePointer size={22} className="text-green-500" />
                  </div>
                </div>
              </div>

              {/* Active URLs */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-violet-600 transition shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Active URLs
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                      {activeUrls}
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    <FiTrendingUp size={22} className="text-violet-500" />
                  </div>
                </div>
              </div>
            </section>

            {/* Search Toolbar */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <FiSearch className="absolute left-4 top-4 text-slate-400 dark:text-slate-500" />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search URLs..."
                    className="
                      w-full
                      pl-11
                      pr-4
                      py-3
                      rounded-xl
                      bg-slate-50
                      dark:bg-slate-800
                      border
                      border-slate-200
                      dark:border-slate-700
                      text-slate-900
                      dark:text-white
                      placeholder:text-slate-400
                      dark:placeholder:text-slate-500
                      focus:outline-none
                      focus:border-blue-600
                    "
                  />
                </div>

                {/* Filter */}
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="
                    px-5
                    py-3
                    lg:py-0
                    rounded-xl
                    bg-slate-50
                    dark:bg-slate-800
                    border
                    border-slate-200
                    dark:border-slate-700
                    text-slate-900
                    dark:text-white
                    focus:outline-none
                    focus:border-blue-600
                  "
                >
                  <option value="all">All URLs</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
                    px-5
                    py-3
                    lg:py-0
                    rounded-xl
                    bg-slate-50
                    dark:bg-slate-800
                    border
                    border-slate-200
                    dark:border-slate-700
                    text-slate-900
                    dark:text-white
                    focus:outline-none
                    focus:border-blue-600
                  "
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="clicks">Most Clicked</option>
                </select>

                {/* Refresh */}
                <button
                  onClick={fetchUrls}
                  className="
                    px-6
                    py-3
                    lg:py-0
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                  "
                >
                  <FiRefreshCw />
                  Refresh
                </button>
              </div>

              <p className="mt-5 text-slate-500 dark:text-slate-400">
                Showing
                <span className="mx-2 font-semibold text-slate-900 dark:text-white">
                  {filteredUrls.length}
                </span>
                of
                <span className="mx-2 font-semibold text-slate-900 dark:text-white">
                  {urls.length}
                </span>
                URLs
              </p>
            </section>

            {/* Analytics Table */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-md dark:shadow-lg">
              <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    URL Analytics
                  </h2>

                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    View analytics for every shortened URL.
                  </p>
                </div>

                <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {filteredUrls.length}
                  </span>

                  <span className="ml-2 text-slate-500 dark:text-slate-400">
                    Results
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-950">
                    <tr className="text-slate-500 dark:text-slate-400 uppercase text-sm border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left px-6 py-4">Website</th>
                      <th className="text-left px-6 py-4">Short URL</th>
                      <th className="text-center px-6 py-4">Clicks</th>
                      <th className="text-center px-6 py-4">Status</th>
                      <th className="text-center px-6 py-4">Created</th>
                      <th className="text-center px-6 py-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-20 text-center text-slate-400 dark:text-slate-500"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : filteredUrls.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-20 text-center text-slate-400 dark:text-slate-500"
                        >
                          No URLs Found
                        </td>
                      </tr>
                    ) : (
                      filteredUrls.map((url) => (
                        <tr
                          key={url._id}
                          className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <img
                                src={`https://www.google.com/s2/favicons?domain=${url.originalUrl}&sz=64`}
                                alt=""
                                className="w-10 h-10 rounded-lg bg-white border border-slate-200 dark:border-none"
                              />

                              <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white truncate max-w-sm">
                                  {url.originalUrl}
                                </h3>

                                <p className="text-sm text-slate-400 dark:text-slate-500">
                                  {url.shortCode}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6">
                            <a
                              href={`${BASE_URL}/${url.shortCode}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {url.shortCode}
                              <FiExternalLink size={15} />
                            </a>
                          </td>

                          <td className="text-center">
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-semibold">
                              {url.totalClicks}
                            </span>
                          </td>

                          <td className="text-center">
                            {url.isExpired ? (
                              <span className="px-3 py-1 rounded-full bg-red-500/10 dark:bg-red-500/15 text-red-600 dark:text-red-400 text-sm">
                                Expired
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-sm">
                                Active
                              </span>
                            )}
                          </td>

                          <td className="text-center text-slate-600 dark:text-slate-300">
                            {new Date(url.createdAt).toLocaleDateString()}
                          </td>

                          <td className="text-center">
                            <Link
                              to={`/analytics/${url._id}`}
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
                            >
                              <FiBarChart2 />
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default AnalyticsList;