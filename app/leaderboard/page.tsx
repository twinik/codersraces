import LeaderBoardTable from "@/components/leaderboard-table";

export default async function Leaderboard() {
	return (
		<main className="flex-grow container mx-auto px-4 py-8">
			<div className="max-w-7xl mx-auto space-y-6">
				<div className="flex flex-col md:flex-row justify-between items-center md:items-start">
					<div className="animate-fade-in-left  animate-duration-200 text-center md:text-left mb-4 md:mb-0">
						<h1 className="text-3xl md:text-4xl font-bold mb-2">
							Tabla de clasificación
						</h1>
						<p className="text-sm md:text-base text-muted-foreground">
							Conocé a los programadores más rápidos del mundo
						</p>
					</div>
				</div>
				<div className="overflow-x-auto">
					<LeaderBoardTable />
				</div>
			</div>
		</main>
	);
}
