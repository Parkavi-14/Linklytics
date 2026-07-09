import { useMemo, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  FiTrendingUp,
  FiMousePointer,
} from "react-icons/fi";

function ClicksChart({ urls = [] }) {
  const [period, setPeriod] = useState("30");

  const chartData = useMemo(() => {
    return urls.map((url) => ({
      name:
        url.shortCode.length > 8
          ? url.shortCode.substring(0, 8) + "..."
          : url.shortCode,
      clicks: url.totalClicks || 0,
    }));
  }, [urls]);

  const totalClicks = urls.reduce(
    (sum, url) => sum + (url.totalClicks || 0),
    0
  );

  const highestClicks =
    chartData.length > 0
      ? Math.max(...chartData.map((d) => d.clicks))
      : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm transition-colors">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

            Click Analytics

          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-1">

            Click performance overview

          </p>

        </div>

        <div className="flex gap-2">

          {["7", "30", "90"].map((item) => (

            <button
              key={item}
              onClick={() => setPeriod(item)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                period === item
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {item}D
            </button>

          ))}

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 gap-5 px-6 pt-6">

        <div className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">

          <div className="flex items-center justify-between">

            <p className="text-slate-500 dark:text-slate-400">

              Total Clicks

            </p>

            <FiMousePointer
              className="text-blue-600"
              size={20}
            />

          </div>

          <h3 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">

            {totalClicks}

          </h3>

        </div>

        <div className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">

          <div className="flex items-center justify-between">

            <p className="text-slate-500 dark:text-slate-400">

              Highest Clicks

            </p>

            <FiTrendingUp
              className="text-green-600"
              size={20}
            />

          </div>

          <h3 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">

            {highestClicks}

          </h3>

        </div>

      </div>

      {/* Empty State */}

      {chartData.length === 0 ? (

        <div className="h-80 flex items-center justify-center text-slate-500 dark:text-slate-400">

          No click data available

        </div>

      ) : (

        <div className="h-80 p-6">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart data={chartData}>

              <defs>

                <linearGradient
                  id="clickGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#2563eb"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="95%"
                    stopColor="#2563eb"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                opacity={0.2}
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#94A3B8",
                }}
              />

              <YAxis
                tick={{
                  fill: "#94A3B8",
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                }}
              />

              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#2563eb"
                strokeWidth={3}
                fill="url(#clickGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>
  );
}

export default ClicksChart;