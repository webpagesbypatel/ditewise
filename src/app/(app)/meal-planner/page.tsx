import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, UtensilsCrossed, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function MealPlannerPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Advanced Meal Planner</h1>
        <p className="text-muted-foreground">
          Plan your meals for the week, swap recipes, and generate shopping lists with ease.
        </p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarDays className="text-primary"/>Weekly Meal Calendar (Coming Soon)</CardTitle>
          <CardDescription>
            Visualize your meals for the upcoming week. Drag and drop recipes, and easily make adjustments.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Image 
            src="https://placehold.co/600x300.png" 
            alt="Meal calendar placeholder" 
            width={600} 
            height={300} 
            className="mx-auto rounded-lg object-cover shadow-md mb-4"
            data-ai-hint="calendar schedule" 
          />
          <p className="text-muted-foreground">This feature is currently under development. Stay tuned!</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UtensilsCrossed className="text-primary"/>Smart Meal Swapper</CardTitle>
            <CardDescription>
              Need to change a meal? Our AI will suggest compliant alternatives.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>Swap Meal (Coming Soon)</Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">Integrates with the Smart Ingredient Swapper tool.</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShoppingCart className="text-primary"/>Automated Shopping List</CardTitle>
            <CardDescription>
              Generate a shopping list based on your planned meals for the week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>Generate List (Coming Soon)</Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Placeholder for Smart Ingredient Swapper integration, or link to standalone page */}
      <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Quick Ingredient Swap</CardTitle>
            <CardDescription>
              Need a substitute for an ingredient? Use our AI-powered swapper.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Button variant="outline" asChild className="w-full">
              <a href="/ingredient-swapper">Go to Ingredient Swapper</a>
            </Button>
          </CardContent>
        </Card>
    </div>
  );
}
