import { FiLink } from "react-icons/fi";

function EmptyState() {
  return (
    <div className="bg-white rounded-xl shadow p-16 text-center">

      <FiLink
        size={60}
        className="mx-auto text-blue-600"
      />

      <h2 className="text-2xl font-bold mt-6">
        No URLs Yet
      </h2>

      <p className="text-gray-500 mt-3">
        Create your first shortened URL to begin tracking analytics.
      </p>

    </div>
  );
}

export default EmptyState;