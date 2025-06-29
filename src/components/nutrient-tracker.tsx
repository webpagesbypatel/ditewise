"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Zap, Soup, Wheat } from "lucide-react";
import { motion } from "framer-motion";

interface NutrientGoal {
  name: string;
  current: number;
  target: number;
  unit: string;
  icon: React.ElementType;
  color: string;
}

const nutrientGoals: NutrientGoal[] = [
  { name: "Calories", current: 1250, target: 2000, unit: "kcal", icon: Flame, color: "text-orange-600" },
  { name: "Protein", current: 80, target: 120, unit: "g", icon: Soup, color: "text-blue-600" },
  { name: "Carbs", current: 150, target: 250, unit: "g", icon: Wheat, color: "text-yellow-600" },
  { name: "Fat", current: 40, target: 70, unit: "g", icon: Zap, color: "text-purple-600" },
];

export function NutrientTracker() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="card-responsive shadow-lg">
        <CardHeader className="touch-spacing">
          <CardTitle className="responsive-text">Daily Nutrient Goals</CardTitle>
          <CardDescription className="text-sm">Track your intake against your personalized targets.</CardDescription>
        </CardHeader>
        <CardContent className="touch-spacing responsive-spacing">
          {nutrientGoals.map((nutrient, index) => {
            const percentage = Math.min((nutrient.current / nutrient.target) * 100, 100);
            const Icon = nutrient.icon;
            const isComplete = percentage >= 100;
            
            return (
              <motion.div 
                key={nutrient.name} 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <div className={`p-1 rounded ${isComplete ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Icon className={`w-4 h-4 ${isComplete ? 'text-green-600' : nutrient.color}`} />
                    </div>
                    <span className={isComplete ? 'text-green-700' : 'text-gray-700'}>
                      {nutrient.name}
                    </span>
                  </span>
                  <span className={`text-xs ${isComplete ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
                    {nutrient.current}{nutrient.unit} / {nutrient.target}{nutrient.unit}
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={percentage} 
                    aria-label={`${nutrient.name} progress`}
                    className={`h-2 ${isComplete ? 'bg-green-100' : ''}`}
                  />
                  {isComplete && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                    >
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    </motion.div>
                  )}
                </div>
                {isComplete && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-green-600 font-medium"
                  >
                    ✓ Goal achieved!
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}