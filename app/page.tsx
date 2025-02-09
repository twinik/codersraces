import CodePreview from "@/components/code-preview";
import PlayButton from "@/components/play-button";
import DecryptedText from "@/components/decrypted-text";

export default function Component() {
	return (
		<main
			className="flex-grow flex items-center justify-center px-4"
			style={{ minHeight: "calc(100vh - 4.5rem)" }}
		>
			<div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between gap-12">
				<div className="max-w-xl animate-fade-in-up animate-duration-200 flex flex-col text-center md:text-left">
					<DecryptedText
						text="Coders Races"
						animateOn="view"
						revealDirection="start"
						speed={90}
						className="text-5xl md:text-6xl font-bold mb-6"
						parentClassName="text-5xl md:text-6xl font-bold mb-6"
						sequential={true}
					/>
					<DecryptedText
						text="¿Qué tan rápido podes programar?"
						animateOn="view"
						revealDirection="start"
						speed={50}
						className="text-xl text-muted-foreground mb-8"
						parentClassName="text-xl text-muted-foreground mb-8"
						sequential={true}
					/>
					<PlayButton />
				</div>
				<CodePreview />
			</div>
		</main>
	);
}
