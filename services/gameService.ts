import { supabase } from "@/utils/supabase/client";
import { CodeSnippet, ProgrammingLanguage } from "@/lib/types";

export function formatCodeSnippet(code: string): string {
	return code.replace(/\\n/g, "\n").replace(/\\t/g, "  ").trim();
}

export const getProgrammingLanguages = (): string[] => {
	return Object.values(ProgrammingLanguage);
};

export const getCodeSnippetPractice = async (
	language: ProgrammingLanguage
): Promise<CodeSnippet> => {
	const { data, error } = await supabase
		.from("code_snippets")
		.select("*")
		.eq("mode", "practice")
		.eq("language", language);

	if (error) {
		console.error("Error fetching code snippet:", error);
		const codeSnippetNull: CodeSnippet = {
			id: "",
			title: "",
			code: "",
			language: ProgrammingLanguage.JavaScript,
			mode: "",
		};
		return codeSnippetNull;
	}

	const randomIndex = Math.floor(Math.random() * data.length);
	return data[randomIndex] as CodeSnippet;
};

export const getCodeSnippetCompetitive = async (
	language: ProgrammingLanguage
): Promise<CodeSnippet> => {
	const { data, error } = await supabase
		.from("code_snippets")
		.select("*")
		.eq("mode", "competitive")
		.eq("language", language);

	if (error) {
		console.error("Error fetching code snippet:", error);
		const codeSnippetNull: CodeSnippet = {
			id: "",
			title: "",
			code: "",
			language: ProgrammingLanguage.JavaScript,
			mode: "",
		};
		return codeSnippetNull;
	}

	const randomIndex = Math.floor(Math.random() * data.length);
	return data[randomIndex] as CodeSnippet;
};

export const getCodeSnippetById = async (id: string): Promise<CodeSnippet> => {
	const { data, error } = await supabase
		.from("code_snippets")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching code snippet:", error);
		throw new Error("Failed to fetch code snippet");
	}

	return data as CodeSnippet;
};
