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
  const { logout } = useAuth();
  
  // Default state is closed (false)
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
          className="md:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* Main Sidebar Panel Container */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40 h-screen flex flex-col
          bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
          text-slate-900 dark:text-white shadow-xl dark:shadow-2xl
          transition-all duration-300 ease-in-out
          max-w-[280px] sm:max-w-xs
          ${isOpen ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0 md:w-24"}
        `}
      >
        {/* ✨ PROMINENT & OVERLAY-SAFE ARROW TOGGLE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex absolute -right-5 top-8 z-50 w-10 h-10 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 text-white shadow-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center cursor-pointer p-0 select-none"
        >
          {isOpen ? (
            <FiChevronLeft size={20} className="shrink-0" />
          ) : (
            <FiChevronRight size={20} className="shrink-0 ml-[2px]" />
          )}
        </button>

        {/* Inner Scroll Content Container */}
        <div className="w-full h-full flex flex-col overflow-y-auto overflow-x-hidden scrollbar-none px-4 py-6">
          
          {/* Header/Logo Section */}
          <div className={`mb-6 flex items-center transition-all duration-300 ${isOpen ? "justify-between px-2" : "justify-center px-0"}`}>
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                <FiLink size={22} className="text-white" />
              </div>
              
              <div className={`transition-all duration-300 ${isOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0 pointer-events-none"}`}>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Linklytics</h1>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 whitespace-nowrap">URL Management</p>
              </div>
            </div>

            {/* Mobile Drawer Close Arrow */}
            <button 
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <FiChevronLeft size={18} />
            </button>
          </div>

          <hr className="border-slate-200 dark:border-slate-800 mb-6 mx-[-16px]" />

          {/* Navigation Items Content */}
          <div>
            <p className={`px-2 mb-4 text-xs font-semibold tracking-[0.25em] uppercase text-slate-400 dark:text-slate-500 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden mb-0"}`}>
              Main Menu
            </p>

            <div className="space-y-2">
              {menuItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  className={menuClass}
                  onClick={() => { if(window.innerWidth < 768) setIsOpen(false); }}
                  title={!isOpen ? item.name : ""}
                >
                  {({ isActive }) => (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition shrink-0 ${isActive ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 text-slate-600 dark:text-slate-300"}`}>
                          {item.icon}
                        </div>
                        <span className={`font-medium text-[15px] transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none w-0"}`}>{item.name}</span>
                      </div>
                      {isOpen && (
                        <FiChevronRight className={`transition-transform ${isActive ? "translate-x-1" : "group-hover:translate-x-1 text-slate-400 dark:text-slate-500"}`} />
                      )}
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Workspace Analytics Metrics Overview */}
          <div className={`transition-all duration-300 ${isOpen ? "mt-8 opacity-100 max-h-screen visible" : "mt-0 opacity-0 max-h-0 overflow-hidden pointer-events-none invisible"}`}>
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

          {/* Conditional Logout Action */}
          {isOpen && (
            <div className="mt-auto pt-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-600 dark:hover:bg-red-500 hover:text-white hover:border-red-600 dark:hover:border-red-500 transition-all duration-300"
              >
                <FiLogOut size={18} className="shrink-0" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}

          {/* Footer branding metadata */}
          <div className={`text-center transition-all duration-300 ${isOpen ? "mt-5 opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden mt-0 pointer-events-none"}`}>
            <p className="text-xs text-slate-400 dark:text-slate-500">Linklytics v2.0</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-600 mt-1 whitespace-nowrap">Professional URL Management</p>
          </div>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;