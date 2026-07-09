import {
  FiGithub,
  FiGlobe,
  FiMail,
  FiHeart,
} from "react-icons/fi";

function Footer() {
  return (
    <footer
      className="
      mt-10
      border-t
      border-slate-200
      dark:border-slate-800
      bg-white
      dark:bg-slate-900
      transition-colors
    "
    >
      <div className="max-w-screen-2xl mx-auto px-8 py-10">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

              Linklytics

            </h2>

            <p className="mt-4 text-slate-500 dark:text-slate-400 leading-7">

              Modern URL shortening platform with analytics,
              QR codes, click tracking and public statistics.

            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">

              Product

            </h3>

            <ul className="space-y-3 text-slate-500 dark:text-slate-400">

              <li>Dashboard</li>

              <li>Analytics</li>

              <li>Public Stats</li>

              <li>Settings</li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">

              Resources

            </h3>

            <ul className="space-y-3 text-slate-500 dark:text-slate-400">

              <li>Documentation</li>

              <li>API</li>

              <li>Support</li>

              <li>FAQ</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">

              Connect

            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">

                <FiGithub />

                GitHub

              </div>

              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">

                <FiGlobe />

                linklytics.com

              </div>

              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">

                <FiMail />

                support@linklytics.com

              </div>

            </div>

          </div>

        </div>

        <div
          className="
          mt-10
          pt-6
          border-t
          border-slate-200
          dark:border-slate-800
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-4
        "
        >

          <p className="text-slate-500 dark:text-slate-400 text-sm">

            © 2026 Linklytics. All rights reserved.

          </p>

          <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

            Made with

            <FiHeart className="text-red-500" />

            using React + Django

          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;