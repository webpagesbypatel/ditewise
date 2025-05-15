"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Zap, Soup, Wheat } from "lucide-react"; // Example icons

interface NutrientGoal {
  name: string;
  current: number;
  target: number;
  unit: string;
  icon: React.ElementType;
}

// Placeholder data, this would come from user's diet plan and logged meals
const nutrientGoals: NutrientGoal[] = [
  { name: "Calories", current: 1250, target: 2000, unit: "kcal", icon: Flame },
  { name: "Protein", current: 80, target: 120, unit: "g", icon: Soup },
  { name: "Carbs", current: 150, target: 250, unit: "g", icon: Wheat },
  { name: "Fat", current: 40, target: 70, unit: "g", icon: Zap },
];

export function NutrientTracker() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Daily Nutrient Goals</CardTitle>
        <CardDescription>Track your intake against your personalized targets.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {nutrientGoals.map((nutrient) => {
          const percentage = Math.min((nutrient.current / nutrient.target) * 100, 100);
          const Icon = nutrient.icon;
          return (
            <div key={nutrient.name} className="space-y-1">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="flex items-center"><Icon className="w-4 h-4 mr-2 text-primary" /> {nutrient.name}</span>
                <span>{nutrient.current}{nutrient.unit} / {nutrient.target}{nutrient.unit}</span>
              </div>
              <Progress value={percentage} aria-label={`${nutrient.name} progress`} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
