import React, { useState } from 'react';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string | null;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  topic,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formEmail, setFormEmail] = useState('');

  if (!isOpen || !topic) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormMessage('');
      setFormEmail('');
      onClose();
    }, 1800);
  };

  const renderContent = () => {
    switch (topic) {
      case 'Pitch us an idea':
        return (
          <div>
            <h3 className="text-2xl font-medium tracking-tight mb-2">Pitch an Idea</h3>
            <p className="text-sm text-neutral-600 mb-6">
              We partner with visionary founders, forward brands, and bold thinkers. Tell us what you are aiming to build.
            </p>
            {submitted ? (
              <div className="py-8 text-center text-black font-medium animate-fadeIn">
                ✓ Idea received. Our studio leads will follow up shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-3 py-2 bg-neutral-100 border border-neutral-300 rounded text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                    Concept Brief / Vision
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="What is the problem, the angle, or the dream?"
                    className="w-full px-3 py-2 bg-neutral-100 border border-neutral-300 rounded text-sm focus:outline-none focus:border-black resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-neutral-600 hover:text-black cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm bg-black text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Send Pitch
                  </button>
                </div>
              </form>
            )}
          </div>
        );

      case 'Come work here':
      case 'Openings':
        return (
          <div>
            <h3 className="text-2xl font-medium tracking-tight mb-2">Join Mainframe</h3>
            <p className="text-sm text-neutral-600 mb-4">
              We are a team of designers, systems architects, and creative directors building at the edge of physical & digital realities.
            </p>
            <div className="space-y-3 my-4">
              <div className="p-3 border border-neutral-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Lead Creative Technologist</div>
                  <div className="text-xs text-neutral-500">Creative Engineering • NYC / Remote</div>
                </div>
                <span className="text-xs bg-neutral-100 px-2.5 py-1 rounded-full">Open</span>
              </div>
              <div className="p-3 border border-neutral-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Principal Brand Architect</div>
                  <div className="text-xs text-neutral-500">Identity & Spatial Systems • Tokyo / London</div>
                </div>
                <span className="text-xs bg-neutral-100 px-2.5 py-1 rounded-full">Open</span>
              </div>
              <div className="p-3 border border-neutral-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Interface Research Fellow</div>
                  <div className="text-xs text-neutral-500">A.R.I.A Systems Lab • Remote</div>
                </div>
                <span className="text-xs bg-neutral-100 px-2.5 py-1 rounded-full">Open</span>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
              <a
                href="mailto:careers@mainframe.co"
                className="px-5 py-2 text-sm bg-black text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Apply via careers@mainframe.co
              </a>
            </div>
          </div>
        );

      case 'Send a brief hello':
        return (
          <div>
            <h3 className="text-2xl font-medium tracking-tight mb-2">Say Hello</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Drop a quick note. No pitch decks required.
            </p>
            {submitted ? (
              <div className="py-8 text-center text-black font-medium animate-fadeIn">
                ✓ Message received. Have an inspiring day!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3 py-2 bg-neutral-100 border border-neutral-300 rounded text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full px-3 py-2 bg-neutral-100 border border-neutral-300 rounded text-sm focus:outline-none focus:border-black resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-neutral-600 hover:text-black cursor-pointer"
                  >
                    Dismiss
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm bg-black text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Send Hello
                  </button>
                </div>
              </form>
            )}
          </div>
        );

      case 'See how we operate':
        return (
          <div>
            <h3 className="text-2xl font-medium tracking-tight mb-2">How We Operate</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Mainframe exists to fuse computational rigor with uncompromising aesthetic direction.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left my-4">
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <div className="text-xs font-semibold text-black mb-1">01. Direct Execution</div>
                <div className="text-xs text-neutral-600">No account managers. You collaborate directly with principal creators and engineers.</div>
              </div>
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <div className="text-xs font-semibold text-black mb-1">02. Dynamic Interfaces</div>
                <div className="text-xs text-neutral-600">We construct sensory, mouse-scrubbed, and adaptive systems tailored to brand narrative.</div>
              </div>
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <div className="text-xs font-semibold text-black mb-1">03. High Craft Velocity</div>
                <div className="text-xs text-neutral-600">From generative prototypes to production-ready releases with rapid cycle cadence.</div>
              </div>
              <div className="p-3 bg-neutral-50 rounded border border-neutral-200">
                <div className="text-xs font-semibold text-black mb-1">04. The A.R.I.A Engine</div>
                <div className="text-xs text-neutral-600">Embedded intelligence responding naturally to visitor gesture, intent, and curiosity.</div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm bg-black text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        );

      case 'Labs':
        return (
          <div>
            <h3 className="text-2xl font-medium tracking-tight mb-2">Mainframe Labs</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Experimental computational media, interactive video controllers, generative typography, and spatial web systems.
            </p>
            <div className="space-y-2 text-xs text-neutral-700 my-4">
              <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200 flex justify-between items-center">
                <span>01. Vector Scrubber Architecture</span>
                <span className="font-mono text-[10px] text-neutral-500">v2.4 Live</span>
              </div>
              <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200 flex justify-between items-center">
                <span>02. A.R.I.A Adaptive Dialogue Core</span>
                <span className="font-mono text-[10px] text-neutral-500">v1.1 Live</span>
              </div>
              <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200 flex justify-between items-center">
                <span>03. Kinetic Spatial Display Engine</span>
                <span className="font-mono text-[10px] text-neutral-500">In Testing</span>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm bg-black text-white rounded-full cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        );

      case 'Shop':
        return (
          <div>
            <h3 className="text-2xl font-medium tracking-tight mb-2">Mainframe Shop</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Physical editions, bespoke typographic specimens, and limited hardware drops.
            </p>
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded text-center my-4">
              <div className="text-sm font-medium mb-1">Drop 004 — Coming Winter 2026</div>
              <div className="text-xs text-neutral-500">Join the priority dispatch list at hello@mainframe.co</div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm bg-black text-white rounded-full cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        );

      case 'Studio':
      case 'Contact':
      default:
        return (
          <div>
            <h3 className="text-2xl font-medium tracking-tight mb-2">Get in touch</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Mainframe operates across New York, London, and Tokyo. Reach our team directly:
            </p>
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded my-4 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 text-xs">Direct Email</span>
                <a href="mailto:hello@mainframe.co" className="font-medium underline underline-offset-2">
                  hello@mainframe.co
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 text-xs">Press & Labs</span>
                <a href="mailto:press@mainframe.co" className="font-medium underline underline-offset-2">
                  press@mainframe.co
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 text-xs">Locations</span>
                <span className="text-neutral-700">SoHo, NYC • Shibuya, Tokyo</span>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm bg-black text-white rounded-full cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white text-black w-full max-w-md p-6 sm:p-7 rounded-2xl shadow-2xl relative border border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black text-lg w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 cursor-pointer transition-colors"
          aria-label="Close dialog"
        >
          ✕
        </button>
        {renderContent()}
      </div>
    </div>
  );
};
