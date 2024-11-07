import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CornerDownLeft } from "lucide-react";

interface CodeInputProps {
	formattedCode: string;
	userInput: string;
	cursorPosition: number;
	errorIndex: number | null;
	shake: boolean;
	handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export function CodeInput({
	formattedCode,
	userInput,
	cursorPosition,
	errorIndex,
	shake,
	handleInputChange,
	handleKeyDown,
}: CodeInputProps) {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (inputRef.current && overlayRef.current) {
			overlayRef.current.scrollTop = inputRef.current.scrollTop;
			overlayRef.current.scrollLeft = inputRef.current.scrollLeft;
		}
	}, [userInput]);

	const renderCodeWithIcons = () => {
		return formattedCode.split("\n").map((line, index) => (
			<div key={index} className="flex items-center">
				<div className="whitespace-pre">{line}</div>
				{index < formattedCode.split("\n").length - 1 && (
					<CornerDownLeft className="ml-2 text-muted-foreground" size={16} />
				)}
			</div>
		));
	};

	return (
		<motion.div
			className="relative text-base leading-relaxed"
			animate={shake ? { x: [-2, 2, -2, 2, 0] } : {}}
			transition={{ duration: 0.5 }}
		>
			<div className="p-4 overflow-x-auto">
				<div className="relative">{renderCodeWithIcons()}</div>
			</div>
			<textarea
				ref={inputRef}
				value={userInput}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				onScroll={() => {
					if (inputRef.current && overlayRef.current) {
						overlayRef.current.scrollTop = inputRef.current.scrollTop;
						overlayRef.current.scrollLeft = inputRef.current.scrollLeft;
					}
				}}
				className="absolute inset-0 w-full h-full bg-transparent p-4 resize-none focus:outline-none z-10"
				style={{
					color: "transparent",
					caretColor: "currentColor",
					WebkitTextFillColor: "transparent",
					letterSpacing: "normal",
				}}
				spellCheck="false"
				aria-label="Área de escritura de código"
			/>
			<div
				ref={overlayRef}
				className="absolute inset-0 p-4 pointer-events-none overflow-hidden"
				aria-hidden="true"
			>
				<div className="whitespace-pre">
					{formattedCode.split("").map((char, index) => (
						<span
							key={index}
							className={`${
								index === errorIndex
									? "bg-red-500/20 text-red-500"
									: index === cursorPosition
									? "bg-primary/20 text-primary"
									: index < userInput.length
									? "text-primary"
									: "text-muted-foreground"
							} transition-colors duration-100`}
							style={{ letterSpacing: "normal" }}
						>
							{char}
						</span>
					))}
				</div>
			</div>
		</motion.div>
	);
}
