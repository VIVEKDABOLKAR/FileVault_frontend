import { useState } from "react";

export default function PdfFileForm({ mode, setMode, algorithm, setAlgorithm }) {
    const [file, setFile] = useState(null);
    //password for ec-dec
    const [password, setPassword] = useState("");
    //password for lock
    const [lockPdf, setLockPdf] = useState(false);
    const [pdfPassword, setPdfPassword] = useState('');
    //password for unlock
    const [unlockPdf, setUnlockPdf] = useState(false);
    const [unlockPassword, setUnlockPassword] = useState('');

    const [error, setError] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [loading, setLoading] = useState(false);
    


    const pdfAlgorithms = [
        { value: "pdf-aes", label: "AES-256 PDF Encryption" },
        { value: "pdf-rc4", label: "RC4 128-bit Encryption" },
    ];

    const handleSubmit = async () => {
        setError('');
        setDownloadUrl('');

        if (!file) {
            setError("Please select a PDF file.");
            return;
        }

        if ((mode === 'encrypt' || mode === 'decrypt') && !password) {
            setError("Please enter a password.");
            return;
        }

        if (lockPdf && !pdfPassword) {
            setError("Please enter a lock password.");
            return;
        }

        if (unlockPdf && !unlockPassword) {
            setError("Please enter a lock password.");
            return;
        }

        setLoading(true);

        // Placeholder for backend processing logic
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("mode", mode);
            formData.append("algorithm", algorithm);
            formData.append("password", password);
            formData.append("lockPdf", lockPdf);
            formData.append("lockpdfPassword", pdfPassword);
            formData.append("unlockPdf", unlockPdf);
            formData.append("unlockPassword", unlockPassword);

            // Simulated backend response
            // Replace with: const response = await axios.post("/api/pdf/process", formData, { responseType: "blob" });
            const response = { data: new Blob(["Dummy PDF content"], { type: "application/pdf" }) };

            const blobUrl = URL.createObjectURL(response.data);
            setDownloadUrl(blobUrl);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `processed-${file.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Processing error:", err);
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
                className="w-full border-amber-200 border-2 px-2 py-2"
            />

            {/* Unlock PDF Checkbox Section */}
            <div className="flex flex-col gap-2 text-sm mt-2">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={unlockPdf}
                        onChange={() => setUnlockPdf((prev) => !prev)}
                    />
                    Unlock PDF (remove password protection)
                </label>

                {unlockPdf && (
                    <input
                        type="password"
                        placeholder="Enter PDF unlock password"
                        value={unlockPassword}
                        onChange={(e) => setUnlockPassword(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-700 text-white"
                    />
                )}
            </div>


            <div className="flex gap-6 text-sm">
                {["encrypt", "decrypt", "unlock_lock"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                        <input
                            type="radio"
                            value={opt}
                            checked={mode === opt}
                            onChange={() => {
                                setMode(opt);
                                setAlgorithm(opt === "unlock_lock" ? "none" : "pdf-aes");
                                if (opt === "unlock_lock") setLockPdf(false);
                            }}
                        />
                        <span className="capitalize">{opt.replace("_", " ")}</span>
                    </label>
                ))}
            </div>

            {(mode === "encrypt" || mode === "decrypt") && (
                <>
                    <select
                        className="bg-gray-700 text-white p-2 rounded w-full"
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value)}
                    >
                        {pdfAlgorithms.map((algo) => (
                            <option key={algo.value} value={algo.value}>
                                {algo.label}
                            </option>
                        ))}
                    </select>

                    <input
                        type="password"
                        placeholder={mode === "encrypt" ? "Set password" : "Enter password to unlock"}
                        className="w-full p-2 bg-gray-700 text-white rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </>
            )}

            { (
                <div className="flex flex-col gap-2 text-sm">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={lockPdf}
                            onChange={() => setLockPdf((prev) => !prev)}
                        />
                        Lock PDF (prevent editing or copying)
                    </label>

                    {lockPdf && (
                        <input
                            type="password"
                            placeholder="Enter lock password"
                            value={pdfPassword}
                            onChange={(e) => setPdfPassword(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-700 text-white"
                        />
                    )}
                </div>
            )}

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 rounded font-bold flex justify-center items-center gap-2 ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
            >
                {loading ? "Processing..." : "Process PDF"}
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
