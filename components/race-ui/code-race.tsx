"use client";

import React, { useState, useEffect } from "react";
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

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkIsMobile();
		window.addEventListener("resize", checkIsMobile);

		return () => window.removeEventListener("resize", checkIsMobile);
	}, []);

	return isMobile;
}

export function CodeRace({ codeSnippet, mode }: CodeRaceProps) {
	const isMobile = useIsMobile();

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

	if (isMobile) {
		return (
			<Card className="mt-12 max-w-md mx-4 p-6 text-center text-pretty">
				<h2 className="text-2xl font-bold text-foreground mb-4">
					¿Programarías desde un celular?
				</h2>
				<p className="text-lg text-muted-foreground">
					Entonces, ¿por qué estás intentándolo ahora?
				</p>
				<p className="mt-4 text-sm text-muted-foreground">
					Esta aplicación está diseñada para ser usada en dispositivos de
					escritorio. Por favor, accede desde una computadora para disfrutar de
					la experiencia completa.
				</p>
			</Card>
		);
	}

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
