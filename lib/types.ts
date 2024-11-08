export interface UserSession {
	id: string;
	avatarURL: string;
	name: string;
	username: string;
	email: string;
}

export interface CodeSnippet {
	id: string;
	title: string;
	language: ProgrammingLanguage;
	code: string;
	mode: string;
}

export enum ProgrammingLanguage {
	Java = "Java",
	JavaScript = "JavaScript",
	TypeScript = "TypeScript",
	PHP = "PHP",
	Rust = "Rust",
	Python = "Python",
	Cpp = "Cpp",
}

export interface RaceResult {
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
	principal_language: string;
}

export interface UserLeaderboard {
	user_id: string;
	avatarURL: string;
	name: string;
	average_cpm: number;
	average_accuracy: number;
	total_races: number;
	principal_language: string;
}
