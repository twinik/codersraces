"use client";

import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/code-preview";
import { MainNav } from "@/components/main-nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4">
          <MainNav />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h1 className="text-6xl font-bold tracking-tighter">
              Coders Race
            </h1>
            <p className="text-xl text-gray-400">
              ¿Qué tan rápido puedes programar?
            </p>
            <Button 
              size="lg" 
              className="bg-violet-600 hover:bg-violet-700 text-lg px-8"
              onClick={() => window.location.href = '/play'}
            >
              Jugar
            </Button>
          </div>
          
          <div className="flex-1">
            <CodePreview />
          </div>
        </div>
      </main>
    </div>
  );
}