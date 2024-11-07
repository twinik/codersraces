"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { CodeSnippet } from "@/lib/types";
import { useCodeRace } from "@/hooks/use-code-race";
import { CompletionCard } from "./completion-card";
import { StatsDisplay } from "./stats-display";
import { CodeInput } from "./code-input";

interface CodeRaceProps {
	codeSnippet: CodeSnippet;
	mode: "practice" | "competitive";
}

export function CodeRace({ codeSnippet, mode }: CodeRaceProps) {
	const {
		time,
		cpm,
		accuracy,
		isCompleted,
		getProgress,
		handleInputChange,
		handleKeyDown,
		formattedCode,
		userInput,
		cursorPosition,
		errorIndex,
		shake,
	} = useCodeRace(codeSnippet, mode);

	if (isCompleted) {
		return <CompletionCard time={time} cpm={cpm} accuracy={accuracy} />;
	}

	return (
		<div className="w-full max-w-6xl mx-auto p-6 mt-6">
			<div className="space-y-6">
				<div>
					<h1 className="text-2xl font-bold text-foreground">
						¡Escribe el código!
					</h1>
					<p className="text-sm text-muted-foreground">
						Comienza a escribir, no presiones el mouse
					</p>
				</div>

				<StatsDisplay
					time={time}
					cpm={cpm}
					accuracy={accuracy}
					progress={getProgress()}
				/>

				<Card className="relative overflow-hidden">
					<CodeInput
						formattedCode={formattedCode}
						userInput={userInput}
						cursorPosition={cursorPosition}
						errorIndex={errorIndex}
						shake={shake}
						handleInputChange={handleInputChange}
						handleKeyDown={handleKeyDown}
					/>
				</Card>
			</div>
		</div>
	);
}
