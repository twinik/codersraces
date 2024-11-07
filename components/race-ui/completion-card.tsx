import React from "react";
import { Card } from "@/components/ui/card";

interface CompletionCardProps {
	time: number;
	cpm: number;
	accuracy: number;
}

export function CompletionCard({ time, cpm, accuracy }: CompletionCardProps) {
	return (
		<div className="w-full max-w-4xl mx-auto p-6">
			<Card className="p-6">
				<h2 className="text-2xl font-bold">¡Felicidades!</h2>
				<p className="text-muted-foreground mb-5">
					Completaste la carrera de código con éxito. Aca tenés tus
					estadísticas:
				</p>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<p className="font-semibold">Tiempo:</p>
						<p>{time.toFixed(1)} segundos</p>
					</div>
					<div>
						<p className="font-semibold">CPM:</p>
						<p>{cpm}</p>
					</div>
					<div>
						<p className="font-semibold">Precisión:</p>
						<p>{accuracy}%</p>
					</div>
				</div>
			</Card>
		</div>
	);
}
