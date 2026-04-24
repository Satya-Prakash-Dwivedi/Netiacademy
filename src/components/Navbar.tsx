import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

/**
 * Navbar Component
 * 
 * A minimalist header navigation for Neti Academy.
 * Now featuring a dropdown for specialized sections.
 */

const mainNavItems = [
  { name: "Home", path: "/" },
  { name: "Current Affairs", path: "/current-affairs" },
  { name: "Mind", path: "/mind" },
  { name: "Courses", path: "/courses" },
];

const dropdownItems = [
  { name: "Plan B", path: "/plan-b" },
  { name: "Announcements", path: "/blogs" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {mainNavItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-bold transition-all duration-200 relative group/item ${isActive
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

            {/* Dropdown Menu */}
            <li className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-bold transition-colors ${isDropdownOpen ? 'text-blue-900' : 'text-slate-600 hover:text-blue-900'}`}
              >
                Insights
                <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Panel */}
              <div className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-200 origin-top-right ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="py-2">
                  {dropdownItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsDropdownOpen(false)}
                      className={({ isActive }) =>
                        `block px-6 py-3 text-sm font-bold transition-colors ${isActive ? 'text-blue-900 bg-blue-50' : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-sm font-bold transition-all duration-200 relative group/item ${isActive
                    ? "text-blue-900"
                    : "text-slate-600 hover:text-blue-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Contact
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-900 transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100 opacity-30'}`} />
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

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
        <ul className="flex flex-col py-6 gap-2">
          {mainNavItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-bold px-6 py-3 block transition-colors ${isActive
                    ? "text-blue-900 bg-blue-50/50 border-l-4 border-blue-900"
                    : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          
          {/* Mobile Dropdown Section */}
          <li className="px-6 py-3">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Insights & Updates</p>
             <div className="grid grid-cols-2 gap-4">
                {dropdownItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-sm font-bold p-4 rounded-2xl border transition-colors ${isActive 
                        ? 'text-blue-900 bg-blue-50 border-blue-100' 
                        : 'text-slate-600 bg-white border-slate-100 hover:border-blue-100'}`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
             </div>
          </li>

          <li>
            <NavLink
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-bold px-6 py-3 block transition-colors ${isActive
                  ? "text-blue-900 bg-blue-50/50 border-l-4 border-blue-900"
                  : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
