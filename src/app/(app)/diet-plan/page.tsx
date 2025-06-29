import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EnhancedMealCard, enhancedPlaceholderMeals } from "@/components/enhanced-meal-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, NotebookText } from "lucide-react";
import Image from "next/image";

const userDietPlan = {
  dietaryRecommendations: "Focus on whole grains, lean proteins, and plenty of vegetables. Limit processed foods and sugary drinks. Ensure adequate hydration by drinking at least 8 glasses of water per day.",
  macroNutrientTargets: "Protein: 100g, Carbohydrates: 200g, Fats: 60g. Total Calories: ~1800 kcal.",
  foodSuggestions: "Breakfast: Oatmeal with berries and nuts. Lunch: Grilled chicken salad with mixed greens. Dinner: Baked salmon with roasted vegetables. Snacks: Greek yogurt, almonds, apple slices.",
};

export default function DietPlanPage() {
  const hasPlan = true;

  if (!hasPlan) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="max-w-md p-8 shadow-xl">
          <CardHeader>
            <CardTitle>No Diet Plan Found</CardTitle>
            <CardDescription>
              Please complete your profile to generate a personalized diet plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Image 
              src="https://placehold.co/300x200.png" 
              alt="Illustration of a person thinking about a diet plan" 
              width={300} 
              height={200} 
              className="rounded-lg object-cover shadow-sm mb-4"
              data-ai-hint="planning thinking"
            />
            <Button asChild>
              <Link href="/profile">Go to Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="responsive-spacing">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 p-4 bg-card/50 rounded-lg shadow-md">
        <div className="space-y-2 flex-1">
            <h1 className="responsive-heading flex items-center gap-2"><NotebookText className="text-primary h-8 w-8"/>Your Personalized Diet Plan</h1>
            <p className="text-muted-foreground">
            Here are your AI-generated dietary recommendations and meal suggestions based on your profile.
            </p>
        </div>
        <Image 
            src="https://images.unsplash.com/photo-1514540746696-d285708190bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxib3dsJTIwb2YlMjB2ZWdpdGFibGUlMjBzYWxhZCUyMHdpdGglMjB3YWxudXRzfGVufDB8fHx8MTc0NzkwNjY2OHww&ixlib=rb-4.1.0&q=80&w=200" 
            alt="Bowl of vegetable salad with walnuts" 
            width={200} 
            height={130} 
            className="rounded-lg object-cover shadow-md"
            data-ai-hint="salad healthy"
        />
      </header>

      <Card className="shadow-xl bg-card/70">
        <CardHeader>
          <CardTitle>AI Generated Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="responsive-spacing">
          <div>
            <h3 className="font-semibold text-lg text-primary">Dietary Recommendations</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{userDietPlan.dietaryRecommendations}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-primary">Macro Nutrient Targets</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{userDietPlan.macroNutrientTargets}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-primary">General Food Suggestions</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{userDietPlan.foodSuggestions}</p>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Tip from DietWise AI!</AlertTitle>
        <AlertDescription>
          Remember to adjust portion sizes based on your activity level and hunger. For more specific meal ideas, check out the suggestions below or use the Meal Planner.
        </AlertDescription>
      </Alert>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Meal Ideas</h2>
          <Button variant="outline" asChild>
            <Link href="/meal-planner">Advanced Meal Planner</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {enhancedPlaceholderMeals.map((meal, index) => (
            <EnhancedMealCard key={meal.id} meal={meal} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}