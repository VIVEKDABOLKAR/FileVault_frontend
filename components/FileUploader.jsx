import { useState } from "react";
import { processFile } from "../api/fileService";

export default function FileUploadForm({ mode, setMode, algorithm, setAlgorithm }) {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSubmit = async () => {
    if (!file || !password) {
      setError('Please select a file and enter a password.');
      return;
    }

    setError('');
    setLoading(true);
    setDownloadUrl('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', mode);
    formData.append('algorithm', algorithm);
    formData.append('password', password);

    try {
      const response = await processFile(formData);
      const blobUrl = URL.createObjectURL(response.data);
      setDownloadUrl(blobUrl);

      // Auto-download attempt
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `processed-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error processing file", err);
      setError("Something went wrong while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6 w-full max-w-xl mx-auto">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full text-white border-amber-200 border-2 px-2 py-2"
      />

      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            value="encrypt"
            checked={mode === 'encrypt'}
            onChange={() => setMode('encrypt')}
          />
          <span className="ml-2">Encrypt</span>
        </label>
        <label>
          <input
            type="radio"
            value="decrypt"
            checked={mode === 'decrypt'}
            onChange={() => setMode('decrypt')}
          />
          <span className="ml-2">Decrypt</span>
        </label>
      </div>

      <select
        className="bg-gray-700 text-white p-2 rounded w-full"
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        <option value="aes">AES-256</option>
        <option value="chacha20">ChaCha20</option>
        <option value="rsa">RSA</option>
      </select>

      <input
        type="password"
        placeholder="Enter password"
        className="w-full p-2 bg-gray-700 text-white rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p className="text-red-400 font-medium text-sm">{error}</p>
      )}

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
          "Process File"
        )}
      </button>


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
