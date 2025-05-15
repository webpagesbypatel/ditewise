"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FoodLogForm } from "@/components/forms/food-log-form";
import { NutrientTracker } from "@/components/nutrient-tracker";
import type { NutrientDeficiencyOutput } from "@/ai/flows/nutrient-deficiency-analyzer";
import { analyzeNutrientDeficiencyAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, BookCheck } from "lucide-react";

interface LoggedMeal {
  mealType: string;
  foodItems: string;
  portionSize?: string;
  notes?: string;
  timestamp: Date;
}

// This would usually be passed as a prop or fetched from user state/context
const userProfileForAnalyzer = "Female, 30 years old, moderately active, no major health issues, occasional migraines. Follows a pescatarian diet.";


export default function FoodLogPage() {
  const { toast } = useToast();
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
  const [analysisResult, setAnalysisResult] = useState<NutrientDeficiencyOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleMealLogged = (mealData: Omit<LoggedMeal, 'timestamp'>) => {
    setLoggedMeals(prev => [...prev, { ...mealData, timestamp: new Date() }]);
    // Potentially update NutrientTracker data here if it's dynamic
  };

  const handleAnalyzeFoodLog = async () => {
    if (loggedMeals.length === 0) {
      toast({
        title: "No Meals Logged",
        description: "Please log some meals before analyzing.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    const foodLogsString = loggedMeals.map(meal => 
      `${meal.mealType} (${meal.timestamp.toLocaleTimeString()}): ${meal.foodItems}${meal.portionSize ? ` (Portion: ${meal.portionSize})` : ''}${meal.notes ? ` (Notes: ${meal.notes})` : ''}`
    ).join("\n");
    
    const result = await analyzeNutrientDeficiencyAction({ foodLogs: foodLogsString, userProfile: userProfileForAnalyzer });
    setIsAnalyzing(false);

    if ('error' in result) {
      toast({
        title: "Analysis Error",
        description: result.error,
        variant: "destructive",
      });
    } else if (result) {
      setAnalysisResult(result);
      toast({
        title: "Nutrient Analysis Complete!",
        description: "Check the results below.",
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Log Your Meal</CardTitle>
            <CardDescription>
              Keep track of what you eat to better understand your nutritional intake.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FoodLogForm onMealLogged={handleMealLogged} />
          </CardContent>
        </Card>

        {loggedMeals.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Today&apos;s Logged Meals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {loggedMeals.slice().reverse().map((meal, index) => ( // Show newest first
                  <li key={index} className="p-3 border rounded-md bg-muted/30">
                    <p className="font-semibold">{meal.mealType} <span className="text-xs text-muted-foreground">({meal.timestamp.toLocaleTimeString()})</span></p>
                    <p className="text-sm">{meal.foodItems}</p>
                    {meal.portionSize && <p className="text-xs text-muted-foreground">Portion: {meal.portionSize}</p>}
                    {meal.notes && <p className="text-xs text-muted-foreground">Notes: {meal.notes}</p>}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="lg:col-span-1 space-y-8">
        <NutrientTracker />
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookCheck className="text-primary"/> Nutrient Deficiency Analyzer</CardTitle>
            <CardDescription>
              Let our AI analyze your food logs for potential nutritional insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleAnalyzeFoodLog} 
              disabled={isAnalyzing || loggedMeals.length === 0} 
              className="w-full hover:animate-pulse-glow focus:animate-pulse-glow"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze My Food Log"}
            </Button>
            {analysisResult && (
              <div className="mt-6 space-y-4 p-4 border rounded-md bg-secondary/30">
                <div>
                  <h4 className="font-semibold text-lg">Analysis Summary:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysisResult.summary}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-lg">Recommendations:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysisResult.recommendations}</p>
                </div>
              </div>
            )}
             {loggedMeals.length === 0 && !isAnalyzing && (
               <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4"/> Log some meals to enable analysis.
                </p>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
