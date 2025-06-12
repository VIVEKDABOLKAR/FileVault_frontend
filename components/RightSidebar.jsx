import { useState } from "react";

const algorithmInfo = {
  aes: {
    name: 'AES-256 (Advanced Encryption Standard)',
    topics: [
      { title: 'Overview', content: 'AES-256 is a symmetric block cipher used worldwide for high-security encryption. It is part of the AES family standardized by NIST.' },
      { title: 'Key Size', content: 'It uses a 256-bit key to encrypt 128-bit blocks, offering strong resistance against brute-force attacks.' },
      { title: 'Security', content: 'AES-256 is considered secure against all known attacks and is trusted for top-secret government data.' },
      { title: 'Use Cases', content: 'Widely used in TLS/SSL, disk encryption (BitLocker, FileVault), VPNs, and secure file storage.' },
      { title: 'Performance', content: 'AES is hardware-accelerated on most modern CPUs using AES-NI for fast and efficient encryption.' },
      { title: 'Learn More', content: 'https://csrc.nist.gov/publications/detail/fips/197/final' },
    ],
  },
  chacha20: {
    name: 'ChaCha20',
    topics: [
      { title: 'Overview', content: 'ChaCha20 is a high-speed, secure stream cipher designed to replace older ciphers like RC4 and mitigate timing attacks.' },
      { title: 'Design', content: 'Developed by Daniel Bernstein, it builds upon Salsa20 and provides better diffusion with simplified structure.' },
      { title: 'Security', content: 'ChaCha20 is resistant to timing attacks and offers strong security when used with Poly1305 for AEAD (authenticated encryption).' },
      { title: 'Use Cases', content: 'Used in OpenSSH, TLS 1.3, Android disk encryption, and Google services.' },
      { title: 'Performance', content: 'Outperforms AES on mobile devices and software-only systems lacking AES hardware acceleration.' },
      { title: 'Learn More', content: 'https://tools.ietf.org/html/rfc8439' },
    ],
  },
  rsa: {
    name: 'RSA (Rivest-Shamir-Adleman)',
    topics: [
      { title: 'Overview', content: 'RSA is an asymmetric algorithm used for encrypting small amounts of data and digital signatures.' },
      { title: 'Key Pair', content: 'RSA involves a public key for encryption and a private key for decryption, based on large prime number factorization.' },
      { title: 'Security', content: 'Security depends on key size (2048+ bits recommended). Vulnerable to quantum computing in the future.' },
      { title: 'Use Cases', content: 'Used in SSL/TLS, PGP, digital signatures, and secure software licensing.' },
      { title: 'Limitations', content: 'Too slow for large files; commonly used for key exchange followed by symmetric encryption.' },
      { title: 'Learn More', content: 'https://en.wikipedia.org/wiki/RSA_(cryptosystem)' },
    ],
  },
  base64: {
    name: 'Base64 (Encoding Only)',
    topics: [
      { title: 'Overview', content: 'Base64 encodes binary data into ASCII characters. It is not encryption and offers no confidentiality.' },
      { title: 'Use Case', content: 'Commonly used in data URIs, JSON APIs, email (MIME), and when transferring binary over text channels.' },
      { title: 'No Security', content: 'Base64 is completely reversible without a key—suitable only for data formatting, not protection.' },
      { title: 'Output Size', content: 'Increases size by ~33%. Every 3 bytes of data become 4 Base64 characters.' },
      { title: 'Variants', content: 'Standard Base64, Base64url (used in JWT), and MIME Base64 with line breaks.' },
      { title: 'Learn More', content: 'https://datatracker.ietf.org/doc/html/rfc4648' },
    ],
  },
  xor: {
    name: 'XOR Cipher',
    topics: [
      { title: 'Overview', content: 'The XOR cipher uses the XOR bitwise operation between plaintext and key for encryption/decryption.' },
      { title: 'Simplicity', content: 'Very fast and easy to implement, often used for educational purposes and simple obfuscation.' },
      { title: 'Security', content: 'Extremely weak if the key is reused or short. Easily broken with frequency analysis or brute force.' },
      { title: 'Use Cases', content: 'Used in embedded systems, low-security data masking, and legacy systems.' },
      { title: 'Enhancements', content: 'Can be combined with compression or stronger ciphers for slightly better security.' },
      { title: 'Learn More', content: 'https://en.wikipedia.org/wiki/XOR_cipher' },
    ],
  },
  'pdf-aes': {
    name: 'PDF AES-256 Encryption',
    topics: [
      { title: 'Overview', content: 'PDF AES encryption secures documents with AES-256 symmetric key encryption.' },
      { title: 'PDF Versions', content: 'Supported in PDF 1.7 and later (Adobe Acrobat 9+), part of the ISO 32000 standard.' },
      { title: 'Features', content: 'Encrypts file content, metadata, permissions, and supports certificate-based encryption.' },
      { title: 'Security', content: 'Provides strong protection against unauthorized access when used with a long password.' },
      { title: 'Use Cases', content: 'Used in secure document workflows for government, finance, legal, and healthcare industries.' },
      { title: 'Learn More', content: 'https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/pdfreference1.7old.pdf' },
    ],
  },
  'pdf-rc4': {
    name: 'PDF RC4 128-bit Encryption',
    topics: [
      { title: 'Overview', content: 'RC4-based encryption was commonly used in older PDF versions (up to PDF 1.5).' },
      { title: 'Key Size', content: 'Typically uses 40-bit or 128-bit keys for encryption. RC4 is a stream cipher.' },
      { title: 'Weaknesses', content: 'RC4 is deprecated due to vulnerabilities—predictable output and key biases.' },
      { title: 'Compatibility', content: 'Still supported in legacy readers for backward compatibility.' },
      { title: 'Transition', content: 'Modern PDF encryption has shifted to AES-based methods for better security.' },
      { title: 'Learn More', content: 'https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/PDF32000_2008.pdf' },
    ],
  },
};


export default function RightSidebar({ mode, algorithm }) {
  if (mode === "help") {
    return (
      <aside className="h-screen w-80 bg-gray-800 text-white shadow-lg flex flex-col p-6 overflow-y-auto sticky top-0 z-40">
        <h2 className="text-xl font-bold mb-4">Help & Information</h2>
        <p className="text-gray-300 mb-2">
          This section provides information about supported encryption algorithms and how they work. Use the main page to test them in real-time.
        </p>
        <p className="text-sm text-gray-500 italic">Try by using our tool</p>
      </aside>
    );
  }

  const algo = algorithmInfo[algorithm];
  const getModeDescription = () =>
    mode === 'encrypt'
      ? '🔐 You are encrypting a file. Keep your password safe.'
      : '🔓 You are decrypting a file. Use the correct password.';

  return (
    <aside className="h-screen w-80 bg-gray-800 text-white shadow-lg flex flex-col p-6 overflow-y-auto sticky top-0 z-40">
      <h2 className="text-xl font-bold mb-2">File Operation</h2>
      <p className="text-sm text-gray-300 mb-4">{getModeDescription()}</p>

      <div className="bg-gray-500 rounded-lg p-4 space-y-2">
        <h3 className="text-lg font-semibold mb-2">{algo?.name || 'Select an Algorithm'}</h3>

        {algo?.topics.map((topic, idx) => (
          <details key={idx} className="bg-gray-700 rounded p-2">
            <summary className="cursor-pointer text-sm font-medium">{topic.title}</summary>
            <p className="text-sm text-gray-300 mt-1">{topic.content}</p>
          </details>
        ))}
      </div>
    </aside>
  );
}