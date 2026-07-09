import QRCode from "react-qr-code";

function QRModal({ open, onClose, url }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          QR Code
        </h2>

        <div className="flex justify-center">

          <QRCode
            value={url}
            size={220}
          />

        </div>

        <div className="mt-6 text-center">

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 break-all"
          >
            {url}
          </a>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default QRModal;