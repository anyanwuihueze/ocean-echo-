"use client";

import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

const SESSION_DURATION = 4 * 60 * 60; // 4 hours in seconds

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
      <Timer className="h-4 w-4" />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
}
