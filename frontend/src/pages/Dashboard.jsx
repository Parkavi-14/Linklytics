import { useEffect, useMemo, useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"; // Imported the Footer component

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
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const res = await getMyUrls();
      setUrls(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  // Suggestions
  const suggestions = useMemo(() => {
    if (!search.trim()) return [];

    return urls
      .filter((url) =>
        url.originalUrl
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .slice(0, 5);
  }, [search, urls]);

  // Filter + Search
  const filteredUrls = useMemo(() => {
    let data = [...urls];

    if (search.trim()) {
      data = data.filter((url) =>
        url.originalUrl
          .toLowerCase()
          .includes(search.toLowerCase())
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
        data.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );
        break;

      case "clicks":
        data.sort(
          (a, b) =>
            b.totalClicks -
            a.totalClicks
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    return data;
  }, [urls, search, filter, sortBy]);

  const clearSearch = () => {
    setSearch("");
    setShowSuggestions(false);
  };

  const selectSuggestion = (url) => {
    setSearch(url.originalUrl);
    setShowSuggestions(false);
  };

  return (
    <div className="h-screen bg-slate-100 dark:bg-slate-950 flex overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar urls={urls} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto flex flex-col bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
          <div className="flex-1 max-w-screen-2xl w-full mx-auto px-8 py-8">
            {/* Welcome */}
            <WelcomeCard />

            {/* URL Form */}
            <div className="mt-6">
              <UrlForm refreshUrls={fetchUrls} />
            </div>

            {/* URL Table */}
            <div id="my-links" className="mt-6">
              <UrlTable
                urls={filteredUrls}
                loading={loading}
                refreshUrls={fetchUrls}
              />
            </div>

            {/* Bottom */}
            <div className="grid xl:grid-cols-2 gap-6 mt-6">
              <RecentActivity urls={urls} />
              <ClicksChart urls={urls} />
            </div>
          </div>

          {/* Integrated Footer at the bottom of the layout view context */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;