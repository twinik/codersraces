import { CodePreview } from "@/components/code-preview";
import PlayButton from "@/components/play-button";

export default function Component() {
	return (
		<main className="flex-grow flex items-center justify-center px-4">
			<div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between gap-12">
				<div className="max-w-xl animate-fade-in-up animate-duration-200 text-center md:text-left">
					<h1 className="text-5xl md:text-6xl font-bold mb-6">Coders Races</h1>
					<p className="text-xl text-muted-foreground mb-8">
						¿Qué tan rápido podes programar?
					</p>
					<PlayButton />
				</div>
				<CodePreview />
			</div>
		</main>
	);
}
