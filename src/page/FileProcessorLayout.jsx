// components/layout/FileProcessorLayout.jsx

import LeftSidebar from "../../components/LeftSidebar";
import Navbar from "../../components/Navbar";
import RightSidebar from "../../components/RightSidebar";


export default function FileProcessorLayout({ children, mode, algorithm }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex pt-24 px-6 gap-6">
        <LeftSidebar />
        <main className="flex-1 flex justify-center">{children}</main>
        <RightSidebar mode={mode} algorithm={algorithm} />
      </div>
    </div>
  );
}
