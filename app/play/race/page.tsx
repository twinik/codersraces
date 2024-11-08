"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CodeRace } from "@/components/race-ui/code-race";
import {
	getCodeSnippetCompetitive,
	getCodeSnippetPractice,
} from "@/services/gameService";
import { CodeSnippet, ProgrammingLanguage } from "@/lib/types";
import { Loader2 } from "lucide-react";

function CodeSnippetLoader() {
	const searchParams = useSearchParams();
	const [codeSnippet, setCodeSnippet] = useState<CodeSnippet | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCodeSnippet = async () => {
			const mode = searchParams.get("mode");
			const language = searchParams.get("language");

			if (mode && language) {
				try {
					setIsLoading(true);
					const snippet =
						mode === "practice"
							? await getCodeSnippetPractice(language as ProgrammingLanguage)
							: await getCodeSnippetCompetitive(
									language as ProgrammingLanguage
							  );
					setCodeSnippet(snippet);
				} catch (error) {
					console.error("Error fetching code snippet:", error);
				} finally {
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
			}
		};

		fetchCodeSnippet();
	}, [searchParams]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader2 className="w-8 h-8 animate-spin text-primary" />
			</div>
		);
	}

	if (!codeSnippet) {
		return (
			<div className="text-center mt-8">
				No se encontró el fragmento de código.
			</div>
		);
	}

	return (
		<CodeRace
			codeSnippet={codeSnippet}
			mode={searchParams.get("mode") as "practice" | "competitive"}
		/>
	);
}

export default function Race() {
	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center h-screen">
					<Loader2 className="w-8 h-8 animate-spin text-primary" />
				</div>
			}
		>
			<CodeSnippetLoader />
		</Suspense>
	);
}
