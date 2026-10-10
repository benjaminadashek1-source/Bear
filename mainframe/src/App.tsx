/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ActionModal } from './components/ActionModal';

export default function App() {
  const [modalTopic, setModalTopic] = useState<string | null>(null);

  const handleOpenTopic = (topic: string) => {
    setModalTopic(topic);
  };

  const handleCloseModal = () => {
    setModalTopic(null);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none bg-black">
      {/* Background Video with Mouse Scrubbing */}
      <BackgroundVideo />

      {/* Fixed Navbar (z-index: 10) & Mobile Overlay (z-index: 9) */}
      <Navbar onNavigate={handleOpenTopic} />

      {/* Main Hero Section (z-index: 1) */}
      <main>
        <Hero onActionClick={handleOpenTopic} />
      </main>

      {/* Interactive Modal for Actions & Navigation */}
      <ActionModal
        isOpen={Boolean(modalTopic)}
        onClose={handleCloseModal}
        topic={modalTopic}
      />
    </div>
  );
}
