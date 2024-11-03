import { supabase } from "@/utils/supabase/client";
import { UserLeaderboard } from "@/lib/types";

export const getLeaderboard = async (
	rows: number
): Promise<UserLeaderboard[]> => {
	const { data, error } = await supabase
		.from("leaderboard_view")
		.select(
			`
            user_id,
            average_cpm,
            average_accuracy,
            total_races,
            principal_language,
            avatar_url,
            full_name
            `
		)
		.order("average_cpm", { ascending: false })
		.limit(rows);

	if (error) {
		console.error("Error fetching leaderboard data:", error.message);
		return [];
	}

	if (!data || data.length === 0) {
		return [];
	}

	const leaderboard = data.map((stat, index) => ({
		user_id: stat.user_id,
		avatarURL: stat.avatar_url || "",
		name: stat.full_name || "",
		average_cpm: stat.average_cpm,
		average_accuracy: stat.average_accuracy,
		total_races: stat.total_races,
		principal_language: stat.principal_language,
		position: index + 1,
	}));

	return leaderboard as UserLeaderboard[];
};
