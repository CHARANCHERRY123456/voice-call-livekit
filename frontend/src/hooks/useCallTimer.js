import { useEffect, useState } from 'react';

/** Ticks up once a second while `active` is true, resets when it goes false. */
export function useCallTimer(active) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      clearInterval(interval);
      setSeconds(0);
    };
  }, [active]);

  return seconds;
}
