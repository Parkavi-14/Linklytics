import { useMemo, useState } from "react";
import {
  FiCopy,
  FiTrash2,
  FiBarChart2,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
} from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteUrl } from "../../api/urlApi";
import QRModal from "./QRModal";

function UrlTable({ urls = [], refreshUrls, loading = false }) {
  const [showQR, setShowQR] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [copiedId, setCopiedId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  // ✨ DYNAMIC PRODUCTION FIX: Verifies location host context to drop localhost dependencies out of production builds
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const BACKEND_BASE_URL = isLocal 
    ? "http://localhost:5000/api/url" 
    : "https://linklytics-4r2v.onrender.com/api/url";

  const totalPages = Math.max(1, Math.ceil(urls.length / rowsPerPage));

  const currentUrls = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return urls.slice(start, start + rowsPerPage);
  }, [urls, currentPage]);

  const copyLink = (url) => {
    const shortUrl = `${BACKEND_BASE_URL}/${url.shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(url._id);
    toast.success("Short URL copied!");
    setTimeout(() => setCopiedId(""), 2000);
  };

  const removeUrl = async (id) => {
    if (!window.confirm("Are you sure you want to delete this URL?")) return;
    try {
      await deleteUrl(id);
      toast.success("URL deleted successfully");
      refreshUrls();
    } catch {
      toast.error("Delete operation failed");
    }
  };

  const openQR = (shortCode) => {
    setQrUrl(`${BACKEND_BASE_URL}/${shortCode}`);
    setShowQR(true);
  };

  if (loading) {
    return (
      <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-16 text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Loading URLs...</h2>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-16 text-center shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">No URLs Found</h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400">Create your first shortened URL to see it here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Links</h2>
            <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">Manage and monitor all shortened URLs</p>
          </div>
          <div className="px-5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50">
            <span className="font-bold text-slate-900 dark:text-white">{urls.length}</span>
            <span className="ml-2 text-slate-500 dark:text-slate-400 text-sm">Links</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr className="text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold tracking-wider">
                <th className="text-left px-6 py-4">Website</th>
                <th className="text-left px-6 py-4">Short URL</th>
                <th className="text-center px-6 py-4">Clicks</th>
                <th className="text-center px-6 py-4">Created</th>
                <th className="text-center px-6 py-4">Status</th>
                <th className="text-center px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {currentUrls.map((url) => (
                <tr key={url._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 max-w-sm">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${url.originalUrl}&sz=64`}
                        className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white p-1 shrink-0"
                        alt=""
                        onError={(e) => { e.target.src = "https://www.google.com/s2/favicons?domain=google.com&sz=64"; }}
                      />
                      <div className="overflow-hidden">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 truncate text-sm" title={url.originalUrl}>{url.originalUrl}</h3>
                        <p className="text-xs text-slate-400 mt-0.5 font-mono truncate">Code: {url.shortCode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`${BACKEND_BASE_URL}/${url.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium font-mono"
                    >
                      {url.shortCode} <FiExternalLink size={14} />
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-semibold text-xs border border-blue-100 dark:border-blue-900/30">{url.totalClicks || 0}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${url.isExpired ? "bg-red-50 text-red-600 border-red-100" : "bg-green-50 text-green-700 border-green-100"}`}>
                      {url.isExpired ? "Expired" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => copyLink(url)} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
                        {copiedId === url._id ? <FiCheck size={16} /> : <FiCopy size={16} />}
                      </button>
                      <Link
                        to={`/analytics/${url._id}`}
                        className="w-9 h-9 rounded-xl bg-emerald-50 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-emerald-600 dark:text-emerald-400 hover:text-white dark:hover:text-white border border-emerald-200 dark:border-emerald-900/40 transition flex items-center justify-center shadow-sm"
                      >
                        <FiBarChart2 size={16} />
                      </Link>
                      <button onClick={() => openQR(url.shortCode)} className="w-9 h-9 rounded-xl bg-violet-50 hover:bg-violet-600 dark:hover:bg-violet-600 text-violet-600 dark:text-violet-400 hover:text-white dark:hover:text-white border border-violet-200 dark:border-violet-900/40 transition flex items-center justify-center shadow-sm">
                        <BsQrCode size={16} />
                      </button>
                      <button onClick={() => removeUrl(url._id)} className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-600 dark:hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white border border-red-200 dark:border-red-900/40 transition flex items-center justify-center shadow-sm">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Container */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-8 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Showing <span className="font-semibold text-slate-800 dark:text-white">{(currentPage - 1) * rowsPerPage + 1}</span> to <span className="font-semibold text-slate-800 dark:text-white">{Math.min(currentPage * rowsPerPage, urls.length)}</span> of <span className="font-semibold text-slate-800 dark:text-white">{urls.length}</span> URLs
          </p>
          <div className="flex items-center gap-3">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} className={`w-9 h-9 rounded-xl flex items-center justify-center transition border ${currentPage === 1 ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed" : "bg-white hover:bg-slate-50 dark:bg-slate-800 text-slate-700 border-slate-300 shadow-sm"}`}>
              <FiChevronLeft size={16} />
            </button>
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-1.5 rounded-xl shadow-sm">{currentPage} / {totalPages}</div>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} className={`w-9 h-9 rounded-xl flex items-center justify-center transition border ${currentPage === totalPages ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed" : "bg-white hover:bg-slate-50 dark:bg-slate-800 text-slate-700 border-slate-300 shadow-sm"}`}>
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <QRModal open={showQR} url={qrUrl} onClose={() => setShowQR(false)} />
    </>
  );
}

export default UrlTable;