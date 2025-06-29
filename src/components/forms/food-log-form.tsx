"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { motion } from "framer-motion"

const foodLogFormSchema = z.object({
  mealType: z.string().min(1, { message: "Please select a meal type." }),
  foodItems: z.string().min(1, { message: "Please describe the food items." }),
  portionSize: z.string().optional(),
  notes: z.string().optional(),
})

type FoodLogFormValues = z.infer<typeof foodLogFormSchema>

export function FoodLogForm({ onMealLogged }: { onMealLogged: (log: FoodLogFormValues) => void }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FoodLogFormValues>({
    resolver: zodResolver(foodLogFormSchema),
    defaultValues: {
      mealType: "",
      foodItems: "",
      portionSize: "",
      notes: "",
    },
  })

  async function onSubmit(data: FoodLogFormValues) {
    setIsLoading(true);
    console.log("Meal logged:", data);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onMealLogged(data);

    toast({
      title: "Meal Logged Successfully!",
      description: `${data.mealType}: ${data.foodItems.substring(0, 50)}${data.foodItems.length > 50 ? '...' : ''}`,
      variant: "success",
    });
    
    form.reset();
    setIsLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="responsive-spacing form-responsive">
          <FormField
            control={form.control}
            name="mealType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base font-medium">Meal Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a meal type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Breakfast">🌅 Breakfast</SelectItem>
                    <SelectItem value="Lunch">☀️ Lunch</SelectItem>
                    <SelectItem value="Dinner">🌙 Dinner</SelectItem>
                    <SelectItem value="Snack">🍎 Snack</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="foodItems"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base font-medium">Food Items</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Grilled chicken breast, steamed broccoli, quinoa"
                    {...field}
                    rows={3}
                    disabled={isLoading}
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription className="text-xs sm:text-sm">
                  Describe the food items you consumed. Be as specific as possible for better tracking.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="portionSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base font-medium">Portion Size (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., 150g chicken, 1 cup broccoli" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription className="text-xs sm:text-sm">
                  Help us track your intake more accurately with portion information.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base font-medium">Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="e.g., Felt very full after, slightly salty, cooked at home" 
                    {...field} 
                    rows={2}
                    disabled={isLoading}
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription className="text-xs sm:text-sm">
                  Any additional notes about the meal, how you felt, or cooking method.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <motion.div
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="button-responsive bg-gradient-to-r from-primary to-yellow-500 hover:from-yellow-500 hover:to-primary text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Logging Meal...
                </>
              ) : (
                "Log Meal"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}