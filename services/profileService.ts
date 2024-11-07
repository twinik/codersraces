import { supabase } from "@/utils/supabase/client";
import { UserStats, RaceResult, UserSession } from "@/lib/types";

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
		.eq("user_id", user_id)
		.order("completed_at", { ascending: false });

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

export const getUserProfile = async (user_id: string): Promise<UserSession> => {
	const { data, error } = await supabase
		.from("auth.users")
		.select("*")
		.eq("id", user_id);

	if (error) {
		console.error(
			"Error fetching user races:",
			error.message,
			error.details,
			error.hint
		);
		const userSessionNull: UserSession = {
			id: "",
			avatarURL: "",
			name: "",
			username: "",
			email: "",
		};
		return userSessionNull;
	}

	const user = data[0];

	const userSession: UserSession = {
		id: user.id,
		avatarURL: user.user_metadata?.avatar_url || "",
		name: user.user_metadata?.name || "",
		username: user.user_metadata?.user_name || "",
		email: user.email || "nomail@nomail.com",
	};

	return userSession;
};
