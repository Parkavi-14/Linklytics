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
      toast.success("URL pasted");
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

      toast.success("Short URL created");

      setOriginalUrl("");
      setCustomAlias("");
      setExpiryDate("");

      refreshUrls?.();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to create URL"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-7 transition-colors">

      {/* Header */}

      <div className="mb-7">

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

          Create Short URL

        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">

          Generate secure and branded short links instantly.

        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Original URL */}

        <div>

          <label className="block mb-2 font-medium text-slate-700 dark:text-slate-300">

            Original URL

          </label>

          <div className="flex">

            <div className="w-14 rounded-l-xl border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">

              <FiLink className="text-slate-600 dark:text-slate-300" />

            </div>

            <input
              type="url"
              value={originalUrl}
              onChange={(e) =>
                setOriginalUrl(e.target.value)
              }
              placeholder="https://example.com"
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={pasteClipboard}
              className="px-5 rounded-r-xl border border-l-0 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2 transition"
            >

              <FiClipboard />

              Paste

            </button>

          </div>

        </div>

        {/* Bottom */}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Alias */}

          <div>

            <label className="block mb-2 font-medium text-slate-700 dark:text-slate-300">

              Custom Alias

            </label>

            <div className="flex">

              <div className="w-14 rounded-l-xl border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex justify-center items-center">

                <FiEdit3 className="text-slate-600 dark:text-slate-300" />

              </div>

              <input
                value={customAlias}
                onChange={(e) =>
                  setCustomAlias(e.target.value)
                }
                placeholder="my-link"
                className="flex-1 rounded-r-xl px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
              />

            </div>

          </div>

          {/* Expiry */}

          <div>

            <label className="block mb-2 font-medium text-slate-700 dark:text-slate-300">

              Expiry Date

            </label>

            <div className="flex">

              <div className="w-14 rounded-l-xl border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex justify-center items-center">

                <FiCalendar className="text-slate-600 dark:text-slate-300" />

              </div>

              <input
                type="date"
                value={expiryDate}
                onChange={(e) =>
                  setExpiryDate(e.target.value)
                }
                className="flex-1 rounded-r-xl px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
              />

            </div>

          </div>

          {/* Button */}

          <div className="flex items-end">

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 font-semibold flex justify-center items-center gap-2 transition"
            >

              {loading ? (
                "Creating..."
              ) : (
                <>
                  Create URL
                  <FiArrowRight />
                </>
              )}

            </button>

          </div>

        </div>

      </form>

    </div>
  );
}

export default UrlForm;