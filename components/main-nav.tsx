"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Github } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignInButton } from "./signin-button";

export function MainNav() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const NavLinks = () => (
		<>
			<Link
				className={`text-md ${
					pathname === "/"
						? "text-foreground font-bold"
						: "text-muted-foreground"
				} hover:text-foreground transform transition-transform duration-300 ease-in-out hover:translate-y-1`}
				href="/"
				onClick={() => setIsOpen(false)}
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
				onClick={() => setIsOpen(false)}
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
				onClick={() => setIsOpen(false)}
			>
				Clasificación
			</Link>
		</>
	);

	return (
		<nav className="flex items-center justify-between p-4 max-w-7xl mx-auto w-full animate-fade-in-down animate-delay-400 animate-duration-900">
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="md:hidden">
						<Menu className="h-6 w-6" />
						<span className="sr-only">Toggle menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="w-[240px] sm:w-[300px]">
					<div className="flex flex-col gap-4 mt-4">
						<NavLinks />
					</div>
				</SheetContent>
			</Sheet>
			<div className="hidden md:flex items-center gap-8">
				<NavLinks />
			</div>
			<div className="md:hidden">
				<SignInButton />
			</div>
			<div className="hidden md:block">
				<SignInButton />
			</div>
		</nav>
	);
}
