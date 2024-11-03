"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Trophy } from "lucide-react";
import { fetchSession } from "@/services/authService";
import { getUserStats } from "@/services/profileService";
import { UserSession, RaceResult, UserStats } from "@/lib/types";

export default function Profile() {
	const [user, setUser] = useState<UserSession | null>(null);
	const [stats, setStats] = useState<UserStats | null>(null);
	const [races, setRaces] = useState<RaceResult[]>([]);

	useEffect(() => {
		const fetchUserData = async () => {
			const fetchedSession = await fetchSession();
			setUser(fetchedSession);

			if (fetchedSession?.id) {
				const userStats = await getUserStats(fetchedSession.id);
				setStats(userStats);
			}
		};

		fetchUserData();
	}, []);

	if (!user) {
		return <p>Cargando...</p>;
	}

	return (
		<div className="dark">
			<div className="min-h-screen bg-background text-foreground">
				<main className="container mx-auto px-4 py-8">
					<div className="max-w-5xl mx-auto space-y-8">
						<div className="flex items-start gap-4">
							<Avatar className="h-20 w-20">
								<AvatarImage src={user.avatarURL} alt={user.name} />
								<AvatarFallback>
									{user.email.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div>
								<h1 className="text-3xl font-bold">{user.name}</h1>
								<p className="text-muted-foreground">{user.email}</p>
							</div>
						</div>

						<div className="grid gap-4 md:grid-cols-3">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Carreras completadas
									</CardTitle>
									<Trophy className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{stats?.total_races}</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										CPM más alto
									</CardTitle>
									<Activity className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{stats?.average_cpm}</div>
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
									<div className="text-2xl font-bold">{stats?.total_time}s</div>
								</CardContent>
							</Card>
						</div>

						{/* Recent Races */}
						<div className="space-y-4">
							<h2 className="text-xl font-semibold">Mis carreras</h2>
							<div className="rounded-lg border border-border">
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
													Tiempo (s)
												</th>
												<th className="text-left text-sm text-muted-foreground font-medium px-4 py-3">
													Lenguaje
												</th>
											</tr>
										</thead>
										<tbody>
											{races.map((race, index) => (
												<tr
													key={index}
													className="border-b border-border bg-card/50 hover:bg-card/80 transition-colors"
												>
													<td className="px-4 py-3">{race.date}</td>
													<td className="px-4 py-3">{race.cps}</td>
													<td className="px-4 py-3">{race.time}</td>
													<td className="px-4 py-3">
														<div className="flex items-center gap-2">
															<div className="h-6 w-6 flex items-center justify-center rounded bg-yellow-500/10 text-yellow-500 text-xs font-medium">
																JS
															</div>
															<span>{race.language}</span>
														</div>
													</td>
												</tr>
											))}
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
