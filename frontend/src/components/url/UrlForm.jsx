import { useState } from "react";
import toast from "react-hot-toast";

import {
  FiLink,
  FiEdit3,
  FiCalendar,
  FiClipboard,
  FiArrowRight,
} from "react-icons/fi";

import { createShortUrl } from "../../api/urlApi";

function UrlForm({ refreshUrls }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(false);

  const pasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setOriginalUrl(text);
      toast.success("URL pasted from clipboard");
    } catch {
      toast.error("Clipboard access denied");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalUrl.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);

      await createShortUrl({
        originalUrl,
        customAlias,
        expiresAt: expiryDate || null,
      });

      toast.success("Short URL created successfully! 🎉");

      // 1. Reset input states cleanly
      setOriginalUrl("");
      setCustomAlias("");
      setExpiryDate("");

      // 2. Refresh parent workspace instantly
      if (refreshUrls) {
        refreshUrls();
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to create URL. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-7 transition-all duration-300">
      {/* Header Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Create Short URL
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
          Generate secure and branded short links instantly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Original URL Section */}
        <div>
          <label className="block mb-2 font-medium text-sm text-slate-700 dark:text-slate-300">
            Original URL
          </label>
          <div className="flex rounded-xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition">
            <div className="w-14 border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
              <FiLink className="text-slate-500 dark:text-slate-400" />
            </div>
            <input
              type="url"
              required
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/your-long-link"
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none placeholder-slate-400 dark:placeholder-slate-600 text-sm"
            />
            <button
              type="button"
              onClick={pasteClipboard}
              className="px-5 border border-l-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-2 transition text-sm font-medium"
            >
              <FiClipboard />
              Paste
            </button>
          </div>
        </div>

        {/* Configurations Fields Grid Layout */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Custom Alias Input */}
          <div>
            <label className="block mb-2 font-medium text-sm text-slate-700 dark:text-slate-300">
              Custom Alias (Optional)
            </label>
            <div className="flex rounded-xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition">
              <div className="w-14 border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-center items-center">
                <FiEdit3 className="text-slate-500 dark:text-slate-400" />
              </div>
              <input
                type="text"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="e.g., my-link"
                className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none text-sm placeholder-slate-400 dark:placeholder-slate-600"
              />
            </div>
          </div>

          {/* Expiry Date Input */}
          <div>
            <label className="block mb-2 font-medium text-sm text-slate-700 dark:text-slate-300">
              Expiry Date (Optional)
            </label>
            <div className="flex rounded-xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition">
              <div className="w-14 border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-center items-center">
                <FiCalendar className="text-slate-500 dark:text-slate-400" />
              </div>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submit Button Span Block */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3.5 font-semibold flex justify-center items-center gap-2 transition shadow-md shadow-blue-500/10 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-sm"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating Link...
              </>
            ) : (
              <>
                Create URL
                <FiArrowRight />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UrlForm;