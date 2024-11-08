import { RaceResult } from "@/lib/types";
import { IconLanguage } from "@/components/language-badge";

interface RacesListProps {
	races: RaceResult[];
	title: string;
}

export default function RacesList({ races, title }: RacesListProps) {
	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-semibold">{title}</h2>
			<div className="rounded-lg border border-border overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-border bg-card">
								<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
									Fecha
								</th>
								<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
									Hora
								</th>
								<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
									CPM
								</th>
								<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
									Precisión
								</th>
								<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
									Tiempo
								</th>
								<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
									Lenguaje
								</th>
							</tr>
						</thead>
						<tbody>
							{races.length > 0 ? (
								races.map((race, index) => (
									<tr
										key={index}
										className="border-b border-border bg-card/50 hover:bg-card/80 transition-colors"
									>
										<td className="px-4 py-3">
											{new Date(race.completed_at).toLocaleDateString()}
										</td>
										<td className="px-4 py-3">
											{new Date(race.completed_at).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
												hour12: false,
											})}
										</td>

										<td className="px-4 py-3">{race.cpm}</td>
										<td
											className={`px-4 py-3 ${
												race.accuracy >= 80
													? "text-green-500"
													: race.accuracy >= 50
													? "text-yellow-500"
													: "text-red-500"
											}`}
										>
											{race.accuracy}%
										</td>
										<td className="px-4 py-3">
											{parseFloat(race.time_elapsed.toFixed(1))}s
										</td>
										<td className="px-4 py-3">
											<IconLanguage language={race.language} />
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={6}
										className="px-4 py-3 text-center text-muted-foreground"
									>
										No hay carreras recientes
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
