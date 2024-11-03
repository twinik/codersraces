import React from "react";
import { Badge } from "@/components/ui/badge";
import {
	BiLogoJavascript,
	BiLogoTypescript,
	BiLogoPython,
	BiLogoJava,
	BiLogoPhp,
	BiCodeAlt,
} from "react-icons/bi";

type LanguageIconProps = {
	language: string;
	className?: string;
};

const languageColors: Record<string, string> = {
	JavaScript: "from-yellow-500 to-yellow-600",
	TypeScript: "from-blue-500 to-blue-600",
	Python: "from-green-500 to-green-600",
	Java: "from-red-500 to-red-600",
	PHP: "from-indigo-500 to-indigo-600",
	// Add more languages and their corresponding colors as needed
};

const LanguageIcon: React.FC<LanguageIconProps> = ({ language, className }) => {
	switch (language.toLowerCase()) {
		case "javascript":
			return <BiLogoJavascript className={className} />;
		case "typescript":
			return <BiLogoTypescript className={className} />;
		case "python":
			return <BiLogoPython className={className} />;
		case "java":
			return <BiLogoJava className={className} />;
		case "php":
			return <BiLogoPhp className={className} />;
		default:
			return <BiCodeAlt className={className} />;
	}
};

type LanguageBadgeProps = {
	language: string;
};

export const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language }) => {
	const gradientColors =
		languageColors[language] || "from-gray-500 to-gray-600";

	return (
		<Badge
			className={`w-full bg-gradient-to-r ${gradientColors} text-white px-3 py-1.5 text-sm font-medium rounded-md flex items-center justify-between transition-all duration-300 hover:shadow-md hover:scale-105`}
		>
			<span className="flex-grow text-left">{language}</span>
			<LanguageIcon
				language={language}
				className="w-5 h-5 ml-2 flex-shrink-0"
			/>
		</Badge>
	);
};

export const IconLanguage: React.FC<LanguageBadgeProps> = ({ language }) => {
	return <LanguageIcon language={language} className="w-6 h-6" />;
};
