import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProfileSkeleton() {
	return (
		<div className="dark min-h-screen bg-background text-foreground">
			<main className="container mx-auto px-4 py-8">
				<div className="max-w-5xl mx-auto space-y-8">
					<div className="flex items-start gap-6">
						<Skeleton className="h-24 w-24 rounded-full" />
						<div className="space-y-2 flex-grow">
							<div className="flex items-center space-x-2">
								<Skeleton className="h-8 w-48" />
								<Skeleton className="h-6 w-32" />
							</div>
							<Skeleton className="h-6 w-40" />
						</div>
					</div>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						{[...Array(4)].map((_, i) => (
							<Card key={i}>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-4 w-4 rounded-full" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-8 w-16" />
								</CardContent>
							</Card>
						))}
					</div>
					<div className="space-y-4">
						<Skeleton className="h-8 w-32" />
						<div className="rounded-lg border border-border overflow-hidden">
							<div className="space-y-2 p-4">
								{[...Array(3)].map((_, i) => (
									<Skeleton key={i} className="h-12 w-full" />
								))}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
