"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Trophy, TrendingUp } from "lucide-react";
import { fetchSession } from "@/services/authService";
import { getUserRaces, getUserStats } from "@/services/profileService";
import { UserSession, RaceResult, UserStats } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { LanguageBadge, IconLanguage } from "@/components/language-badge";

export default function Profile() {
	const [user, setUser] = useState<UserSession | null>(null);
	const [stats, setStats] = useState<UserStats | null>(null);
	const [races, setRaces] = useState<RaceResult[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const fetchedSession = await fetchSession();
				setUser(fetchedSession);

				if (fetchedSession?.id) {
					const userStats = await getUserStats(fetchedSession.id);
					setStats(userStats);
					const userRaces = await getUserRaces(fetchedSession.id);
					setRaces(userRaces);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, []);

	if (isLoading) {
		return (
			<div className="dark min-h-screen bg-background text-foreground">
				<main className="container mx-auto px-4 py-8">
					<div className="max-w-5xl mx-auto space-y-8">
						<div className="flex items-start gap-6">
							<Skeleton className="h-24 w-24 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-8 w-48" />
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-6 w-24" />
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

	if (!user) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-background text-foreground">
				<p className="text-lg">
					No se pudo cargar el perfil. Por favor, intenta de nuevo más tarde.
				</p>
			</div>
		);
	}

	return (
		<div className="dark">
			<div className="min-h-screen bg-background text-foreground">
				<main className="container mx-auto px-4 py-8">
					<div className="max-w-5xl mx-auto space-y-8">
						<div className="flex items-start gap-6">
							<Avatar className="h-24 w-24">
								<AvatarImage src={user.avatarURL} alt={user.name} />
								<AvatarFallback>
									{user.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="space-y-2">
								<h1 className="text-4xl font-bold">{user.name}</h1>
								<p className="text-xl text-muted-foreground">{user.email}</p>
								{stats?.principal_language && (
									<LanguageBadge language={stats.principal_language} />
								)}
							</div>
						</div>

						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Carreras completadas
									</CardTitle>
									<Trophy className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{stats?.total_races || 0}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										CPM más alto
									</CardTitle>
									<TrendingUp className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{stats?.best_cpm || 0}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										CPM promedio
									</CardTitle>
									<Activity className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{stats?.average_cpm || 0}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Tiempo total en carreras
									</CardTitle>
									<Clock className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{stats?.total_time || 0}s
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Recent Races */}
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold">Mis carreras</h2>
							<div className="rounded-lg border border-border overflow-hidden">
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead>
											<tr className="border-b border-border bg-card">
												<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
													Fecha
												</th>
												<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
													CPM
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
														<td className="px-4 py-3">{race.cpm}</td>
														<td className="px-4 py-3">{race.time_elapsed}s</td>
														<td className="px-4 py-3">
															<IconLanguage language={race.language} />
														</td>
													</tr>
												))
											) : (
												<tr>
													<td
														colSpan={4}
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
					</div>
				</main>
			</div>
		</div>
	);
}
