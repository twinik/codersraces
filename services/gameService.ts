import { supabase } from "@/utils/supabase/client";
import {
	CodeSnippet,
	ProgrammingLanguage,
	UserStats,
	RaceResult,
} from "@/lib/types";

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

export const registerRaceResult = async (result: RaceResult) => {
	if (!result.user_id) {
		throw new Error("User ID is required to register the race result");
	}

	const { error } = await supabase.from("race_results").insert(result);

	if (error) {
		console.error("Error registering race result:", error);
		throw new Error("Failed to register race result");
	}
};

export const updateUserStats = async (result: RaceResult) => {
	if (!result.user_id) {
		throw new Error("User ID is required to update stats");
	}

	const { data: currentStats, error: fetchError } = await supabase
		.from("user_stats")
		.select("*")
		.eq("user_id", result.user_id)
		.single();

	if (fetchError) {
		console.error("Error fetching user stats:", fetchError);
		return;
	}

	let updatedStats: UserStats;

	if (currentStats) {
		const totalRaces = currentStats.total_races + 1;
		const totalTime = currentStats.total_time + result.time_elapsed;
		const averageCpm =
			(currentStats.average_cpm * currentStats.total_races + result.cpm) /
			totalRaces;
		const bestCpm = Math.max(currentStats.best_cpm, result.cpm);
		const averageAccuracy =
			(currentStats.average_accuracy * currentStats.total_races +
				result.accuracy) /
			totalRaces;

		updatedStats = {
			user_id: result.user_id,
			total_races: totalRaces,
			total_time: totalTime,
			average_cpm: averageCpm,
			best_cpm: bestCpm,
			average_accuracy: averageAccuracy,
			principal_language: result.language,
		};
	} else {
		updatedStats = {
			user_id: result.user_id,
			total_races: 1,
			total_time: result.time_elapsed,
			average_cpm: result.cpm,
			best_cpm: result.cpm,
			average_accuracy: result.accuracy,
			principal_language: result.language,
		};
	}

	const { error: updateError } = await supabase
		.from("user_stats")
		.upsert(updatedStats);

	if (updateError) {
		console.error("Error updating user stats:", updateError);
	}
};
