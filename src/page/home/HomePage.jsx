// pages/home/Home.jsx
import { useState } from "react";
import FileProcessorLayout from "../FileProcessorLayout.jsx";
import FileUploadForm from "../../../components/FileUploader.jsx";


export default function Home() {
  const [mode, setMode] = useState("encrypt");
  const [algorithm, setAlgorithm] = useState("aes");

  return (
    <FileProcessorLayout mode={mode} algorithm={algorithm}>
      <FileUploadForm
        mode={mode}
        setMode={setMode}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />
    </FileProcessorLayout>
  );
}
