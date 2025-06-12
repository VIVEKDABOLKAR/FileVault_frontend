import { useState } from "react";
import FileProcessorLayout from "../FileProcessorLayout";
import { processText } from "../../../api/fileService";

const algorithms = ["aes", "xor", "base64", "chacha20", "rsa"];

export default function TextPage() {
    const [mode, setMode] = useState("encrypt");
    const [algorithm, setAlgorithm] = useState("aes");
    const [password, setPassword] = useState("");
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");

    const handleProcess = async () => {
        if (!inputText) return alert("Input text is required");

        try {

            const res = await processText({
                text: inputText,
                password: password,
                algorithm: algorithm,
                mode: mode,
            })

            if (!res.status) throw new Error(data.message || "Processing failed");

            setOutputText(res.data.result);
        } catch (err) {
            console.log(err)
            alert(err.message);
        }
    };

    return (
        <FileProcessorLayout mode={mode} algorithm={algorithm}>
            <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Live Text Encryption / Decryption
                </h1>

                <div className="flex gap-4 mb-4">
                    <select
                        className="bg-gray-700 px-4 py-2 rounded w-1/2"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                    >
                        <option value="encrypt">Encrypt</option>
                        <option value="decrypt">Decrypt</option>
                    </select>

                    <select
                        className="bg-gray-700 px-4 py-2 rounded w-1/2"
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value)}
                    >
                        {algorithms.map((algo) => (
                            <option key={algo} value={algo}>
                                {algo.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>

                {algorithm !== "base64" && (
                    <input
                        className="bg-gray-700 px-4 py-2 rounded w-full mb-4"
                        type="password"
                        placeholder="Password (required for AES/XOR)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                )}

                <textarea
                    className="w-full h-32 bg-gray-700 p-4 rounded mb-4 resize-none"
                    placeholder="Enter text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />

                <button
                    onClick={handleProcess}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded font-semibold"
                >
                    {mode === "encrypt" ? "Encrypt" : "Decrypt"}
                </button>

                {outputText && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">Result:</h2>
                        <textarea
                            className="w-full h-32 bg-gray-700 p-4 rounded resize-none"
                            value={outputText}
                            readOnly
                        />

                        <button
                            className="mt-2 bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded font-semibold"
                            onClick={() => {
                                navigator.clipboard.writeText(outputText);
                                alert("Output copied to clipboard!");
                            }}
                        >
                            Copy to Clipboard
                        </button>
                    </div>
                )}
            </div>
        </FileProcessorLayout>
    );
}
