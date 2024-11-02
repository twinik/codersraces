"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Github, User, LogOut, ChevronDown, Loader2 } from "lucide-react";

export function SignInButton() {
	const { data: session, status } = useSession();
	const [isLoading, setIsLoading] = useState(false);

	const handleSignIn = async () => {
		setIsLoading(true);
		await signIn("github");
		setIsLoading(false);
	};

	if (status === "loading") {
		return (
			<Button variant="outline" disabled className="flex items-center">
				<Loader2 className="h-4 w-4 animate-spin" />
				<span className="sr-only">Cargando</span>
			</Button>
		);
	}

	if (session) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="flex items-center gap-2 px-4 py-2"
					>
						<img
							src={session.user?.image ?? ""}
							alt={session.user?.name ?? ""}
							className="h-6 w-6 rounded-full"
						/>
						<span className="hidden md:inline">{session.user?.name}</span>
						<ChevronDown className="h-4 w-4 md:inline-block hidden" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="dark w-fit bg-background text-foreground border border-border shadow-md"
				>
					<DropdownMenuItem className="focus:bg-accent focus:text-accent-foreground w-full px-4 py-2 hover:cursor-pointer">
						<User className="mr-2 h-4 w-4" />
						<span>Mi Perfil</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => signOut()}
						className="text-red-600 hover:bg-red-600 hover:text-white focus:bg-destructive focus:text-destructive-foreground w-full px-4 py-2 hover:cursor-pointer"
					>
						<LogOut className="mr-2 h-4 w-4" />
						<span>Cerrar Sesión</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<Button
			variant="outline"
			className="flex items-center gap-2 px-4 py-2"
			onClick={handleSignIn}
			disabled={isLoading}
		>
			{isLoading ? (
				<Loader2 className="h-4 w-4 animate-spin" />
			) : (
				<>
					<Github className="h-4 w-4" />
					<span className="hidden md:inline">Iniciar Sesión con GitHub</span>
				</>
			)}
		</Button>
	);
}
