"use client";

import { useState, useEffect } from "react";
import Atropos from "atropos/react";

export default function CodePreview() {
	const [text, setText] = useState("");
	const [cursorPosition, setCursorPosition] = useState(0);
	const exampleText = `function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}`;

	useEffect(() => {
		let i = 0;
		const typingEffect = setInterval(() => {
			if (i < exampleText.length) {
				setText(exampleText.slice(0, i + 1));
				setCursorPosition(i + 1);
				i++;
			} else {
				clearInterval(typingEffect);
				setTimeout(() => {
					setText("");
					setCursorPosition(0);
				}, 2000); // Espera 2 segundos antes de reiniciar
			}
		}, 150);

		return () => clearInterval(typingEffect);
	}, [text === ""]);

	return (
		<Atropos>
			<div className="w-full md:w-[500px] bg-card rounded-lg overflow-hidden border border-border animate-fade-in-up animate-duration-200">
				<div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
					<div className="w-3 h-3 rounded-full bg-red-500"></div>
					<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
					<div className="w-3 h-3 rounded-full bg-green-500"></div>
				</div>
				<div className="p-4 font-mono text-sm">
					<pre className="text-muted-foreground relative">
						<code className="block opacity-30">{exampleText}</code>
						<code className="block absolute top-0 left-0 overflow-hidden whitespace-pre text-foreground">
							{text.split("").map((char, index) => (
								<span key={index}>
									{char}
									{index === cursorPosition - 1 && (
										<span className="border-l-2 border-foreground ml-[-1px] animate-blink">
											&nbsp;
										</span>
									)}
								</span>
							))}
						</code>
					</pre>
				</div>
			</div>
		</Atropos>
	);
}
