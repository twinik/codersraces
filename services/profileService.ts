import { supabase } from "@/utils/supabase/client";
import { UserStats, RaceResult } from "@/lib/types";

export const getUserStats = async (user_id: string): Promise<UserStats> => {
	const { data, error } = await supabase
		.from("user_stats")
		.select("*")
		.eq("user_id", user_id)
		.single();

	if (error) {
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
		.select("*")
		.eq("user_id", user_id);

	if (error) {
		console.error(
			"Error fetching user races:",
			error.message,
			error.details,
			error.hint
		);
		return [];
	}

	return data as RaceResult[];
};
