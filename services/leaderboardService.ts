import { supabase } from "@/utils/supabase/client";
import { UserLeaderboard } from "@/lib/types";

export const getLeaderboard = async (
	rows: number
): Promise<UserLeaderboard[] | null> => {
	const { data, error } = await supabase
		.from("user_stats")
		.select(
			"user_id, average_cpm, average_accuracy, races_completed, principal_language"
		)
		.order("average_cpm", { ascending: false })
		.limit(rows);

	if (error) {
		console.error("Error fetching leaderboard data:", error);
		return null;
	}

	if (!data) {
		return null;
	}

	const leaderboard = data.map((user, index) => ({
		...user,
		position: index + 1,
	}));

	return leaderboard as UserLeaderboard[];
};
