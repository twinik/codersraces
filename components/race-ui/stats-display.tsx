import React from "react";
import { Progress } from "@/components/ui/progress";

interface StatsDisplayProps {
	time: number;
	cpm: number;
	accuracy: number;
	progress: number;
}

export function StatsDisplay({
	time,
	cpm,
	accuracy,
	progress,
}: StatsDisplayProps) {
	return (
		<div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto]">
			<div className="space-y-1.5">
				<label className="text-sm font-medium">Progreso</label>
				<Progress value={progress} className="h-2" />
			</div>

			<div className="min-w-[100px] p-3 bg-background rounded-lg border">
				<div className="text-xs text-muted-foreground mb-1">Tiempo</div>
				<div className="font-mono text-lg">{time.toFixed(1)}s</div>
			</div>

			<div className="min-w-[100px] p-3 bg-background rounded-lg border">
				<div className="text-xs text-muted-foreground mb-1">CPM</div>
				<div className="font-mono text-lg">{cpm}</div>
			</div>

			<div className="min-w-[100px] p-3 bg-background rounded-lg border">
				<div className="text-xs text-muted-foreground mb-1">Precisión</div>
				<div
					className={`font-mono text-lg ${
						accuracy >= 80
							? "text-green-500"
							: accuracy >= 50
							? "text-yellow-500"
							: "text-red-500"
					}`}
				>
					{accuracy}%
				</div>
			</div>
		</div>
	);
}
