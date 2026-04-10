import { useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Navbar Component
 * 
 * A minimalist header navigation for Neti Academy.
 * Designed with an academic, clean, and distraction-free aesthetic.
 * Now fully responsive with a mobile-optimized menu.
 */

const navItems = [
  { name: "Home", path: "/" },
  { name: "Mind", path: "/mind" },
  { name: "Current Affairs", path: "/current-affairs" },
  { name: "Plan B", path: "/plan-b" },
  { name: "Announcements", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand Section */}
        <div className="flex-shrink-0">
          <NavLink to="/" className="flex items-center gap-4 md:gap-6 group">
            <img
              src="/Neti_logo.jpeg"
              alt="Neti Academy Logo"
              className="h-14 w-14 md:h-24 md:w-24 rounded-full object-cover shadow-md transition-transform group-hover:scale-105 ring-2 ring-slate-100"
            />
            <div className="flex flex-col">
              <span className="text-blue-900 font-playfair text-base md:text-3xl font-bold tracking-tight leading-none">
                NETI ACADEMY
              </span>
              <span className="text-blue-900/60 font-playfair italic text-[9px] md:text-sm font-medium tracking-wide mt-1">
                नेति नेति — not this, not this
              </span>
            </div>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 relative group/item ${isActive
                    ? "text-blue-900"
                    : "text-slate-600 hover:text-blue-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-900 transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 opacity-30'}`} />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-slate-600 hover:text-blue-900 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 border-t border-slate-100 mt-4 visible' : 'max-h-0 opacity-0 invisible'}`}>
        <ul className="flex flex-col py-6 gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium px-4 py-2 block transition-colors ${isActive
                    ? "text-blue-900 bg-slate-50 border-l-4 border-blue-900"
                    : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
