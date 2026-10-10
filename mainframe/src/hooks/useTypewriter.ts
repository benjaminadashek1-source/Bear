import { useState, useEffect } from 'react';

/**
 * Custom typewriter hook that reveals one character at a time after a start delay.
 * @param text The text to type out
 * @param speed Typing interval in milliseconds per character (default 38ms)
 * @param startDelay Initial delay before typing starts (default 600ms)
 * @returns { displayed: string, done: boolean }
 */
export function useTypewriter(
  text: string,
  speed: number = 38,
  startDelay: number = 600
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState<string>('');
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let intervalId: ReturnType<typeof setInterval> | null = null;
    let charIndex = 0;

    const timeoutId = setTimeout(() => {
      if (text.length === 0) {
        setDone(true);
        return;
      }

      intervalId = setInterval(() => {
        charIndex += 1;
        setDisplayed(text.slice(0, charIndex));

        if (charIndex >= text.length) {
          setDone(true);
          if (intervalId) {
            clearInterval(intervalId);
          }
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
