import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FiBell,
  FiChevronDown,
  FiHome,
  FiBarChart2,
  FiSettings,
  FiGlobe,
  FiUser,
  FiLogOut,
  FiMoon,
  FiSun,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] =
    useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  const pageMap = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Manage your shortened URLs",
      icon: <FiHome />,
    },

    "/analytics": {
      title: "Analytics",
      subtitle: "Track clicks and performance",
      icon: <FiBarChart2 />,
    },

    "/settings": {
      title: "Settings",
      subtitle: "Manage your account",
      icon: <FiSettings />,
    },

    "/public-stats": {
      title: "Public Stats",
      subtitle: "View public analytics",
      icon: <FiGlobe />,
    },
  };

  const current =
    pageMap[location.pathname] || {
      title: "Linklytics",
      subtitle: "Professional URL Management",
      icon: <FiHome />,
    };

  const notifications = [
    {
      title: "New URL Created",
      time: "2 min ago",
    },
    {
      title: "QR Code Generated",
      time: "15 min ago",
    },
    {
      title: "Analytics Updated",
      time: "1 hour ago",
    },
  ];

  useEffect(() => {
    const handleClick = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowProfile(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotification(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  const toggleTheme = () => {
    setTheme(
      theme === "dark"
        ? "light"
        : "dark"
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
  <header
    className="
      sticky
      top-0
      z-40
      h-18
      bg-white/90
      dark:bg-slate-900/90
      backdrop-blur-xl
      border-b
      border-slate-200
      dark:border-slate-800
      shadow-sm
    "
  >
    <div className="h-full px-8 flex items-center justify-between">

      {/* Left Side */}

      <div className="flex items-center gap-4">

        {/* Page Icon */}

        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-linear-to-br
            from-blue-500/20
            to-indigo-500/20
            text-blue-600
            dark:text-blue-400
            flex
            items-center
            justify-center
            text-xl
          "
        >
          {current.icon}
        </div>

        {/* Title */}

        <div>

          <h1
            className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
              leading-none
            "
          >
            {current.title}
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            {current.subtitle}
          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">

        {/* Notification */}

        <div
          ref={notificationRef}
          className="relative"
        >

          <button
            onClick={() =>
              setShowNotification(
                !showNotification
              )
            }
            className="
              relative
              w-11
              h-11
              rounded-xl
              bg-slate-100
              dark:bg-slate-800
              hover:bg-blue-50
              dark:hover:bg-slate-700
              transition-all
              duration-200
              flex
              items-center
              justify-center
            "
          >

            <FiBell
              size={20}
              className="
                text-slate-700
                dark:text-slate-300
              "
            />

            {/* Animated Badge */}

            <span className="absolute top-2 right-2">

              <span
                className="
                  absolute
                  inline-flex
                  h-3
                  w-3
                  rounded-full
                  bg-red-400
                  opacity-75
                  animate-ping
                "
              ></span>

              <span
                className="
                  relative
                  inline-flex
                  h-3
                  w-3
                  rounded-full
                  bg-red-500
                "
              ></span>

            </span>

          </button>
                    {/* Notification Dropdown */}

          <div
            className={`
              absolute
              right-0
              mt-3
              w-80
              rounded-2xl
              bg-white
              dark:bg-slate-900
              border
              border-slate-200
              dark:border-slate-700
              shadow-2xl
              origin-top-right
              transition-all
              duration-200
              ${
                showNotification
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }
            `}
          >

            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">

              <h3 className="font-bold text-slate-900 dark:text-white">

                Notifications

              </h3>

              <p className="text-sm text-slate-500 mt-1">

                Latest updates

              </p>

            </div>

            {notifications.map((item, index) => (

              <div
                key={index}
                className="
                  flex
                  items-start
                  gap-3
                  px-5
                  py-4
                  hover:bg-blue-50
                  dark:hover:bg-slate-800
                  transition-all
                  cursor-pointer
                "
              >

                <div className="mt-1 w-2 h-2 rounded-full bg-blue-600"></div>

                <div>

                  <h4 className="font-medium text-slate-800 dark:text-white">

                    {item.title}

                  </h4>

                  <p className="text-sm text-slate-500">

                    {item.time}

                  </p>

                </div>

              </div>

            ))}

            <button
              className="
                w-full
                py-3
                border-t
                border-slate-200
                dark:border-slate-700
                hover:bg-slate-50
                dark:hover:bg-slate-800
                text-blue-600
                font-medium
              "
            >

              View All Notifications

            </button>

          </div>

        </div>

        {/* Profile */}

        <div
          ref={profileRef}
          className="relative"
        >

          <button
            onClick={() =>
              setShowProfile(!showProfile)
            }
            className="
              flex
              items-center
              gap-3
              rounded-xl
              px-3
              py-2
              hover:bg-slate-100
              dark:hover:bg-slate-800
              transition-all
            "
          >

            {/* Avatar */}

            <div
              className="
                w-11
                h-11
                rounded-full
                bg-linear-to-br
                from-blue-500
                to-indigo-600
                text-white
                font-bold
                flex
                items-center
                justify-center
                shadow-lg
                shadow-blue-500/30
              "
            >

              {initials}

            </div>

            {/* User */}

            <div className="hidden lg:block text-left">

              <h3 className="font-semibold text-slate-900 dark:text-white leading-none">

                {user?.name}

              </h3>

              <p className="text-xs text-slate-500 mt-1">

                Premium User

              </p>

            </div>

            <FiChevronDown
              size={18}
              className={`
                text-slate-500
                transition-transform
                duration-200
                ${
                  showProfile
                    ? "rotate-180"
                    : ""
                }
              `}
            />

          </button>
                    {/* Profile Dropdown */}

          <div
            className={`
              absolute
              right-0
              mt-3
              w-72
              rounded-2xl
              bg-white
              dark:bg-slate-900
              border
              border-slate-200
              dark:border-slate-700
              shadow-2xl
              origin-top-right
              transition-all
              duration-200
              ${
                showProfile
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }
            `}
          >

            {/* User Card */}

            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white flex justify-center items-center text-xl font-bold">

                  {initials}

                </div>

                <div>

                  <h3 className="font-bold text-slate-900 dark:text-white">

                    {user?.name}

                  </h3>

                  <p className="text-sm text-slate-500 break-all">

                    {user?.email}

                  </p>

                </div>

              </div>

            </div>

            {/* Analytics */}

            <Link
              to="/analytics"
              onClick={() => setShowProfile(false)}
              className="flex items-center gap-3 px-6 py-4 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition"
            >

              <FiBarChart2 size={18} />

              Analytics

            </Link>

            {/* Settings */}

            <Link
              to="/settings"
              onClick={() => setShowProfile(false)}
              className="flex items-center gap-3 px-6 py-4 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition"
            >

              <FiSettings size={18} />

              Settings

            </Link>

            {/* Theme */}

            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-6 py-4 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition"
            >

              {theme === "dark" ? (

                <FiSun size={18} />

              ) : (

                <FiMoon size={18} />

              )}

              {theme === "dark"
                ? "Light Mode"
                : "Dark Mode"}

            </button>

            {/* Divider */}

            <div className="border-t border-slate-200 dark:border-slate-700" />

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-6 py-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >

              <FiLogOut size={18} />

              Logout

            </button>

          </div>

        </div>

      </div>

    </div>

  </header>

);

}

export default Navbar;