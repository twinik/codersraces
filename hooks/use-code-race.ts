import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { fetchSession } from "@/services/authService";
import {
	formatCodeSnippet,
	registerRaceResult,
	updateUserStats,
} from "@/services/gameService";
import { CodeSnippet } from "@/lib/types";

export function useCodeRace(
	codeSnippet: CodeSnippet,
	mode: "practice" | "competitive"
) {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [userInput, setUserInput] = useState("");
	const [cpm, setCpm] = useState(0);
	const [accuracy, setAccuracy] = useState(100);
	const [cursorPosition, setCursorPosition] = useState(0);
	const [errors, setErrors] = useState(0);
	const [isCompleted, setIsCompleted] = useState(false);
	const [shake, setShake] = useState(false);
	const [errorIndex, setErrorIndex] = useState<number | null>(null);
	const formattedCode = formatCodeSnippet(codeSnippet.code);

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
				setErrorIndex(input.length - 1);
				setTimeout(() => {
					setShake(false);
					setErrorIndex(null);
				}, 500);
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

	return {
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
	};
}
