'use client';

import { useState } from 'react';

interface NavbarProps {
  onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-3xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            🩺
          </span>
          <h1 className="text-2xl font-bold gradient-text">AsthmaCare</h1>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 items-center text-sm font-medium">
          <li>
            <a href="#" className="nav-link text-slate-600 hover:text-blue-600 transition-colors py-1">
              หน้าแรก
            </a>
          </li>
          <li>
            <a href="#packages" className="nav-link text-slate-600 hover:text-blue-600 transition-colors py-1">
              แพ็กเกจสมาชิก
            </a>
          </li>
          <li>
            <a href="#screening" className="nav-link text-slate-600 hover:text-blue-600 transition-colors py-1">
              คัดกรองอาการ
            </a>
          </li>
          <li>
            <a href="#articles" className="nav-link text-slate-600 hover:text-blue-600 transition-colors py-1">
              บทความสุขภาพ
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {/* Login Button */}
          <button
            onClick={onLoginClick}
            className="hidden md:inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 text-sm btn-ripple hover:scale-105 active:scale-95 cursor-pointer"
          >
            เข้าสู่ระบบ / สมัครสมาชิก
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 transition-transform active:scale-90"
            aria-label="เมนู"
          >
            <span
              className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu md:hidden ${menuOpen ? 'open' : ''}`}>
        <div className="px-4 pb-4 space-y-3">
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-slate-600 hover:text-blue-600 font-medium hover:translate-x-1 transition-all"
          >
            หน้าแรก
          </a>
          <a
            href="#packages"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-slate-600 hover:text-blue-600 font-medium hover:translate-x-1 transition-all"
          >
            แพ็กเกจสมาชิก
          </a>
          <a
            href="#screening"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-slate-600 hover:text-blue-600 font-medium hover:translate-x-1 transition-all"
          >
            คัดกรองอาการ
          </a>
          <a
            href="#articles"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-slate-600 hover:text-blue-600 font-medium hover:translate-x-1 transition-all"
          >
            บทความสุขภาพ
          </a>
          <button
            onClick={() => { setMenuOpen(false); onLoginClick(); }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm btn-ripple active:scale-95 transition-transform cursor-pointer"
          >
            เข้าสู่ระบบ / สมัครสมาชิก
          </button>
        </div>
      </div>
    </nav>
  );
}
