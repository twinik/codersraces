export interface User {
	id: string;
	username: string;
	name: string;
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
	userId: string;
	totalRaces: number;
	totalTime: number;
	averageCpm: number;
	averageAccuracy: number;
}

export interface UserLeaderboard {
	userId: string;
	position: number;
	averageCpm: number;
	averageAccuracy: number;
	racesCompleted: number;
	principalLanguages: string[];
}
