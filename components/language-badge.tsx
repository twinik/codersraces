import React from "react";
import { Badge } from "@/components/ui/badge";
import {
	BiLogoJavascript,
	BiLogoTypescript,
	BiLogoPython,
	BiLogoJava,
	BiLogoPhp,
	BiLogoCPlusPlus,
	BiCodeAlt,
} from "react-icons/bi";
import { FaRust } from "react-icons/fa";

type LanguageIconProps = {
	language: string;
	className?: string;
};

const languageColors: Record<string, string> = {
	JavaScript: "from-yellow-400 to-yellow-500",
	TypeScript: "from-blue-400 to-blue-500",
	Python: "from-blue-500 to-blue-600",
	Java: "from-red-400 to-red-500",
	PHP: "from-indigo-400 to-indigo-500",
	Rust: "from-orange-400 to-orange-500",
	"C++": "from-purple-400 to-purple-500",
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
		case "c++":
			return <BiLogoCPlusPlus className={className} />;
		case "rust":
			return <FaRust className={className} />;
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
			className={`inline-flex bg-gradient-to-r ${gradientColors} text-white px-3 py-1.5 text-sm font-medium rounded-md items-center justify-between transition-all duration-300 hover:shadow-md hover:scale-105`}
		>
			<LanguageIcon
				language={language}
				className="w-5 h-5 mr-2 flex-shrink-0"
			/>
			<span className="flex-grow text-left">{language}</span>
		</Badge>
	);
};

export const IconLanguage: React.FC<LanguageBadgeProps> = ({ language }) => {
	return (
		<div className="flex row gap-2">
			<LanguageIcon language={language} className="w-6 h-6" />
			{language}
		</div>
	);
};
