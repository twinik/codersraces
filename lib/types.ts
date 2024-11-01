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
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  completedAt: Date;
}

export interface UserStats {
  totalRaces: number;
  averageWpm: number;
  averageAccuracy: number;
  bestScore: number;
  lastRaceDate: Date;
}