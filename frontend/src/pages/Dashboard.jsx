import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import ClicksChart from "../components/dashboard/ClicksChart";

import UrlForm from "../components/url/UrlForm";
import UrlTable from "../components/url/UrlTable";

import { getMyUrls } from "../api/urlApi";

function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const res = await getMyUrls();
      
      // ✨ DEFENSIVE PAYLOAD READING: Handles both raw data arrays and nested structures cleanly
      if (res && res.data) {
        setUrls(res.data);
      } else if (Array.isArray(res)) {
        setUrls(res);
      } else {
        setUrls([]);
      }
    } catch (err) {
      console.error("Error fetching links on dashboard container:", err);
      setUrls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  // Filter + Search Logic
  const filteredUrls = useMemo(() => {
    let data = [...urls];

    // 1. Search filter match
    if (search.trim()) {
      data = data.filter((url) =>
        url.originalUrl?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 2. Status check handling (Checks both custom parameter maps safely)
    if (filter === "active") {
      data = data.filter((url) => !url.isExpired && (!url.expiresAt || new Date(url.expiresAt) > new Date()));
    }

    if (filter === "expired") {
      data = data.filter((url) => url.isExpired || (url.expiresAt && new Date(url.expiresAt) <= new Date()));
    }

    // 3. Sorting sorting switches
    switch (sortBy) {
      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "clicks":
        data.sort((a, b) => (b.totalClicks || 0) - (a.totalClicks || 0));
        break;
      default:
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return data;
  }, [urls, search, filter, sortBy]);

  return (
    <div className="h-screen bg-slate-100 dark:bg-slate-950 flex overflow-hidden transition-colors duration-300">
      {/* Sidebar Panel */}
      <Sidebar urls={urls} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Navbar />

        <main className="flex-1 overflow-y-auto flex flex-col pt-20 md:pt-0 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
          <div className="flex-1 max-w-screen-2xl w-full mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
            
            {/* Greetings Panel Banner */}
            <WelcomeCard />

            {/* URL Interactive Creation Form Layout */}
            <div className="mt-6">
              <UrlForm refreshUrls={fetchUrls} />
            </div>

            {/* Core Data Presentation Grid Layout */}
            <div id="my-links" className="mt-6">
              <UrlTable
                urls={filteredUrls}
                loading={loading}
                refreshUrls={fetchUrls}
              />
            </div>

            {/* Activity History Logs and Graphs Workspace Viewport */}
            <div className="grid xl:grid-cols-2 gap-6 mt-6">
              <RecentActivity urls={urls} />
              <ClicksChart urls={urls} />
            </div>
          </div>

          {/* Core Footer Element Module */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;