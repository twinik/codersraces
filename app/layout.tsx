import "./globals.css";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { MainNav } from "@/components/main-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Coders Race",
	description: "Coders Race page",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="dark">
					<div className="min-h-screen bg-background text-foreground flex flex-col">
						<MainNav />
						{children}
					</div>
				</div>
				<SpeedInsights />
			</body>
		</html>
	);
}
