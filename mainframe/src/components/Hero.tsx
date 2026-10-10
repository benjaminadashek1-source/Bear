import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

interface HeroProps {
  onActionClick?: (actionName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onActionClick }) => {
  const TYPEWRITER_TEXT =
    'Glad you stopped in. Good taste tends to find us. Now, what are we building?';
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600);

  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Pill buttons appear 400ms after page load, independent of the typewriter
  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText('hello@mainframe.co');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for clipboard permissions
      const textarea = document.createElement('textarea');
      textarea.value = 'hello@mainframe.co';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const pillButtons = [
    'Pitch us an idea',
    'Come work here',
    'Send a brief hello',
    'See how we operate',
  ];

  return (
    <section
      className="relative z-[1] w-full h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
      aria-label="Mainframe agency hero"
    >
      <div className="max-w-xl relative z-10 w-full">
        {/* 1. Blurred intro label (white text) */}
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6 text-white"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#fff',
            filter: 'blur(4px)',
          }}
          aria-hidden="true"
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </div>

        {/* 2. Typewriter text (white text) */}
        <p
          className="text-white mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          <span>{displayed}</span>
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
              aria-hidden="true"
            />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div
          className={`flex flex-wrap gap-y-1 transition-all ease-out ${
            pillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          style={{
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* 4 white pill buttons */}
          {pillButtons.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => onActionClick?.(label)}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer font-inherit"
            >
              {label}
            </button>
          ))}

          {/* 1 outline pill button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            title="Click to copy email address"
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer font-inherit relative group"
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1">hello@mainframe.co</span>
            </span>

            {/* Small 12x12 copy icon (two overlapping rectangles) */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-hidden="true"
            >
              {/* Back rectangle */}
              <path
                d="M8.5 3.5V2C8.5 1.44772 8.05228 1 7.5 1H2C1.44772 1 1 1.44772 1 2V7.5C1 8.05228 1.44772 8.5 2 8.5H3.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Front rectangle */}
              <rect
                x="3.5"
                y="3.5"
                width="7.5"
                height="7.5"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>

            {/* Subtle temporary copied notification badge */}
            {copied && (
              <span className="absolute -top-7 right-2 bg-white text-black text-[11px] px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap animate-fadeIn font-medium">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
