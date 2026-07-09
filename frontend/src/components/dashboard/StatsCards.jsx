import {
  FiLink,
  FiBarChart2,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

function StatsCards({ urls = [] }) {
  const totalUrls = urls.length;

  const totalClicks = urls.reduce(
    (sum, item) => sum + (item.totalClicks || 0),
    0
  );

  const activeLinks = urls.filter(
    (url) => !url.isExpired
  ).length;

  const averageClicks =
    totalUrls === 0
      ? 0
      : Math.round(totalClicks / totalUrls);

  const cards = [
    {
      title: "Total URLs",
      value: totalUrls,
      icon: <FiLink size={30} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Clicks",
      value: totalClicks,
      icon: <FiBarChart2 size={30} />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Active Links",
      value: activeLinks,
      icon: <FiTrendingUp size={30} />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Average Clicks",
      value: averageClicks,
      icon: <FiActivity size={30} />,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">

                {card.title}

              </p>

              <h2 className="text-4xl font-bold mt-3">

                {card.value}

              </h2>

            </div>

            <div
              className={`w-16 h-16 rounded-2xl bg-linear-to-br ${card.color} flex justify-center items-center text-white shadow-lg`}
            >

              {card.icon}

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default StatsCards;