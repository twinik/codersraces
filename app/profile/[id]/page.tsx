"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Trophy, TrendingUp } from "lucide-react";
import { getUserProfile } from "@/services/profileService";
import { getUserRaces, getUserStats } from "@/services/profileService";
import { UserSession, RaceResult, UserStats } from "@/lib/types";
import ProfileSkeleton from "@/components/ui/skeletons/profile-skeleton";
import { LanguageBadge } from "@/components/language-badge";
import CPMTooltip from "@/components/cpm-tooltip";
import RacesList from "@/components/races-list";

export default function UserProfile() {
	const params = useParams();
	const [user, setUser] = useState<UserSession>();
	const [stats, setStats] = useState<UserStats | null>(null);
	const [races, setRaces] = useState<RaceResult[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const id = params.id as string;

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const fetchedUser = await getUserProfile(id);
				setUser(fetchedUser);
				if (fetchedUser) {
					const userStats = await getUserStats(fetchedUser.id);
					setStats(userStats);
					const userRaces = await getUserRaces(fetchedUser.id);
					setRaces(userRaces);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			} finally {
				setIsLoading(false);
			}
		};
		if (id) {
			fetchUserData();
		}
	}, [id]);

	if (isLoading) {
		return <ProfileSkeleton />;
	}

	if (!id) {
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
								<AvatarImage src={user?.avatarURL} alt={user?.name} />
								<AvatarFallback>
									{user?.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<div className="flex items-end space-x-2">
									<h1 className="text-3xl font-bold">{user?.name}</h1>
									<p className="text-xl text-muted-foreground">
										{user?.username}
									</p>
								</div>
								{stats?.principal_language ? (
									<div className="mt-2 max-w-[200px]">
										<LanguageBadge language={stats.principal_language} />
									</div>
								) : (
									<div className="mt-2 max-w-[200px]">
										<LanguageBadge language="Sin información" />
									</div>
								)}
							</div>
						</div>

						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Carreras jugadas
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
									<CardTitle className="text-sm font-medium flex items-center gap-2">
										CPM más alto
										<CPMTooltip />
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
									<CardTitle className="text-sm font-medium flex items-center gap-2">
										CPM promedio
										<CPMTooltip />
									</CardTitle>
									<Activity className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{stats?.average_cpm.toFixed(2) || 0}
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

						<RacesList races={races} title="Carreras" />
					</div>
				</main>
			</div>
		</div>
	);
}
