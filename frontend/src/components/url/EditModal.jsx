import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateUrl } from "../../api/urlApi";

function EditModal({
  open,
  onClose,
  selectedUrl,
  refreshUrls,
}) {
  const [originalUrl, setOriginalUrl] = useState("");

  useEffect(() => {
    if (selectedUrl) {
      setOriginalUrl(selectedUrl.originalUrl);
    }
  }, [selectedUrl]);

  if (!open || !selectedUrl) return null;

  const handleUpdate = async () => {
    if (!originalUrl.trim()) {
      toast.error("URL cannot be empty");
      return;
    }

    try {
      await updateUrl(selectedUrl._id, {
        originalUrl,
      });

      toast.success("URL Updated Successfully");

      refreshUrls();

      onClose();

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update URL"
      );
    }
  };

  const newLocal = "bg-white rounded-2xl shadow-xl w-[550px] p-8";
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className={newLocal}>

        <h2 className="text-2xl font-bold mb-6">
          Edit Destination URL
        </h2>

        <label className="block mb-2 font-medium">
          Original URL
        </label>

        <input
          type="text"
          value={originalUrl}
          onChange={(e) =>
            setOriginalUrl(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
        />

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditModal;