import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  saveVideoBlob,
  getSavedVideoBlob,
  removeSavedVideoBlob,
} from '../utils/videoStorage';

const DEFAULT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';
const SENSITIVITY = 0.8;

export const BackgroundVideo: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>(DEFAULT_VIDEO_URL);
  const [isCustomVideo, setIsCustomVideo] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isSeekingRef = useRef<boolean>(false);
  const targetTimeRef = useRef<number>(0);
  const prevXRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Restore any saved local video from IndexedDB
  useEffect(() => {
    let objectUrl: string | null = null;
    getSavedVideoBlob().then((blob) => {
      if (blob) {
        objectUrl = URL.createObjectURL(blob);
        setVideoSrc(objectUrl);
        setIsCustomVideo(true);
      }
    });

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file || !file.type.startsWith('video/')) return;
    try {
      await saveVideoBlob(file);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsCustomVideo(true);
    } catch (err) {
      console.error('Failed to save video:', err);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsCustomVideo(true);
    }
  }, []);

  const handleResetVideo = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await removeSavedVideoBlob();
    setVideoSrc(DEFAULT_VIDEO_URL);
    setIsCustomVideo(false);
  };

  // Video loaded initial frame
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0.001;
      targetTimeRef.current = 0.001;
    }
  };

  // High-performance seek application decoupled via requestAnimationFrame
  const executeSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) {
      isSeekingRef.current = false;
      return;
    }

    // Do not flood if video hardware decoder is currently seeking
    if (video.seeking || isSeekingRef.current) {
      return;
    }

    const diff = Math.abs(video.currentTime - targetTimeRef.current);
    if (diff < 0.015) {
      isSeekingRef.current = false;
      return;
    }

    isSeekingRef.current = true;

    // Use fastSeek on supported browsers (Chrome, Safari, Firefox) for 10x faster seek performance
    const target = targetTimeRef.current;
    if ('fastSeek' in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === 'function') {
      try {
        (video as unknown as { fastSeek: (t: number) => void }).fastSeek(target);
      } catch {
        video.currentTime = target;
      }
    } else {
      video.currentTime = target;
    }
  }, []);

  // When a seek completes, release flag and schedule next seek on next animation frame
  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;

    const video = videoRef.current;
    if (!video || !video.duration) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(executeSeek);
    }
  }, [executeSeek]);

  useEffect(() => {
    const queueSeek = () => {
      if (!isSeekingRef.current) {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }
        rafIdRef.current = requestAnimationFrame(executeSeek);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        return;
      }

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const newTarget = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset));
      targetTimeRef.current = newTarget;

      queueSeek();
    };

    // Touch scrubbing support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentX = e.touches[0].clientX;

      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        return;
      }

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const newTarget = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset));
      targetTimeRef.current = newTarget;

      queueSeek();
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    // Drag & drop handlers
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      if (e.clientX === 0 || e.clientY === 0) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
          handleFileUpload(file);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, [executeSeek, handleFileUpload]);

  return (
    <>
      <video
        ref={videoRef}
        key={videoSrc}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
        className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none select-none"
        style={{
          objectPosition: '70% center',
        }}
      />

      {/* Drag & drop visual overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm border-2 border-dashed border-white/60 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-white text-2xl font-medium tracking-tight mb-2">
            Drop your MP4 here
          </div>
          <p className="text-white/70 text-sm">
            It will immediately replace the background video with ultra-smooth mouse scrubbing.
          </p>
        </div>
      )}

      {/* Discreet MP4 Upload Button in the bottom corner */}
      <div className="fixed bottom-4 right-4 z-20 flex items-center gap-2 select-none">
        {isCustomVideo && (
          <button
            type="button"
            onClick={handleResetVideo}
            className="text-xs text-white/60 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 transition-all cursor-pointer font-inherit"
            title="Reset to default video"
          >
            Reset Video
          </button>
        )}

        <label
          className="text-xs text-white/80 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-full px-3.5 py-1.5 transition-all cursor-pointer flex items-center gap-2 font-inherit"
          title="Upload an MP4 from your computer"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>{isCustomVideo ? 'Change MP4' : 'Upload MP4 from computer'}</span>
          <input
            type="file"
            accept="video/mp4,video/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>
    </>
  );
};
