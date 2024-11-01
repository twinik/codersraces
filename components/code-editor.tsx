"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  isActive: boolean;
  onComplete: () => void;
}

export function CodeEditor({ isActive, onComplete }: CodeEditorProps) {
  const [userInput, setUserInput] = useState("");
  const [currentPosition, setCurrentPosition] = useState(0);

  // This will be replaced with actual code snippets
  const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;

  useEffect(() => {
    if (!isActive) {
      setUserInput("");
      setCurrentPosition(0);
    }
  }, [isActive]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive) return;
    
    const input = e.target.value;
    setUserInput(input);

    if (input === sampleCode) {
      onComplete();
    }
  };

  return (
    <div className="relative font-mono text-sm">
      <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
        <code className="relative">{sampleCode}</code>
      </pre>
      <textarea
        className={cn(
          "absolute inset-0 w-full h-full opacity-50 p-4 font-mono resize-none bg-transparent",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg",
          !isActive && "cursor-not-allowed"
        )}
        value={userInput}
        onChange={handleInput}
        disabled={!isActive}
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
}