import { Link } from "react-router";

export default function LeftSidebar() {
  return (
    <div className="w-80 bg-gray-800 p-4 text-white rounded-xl space-y-4">
      <h2 className="text-lg font-semibold">Tools</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/home" className="hover:text-indigo-400 transition">
            • ALL FILE
          </Link>
        </li>
        <li>
          <Link to="/text" className="hover:text-indigo-400 transition">
            • TEXT
          </Link>
        </li>
        <li>• Encrypt Folder (coming soon)</li>
        <li>
          <Link to="/faqs" className="hover:text-indigo-400 transition">
            •  Help & FAQs
          </Link>
        </li>
      </ul>
    </div>
  );
}
