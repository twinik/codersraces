"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TimerIcon } from "lucide-react";

interface RaceTimerProps {
  isRunning: boolean;
  onComplete: () => void;
}

export function RaceTimer({ isRunning, onComplete }: RaceTimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  return (
    <Badge variant="secondary" className="px-3 py-1">
      <TimerIcon className="w-4 h-4 mr-2" />
      <span className="font-mono">{formatTime(time)}</span>
    </Badge>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}