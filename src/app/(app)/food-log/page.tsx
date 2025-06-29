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
import { AlertCircle, BookCheck, Clock, Utensils } from "lucide-react";
import { motion } from "framer-motion";

interface LoggedMeal {
  mealType: string;
  foodItems: string;
  portionSize?: string;
  notes?: string;
  timestamp: Date;
}

const userProfileForAnalyzer = "Female, 30 years old, moderately active, no major health issues, occasional migraines. Follows a pescatarian diet.";

export default function FoodLogPage() {
  const { toast } = useToast();
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
  const [analysisResult, setAnalysisResult] = useState<NutrientDeficiencyOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleMealLogged = (mealData: Omit<LoggedMeal, 'timestamp'>) => {
    setLoggedMeals(prev => [...prev, { ...mealData, timestamp: new Date() }]);
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

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'Breakfast': return '🌅';
      case 'Lunch': return '☀️';
      case 'Dinner': return '🌙';
      case 'Snack': return '🍎';
      default: return '🍽️';
    }
  };

  return (
    <div className="responsive-spacing">
      {/* Mobile-first header */}
      <motion.div 
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-primary to-yellow-500 shadow-lg">
              <Utensils className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="responsive-heading text-gray-800">Food Log</h1>
              <p className="text-sm text-gray-600">Track your daily nutrition</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </motion.div>

      {/* Mobile-optimized layout */}
      <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
        {/* Main content - Food logging */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="card-responsive shadow-xl border-0 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="touch-spacing border-b border-gray-100">
                <CardTitle className="responsive-text flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    <Utensils className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  Log Your Meal
                </CardTitle>
                <CardDescription className="responsive-text">
                  Keep track of what you eat to better understand your nutritional intake.
                </CardDescription>
              </CardHeader>
              <CardContent className="touch-spacing">
                <FoodLogForm onMealLogged={handleMealLogged} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Today's meals - Mobile optimized */}
          {loggedMeals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="card-responsive shadow-lg border-0">
                <CardHeader className="touch-spacing border-b border-gray-100">
                  <CardTitle className="responsive-text flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-green-100">
                      <BookCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    Today&apos;s Logged Meals
                    <span className="ml-auto text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {loggedMeals.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="touch-spacing">
                  <div className="space-y-3">
                    {loggedMeals.slice().reverse().map((meal, index) => (
                      <motion.div 
                        key={index} 
                        className="p-3 sm:p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">{getMealIcon(meal.mealType)}</span>
                              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                                {meal.mealType}
                              </p>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {meal.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed mb-2 break-words">
                              {meal.foodItems}
                            </p>
                            {meal.portionSize && (
                              <p className="text-xs text-gray-600 mb-1">
                                <span className="font-medium">Portion:</span> {meal.portionSize}
                              </p>
                            )}
                            {meal.notes && (
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">Notes:</span> {meal.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar - Nutrient tracking and analysis */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NutrientTracker />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="card-responsive shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="touch-spacing">
                <CardTitle className="responsive-text flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-100">
                    <BookCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  Nutrient Analysis
                </CardTitle>
                <CardDescription className="responsive-text">
                  Let our AI analyze your food logs for nutritional insights.
                </CardDescription>
              </CardHeader>
              <CardContent className="touch-spacing">
                <motion.div
                  whileHover={{ scale: loggedMeals.length === 0 || isAnalyzing ? 1 : 1.02 }}
                  whileTap={{ scale: loggedMeals.length === 0 || isAnalyzing ? 1 : 0.98 }}
                >
                  <Button 
                    onClick={handleAnalyzeFoodLog} 
                    disabled={isAnalyzing || loggedMeals.length === 0} 
                    className="button-responsive bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze My Food Log"}
                  </Button>
                </motion.div>
                
                {analysisResult && (
                  <motion.div 
                    className="mt-6 space-y-4 p-4 border border-blue-200 rounded-xl bg-white/80 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg text-blue-800 mb-2">Analysis Summary:</h4>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{analysisResult.summary}</p>
                    </div>
                    <Separator className="bg-blue-200" />
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg text-blue-800 mb-2">Recommendations:</h4>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{analysisResult.recommendations}</p>
                    </div>
                  </motion.div>
                )}
                
                {loggedMeals.length === 0 && !isAnalyzing && (
                  <motion.div 
                    className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-sm text-yellow-800 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>Log some meals to enable analysis.</span>
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}