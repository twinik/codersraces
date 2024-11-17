import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardSkeleton() {
	return (
		<div className="animate-fade-in-right  animate-duration-200">
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
	);
}
