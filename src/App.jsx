import { useNavigate } from 'react-router';

export default function App() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-950 shadow z-50 px-12 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">🔐 FileVault</div>
        <div className="space-x-6 hidden md:block">
          <a href="#features" className="hover:text-indigo-400">Features</a>
          <a href="#howitworks" className="hover:text-indigo-400">How It Works</a>
          <a href="#about" className="hover:text-indigo-400">About</a>
          <button onClick={handleGetStarted} className="ml-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-12 bg-gradient-to-br from-indigo-700 to-purple-800 pt-24">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight max-w-4xl">
          Encrypt Files Securely on Your PC
        </h1>
        <p className="text-xl max-w-2xl mb-10">
          A browser-based tool built for desktop. Encrypt and decrypt sensitive documents instantly — no uploads required.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-8 py-4 bg-white text-indigo-800 font-bold text-lg rounded-full shadow hover:bg-gray-100 transition"
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-12 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Why Desktop Users Love It</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard title="AES-256 Protection" desc="Secure your files with enterprise-grade encryption." />
          <FeatureCard title="Instant Processing" desc="Encrypt and decrypt files directly in your browser." />
          <FeatureCard title="No Installation" desc="Works entirely in-browser — no software needed." />
        </div>
      </section>

      {/* How It Works */}
      <section id="howitworks" className="py-24 px-12 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Step number="1" text="Upload your file using our simple interface." />
          <Step number="2" text="Enter a strong password for encryption or decryption." />
          <Step number="3" text="Download your secured file immediately." />
        </div>
      </section>

      {/* Security Section */}
      <section id="about" className="bg-gray-800 py-24 px-12 text-center">
        <h2 className="text-4xl font-bold mb-6">Your Security, Our Priority</h2>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg">
          All encryption happens in your browser using industry-leading AES-256 technology. Your files never leave your device — ensuring maximum confidentiality and performance.
        </p>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-12 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to protect your files?</h2>
        <h1 className="text-4xl font-bold mb-6">Get Demo by converting simple text</h1>
        
        <button
        onClick={() => {navigate('/text');}}
          className="mt-4 px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-full hover:bg-indigo-700 transition"
        >
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-950 text-gray-500 text-center text-sm">
        <p>© {new Date().getFullYear()} FileVault — All rights reserved.</p>
        <p className="mt-2">Need help? Contact us at <span className="underline">support@filevault.com</span></p>
      </footer>
    </div>
  );
}

// Feature card component
function FeatureCard({ title, desc }) {
  return (
    <div className="p-8 bg-gray-800 rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}

// Step component
function Step({ number, text }) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
      <div className="text-indigo-400 text-4xl font-bold mb-2">{number}</div>
      <p className="text-gray-200">{text}</p>
    </div>
  );
}
