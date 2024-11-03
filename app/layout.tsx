import "./globals.css";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { MainNav } from "@/components/main-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Coders Races",
	description: "¿Qué tan rápido podes programar?",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/x-icon" href="./favicon.ico" />
			</head>
			<body className={inter.className}>
				<div className="dark">
					<div className="min-h-screen bg-background text-foreground flex flex-col">
						<MainNav />
						{children}
					</div>
				</div>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
