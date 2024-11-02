"use client";

import { useState, useEffect } from "react";
import {
	fetchSession,
	onAuthStateChange,
	signInWithGitHub,
	signOut,
} from "@/services/authService";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Github, User, LogOut, ChevronDown, Loader2 } from "lucide-react";

export function SignInButton() {
	const [session, setSession] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getSession = async () => {
			const sessionData = await fetchSession();
			setSession(sessionData);
		};

		getSession();

		const subscription = onAuthStateChange(setSession);

		return () => {
			if (subscription) {
				subscription.unsubscribe();
			}
		};
	}, []);

	const handleSignIn = async () => {
		setIsLoading(true);
		try {
			await signInWithGitHub();
		} catch (error) {
			console.error("Error al iniciar sesión:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignOut = async () => {
		setIsLoading(true);
		try {
			await signOut();
		} catch (error) {
			console.error("Error al cerrar sesión:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
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
							src={session.user?.user_metadata?.avatar_url ?? ""}
							alt={session.user?.user_metadata?.full_name ?? ""}
							className="h-6 w-6 rounded-full"
						/>
						<span className="hidden md:inline">
							{session.user?.user_metadata?.full_name}
						</span>
						<ChevronDown className="h-4 w-4 md:inline-block hidden" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="dark w-fit bg-background text-foreground border border-border shadow-md"
				>
					<Link href="/profile">
						<DropdownMenuItem className="focus:bg-accent focus:text-accent-foreground w-full px-4 py-2 hover:cursor-pointer">
							<User className="mr-2 h-4 w-4" />
							<span>Mi Perfil</span>
						</DropdownMenuItem>
					</Link>

					<DropdownMenuItem
						onClick={handleSignOut}
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
