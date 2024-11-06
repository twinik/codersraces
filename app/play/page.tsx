"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import {
	getProgrammingLanguages,
	getCodeSnippetPractice,
	getCodeSnippetCompetitive,
	formatCodeSnippet,
} from "@/services/gameService";
import { CodeSnippet, ProgrammingLanguage } from "@/lib/types";

export default function Play() {
	const [languages, setLanguages] = useState<string[]>([]);
	const [practiceLanguage, setPracticeLanguage] = useState<
		ProgrammingLanguage | ""
	>("");
	const [competitiveLanguage, setCompetitiveLanguage] = useState<
		ProgrammingLanguage | ""
	>("");
	const [practiceSnippet, setPracticeSnippet] = useState<CodeSnippet | null>(
		null
	);
	const [competitiveSnippet, setCompetitiveSnippet] =
		useState<CodeSnippet | null>(null);
	const [isLoadingPractice, setIsLoadingPractice] = useState(false);
	const [isLoadingCompetitive, setIsLoadingCompetitive] = useState(false);

	useEffect(() => {
		setLanguages(getProgrammingLanguages());
	}, []);

	const fetchPracticeSnippet = async (language: ProgrammingLanguage) => {
		setIsLoadingPractice(true);
		try {
			const snippet = await getCodeSnippetPractice(language);
			setPracticeSnippet(snippet);
		} catch (error) {
			console.error("Error fetching practice snippet:", error);
		} finally {
			setIsLoadingPractice(false);
		}
	};

	const fetchCompetitiveSnippet = async (language: ProgrammingLanguage) => {
		setIsLoadingCompetitive(true);
		try {
			const snippet = await getCodeSnippetCompetitive(language);
			setCompetitiveSnippet(snippet);
		} catch (error) {
			console.error("Error fetching competitive snippet:", error);
		} finally {
			setIsLoadingCompetitive(false);
		}
	};

	useEffect(() => {
		if (practiceLanguage) {
			fetchPracticeSnippet(practiceLanguage as ProgrammingLanguage);
		}
	}, [practiceLanguage]);

	useEffect(() => {
		if (competitiveLanguage) {
			fetchCompetitiveSnippet(competitiveLanguage as ProgrammingLanguage);
		}
	}, [competitiveLanguage]);

	return (
		<main className="flex-grow container mx-auto px-4 py-8">
			<div className="max-w-7xl mx-auto space-y-6">
				<div className="animate-fade-in-left animate-delay-400 animate-duration-900 text-center md:text-left">
					<h1 className="text-2xl md:text-3xl font-bold mb-2">
						Elige tu modo de juego
					</h1>
					<p className="text-sm md:text-base text-muted-foreground">
						Practica tus habilidades o compite contra otros jugadores iniciando
						sesión con tu cuenta de GitHub
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-6 animate-fade-in-right animate-delay-400 animate-duration-900">
					{/* Practice Mode */}
					<Card className="bg-card border-border flex flex-col">
						<CardHeader>
							<CardTitle>Practicar</CardTitle>
							<CardDescription>
								Mejora tu velocidad de programación a tu propio ritmo mediante
								la práctica.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1 flex flex-col justify-between">
							<div className="space-y-4 flex-1 flex flex-col">
								<div className="flex-1 min-h-[150px] md:min-h-[200px] rounded-md bg-muted p-4 overflow-x-auto">
									{isLoadingPractice ? (
										<div className="flex items-center justify-center h-full">
											<Loader2 className="w-6 h-6 animate-spin text-primary" />
										</div>
									) : practiceSnippet ? (
										<pre className="text-sm text-muted-foreground">
											<code>{formatCodeSnippet(practiceSnippet.code)}</code>
										</pre>
									) : (
										<p className="text-sm text-muted-foreground text-center">
											Selecciona un lenguaje para ver un ejemplo de código.
										</p>
									)}
								</div>
								<div className="flex flex-col md:flex-row items-center gap-4 mt-auto pt-4">
									<Select
										value={practiceLanguage}
										onValueChange={(value) =>
											setPracticeLanguage(value as ProgrammingLanguage)
										}
									>
										<SelectTrigger className="w-full md:w-[200px]">
											<SelectValue placeholder="Selecciona un lenguaje" />
										</SelectTrigger>
										<SelectContent>
											{languages.map((lang) => (
												<SelectItem key={lang} value={lang}>
													{lang}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<Button
										className="w-full md:w-auto md:ml-auto"
										disabled={!practiceLanguage || isLoadingPractice}
										onClick={() =>
											practiceLanguage &&
											fetchPracticeSnippet(
												practiceLanguage as ProgrammingLanguage
											)
										}
									>
										Comenzar
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Compete Mode */}
					<Card className="bg-card border-border flex flex-col">
						<CardHeader>
							<CardTitle>Competir</CardTitle>
							<CardDescription>
								Compite y pon a prueba tus habilidades, cada partida se guardará
								en tu perfil.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1 flex flex-col justify-between">
							<div className="space-y-4 flex-1 flex flex-col">
								<div className="flex-1 min-h-[150px] md:min-h-[200px] rounded-md bg-muted p-4 overflow-x-auto">
									{isLoadingCompetitive ? (
										<div className="flex items-center justify-center h-full">
											<Loader2 className="w-6 h-6 animate-spin text-primary" />
										</div>
									) : competitiveSnippet ? (
										<pre className="text-sm text-muted-foreground">
											<code>{formatCodeSnippet(competitiveSnippet.code)}</code>
										</pre>
									) : (
										<p className="text-sm text-muted-foreground text-center">
											Selecciona un lenguaje para ver un ejemplo de código.
										</p>
									)}
								</div>
								<div className="flex flex-col md:flex-row items-center gap-4 mt-auto pt-4">
									<Select
										value={competitiveLanguage}
										onValueChange={(value) =>
											setCompetitiveLanguage(value as ProgrammingLanguage)
										}
									>
										<SelectTrigger className="w-full md:w-[200px]">
											<SelectValue placeholder="Selecciona un lenguaje" />
										</SelectTrigger>
										<SelectContent>
											{languages.map((lang) => (
												<SelectItem key={lang} value={lang}>
													{lang}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<Button
										className="w-full md:w-auto md:ml-auto"
										disabled={!competitiveLanguage || isLoadingCompetitive}
										onClick={() =>
											competitiveLanguage &&
											fetchCompetitiveSnippet(
												competitiveLanguage as ProgrammingLanguage
											)
										}
									>
										Comenzar
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
