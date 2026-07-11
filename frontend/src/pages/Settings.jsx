import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiLock,
  FiSave,
  FiSun,
  FiMoon,
  FiMonitor,
  FiShield,
  FiBell,
  FiTrash2,
  FiCalendar,
  FiLink,
  FiMousePointer,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"; 

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import { getMyUrls } from "../api/urlApi";
import { deleteMyAccount } from "../api/userApi"; 
import toast from "react-hot-toast";

function Settings() {
  const { user, logout } = useAuth(); 
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [urls, setUrls] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false); 

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      const res = await getMyUrls();
      setUrls(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Password update logic placeholder executed.");
  };

  // ✨ FULL ACCOUNT DELETION LOGIC (Matches your pop-up)
  const handleDeleteAccount = async () => {
    const confirmFirst = window.confirm(
      "Are you absolutely sure you want to delete your account? This will permanently wipe all your shortened links and tracking analytics history data."
    );

    if (confirmFirst) {
      const confirmSecond = window.confirm(
        "WARNING: This action is completely irreversible. Press OK to destroy this account profile data permanently."
      );

      if (confirmSecond) {
        try {
          setIsDeleting(true); 

          // 1. Fire Backend delete request
          await deleteMyAccount(); 
          
          toast.success("Account data securely destroyed successfully.");
          
          // 2. Log user out locally (Clears tokens)
          logout(); 
          
          // 3. Bounce back to root login page
          navigate("/"); 

        } catch (err) {
          console.error("Account deletion context error:", err);
          toast.error(err.response?.data?.message || "Failed to destroy account data.");
        } finally {
          setIsDeleting(false); 
        }
      }
    }
  };

  const totalLinks = urls.length;
  const totalClicks = urls.reduce(
    (sum, item) => sum + (item.totalClicks || 0),
    0
  );
  const activeLinks = urls.filter((item) => !item.isExpired).length;

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 dark:bg-[#020617]">
      <Sidebar urls={urls} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto flex flex-col bg-slate-50 dark:bg-[#020617]">
          <div className="flex-1 max-w-[1550px] w-full mx-auto px-6 py-6 space-y-6">
            
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-7">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Account Settings
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Manage your account, appearance and security settings.
              </p>
            </div>

            <div className="grid xl:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-7 text-center shadow-md">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">
                    <FiUser size={42} className="text-white" />
                  </div>

                  <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
                    {user?.name || "User"}
                  </h2>

                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    {user?.email}
                  </p>

                  <span className="inline-flex mt-5 px-4 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    Premium User
                  </span>
                </div>

                {/* Statistics Box */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-md">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                    Account Statistics
                  </h2>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <FiLink className="text-blue-500" />
                        </div>
                        <span className="text-slate-600 dark:text-slate-300">
                          Total Links
                        </span>
                      </div>
                      <span className="text-slate-900 dark:text-white text-xl font-bold">
                        {totalLinks}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <FiMousePointer className="text-green-500" />
                        </div>
                        <span className="text-slate-600 dark:text-slate-300">
                          Total Clicks
                        </span>
                      </div>
                      <span className="text-slate-900 dark:text-white text-xl font-bold">
                        {totalClicks}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <FiCheckCircle className="text-emerald-500" />
                        </div>
                        <span className="text-slate-600 dark:text-slate-300">
                          Active Links
                        </span>
                      </div>
                      <span className="text-slate-900 dark:text-white text-xl font-bold">
                        {activeLinks}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Appearance Theme Selector */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-md">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                    Appearance
                  </h2>

                  <div className="space-y-3">
                    {[
                      { id: "light", icon: <FiSun />, label: "Light Mode" },
                      { id: "dark", icon: <FiMoon />, label: "Dark Mode" },
                      { id: "system", icon: <FiMonitor />, label: "System Default" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setTheme(item.id)}
                        className={`w-full flex items-center justify-between rounded-xl p-4 transition border ${
                          theme === item.id
                            ? "border-blue-600 bg-blue-600/10"
                            : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-transparent"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-3 font-medium ${
                            theme === item.id
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-700 dark:text-white"
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </div>

                        {theme === item.id && (
                          <FiCheckCircle className="text-blue-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="xl:col-span-2 space-y-6">
                {/* Security Setup Panel */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-7 shadow-md">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                      <FiShield className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Security Settings
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Update your login credentials.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium mb-2">
                        <FiMail />
                        Email Address
                      </label>
                      <input
                        disabled
                        value={user?.email || ""}
                        className="w-full rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium mb-2">
                        <FiLock />
                        New Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium mb-2">
                        <FiLock />
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold flex items-center gap-3"
                    >
                      <FiSave />
                      Save Changes
                    </button>
                  </form>
                </div>

                {/* Account Metadata Information Details */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-7 shadow-md">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                    Account Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-transparent rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <FiCalendar className="text-blue-500" />
                        <span className="text-slate-500 dark:text-slate-400">
                          Member Since
                        </span>
                      </div>
                      <p className="text-slate-900 dark:text-white font-semibold">
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "Recently Joined"}
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-transparent rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <FiCheckCircle className="text-emerald-500" />
                        <span className="text-slate-500 dark:text-slate-400">
                          Account Status
                        </span>
                      </div>
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        Active
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-transparent rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <FiShield className="text-violet-500" />
                        <span className="text-slate-500 dark:text-slate-400">
                          Subscription
                        </span>
                      </div>
                      <p className="text-slate-900 dark:text-white font-semibold">
                        {user?.plan || "Free Plan"}
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-transparent rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <FiBell className="text-yellow-500" />
                        <span className="text-slate-500 dark:text-slate-400">
                          Notifications
                        </span>
                      </div>
                      <p className="text-slate-900 dark:text-white font-semibold">
                        {notifications ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notification Toggle Strip */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-7 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <FiBell className="text-yellow-500" />
                        Notifications
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                        Receive email notifications for new clicks, analytics updates and important account activity.
                      </p>
                    </div>

                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`relative w-16 h-9 rounded-full transition-all duration-300 shrink-0 ${
                        notifications ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-7 h-7 rounded-full bg-white transition-all duration-300 ${
                          notifications ? "left-8" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Danger Zone Block */}
                <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-7 shadow-md">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center gap-3">
                        <FiAlertTriangle />
                        Danger Zone
                      </h2>
                      <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl text-sm">
                        Permanently delete your account, URLs, analytics history and settings.
                        <br />
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          This action cannot be undone.
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeleting} 
                      className={`
                        px-7 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition
                        ${isDeleting 
                          ? "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed" 
                          : "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/10" 
                        }
                      `}
                    >
                      {isDeleting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Destroying...
                        </>
                      ) : (
                        <>
                          <FiTrash2 />
                          Delete Account
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <Footer /> 
        </main>
      </div>
    </div>
  );
}

export default Settings;