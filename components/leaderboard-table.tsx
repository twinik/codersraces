"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ChevronFirst,
	ChevronLast,
	ChevronLeft,
	ChevronRight,
	Medal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IconLanguage } from "@/components/language-badge";
import CPMTooltip from "./cpm-tooltip";
import { UserLeaderboard } from "@/lib/types";
import { getLeaderboard } from "@/services/leaderboardService";
import LeaderboardSkeleton from "@/components/ui/skeletons/leaderboard-skeleton";

export default function LeaderBoardTable() {
	const [data, setData] = useState<UserLeaderboard[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const leaderboardData = await getLeaderboard(currentPage, rowsPerPage);
				setData(leaderboardData);
			} catch (error) {
				console.error("Error fetching leaderboard data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [currentPage, rowsPerPage]);

	const totalUsers = 20;
	const totalPages = Math.ceil(totalUsers / rowsPerPage);
	const paginatedData = data.slice(0, rowsPerPage);

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
	};

	const handleRowsPerPageChange = (value: string) => {
		setRowsPerPage(Number(value));
		setCurrentPage(1);
	};

	if (loading) {
		return <LeaderboardSkeleton />;
	}

	return (
		<div className="rounded-lg border border-border overflow-hidden animate-fade-in-right animate-delay-400 animate-duration-900">
			<div className="overflow-x-auto scrollbar-hide">
				<table className="w-full">
					<thead>
						<tr className="border-b border-border bg-card">
							<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
								Posición
							</th>
							<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
								Usuario
							</th>
							<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
								<div className="flex items-center gap-2">
									CPM promedio
									<CPMTooltip />
								</div>
							</th>
							<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
								Precisión promedio
							</th>
							<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
								Carreras jugadas
							</th>
							<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
								Lenguaje preferido
							</th>
						</tr>
					</thead>
					<AnimatePresence mode="wait">
						<motion.tbody
							key={currentPage}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							{paginatedData.map((entry, index) => {
								const position = (currentPage - 1) * rowsPerPage + index + 1;
								return (
									<motion.tr
										key={index}
										className="border-b border-border bg-card/50 hover:bg-card/80 transition-colors"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
									>
										<td className="px-4 py-3">
											<div className="flex items-center gap-2">
												{position === 1 && (
													<Medal className="h-5 w-5 text-yellow-500" />
												)}
												{position === 2 && (
													<Medal className="h-5 w-5 text-gray-400" />
												)}
												{position === 3 && (
													<Medal className="h-5 w-5 text-amber-700" />
												)}
												{position > 3 && (
													<span className="text-muted-foreground">
														{position}º
													</span>
												)}
											</div>
										</td>
										<td className="px-4 py-3">
											<div className="flex items-center gap-2">
												<Avatar className="h-8 w-8">
													<AvatarImage src={entry.avatarURL} alt={entry.name} />
													<AvatarFallback>
														{entry.name.charAt(0)}
													</AvatarFallback>
												</Avatar>
												<span>{entry.name}</span>
											</div>
										</td>
										<td className="px-4 py-3">
											{entry.average_cpm.toLocaleString("es-ES", {
												maximumFractionDigits: 2,
											})}
										</td>
										<td className="px-4 py-3">
											<span className="text-green-500">
												{entry.average_accuracy}%
											</span>
										</td>
										<td className="px-4 py-3">{entry.total_races}</td>
										<td className="px-4 py-3">
											<IconLanguage language={entry.principal_language} />
										</td>
									</motion.tr>
								);
							})}
						</motion.tbody>
					</AnimatePresence>
				</table>
			</div>

			<div className="border-t border-border p-4 bg-card flex items-center justify-between">
				<div className="flex items-center md:gap-2 mr-3 md:mr-0">
					<span className="text-sm text-muted-foreground">
						Filas por página
					</span>
					<Select
						defaultValue={rowsPerPage.toString()}
						onValueChange={handleRowsPerPageChange}
					>
						<SelectTrigger className="w-[70px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex items-center gap-4">
					<span className="text-sm text-muted-foreground">
						Página {currentPage} de {totalPages}
					</span>
					<div className="flex gap-1">
						<Button
							variant="outline"
							size="icon"
							onClick={() => handlePageChange(1)}
							disabled={currentPage === 1}
						>
							<ChevronFirst className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={() => handlePageChange(totalPages)}
							disabled={currentPage === totalPages}
						>
							<ChevronLast className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			<style jsx global>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
				.scrollbar-hide {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>
		</div>
	);
}
