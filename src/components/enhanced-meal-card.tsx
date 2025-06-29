"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Apple, Flame, Soup, Heart, Clock, ChefHat } from "lucide-react";

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
  };
}

export function EnhancedMealCard({ meal }: EnhancedMealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col bg-gradient-to-br from-card to-card/80 border-0 ring-1 ring-border/50">
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={meal.imageUrl}
              alt={meal.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
              data-ai-hint={meal.imageHint || "food meal"}
            />
          </motion.div>
          <div className="absolute top-3 right-3">
            <Badge 
              variant="secondary" 
              className="bg-background/90 backdrop-blur-sm border-0 shadow-lg"
            >
              {meal.type}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg">
              <Clock className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium">15 min</span>
            </div>
          </div>
        </div>

        <CardContent className="p-4 space-y-3 flex-grow">
          <div className="space-y-2">
            <CardTitle className="text-xl font-semibold leading-tight">{meal.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {meal.description}
            </CardDescription>
          </div>

          {meal.tags && (
            <div className="flex flex-wrap gap-1.5">
              {meal.tags.slice(0, 3).map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="text-xs px-2 py-0.5 bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.div 
              className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
              whileHover={{ scale: 1.02 }}
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <div className="text-xs">
                <div className="font-medium text-orange-700 dark:text-orange-300">{meal.calories}</div>
                <div className="text-orange-600/70 dark:text-orange-400/70">kcal</div>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
              whileHover={{ scale: 1.02 }}
            >
              <Soup className="w-4 h-4 text-blue-500" />
              <div className="text-xs">
                <div className="font-medium text-blue-700 dark:text-blue-300">{meal.protein}g</div>
                <div className="text-blue-600/70 dark:text-blue-400/70">protein</div>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
              whileHover={{ scale: 1.02 }}
            >
              <Apple className="w-4 h-4 text-green-500" />
              <div className="text-xs">
                <div className="font-medium text-green-700 dark:text-green-300">{meal.carbs}g</div>
                <div className="text-green-600/70 dark:text-green-400/70">carbs</div>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
              whileHover={{ scale: 1.02 }}
            >
              <Heart className="w-4 h-4 text-purple-500" />
              <div className="text-xs">
                <div className="font-medium text-purple-700 dark:text-purple-300">{meal.fat}g</div>
                <div className="text-purple-600/70 dark:text-purple-400/70">fat</div>
              </div>
            </motion.div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Button 
              variant="outline" 
              className="w-full group hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-primary/20 hover:border-primary"
            >
              <ChefHat className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              View Recipe
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}