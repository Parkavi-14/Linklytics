import { useState } from "react";
import {
  FiHome,
  FiBarChart2,
  FiSettings,
  FiGlobe,
  FiLogOut,
  FiLink,
  FiMousePointer,
  FiActivity,
  FiChevronRight,
  FiMenu,
  FiX,
  FiChevronLeft,
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ urls = [] }) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const totalLinks = urls.length;
  const totalClicks = urls.reduce((sum, url) => sum + (url.totalClicks || 0), 0);
  const activeLinks = urls.filter((url) => !url.isExpired).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FiHome size={20} />, path: "/dashboard" },
    { name: "Analytics", icon: <FiBarChart2 size={20} />, path: "/analytics" },
    { name: "Public Stats", icon: <FiGlobe size={20} />, path: "/public" },
    { name: "Settings", icon: <FiSettings size={20} />, path: "/settings" },
  ];

  const menuClass = ({ isActive }) => `
    group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-200
    ${isActive 
      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
    }
  `;

  return (
    <>
      {/* Mobile Floating Toggle Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-md transition-all duration-200"
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40 w-64 h-screen flex flex-col
          bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
          text-slate-900 dark:text-white shadow-xl dark:shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header/Logo Section */}
        <div className="px-6 pt-7 pb-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FiLink size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Linklytics</h1>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">URL Management</p>
            </div>
          </div>

          {/* Mobile Collapse Arrow */}
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FiChevronLeft size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="px-2 mb-4 text-xs font-semibold tracking-[0.25em] uppercase text-slate-400 dark:text-slate-500">
            Main Menu
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={menuClass}
                onClick={() => setIsOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${isActive ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 text-slate-600 dark:text-slate-300"}`}>
                        {item.icon}
                      </div>
                      <span className="font-medium text-[15px]">{item.name}</span>
                    </div>
                    <FiChevronRight className={`transition-transform ${isActive ? "translate-x-1" : "group-hover:translate-x-1 text-slate-400 dark:text-slate-500"}`} />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Stats Analytics Overview Workspace */}
          <div className="mt-8">
            <p className="px-2 mb-4 text-xs font-semibold tracking-[0.25em] uppercase text-slate-400 dark:text-slate-500">
              Workspace
            </p>

            <div className="space-y-3">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-500 transition-all">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Links</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{totalLinks}</h3>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <FiLink size={20} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4 hover:border-green-500 transition-all">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Clicks</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{totalClicks}</h3>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-green-500/10 dark:bg-green-500/15 flex items-center justify-center text-green-600 dark:text-green-400">
                    <FiMousePointer size={20} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4 hover:border-purple-500 transition-all">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Active Links</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{activeLinks}</h3>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 dark:bg-purple-500/15 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <FiActivity size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Log Out */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white hover:border-red-600 dark:hover:border-red-500 transition-all duration-300"
          >
            <FiLogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>

          {/* Footer Footprint metadata */}
          <div className="mt-5 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">Linklytics v2.0</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-600 mt-1">Professional URL Management</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;