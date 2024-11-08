import { supabase } from "@/utils/supabase/client";
import { getUserRaces } from "./profileService";
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
		console.error(
			"Error registering race result:",
			error.message,
			error.details,
			error.hint
		);
		throw new Error("Failed to register race result");
	}
};

async function fetchCurrentStats(user_id: string): Promise<UserStats | null> {
	const { data, error } = await supabase
		.from("user_stats")
		.select("*")
		.eq("user_id", user_id);

	if (error) {
		console.error("Error al obtener estadísticas del usuario:", error.message);
		throw new Error("Error al obtener estadísticas del usuario");
	}

	if (!data || data.length === 0) {
		console.warn(`No se encontraron estadísticas para el usuario: ${user_id}`);
		return null;
	}

	if (data.length > 1) {
		console.warn(
			`Se encontraron múltiples registros de estadísticas para el usuario: ${user_id}. Usando el primero.`
		);
	}

	return data[0] as UserStats;
}

async function calculateUpdatedStats(
	currentStats: UserStats | null,
	result: RaceResult
): Promise<UserStats> {
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

		const mostUsedLanguage = await getMostUsedLanguage(result.user_id);

		return {
			user_id: result.user_id,
			total_races: totalRaces,
			total_time: totalTime,
			average_cpm: averageCpm,
			best_cpm: bestCpm,
			average_accuracy: averageAccuracy,
			principal_language: mostUsedLanguage,
		};
	}

	const mostUsedLanguage = await getMostUsedLanguage(result.user_id);

	return {
		user_id: result.user_id,
		total_races: 1,
		total_time: result.time_elapsed,
		average_cpm: result.cpm,
		best_cpm: result.cpm,
		average_accuracy: result.accuracy,
		principal_language: mostUsedLanguage,
	};
}

async function getMostUsedLanguage(userId: string): Promise<string> {
	const races = await getUserRaces(userId);

	if (races.length === 0) return "";

	const languageCount: { [key: string]: number } = {};

	races.forEach((result) => {
		languageCount[result.language] = (languageCount[result.language] || 0) + 1;
	});

	let mostUsedLanguage = "";
	let maxCount = 0;

	races.forEach((result) => {
		const count = languageCount[result.language];

		if (
			count > maxCount ||
			(count === maxCount && isLastUsed(result.language, races))
		) {
			mostUsedLanguage = result.language;
			maxCount = count;
		}
	});

	return mostUsedLanguage;
}

function isLastUsed(language: string, data: RaceResult[]): boolean {
	const lastRace = data.filter((result) => result.language === language).pop();
	return lastRace
		? new Date(lastRace.completed_at) >
				new Date(data[data.length - 1].completed_at)
		: false;
}

async function saveUserStats(updatedStats: UserStats) {
	const { error } = await supabase.from("user_stats").upsert(updatedStats);

	if (error) {
		console.error("Error al guardar estadísticas del usuario:", error.message);
		throw new Error("Error al guardar estadísticas del usuario");
	}
}

export const updateUserStats = async (result: RaceResult) => {
	if (!result.user_id) {
		throw new Error(
			"Se requiere un ID de usuario para actualizar las estadísticas"
		);
	}

	try {
		const currentStats = await fetchCurrentStats(result.user_id);
		const updatedStats = await calculateUpdatedStats(currentStats, result);
		await saveUserStats(updatedStats);
		console.log("Estadísticas del usuario actualizadas exitosamente.");
	} catch (error) {
		console.error("Error al actualizar estadísticas del usuario:", error);
		throw error;
	}
};
