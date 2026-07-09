import { useMemo, useState } from "react";

import {
  FiCopy,
  FiTrash2,
  FiBarChart2,
  FiExternalLink,
  FiEdit2,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
} from "react-icons/fi";

import { BsQrCode } from "react-icons/bs";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import { deleteUrl } from "../../api/urlApi";

import QRModal from "./QRModal";


function UrlTable({
  urls = [],
  refreshUrls,
  loading = false,
}) {
  const [showQR, setShowQR] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [selectedUrl, setSelectedUrl] =
    useState(null);

  const [copiedId, setCopiedId] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const rowsPerPage = 10;

  const totalPages = Math.max(
    1,
    Math.ceil(urls.length / rowsPerPage)
  );

  const currentUrls = useMemo(() => {
    const start =
      (currentPage - 1) * rowsPerPage;

    return urls.slice(
      start,
      start + rowsPerPage
    );
  }, [urls, currentPage]);

  const copyLink = (url) => {
    const shortUrl =
      `http://localhost:5000/api/url/${url.shortCode}`;

    navigator.clipboard.writeText(shortUrl);

    setCopiedId(url._id);

    toast.success("Copied");

    setTimeout(() => {
      setCopiedId("");
    }, 2000);
  };

  const removeUrl = async (id) => {
    if (!window.confirm("Delete this URL?"))
      return;

    try {
      await deleteUrl(id);

      toast.success("URL deleted");

      refreshUrls();
    } catch {
      toast.error("Delete failed");
    }
  };

  const openQR = (shortCode) => {
    setQrUrl(
      `http://localhost:5000/api/url/${shortCode}`
    );

    setShowQR(true);
  };

  if (loading) {
    return (
      <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-16 text-center">

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

          Loading URLs...

        </h2>

      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-16 text-center">

        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">

          No URLs Found

        </h2>

        <p className="mt-3 text-slate-500 dark:text-slate-400">

          Create your first shortened URL to see it here.

        </p>

      </div>
    );
  }
    return (
    <>
      <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-700">

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

              My Links

            </h2>

            <p className="mt-1 text-slate-500 dark:text-slate-400">

              Manage and monitor all shortened URLs

            </p>

          </div>

          <div className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800">

            <span className="font-bold text-slate-900 dark:text-white">

              {urls.length}

            </span>

            <span className="ml-2 text-slate-500">

              Links

            </span>

          </div>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50 dark:bg-slate-800">

              <tr className="text-slate-600 dark:text-slate-300 uppercase text-sm">

                <th className="text-left px-6 py-4">

                  Website

                </th>

                <th className="text-left px-6 py-4">

                  Short URL

                </th>

                <th className="text-center px-6 py-4">

                  Clicks

                </th>

                <th className="text-center px-6 py-4">

                  Created

                </th>

                <th className="text-center px-6 py-4">

                  Status

                </th>

                <th className="text-center px-6 py-4">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {currentUrls.map((url) => (

                <tr
                  key={url._id}
                  className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >

                  {/* Website */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={`https://www.google.com/s2/favicons?domain=${url.originalUrl}&sz=64`}
                        className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700"
                        alt=""
                      />

                      <div>

                        <h3 className="font-semibold text-slate-900 dark:text-white truncate max-w-sm">

                          {url.originalUrl}

                        </h3>

                        <p className="text-sm text-slate-500">

                          {url.shortCode}

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Short */}

                  <td className="px-6">

                    <a
                      href={`http://localhost:5000/api/url/${url.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >

                      {url.shortCode}

                      <FiExternalLink size={15} />

                    </a>

                  </td>

                  {/* Clicks */}

                  <td className="text-center">

                    <span className="inline-flex px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">

                      {url.totalClicks}

                    </span>

                  </td>

                  {/* Date */}

                  <td className="text-center text-slate-600 dark:text-slate-300">

                    {new Date(
                      url.createdAt
                    ).toLocaleDateString()}

                  </td>

                  {/* Status */}

                  <td className="text-center">

                    {url.isExpired ? (

                      <span className="px-3 py-2 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-sm">

                        Expired

                      </span>

                    ) : (

                      <span className="px-3 py-2 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm">

                        Active

                      </span>

                    )}

                  </td>

                  {/* Actions */}

                  <td>

                    <div className="flex justify-center gap-3">

                      {/* Copy */}

                      <button
                        onClick={() => copyLink(url)}
                        title="Copy URL"
                        className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center shadow-sm"
                      >
                        {copiedId === url._id ? (
                          <FiCheck size={18} />
                        ) : (
                          <FiCopy size={18} />
                        )}
                      </button>

                      {/* Analytics */}

                      <Link
                        to={`/analytics/${url._id}`}
                        title="View Analytics"
                        className="w-11 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center justify-center shadow-sm"
                      >
                        <FiBarChart2 size={18} />
                      </Link>

                      {/* QR */}

                      <button
                        onClick={() => openQR(url.shortCode)}
                        title="QR Code"
                        className="w-11 h-11 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition flex items-center justify-center shadow-sm"
                      >
                        <BsQrCode size={18} />
                      </button>


                      {/* Delete */}

                      <button
                        onClick={() => removeUrl(url._id)}
                        title="Delete URL"
                        className="w-11 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white transition flex items-center justify-center shadow-sm"
                      >
                        <FiTrash2 size={18} />
                      </button>

                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
                {/* Pagination */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-8 py-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">

          <p className="text-slate-500 dark:text-slate-400">

            Showing

            <span className="font-semibold mx-2 text-slate-800 dark:text-white">

              {(currentPage - 1) * rowsPerPage + 1}

            </span>
            <span className="font-semibold mx-2 text-slate-800 dark:text-white">

              {Math.min(currentPage * rowsPerPage, urls.length)}

            </span>

            of

            <span className="font-semibold mx-2 text-slate-800 dark:text-white">

              {urls.length}

            </span>

            URLs

          </p>

          <div className="flex items-center gap-3">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(page - 1, 1)
                )
              }
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition
              ${
                currentPage === 1
                  ? "bg-slate-200 dark:bg-slate-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >

              <FiChevronLeft />

            </button>

            <div className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white">

              {currentPage} / {totalPages}

            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, totalPages)
                )
              }
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition
              ${
                currentPage === totalPages
                  ? "bg-slate-200 dark:bg-slate-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >

              <FiChevronRight />

            </button>

          </div>

        </div>

      </div>

      {/* QR Code Modal */}

      <QRModal
        open={showQR}
        url={qrUrl}
        onClose={() => setShowQR(false)}
      />

    </>
  );
}

export default UrlTable;