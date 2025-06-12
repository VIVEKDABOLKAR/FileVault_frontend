import FileProcessorLayout from "../FileProcessorLayout";

const faqs = [
  {
    question: "What types of encryption are supported?",
    answer: "We currently support AES, XOR, Base64, ChaCha20, and RSA for both file and text-based encryption and decryption.",
  },
  {
    question: "Do I need a password for all algorithms?",
    answer: "No. Only AES, XOR, ChaCha20, and RSA require passwords or keys. Base64 does not require a password as it's an encoding method.",
  },
  {
    question: "How secure is AES encryption?",
    answer: "AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used for its strength and performance. We use AES-256-CBC mode with SHA-256 derived keys.",
  },
  {
    question: "Why does the decrypted text look broken?",
    answer: "Encrypted data is returned in Base64 format. You must decrypt it using the correct password and same algorithm to restore readable text.",
  },
  {
    question: "Is my data stored or logged?",
    answer: "No. Your data is processed temporarily in memory and not stored or logged on the server.",
  },
  {
    question: "Why do I get a 'Invalid encrypted data' error?",
    answer: "This usually means the encrypted data was altered, or the wrong algorithm or password was used during decryption.",
  },
];

export default function HelpFaqPage() {
  return (
    <FileProcessorLayout mode="help" algorithm="">
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Help & FAQs</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
              <hr className="border-gray-600 my-4" />
            </div>
          ))}
        </div>
      </div>
    </FileProcessorLayout>
  );
}
