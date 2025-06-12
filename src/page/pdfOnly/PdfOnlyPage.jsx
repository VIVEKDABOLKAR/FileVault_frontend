// pages/pdf/PdfEncrypt.jsx
import { useState } from "react";
import FileProcessorLayout from "../FileProcessorLayout";
import PdfFileForm from "../../../components/PdfFileForm";


export default function PdfOnlyForm() {
  const [mode, setMode] = useState("encrypt");
  const [algorithm, setAlgorithm] = useState("pdf-lock"); // or any default algo for PDF

  return (
    <FileProcessorLayout mode={mode} algorithm={algorithm}>
      <PdfFileForm
        mode={mode}
        setMode={setMode}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />
    </FileProcessorLayout>
  );
}
