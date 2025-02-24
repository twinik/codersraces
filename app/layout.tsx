import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { MainNav } from "@/components/main-nav";
import Squares from "@/components/squares-background";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
	title: {
		default: "Coders Races",
		template: "%s | Coders Races",
	},
	description: "¿Qué tan rápido podes programar?",
	keywords: [
		"programación",
		"competencia de codificación",
		"práctica de código",
		"velocidad de programación",
		"desarrollo de software",
		"desarrollo web",
		"code",
		"race",
	],
	authors: [{ name: "Tobi", url: "https://github.com/twinik" }],
	creator: "Tobi",
	openGraph: {
		type: "website",
		locale: "es_ES",
		url: "http://codersraces.vercel.app/",
		siteName: "Coders Races",
		title: "Coders Races",
		description: "¿Qué tan rápido podes programar?",
		images: [
			{
				url: "https://github.com/twinik/codersraces/blob/main/public/social.png",
				width: 1200,
				height: 630,
				alt: "Coders Races",
			},
		],
	},
	icons: {
		icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
	},
	alternates: {
		canonical: "http://codersraces.vercel.app/",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<head>
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<meta name="theme-color" content="#000000" />
			</head>
			<body className={inter.className}>
				<div className="dark">
					<div className="min-h-screen bg-background text-foreground flex flex-col relative">
						<div className="absolute inset-0 z-0">
							<Squares
								speed={0.5}
								squareSize={40}
								direction="diagonal"
								borderColor="#252525"
								hoverFillColor="#222"
							/>
						</div>
						<MainNav />
						<div className="relative z-10 flex-grow">{children}</div>
					</div>
				</div>
				<SpeedInsights />
				<Analytics />
				<Script id="schema-org" type="application/ld+json">
					{`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Coders Races",
              "url": "http://codersraces.vercel.app",
              "description": "¿Qué tan rápido podes programar?",
            }
          `}
				</Script>
			</body>
		</html>
	);
}
