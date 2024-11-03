"use client";

import { useEffect, useState } from "react";
import LeaderBoardTable from "@/components/leaderboard-table";
import { getLeaderboard } from "@/services/leaderboardService";
import { UserLeaderboard } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Leaderboard() {
	const [leaderboardData, setLeaderboardData] = useState<
		UserLeaderboard[] | null
	>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getLeaderboard(10);
				setLeaderboardData(data);
			} catch (error) {
				console.error("Error fetching leaderboard data:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<main className="flex-grow container mx-auto px-4 py-8">
			<div className="max-w-7xl mx-auto space-y-6">
				<div className="flex flex-col md:flex-row justify-between items-center md:items-start">
					<div className="animate-fade-in-left animate-delay-400 animate-duration-900 text-center md:text-left mb-4 md:mb-0">
						<h1 className="text-3xl md:text-4xl font-bold mb-2">
							Tabla de clasificación
						</h1>
						<p className="text-sm md:text-base text-muted-foreground">
							Conocé a los programadores más rápidos del mundo
						</p>
					</div>
				</div>
				<div className="overflow-x-auto">
					{isLoading ? (
						<div className="animate-fade-in-right animate-delay-400 animate-duration-900">
							<div className="rounded-lg border border-border overflow-hidden animate-pulse">
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead>
											<tr className="border-b border-border bg-card">
												{[...Array(6)].map((_, index) => (
													<th key={index} className="px-4 py-3">
														<Skeleton className="h-4 w-24" />
													</th>
												))}
											</tr>
										</thead>
										<tbody>
											{[...Array(5)].map((_, rowIndex) => (
												<tr key={rowIndex} className="border-b border-border">
													{[...Array(6)].map((_, colIndex) => (
														<td key={colIndex} className="px-4 py-3">
															{colIndex === 1 ? (
																<div className="flex items-center space-x-2">
																	<Skeleton className="h-8 w-8 rounded-full" />
																	<Skeleton className="h-4 w-24" />
																</div>
															) : (
																<Skeleton className="h-4 w-16" />
															)}
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<div className="border-t border-border p-4 bg-card flex items-center justify-between">
									<Skeleton className="h-8 w-32" />
									<Skeleton className="h-8 w-48" />
								</div>
							</div>
						</div>
					) : leaderboardData ? (
						<LeaderBoardTable data={leaderboardData} />
					) : (
						<p className="text-center text-muted-foreground">
							No se pudieron cargar los datos. Por favor, intenta de nuevo más
							tarde.
						</p>
					)}
				</div>
			</div>
		</main>
	);
}
