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
	userId: string;
	snippetId: string;
	cpm: number;
	accuracy: number;
	timeElapsed: number;
	completedAt: Date;
}

export interface UserStats {
	user_id: string;
	total_races: number;
	total_time: number;
	average_cpm: number;
	average_accuracy: number;
}

export interface UserLeaderboard {
	userId: string;
	position: number;
	averageCpm: number;
	averageAccuracy: number;
	racesCompleted: number;
	principalLanguages: string[];
}
