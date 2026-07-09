import {
  FiSearch,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";

function SearchBar({
  search,
  setSearch,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  selectSuggestion,
  filter,
  setFilter,
  sortBy,
  setSortBy,
  clearSearch,
  total,
  totalAll,
  refreshUrls,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">

      {/* Top */}

      <div className="flex flex-col lg:flex-row gap-4 lg:items-center">

        {/* Search */}

        <div className="relative flex-1">

          <FiSearch
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search URLs..."
            className="w-full h-12 pl-12 pr-12 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          {search && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <FiX />
            </button>
          )}

          {/* Suggestions */}

          {showSuggestions &&
            suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-14 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">

                {suggestions.map((url) => (
                  <button
                    key={url._id}
                    onClick={() =>
                      selectSuggestion(url)
                    }
                    className="w-full px-5 py-4 text-left hover:bg-slate-50 border-b last:border-none"
                  >
                    <p className="font-medium truncate">
                      {url.originalUrl}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      {url.shortCode}
                    </p>
                  </button>
                ))}

              </div>
            )}

        </div>

        {/* Filter */}

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="h-12 px-4 rounded-xl border border-slate-300"
        >
          <option value="all">
            All URLs
          </option>

          <option value="active">
            Active
          </option>

          <option value="expired">
            Expired
          </option>

        </select>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="h-12 px-4 rounded-xl border border-slate-300"
        >
          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="clicks">
            Most Clicked
          </option>

        </select>

        {/* Refresh */}

        <button
          onClick={() => {
            clearSearch();
            refreshUrls();
          }}
          className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2"
        >
          <FiRefreshCw />

          Refresh

        </button>

      </div>

      {/* Footer */}

      <div className="flex justify-between items-center mt-5">

        <p className="text-slate-500">

          Showing

          <span className="font-semibold mx-1">

            {total}

          </span>

          of

          <span className="font-semibold mx-1">

            {totalAll}

          </span>

          URLs

        </p>

        {search && (

          <p className="text-blue-600 font-medium">

            Searching for

            <span className="ml-1">

              "{search}"

            </span>

          </p>

        )}

      </div>

    </div>
  );
}

export default SearchBar;