import { supabase } from "@/utils/supabase/client";
import { UserStats, RaceResult } from "@/lib/types";

export const getUserStats = async (user_id: string): Promise<UserStats> => {
	const { data, error } = await supabase
		.from("user_stats")
		.select(
			"user_id, total_races, total_time, average_cpm, best_cpm, average_accuracy, principal_language"
		)
		.eq("user_id", user_id)
		.single();

	if (error) {
		console.error("Error al obtener estadísticas del usuario:", error);
		const userStatsNull: UserStats = {
			user_id: "",
			total_races: 0,
			total_time: 0,
			average_cpm: 0,
			best_cpm: 0,
			average_accuracy: 0,
			principal_language: "",
		};
		return userStatsNull;
	}

	return data as UserStats;
};

export const getUserRaces = async (user_id: string): Promise<RaceResult[]> => {
	const { data, error } = await supabase
		.from("race_results")
		.select("*, code_snippets(language)")
		.eq("user_id", user_id);

	if (error) {
		console.error("Error fetching user races:", error);
		return [];
	}

	return (
		(
			data as (RaceResult & { code_snippets: { language: string | null } })[]
		).map((race) => ({
			...race,
			language: race.code_snippets?.language || "",
		})) || []
	);
};
