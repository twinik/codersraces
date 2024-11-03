import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function CPMTooltip() {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Info className="h-4 w-4" />
				</TooltipTrigger>
				<TooltipContent side="bottom">
					<p>Caracteres por minuto</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
