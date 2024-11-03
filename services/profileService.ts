import { supabase } from "@/utils/supabase/client";
import { UserStats } from "@/lib/types";

export const getUserStats = async (
	user_id: string
): Promise<UserStats | null> => {
	const { data, error } = await supabase
		.from("user_stats")
		.select("user_id, total_races, total_time, average_cpm, average_accuracy")
		.eq("user_id", user_id)
		.single();

	if (error) {
		console.error("Error al obtener estadísticas del usuario:", error);
		return null;
	}

	return data as UserStats;
};
