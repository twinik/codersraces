"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";
import { formatCodeSnippet } from "@/services/gameService";

interface CodeRaceProps {
	codeSnippet: string;
	mode: "practice" | "competitive";
}

export function CodeRace({ codeSnippet, mode }: CodeRaceProps) {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [userInput, setUserInput] = useState("");
	const [errors, setErrors] = useState(0);
	const [isCompleted, setIsCompleted] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const formattedCode = formatCodeSnippet(codeSnippet);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isRunning && !isCompleted) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isRunning, isCompleted]);

	const handleStart = () => {
		setIsRunning(true);
		if (textareaRef.current) {
			textareaRef.current.focus();
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const input = e.target.value;
		if (input.length <= formattedCode.length) {
			for (let i = 0; i < input.length; i++) {
				if (input[i] !== formattedCode[i]) {
					return; // Prevent typing incorrect character
				}
			}
			setUserInput(input);
			if (input === formattedCode) {
				handleCompletion();
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Backspace" || e.key === "Delete") {
			return; // Allow deleting
		}
		if (e.key.length === 1) {
			// Single character keys
			const nextChar = formattedCode[userInput.length];
			if (e.key !== nextChar) {
				e.preventDefault();
				setErrors((prevErrors) => prevErrors + 1);
			}
		}
	};

	const handleCompletion = () => {
		setIsCompleted(true);
		setIsRunning(false);
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	};

	const calculateWPM = () => {
		const words = formattedCode.trim().split(/\s+/).length;
		const minutes = time / 60;
		return Math.round(words / minutes);
	};

	const calculateAccuracy = () => {
		const totalCharacters = formattedCode.length;
		const correctCharacters = totalCharacters - errors;
		return Math.round((correctCharacters / totalCharacters) * 100);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<Card className="bg-card border-border">
				<CardContent className="p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-bold">
							{mode === "practice" ? "Practice Mode" : "Competitive Mode"}
						</h2>
						<div className="text-xl font-mono">{formatTime(time)}</div>
					</div>
					<div className="mb-4">
						<pre className="bg-muted p-4 rounded-md overflow-x-auto">
							<code>{formattedCode}</code>
						</pre>
					</div>
					<textarea
						ref={textareaRef}
						value={userInput}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						className="w-full h-40 p-4 bg-background text-foreground border border-border rounded-md font-mono resize-none"
						placeholder="Start typing here..."
						disabled={!isRunning || isCompleted}
					/>
					{!isRunning && !isCompleted && (
						<Button onClick={handleStart} className="mt-4">
							Start
						</Button>
					)}
					{isCompleted && (
						<div className="mt-4 p-4 bg-muted rounded-md">
							<h3 className="text-xl font-bold mb-2">Race Stats</h3>
							<p>Time: {formatTime(time)}</p>
							<p>WPM: {calculateWPM()}</p>
							<p>Accuracy: {calculateAccuracy()}%</p>
							<p>Errors: {errors}</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
