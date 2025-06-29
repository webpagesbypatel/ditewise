"use client"

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Apple, Flame, Soup, Heart, Clock, ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface EnhancedMealCardProps {
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
    cookTime?: string;
    difficulty?: "Easy" | "Medium" | "Hard";
  };
  index?: number;
}

export function EnhancedMealCard({ meal, index = 0 }: EnhancedMealCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const difficultyColors = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700", 
    Hard: "bg-red-100 text-red-700"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.4, 0.0, 0.2, 1]
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="card-responsive hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-white">
        <CardHeader className="p-0 relative overflow-hidden">
          <div className="relative">
            {!imageLoaded && (
              <div className="w-full h-40 sm:h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            )}
            <Image
              src={meal.imageUrl}
              alt={meal.name}
              width={400}
              height={200}
              className={`w-full h-40 sm:h-48 object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              data-ai-hint={meal.imageHint || "food meal"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Floating badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs font-medium">
                {meal.type}
              </Badge>
              {meal.difficulty && (
                <Badge className={`${difficultyColors[meal.difficulty]} text-xs font-medium`}>
                  <ChefHat className="w-3 h-3 mr-1" />
                  {meal.difficulty}
                </Badge>
              )}
            </div>

            {/* Like button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Heart 
                className={`w-4 h-4 transition-colors duration-300 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`} 
              />
            </motion.button>
          </div>
        </CardHeader>

        <CardContent className="touch-spacing space-y-4">
          <div className="space-y-2">
            <CardTitle className="responsive-text font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
              {meal.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {meal.description}
            </CardDescription>
          </div>

          {meal.cookTime && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{meal.cookTime}</span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {meal.tags?.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs border-primary/20 text-primary/80 hover:bg-primary/10 transition-colors duration-300">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Nutrition info */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-orange-100">
                <Flame className="w-3 h-3 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Calories</p>
                <p className="text-sm font-semibold text-gray-800">{meal.calories}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-blue-100">
                <Soup className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Protein</p>
                <p className="text-sm font-semibold text-gray-800">{meal.protein}g</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-green-100">
                <Apple className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Carbs</p>
                <p className="text-sm font-semibold text-gray-800">{meal.carbs}g</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-purple-100">
                <Apple className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Fat</p>
                <p className="text-sm font-semibold text-gray-800">{meal.fat}g</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="touch-spacing pt-0">
          <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              className="button-responsive bg-gradient-to-r from-primary to-yellow-500 hover:from-yellow-500 hover:to-primary text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 border-0"
            >
              View Recipe
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Enhanced placeholder data
export const enhancedPlaceholderMeals = [
  { 
    id: "1", 
    name: "Grilled Salmon Salad", 
    description: "Nutrient-packed salad with omega-3 rich salmon, mixed greens, and avocado.", 
    imageUrl: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnZWlsbGVkJTIwc2FsbW9uJTIwcmVjaXBpZXxlbnwwfHx8fDE3NDc5MDY3MDJ8MA&ixlib=rb-4.1.0&q=80&w=400", 
    imageHint: "salmon salad", 
    calories: 450, 
    protein: 35, 
    carbs: 20, 
    fat: 25, 
    tags: ["High Protein", "Low Carb", "Omega-3"], 
    type: "Lunch" as const,
    cookTime: "15 mins",
    difficulty: "Easy" as const
  },
  { 
    id: "2", 
    name: "Quinoa & Black Bean Bowl", 
    description: "A hearty vegan bowl full of fiber and plant-based protein with fresh herbs.", 
    imageUrl: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxRdWlub2ElMjB8ZW58MHx8fHwxNzQ3OTA2NzIxfDA&ixlib=rb-4.1.0&q=80&w=400", 
    imageHint: "quinoa bowl", 
    calories: 500, 
    protein: 20, 
    carbs: 70, 
    fat: 15, 
    tags: ["Vegan", "High Fiber", "Plant-Based"], 
    type: "Dinner" as const,
    cookTime: "25 mins",
    difficulty: "Medium" as const
  },
  { 
    id: "3", 
    name: "Overnight Oats with Berries", 
    description: "Easy and delicious breakfast, perfect for busy mornings with antioxidant-rich berries.", 
    imageUrl: "https://images.unsplash.com/photo-1613082410785-22292e8426e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxPdmVybmlnaHQlMjBPYXRzJTIwd2l0aCUyMEJlcnJpZXN8ZW58MHx8fHwxNzQ3OTA2NzU3fDA&ixlib=rb-4.1.0&q=80&w=400", 
    imageHint: "oats berries", 
    calories: 350, 
    protein: 15, 
    carbs: 55, 
    fat: 8, 
    tags: ["Vegetarian", "Quick", "Make-Ahead"], 
    type: "Breakfast" as const,
    cookTime: "5 mins prep",
    difficulty: "Easy" as const
  },
];