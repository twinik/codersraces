"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function MainNav() {
	const pathname = usePathname();

	return (
		<nav className="flex items-center justify-between p-4 max-w-7xl mx-auto w-full animate-fade-in-down animate-delay-400 animate-duration-900">
			<div className="flex items-center gap-8">
				<Link
					className={`text-md ${
						pathname === "/"
							? "text-foreground font-bold"
							: "text-muted-foreground"
					} hover:text-foreground transform transition-transform duration-300 ease-in-out hover:translate-y-1`}
					href="/"
				>
					Inicio
				</Link>
				<Link
					className={`text-md ${
						pathname === "/play"
							? "text-foreground font-bold"
							: "text-muted-foreground"
					} hover:text-foreground transform transition-transform duration-300 ease-in-out hover:translate-y-1`}
					href="/play"
				>
					Jugar
				</Link>
				<Link
					className={`text-md ${
						pathname === "/leaderboard"
							? "text-foreground font-bold"
							: "text-muted-foreground"
					} hover:text-foreground transform transition-transform duration-300 ease-in-out hover:translate-y-1`}
					href="/leaderboard"
				>
					Leaderboard
				</Link>
			</div>
			<Button variant="outline" className="gap-2">
				<Github className="h-4 w-4" />
				Sign in with GitHub
			</Button>
		</nav>
	);
}
