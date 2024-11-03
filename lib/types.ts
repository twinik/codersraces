export interface UserSession {
	id: string;
	avatarURL: string;
	name: string;
	email: string;
}

export interface CodeSnippet {
	id: string;
	title: string;
	language: string;
	code: string;
	difficulty: "easy" | "medium" | "hard";
}

export interface RaceResult {
	id: string;
	user_id: string;
	snippet_id: string;
	cpm: number;
	accuracy: number;
	time_elapsed: number;
	completed_at: Date;
	language: string;
}

export interface UserStats {
	user_id: string;
	total_races: number;
	total_time: number;
	average_cpm: number;
	best_cpm: number;
	average_accuracy: number;
}

export interface UserLeaderboard {
	user_id: string;
	position: number;
	average_cpm: number;
	average_accuracy: number;
	races_completed: number;
	principal_languages: string[];
}
