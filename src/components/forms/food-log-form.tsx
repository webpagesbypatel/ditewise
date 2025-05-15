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

const foodLogFormSchema = z.object({
  mealType: z.string().min(1, { message: "Please select a meal type." }),
  foodItems: z.string().min(1, { message: "Please describe the food items." }),
  portionSize: z.string().optional(),
  notes: z.string().optional(),
})

type FoodLogFormValues = z.infer<typeof foodLogFormSchema>

// This would usually be passed as a prop or fetched
const userProfileForAnalyzer = "Female, 30 years old, moderately active, no major health issues, occasional migraines. Follows a pescatarian diet.";

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
    // In a real app, this would save to a database
    console.log("Meal logged:", data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    onMealLogged(data); // Callback to update parent state / trigger other actions

    toast({
      title: "Meal Logged Successfully!",
      description: `${data.mealType}: ${data.foodItems.substring(0, 50)}...`,
    });
    form.reset();
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="mealType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a meal type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                  <SelectItem value="Snack">Snack</SelectItem>
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
              <FormLabel>Food Items</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Grilled chicken breast, steamed broccoli, quinoa"
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormDescription>
                Describe the food items you consumed. Be as specific as possible.
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
              <FormLabel>Portion Size (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 150g chicken, 1 cup broccoli" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Felt very full after, slightly salty" {...field} rows={2}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Logging Meal..." : "Log Meal"}
        </Button>
      </form>
    </Form>
  )
}
