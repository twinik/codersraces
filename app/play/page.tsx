import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function Play() {
	return (
		<main className="flex-grow container mx-auto px-4 py-8">
			<div className="max-w-7xl mx-auto space-y-6">
				<div className="animate-fade-in-left animate-delay-400 animate-duration-900 text-center md:text-left">
					<h1 className="text-2xl md:text-3xl font-bold mb-2">
						Elige tu modo de juego
					</h1>
					<p className="text-sm md:text-base text-muted-foreground">
						Practica tus habilidades o compite contra otros jugadores iniciando
						sesión con tu cuenta de GitHub
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-6 animate-fade-in-right animate-delay-400 animate-duration-900">
					{/* Practice Mode */}
					<Card className="bg-card border-border">
						<CardHeader>
							<CardTitle>Practicar</CardTitle>
							<CardDescription>
								Mejora tu velocidad de programación a tu propio ritmo mediante
								la práctica.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="min-h-[150px] md:min-h-[200px] rounded-md bg-muted p-4 overflow-x-auto">
									<pre className="text-sm text-muted-foreground">
										<code>{`function example() {
  // Tu código aquí
  return true;
}`}</code>
									</pre>
								</div>
								<div className="flex flex-col md:flex-row items-center gap-4">
									<Select>
										<SelectTrigger className="w-full md:w-[200px]">
											<SelectValue placeholder="Selecciona un lenguaje" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="javascript">JavaScript</SelectItem>
											<SelectItem value="typescript">TypeScript</SelectItem>
											<SelectItem value="python">Python</SelectItem>
											<SelectItem value="java">Java</SelectItem>
										</SelectContent>
									</Select>
									<Button className="w-full md:w-auto md:ml-auto">
										Comenzar
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Compete Mode */}
					<Card className="bg-card border-border">
						<CardHeader>
							<CardTitle>Competir</CardTitle>
							<CardDescription>
								Compite y pon a prueba tus habilidades, cada partida se guardará
								en tu perfil.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="min-h-[150px] md:min-h-[200px] rounded-md bg-muted p-4 overflow-x-auto">
									<pre className="text-sm text-muted-foreground">
										<code>{`function compete() {
  // Compite contra otros
  return winner;
}`}</code>
									</pre>
								</div>
								<div className="flex flex-col md:flex-row items-center gap-4">
									<Select>
										<SelectTrigger className="w-full md:w-[200px]">
											<SelectValue placeholder="Selecciona un lenguaje" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="javascript">JavaScript</SelectItem>
											<SelectItem value="typescript">TypeScript</SelectItem>
											<SelectItem value="python">Python</SelectItem>
											<SelectItem value="java">Java</SelectItem>
										</SelectContent>
									</Select>
									<Button className="w-full md:w-auto md:ml-auto">
										Comenzar
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
