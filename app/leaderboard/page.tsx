import LeaderBoardTable from "@/components/leaderboard-table";

const leaderboardData = [
	{
		rank: 1,
		user: {
			name: "Cacci",
			image: "/placeholder.svg",
		},
		averageCpm: 9924.4,
		accuracy: 99.71,
		racesPlayed: 10,
		languages: ["Javascript"],
	},
	{
		rank: 2,
		user: {
			name: "Racer 8335",
			image: "/placeholder.svg",
		},
		averageCpm: 9883.82,
		accuracy: 100,
		racesPlayed: 11,
		languages: ["Python", "Swift", "Typescript"],
	},
	{
		rank: 3,
		user: {
			name: "Racer 4630",
			image: "/placeholder.svg",
		},
		averageCpm: 1210.61,
		accuracy: 99.88,
		racesPlayed: 41,
		languages: ["Go", "Python", "Html"],
	},
	{
		rank: 4,
		user: {
			name: "Racer 1161",
			image: "/placeholder.svg",
		},
		averageCpm: 671,
		accuracy: 99.45,
		racesPlayed: 4,
		languages: ["Html", "Go", "Typescript"],
	},
	{
		rank: 5,
		user: {
			name: "Racer 0246",
			image: "/placeholder.svg",
		},
		averageCpm: 607.17,
		accuracy: 98.47,
		racesPlayed: 3,
		languages: [],
	},
	{
		rank: 6,
		user: {
			name: "Racer 4630",
			image: "/placeholder.svg",
		},
		averageCpm: 1210.61,
		accuracy: 99.88,
		racesPlayed: 41,
		languages: ["Go", "Python", "Html"],
	},
	{
		rank: 7,
		user: {
			name: "Racer 4630",
			image: "/placeholder.svg",
		},
		averageCpm: 1210.61,
		accuracy: 99.88,
		racesPlayed: 41,
		languages: ["Go", "Python", "Html"],
	},
	{
		rank: 8,
		user: {
			name: "Racer 4630",
			image: "/placeholder.svg",
		},
		averageCpm: 1210.61,
		accuracy: 99.88,
		racesPlayed: 41,
		languages: ["Go", "Python", "Html"],
	},
	{
		rank: 9,
		user: {
			name: "Racer 4630",
			image: "/placeholder.svg",
		},
		averageCpm: 1210.61,
		accuracy: 99.88,
		racesPlayed: 41,
		languages: ["Go", "Python", "Html"],
	},
	{
		rank: 10,
		user: {
			name: "Racer 4630",
			image: "/placeholder.svg",
		},
		averageCpm: 1210.61,
		accuracy: 99.88,
		racesPlayed: 41,
		languages: ["Go", "Python", "Html"],
	},
	{
		rank: 11,
		user: {
			name: "Racer 4630",
			image: "/placeholder.svg",
		},
		averageCpm: 1210.61,
		accuracy: 99.88,
		racesPlayed: 41,
		languages: ["Go", "Python", "Html"],
	},
	{
		rank: 12,
		user: {
			name: "Racer 4630",
			image: "/placeholder.svg",
		},
		averageCpm: 1210.61,
		accuracy: 99.88,
		racesPlayed: 41,
		languages: ["Go", "Python", "Html"],
	},
];

export default function Leaderboard() {
	return (
		<main className="flex-grow container mx-auto px-4 py-8">
			<div className="max-w-7xl mx-auto space-y-6">
				<div className="flex flex-col md:flex-row justify-between items-center md:items-start">
					<div className="animate-fade-in-left animate-delay-400 animate-duration-900 text-center md:text-left mb-4 md:mb-0">
						<h1 className="text-3xl md:text-4xl font-bold mb-2">
							Tabla de clasificación
						</h1>
						<p className="text-sm md:text-base text-muted-foreground">
							Los programadores más rápidos del mundo
						</p>
					</div>
				</div>
				<div className="overflow-x-auto">
					<LeaderBoardTable data={leaderboardData} />
				</div>
			</div>
		</main>
	);
}
