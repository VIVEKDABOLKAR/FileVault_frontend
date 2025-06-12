import { useState } from "react";
import { processFile } from "../api/fileService";

export default function PdfFileForm() {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("encrypt");
  const [algorithm, setAlgorithm] = useState("pdf-aes");
  const [unlockPdf, setUnlockPdf] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState("");
  const [lockPdf, setLockPdf] = useState(false);
  const [lockPassword, setLockPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file) return setError("Please select a PDF file.");

    if (unlockPdf && !unlockPassword) return setError("Unlock password is required.");
    if (lockPdf && !lockPassword) return setError("Lock password is required.");
    if ((mode === "encrypt" || mode === "decrypt") && !algorithm) return setError("Please select an algorithm.");

    setError("");
    setLoading(true);
    setDownloadUrl("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);
    formData.append("algorithm", algorithm);
    if (unlockPdf) formData.append("unlockPassword", unlockPassword);
    if (lockPdf) formData.append("lockPassword", lockPassword);

    try {
      const response = await processFile(formData);
      const blobUrl = URL.createObjectURL(response.data);
      setDownloadUrl(blobUrl);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `processed-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong while processing the PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6 w-full max-w-xl mx-auto text-white">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full text-white border-amber-200 border-2 px-2 py-2"
      />

      {/* Unlock PDF */}
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={unlockPdf}
            onChange={() => setUnlockPdf(!unlockPdf)}
          />
          Unlock PDF before processing
        </label>
        {unlockPdf && (
          <input
            type="password"
            placeholder="Unlock password"
            className="mt-2 w-full p-2 bg-gray-700 text-white rounded"
            value={unlockPassword}
            onChange={(e) => setUnlockPassword(e.target.value)}
          />
        )}
      </div>

      {/* Mode Selection */}
      <div className="flex gap-4">
        {["encrypt", "decrypt", "lock", "unlock"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              value={option}
              checked={mode === option}
              onChange={() => setMode(option)}
            />
            <span className="ml-2 capitalize">{option}</span>
          </label>
        ))}
      </div>

      {/* Algorithm selection */}
      <select
        disabled={mode === "lock" || mode === "unlock"}
        className="bg-gray-700 text-white p-2 rounded w-full"
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        <option value="pdf-aes">AES-256</option>
        <option value="pdf-rc4">RC4-128</option>
      </select>

      {/* Lock PDF */}
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={lockPdf}
            onChange={() => setLockPdf(!lockPdf)}
          />
          Lock PDF after processing
        </label>
        {lockPdf && (
          <input
            type="password"
            placeholder="Lock password"
            className="mt-2 w-full p-2 bg-gray-700 text-white rounded"
            value={lockPassword}
            onChange={(e) => setLockPassword(e.target.value)}
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-3 rounded font-bold flex justify-center items-center gap-2 ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          "Process PDF"
        )}
      </button>

      {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

      {/* Download Link */}
      {downloadUrl && (
        <div className="mt-4 text-center">
          <p className="text-green-400 text-sm">File processed successfully!</p>
          <a
            href={downloadUrl}
            download={`processed-${file.name}`}
            className="inline-block mt-2 px-4 py-2 bg-green-600 rounded hover:bg-green-700 font-semibold"
          >
            Download Manually
          </a>
        </div>
      )}
    </div>
  );
}
