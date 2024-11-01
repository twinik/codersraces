"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { RaceStats } from "@/components/race-stats";
import { RaceTimer } from "@/components/race-timer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { KeyboardIcon } from "lucide-react";

export function CodeRace() {
  const [isRacing, setIsRacing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const startRace = () => {
    setIsRacing(true);
    setCompleted(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <KeyboardIcon className="w-6 h-6" />
            <h2 className="text-2xl font-semibold">Typing Challenge</h2>
          </div>
          {!isRacing && (
            <Button onClick={startRace} size="lg">
              Start Race
            </Button>
          )}
          {isRacing && <RaceTimer isRunning={isRacing} onComplete={() => setCompleted(true)} />}
        </div>
        <CodeEditor isActive={isRacing} onComplete={() => setCompleted(true)} />
      </Card>
      <RaceStats />
    </div>
  );
}