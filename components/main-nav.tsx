"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";

export function MainNav() {
  return (
    <div className="flex h-16 items-center justify-between">
      <nav className="flex items-center space-x-6">
        <Link 
          href="/" 
          className="text-lg font-medium transition-colors hover:text-gray-300"
        >
          Inicio
        </Link>
        <Link 
          href="/play" 
          className="text-lg font-medium transition-colors hover:text-gray-300"
        >
          Jugar
        </Link>
        <Link 
          href="/leaderboard" 
          className="text-lg font-medium transition-colors hover:text-gray-300"
        >
          Leaderboard
        </Link>
      </nav>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2 border-gray-700 hover:bg-gray-800"
      >
        <UserCircle2 className="w-5 h-5" />
        Sign in
      </Button>
    </div>
  );
}