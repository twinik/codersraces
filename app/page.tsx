import { CodePreview } from "@/components/code-preview";
import PlayButton from "@/components/play-button";

export default function Component() {
	return (
		<main className="flex-grow flex items-center justify-center px-4">
			<div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
				<div className="max-w-xl animate-fade-in-up animate-delay-400 animate-duration-900">
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
