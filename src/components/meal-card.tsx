import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Apple, Flame, Soup } from "lucide-react"; // Example icons

interface MealCardProps {
  meal: {
    id: string; // Added id to meal object for key prop
    name: string;
    description: string;
    imageUrl: string;
    imageHint?: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    tags?: string[];
    type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  };
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Image
          src={meal.imageUrl}
          alt={meal.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
          data-ai-hint={meal.imageHint || "food meal"}
        />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold">{meal.name}</CardTitle>
            <Badge variant="outline" className="capitalize">{meal.type}</Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground min-h-[40px]">{meal.description}</CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
          {meal.tags?.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm pt-2">
            <div className="flex items-center gap-1"><Flame className="w-4 h-4 text-primary"/> Calories: {meal.calories}kcal</div>
            <div className="flex items-center gap-1"><Soup className="w-4 h-4 text-primary"/> Protein: {meal.protein}g</div>
            <div className="flex items-center gap-1"><Apple className="w-4 h-4 text-primary"/> Carbs: {meal.carbs}g</div>
            <div className="flex items-center gap-1"><Apple className="w-4 h-4 text-primary"/> Fat: {meal.fat}g</div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button variant="outline" className="w-full">View Recipe</Button>
      </CardFooter>
    </Card>
  );
}

// Placeholder data for demonstration
export const placeholderMeals = [
  { id: "1", name: "Grilled Salmon Salad", description: "Nutrient-packed salad with omega-3 rich salmon.", imageUrl: "https://placehold.co/400x200.png", imageHint: "salmon salad", calories: 450, protein: 35, carbs: 20, fat: 25, tags: ["High Protein", "Low Carb"], type: "Lunch" as const },
  { id: "2", name: "Quinoa & Black Bean Bowl", description: "A hearty vegan bowl full of fiber and plant-based protein.", imageUrl: "https://placehold.co/400x200.png", imageHint: "quinoa bowl", calories: 500, protein: 20, carbs: 70, fat: 15, tags: ["Vegan", "High Fiber"], type: "Dinner" as const },
  { id: "3", name: "Overnight Oats with Berries", description: "Easy and delicious breakfast, perfect for busy mornings.", imageUrl: "https://placehold.co/400x200.png", imageHint: "oats berries", calories: 350, protein: 15, carbs: 55, fat: 8, tags: ["Vegetarian", "Quick"], type: "Breakfast" as const },
];
