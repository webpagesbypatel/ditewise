import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Apple, Flame, Soup } from "lucide-react";

interface MealCardProps {
  meal: {
    id: string;
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
    <Card className="card-responsive hover:shadow-xl transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={meal.imageUrl}
          alt={meal.name}
          width={400}
          height={200}
          className="w-full h-40 sm:h-48 object-cover"
          data-ai-hint={meal.imageHint || "food meal"}
        />
      </CardHeader>
      <CardContent className="touch-spacing space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <CardTitle className="responsive-text font-semibold">{meal.name}</CardTitle>
            <Badge variant="outline" className="capitalize text-xs self-start">{meal.type}</Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed min-h-[40px]">{meal.description}</CardDescription>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {meal.tags?.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-1"><Flame className="w-3 h-3 sm:w-4 sm:h-4 text-primary"/> {meal.calories}kcal</div>
            <div className="flex items-center gap-1"><Soup className="w-3 h-3 sm:w-4 sm:h-4 text-primary"/> {meal.protein}g protein</div>
            <div className="flex items-center gap-1"><Apple className="w-3 h-3 sm:w-4 sm:h-4 text-primary"/> {meal.carbs}g carbs</div>
            <div className="flex items-center gap-1"><Apple className="w-3 h-3 sm:w-4 sm:h-4 text-primary"/> {meal.fat}g fat</div>
        </div>
      </CardContent>
      <CardFooter className="touch-spacing pt-0">
        <Button variant="outline" className="button-responsive border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}

// Placeholder data for demonstration
export const placeholderMeals = [
  { id: "1", name: "Grilled Salmon Salad", description: "Nutrient-packed salad with omega-3 rich salmon.", imageUrl: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnZWlsbGVkJTIwc2FsbW9uJTIwcmVjaXBpZXxlbnwwfHx8fDE3NDc5MDY3MDJ8MA&ixlib=rb-4.1.0&q=80&w=400", imageHint: "salmon salad", calories: 450, protein: 35, carbs: 20, fat: 25, tags: ["High Protein", "Low Carb"], type: "Lunch" as const },
  { id: "2", name: "Quinoa & Black Bean Bowl", description: "A hearty vegan bowl full of fiber and plant-based protein.", imageUrl: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxRdWlub2ElMjB8ZW58MHx8fHwxNzQ3OTA2NzIxfDA&ixlib=rb-4.1.0&q=80&w=400", imageHint: "quinoa bowl", calories: 500, protein: 20, carbs: 70, fat: 15, tags: ["Vegan", "High Fiber"], type: "Dinner" as const },
  { id: "3", name: "Overnight Oats with Berries", description: "Easy and delicious breakfast, perfect for busy mornings.", imageUrl: "https://images.unsplash.com/photo-1613082410785-22292e8426e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxPdmVybmlnaHQlMjBPYXRzJTIwd2l0aCUyMEJlcnJpZXN8ZW58MHx8fHwxNzQ3OTA2NzU3fDA&ixlib=rb-4.1.0&q=80&w=400", imageHint: "oats berries", calories: 350, protein: 15, carbs: 55, fat: 8, tags: ["Vegetarian", "Quick"], type: "Breakfast" as const },
];