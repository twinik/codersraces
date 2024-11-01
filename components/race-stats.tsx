"use client";

import { Card } from "@/components/ui/card";
import {
  Activity,
  Trophy,
  Timer,
  Keyboard,
} from "lucide-react";

export function RaceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Trophy className="w-5 h-5" />}
        title="Best Score"
        value="98 WPM"
      />
      <StatCard
        icon={<Activity className="w-5 h-5" />}
        title="Accuracy"
        value="96%"
      />
      <StatCard
        icon={<Timer className="w-5 h-5" />}
        title="Average Time"
        value="01:45"
      />
      <StatCard
        icon={<Keyboard className="w-5 h-5" />}
        title="Races Complete"
        value="24"
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-full text-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );
}