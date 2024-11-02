import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Play } from "lucide-react";

export default function PlayButton() {
	return (
		<Link href="/play">
			<Button size="lg" className="gap-2 text-base">
				<Play className="h-5 w-5" /> Jugar ahora
			</Button>
		</Link>
	);
}
