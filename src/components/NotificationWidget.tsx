import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NotificationWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  // Automatically open the widget shortly after the page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); // 1.5 seconds delay for a smooth entrance

    setIsRendered(true);

    return () => clearTimeout(timer);
  }, []);

  if (!isRendered) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Expanded Window */}
      <div
        className={`bg-white w-80 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-200 overflow-hidden transition-all duration-500 ease-in-out transform origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0 translate-x-0 mb-4"
            : "scale-0 opacity-0 translate-y-10 translate-x-10 absolute bottom-0 right-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#1E3A8A] text-white px-5 py-4 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="80" cy="20" r="40" stroke="currentColor" strokeWidth="8"/>
              <circle cx="80" cy="20" r="20" stroke="currentColor" strokeWidth="4"/>
            </svg>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <svg className="w-5 h-5 text-[#C8A951]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h4 className="font-playfair font-bold text-lg tracking-wide">New Release</h4>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition-colors relative z-10"
            aria-label="Close notification"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-[#F8F9FB]">
          <h5 className="font-playfair font-bold text-[#0F172A] text-xl mb-2">Welcome to Neti Academy</h5>
          <p className="text-sm font-inter text-[#475569] leading-relaxed mb-6">
            A new era of distraction-free learning. Discover our philosophy and how we approach serious UPSC preparation.
          </p>
          <Link
            to="/blogs/welcome-to-neti-academy"
            onClick={() => setIsOpen(false)}
            className="block text-center w-full bg-[#1E3A8A] text-white font-inter font-bold py-3 rounded-lg shadow-md hover:bg-[#152865] hover:shadow-lg transition-all duration-300"
          >
            Read the Manifesto
          </Link>
        </div>
      </div>

      {/* Persistent Icon Button (Visible when closed) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#1E3A8A] text-white p-4 rounded-full shadow-xl hover:scale-105 hover:bg-blue-900 transition-all duration-300 flex items-center justify-center relative ${
          isOpen ? "scale-0 opacity-0 absolute" : "scale-100 opacity-100"
        }`}
        aria-label="Open notifications"
      >
        <span className="absolute top-0 right-0 w-3 h-3 bg-[#C8A951] rounded-full ring-2 ring-white animate-pulse"></span>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
    </div>
  );
};

export default NotificationWidget;
