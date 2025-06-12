import { Link } from 'react-router'; // changed to 'react-router-dom' instead of 'react-router'
import { useState } from 'react';

export default function Navbar() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-8 py-4 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/">🔐 FileVault</Link>
      </div>

      {/* Navigation */}
      <ul className="flex space-x-8 text-sm font-medium relative">
        <li>
          <Link to="/home" className="hover:text-indigo-400 transition">Home</Link>
        </li>

        {/* How It Works */}
        <li className="relative">
          <button
            onClick={() => {
              setShowHowItWorks(!showHowItWorks);
              setShowServices(false);
              setShowContact(false);
            }}
            className="hover:text-indigo-400 transition"
          >
            How it Works
          </button>
          {showHowItWorks && (
            <div className="absolute bg-gray-800 text-sm text-white p-4 mt-2 rounded shadow-lg w-64 z-50">
              <p className="mb-2 font-semibold">Using FileVault</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>Choose an encryption method.</li>
                <li>Upload your file or paste text.</li>
                <li>Enter a secure password.</li>
                <li>Encrypt or decrypt in one click!</li>
              </ul>
            </div>
          )}
        </li>

        {/* Services */}
        <li className="relative">
          <button
            onClick={() => {
              setShowServices(!showServices);
              setShowHowItWorks(false);
              setShowContact(false);
            }}
            className="hover:text-indigo-400 transition"
          >
            Services
          </button>
          {showServices && (
            <div className="absolute bg-gray-800 text-sm text-white p-4 mt-2 rounded shadow-lg w-48 z-50">
              <ul className="space-y-2">
                <li><Link to="/home" className="hover:underline">📁 All Files</Link></li>
                <li><Link to="/text" className="hover:underline">📝 Text</Link></li>
                <li><Link to="/pdf_only" className="hover:underline">📄 PDF</Link></li>
              </ul>
            </div>
          )}
        </li>

        {/* Contact */}
        <li className="relative">
          <button
            onClick={() => {
              setShowContact(!showContact);
              setShowHowItWorks(false);
              setShowServices(false);
            }}
            className="hover:text-indigo-400 transition"
          >
            Contact
          </button>
          {showContact && (
            <div className="absolute  right-0 translate-x-[-0.5%] bg-gray-800 text-sm text-white p-4 mt-2 rounded shadow-lg w-52 z-50">
              <p className="mb-2 font-semibold">Support</p>
              <ul className="space-y-2">
                <li><a href="https://www.instagram.com/vivekdabolkar/" target="_blank" rel="noopener noreferrer" className="hover:underline">📸 Instagram</a></li>
                <li><a href="https://x.com/DAVIVEK27" target="_blank" rel="noopener noreferrer" className="hover:underline">🐦 Twitter</a></li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
