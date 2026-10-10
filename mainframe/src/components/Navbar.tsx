import React, { useState } from 'react';

interface NavbarProps {
  onNavigate?: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <>
      {/* Fixed top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo (left) */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('Home');
            }}
            className="text-[21px] sm:text-[26px] tracking-tight text-white cursor-pointer font-heading select-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </a>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none leading-none inline-block"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center text-[23px] text-white select-none"
        >
          <button
            type="button"
            onClick={() => handleNavClick('Labs')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-[23px] text-white font-inherit"
          >
            Labs
          </button>
          <span className="text-white">,&nbsp;</span>
          <button
            type="button"
            onClick={() => handleNavClick('Studio')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-[23px] text-white font-inherit"
          >
            Studio
          </button>
          <span className="text-white">,&nbsp;</span>
          <button
            type="button"
            onClick={() => handleNavClick('Openings')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-[23px] text-white font-inherit"
          >
            Openings
          </button>
          <span className="text-white">,&nbsp;</span>
          <button
            type="button"
            onClick={() => handleNavClick('Shop')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-[23px] text-white font-inherit"
          >
            Shop
          </button>
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('Contact');
          }}
          className="hidden md:inline-block text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer select-none"
        >
          Get in touch
        </a>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 p-1 relative z-20 cursor-pointer focus:outline-none"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-all duration-300 z-[9] ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          onClick={() => handleNavClick('Labs')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-left"
        >
          Labs
        </button>
        <button
          type="button"
          onClick={() => handleNavClick('Studio')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-left"
        >
          Studio
        </button>
        <button
          type="button"
          onClick={() => handleNavClick('Openings')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-left"
        >
          Openings
        </button>
        <button
          type="button"
          onClick={() => handleNavClick('Shop')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-left"
        >
          Shop
        </button>
        <button
          type="button"
          onClick={() => handleNavClick('Contact')}
          className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-left mt-2"
        >
          Get in touch
        </button>
      </div>
    </>
  );
};
