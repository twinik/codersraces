"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Activity, Target } from "lucide-react";
import confetti from "canvas-confetti";

interface CompletionCardProps {
	time: number;
	cpm: number;
	accuracy: number;
}

export function CompletionCard(
	{ time, cpm, accuracy }: CompletionCardProps = {
		time: 60,
		cpm: 50,
		accuracy: 95,
	}
) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	}, []);

	return (
		<div className="w-full max-w-4xl mx-auto p-6 mt-6">
			<Card
				className={`p-6 transition-all duration-500 ease-out ${
					show
						? "opacity-100 transform translate-y-0"
						: "opacity-0 transform -translate-y-4"
				}`}
			>
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center mb-2">
						¡Felicidades!
					</CardTitle>
					<p className="text-muted-foreground text-center mb-6">
						Completaste la carrera de código con éxito. Aquí tienes tus
						estadísticas:
					</p>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<Card className="bg-primary/10">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Tiempo</CardTitle>
								<Clock className="h-4 w-4 text-primary" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{time.toFixed(1)}s</div>
							</CardContent>
						</Card>

						<Card className="bg-primary/10">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">CPM</CardTitle>
								<Activity className="h-4 w-4 text-primary" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{cpm}</div>
							</CardContent>
						</Card>

						<Card className="bg-primary/10">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Precisión</CardTitle>
								<Target className="h-4 w-4 text-primary" />
							</CardHeader>
							<CardContent>
								<div
									className={`text-2xl font-bold ${
										accuracy >= 80
											? "text-green-500"
											: accuracy >= 50
											? "text-yellow-500"
											: "text-red-500"
									}`}
								>
									{accuracy}%
								</div>
							</CardContent>
						</Card>
					</div>
					<div className="mt-6 flex justify-center">
						<Link href="/play">
							<Button variant="outline">Volver</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
