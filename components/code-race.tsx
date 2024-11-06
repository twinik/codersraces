"use client";

import React, { useState, useEffect, useRef } from "react";
import { CornerDownLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { fetchSession } from "@/services/authService";
import {
	formatCodeSnippet,
	registerRaceResult,
	updateUserStats,
} from "@/services/gameService";
import { CodeSnippet } from "@/lib/types";

interface CodeRaceProps {
	codeSnippet: CodeSnippet;
	mode: "practice" | "competitive";
}

export function CodeRace({ codeSnippet, mode }: CodeRaceProps) {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [userInput, setUserInput] = useState("");
	const [cpm, setCpm] = useState(0);
	const [accuracy, setAccuracy] = useState(100);
	const [cursorPosition, setCursorPosition] = useState(0);
	const [errors, setErrors] = useState(0);
	const [isCompleted, setIsCompleted] = useState(false);
	const [shake, setShake] = useState(false);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const formattedCode = formatCodeSnippet(codeSnippet.code);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isRunning) {
			interval = setInterval(() => {
				setTime((prevTime) => {
					const newTime = prevTime + 0.1;
					setCpm(Math.round((userInput.length / newTime) * 60));
					return newTime;
				});
			}, 100);
		}
		return () => clearInterval(interval);
	}, [isRunning, userInput.length]);

	useEffect(() => {
		if (userInput.length > 0) {
			const totalChars = userInput.length;
			setAccuracy(Math.round((totalChars / (totalChars + errors)) * 100));
		} else {
			setAccuracy(100);
		}
	}, [userInput, errors]);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const input = e.target.value;
		if (!isRunning) {
			setIsRunning(true);
		}

		if (input.length <= formattedCode.length) {
			if (input[input.length - 1] !== formattedCode[input.length - 1]) {
				setShake(true);
				setErrors((prev) => prev + 1);
				setTimeout(() => setShake(false), 500);
				return;
			}
			setUserInput(input);
			setCursorPosition(input.length);

			if (input === formattedCode) {
				handleCompletion();
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const nextNewlineIndex = formattedCode.indexOf("\n", cursorPosition);
			if (nextNewlineIndex !== -1 && nextNewlineIndex === cursorPosition) {
				const match = formattedCode.slice(cursorPosition + 1).match(/^\s*/);
				const spacesToAdd = match ? match[0] : "";
				setUserInput((prevInput) => prevInput + "\n" + spacesToAdd);
				setCursorPosition((prevPos) => prevPos + 1 + spacesToAdd.length);
			}
		} else if (e.key === "Backspace") {
			e.preventDefault();
			if (userInput.length > 0) {
				setUserInput((prevInput) => prevInput.slice(0, -1));
				setCursorPosition((prevPos) => prevPos - 1);
			}
		} else if (e.ctrlKey || e.metaKey) {
			e.preventDefault();
		} else if (e.key === " ") {
			e.preventDefault();
			if (formattedCode[cursorPosition] === " ") {
				setUserInput((prevInput) => prevInput + " ");
				setCursorPosition((prevPos) => prevPos + 1);
			}
		}
	};

	const handleCompletion = async () => {
		const userSession = await fetchSession();
		try {
			setIsRunning(false);
			setIsCompleted(true);
			if (mode === "competitive" && userSession) {
				const raceResult = {
					user_id: userSession.id,
					snippet_id: codeSnippet.id,
					cpm,
					accuracy,
					time_elapsed: time,
					language: codeSnippet.language,
					completed_at: new Date(),
				};
				await registerRaceResult(raceResult);
				await updateUserStats(raceResult);
			}
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		} catch (error) {
			console.error("Error during race completion:", error);
			alert(`Error al completar la carrera: ${(error as Error).message}`);
		}
	};

	const getProgress = () => {
		return (userInput.length / formattedCode.length) * 100;
	};

	const renderCodeWithIcons = () => {
		return formattedCode.split("\n").map((line, index) => (
			<div key={index} className="flex items-center">
				<span>{line}</span>
				{index < formattedCode.split("\n").length - 1 && (
					<CornerDownLeft className="ml-2 text-muted-foreground" size={16} />
				)}
			</div>
		));
	};

	if (isCompleted) {
		return (
			<div className="w-full max-w-4xl mx-auto p-6">
				<Card className="p-6">
					<h2 className="text-2xl font-bold">¡Felicidades!</h2>
					<p className="text-muted-foreground mb-5">
						Completaste la carrera de código con éxito. Aca tenés tus
						estadísticas:
					</p>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="font-semibold">Tiempo:</p>
							<p>{time.toFixed(1)} segundos</p>
						</div>
						<div>
							<p className="font-semibold">CPM:</p>
							<p>{cpm}</p>
						</div>
						<div>
							<p className="font-semibold">Precisión:</p>
							<p>{accuracy}%</p>
						</div>
						<div>
							<p className="font-semibold">Errores:</p>
							<p>{errors}</p>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="w-full max-w-6xl mx-auto p-6">
			<div className="space-y-6">
				<div>
					<h1 className="text-2xl font-bold text-foreground">
						¡Escribe el código!
					</h1>
					<p className="text-sm text-muted-foreground">
						Comienza a escribir, no presiones el mouse
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto]">
					<div className="space-y-1.5">
						<label className="text-sm font-medium">Progreso</label>
						<Progress value={getProgress()} className="h-2" />
					</div>

					<div className="min-w-[100px] p-3 bg-background rounded-lg border">
						<div className="text-xs text-muted-foreground mb-1">Tiempo</div>
						<div className="font-mono text-lg">{time.toFixed(1)}s</div>
					</div>

					<div className="min-w-[100px] p-3 bg-background rounded-lg border">
						<div className="text-xs text-muted-foreground mb-1">CPM</div>
						<div className="font-mono text-lg">{cpm}</div>
					</div>

					<div className="min-w-[100px] p-3 bg-background rounded-lg border">
						<div className="text-xs text-muted-foreground mb-1">Precisión</div>
						<div
							className={`font-mono text-lg ${
								accuracy >= 80
									? "text-green-500"
									: accuracy >= 50
									? "text-yellow-500"
									: "text-red-500"
							}`}
						>
							{accuracy}%
						</div>
					</div>
				</div>

				<Card className="relative overflow-hidden">
					<motion.div
						className="absolute inset-0 bg-muted/40 pointer-events-none"
						animate={shake ? { x: [-2, 2, -2, 2, 0] } : {}}
						transition={{ duration: 0.5 }}
					/>
					<pre className="p-4 font-mono text-base overflow-x-auto">
						<code>{renderCodeWithIcons()}</code>
					</pre>
					<textarea
						ref={inputRef}
						value={userInput}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						className="absolute inset-0 w-full h-full bg-transparent font-mono text-base p-4 resize-none focus:outline-none"
						style={{
							color: "transparent",
							caretColor: "currentColor",
							WebkitTextFillColor: "transparent",
						}}
						spellCheck="false"
						aria-label="Área de escritura de código"
					/>
					<motion.div
						className="absolute inset-0 font-mono text-base p-4 pointer-events-none whitespace-pre"
						aria-hidden="true"
						animate={shake ? { x: [-2, 2, -2, 2, 0] } : {}}
						transition={{ duration: 0.5 }}
					>
						{formattedCode.split("").map((char, index) => (
							<span
								key={index}
								className={
									index === cursorPosition
										? "bg-primary/20 text-primary"
										: index === cursorPosition - 1 && shake
										? "bg-red-500/20 text-red-500"
										: index < userInput.length
										? "text-primary"
										: index === userInput.length
										? "bg-secondary/20 text-secondary"
										: "text-muted-foreground"
								}
							>
								{char}
							</span>
						))}
					</motion.div>
				</Card>
			</div>
		</div>
	);
}
