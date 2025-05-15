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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { SmartIngredientSwapperInput, SmartIngredientSwapperOutput } from "@/ai/flows/smart-ingredient-swapper"
import { smartIngredientSwapperAction } from "@/lib/actions"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Lightbulb } from "lucide-react"

const ingredientSwapperFormSchema = z.object({
  originalIngredient: z.string().min(1, { message: "Original ingredient is required." }),
  dietaryRestrictions: z.string().min(1, { message: "Please list any dietary restrictions (e.g., allergies, vegan, gluten-free)." }),
  availability: z.string().min(1, { message: "What ingredients do you have available or can easily find?" }),
  recipeContext: z.string().min(1, { message: "Provide the recipe or context where the ingredient is used." }),
})

type IngredientSwapperFormValues = z.infer<typeof ingredientSwapperFormSchema>

export function IngredientSwapperForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [swapResult, setSwapResult] = useState<SmartIngredientSwapperOutput | null>(null);

  const form = useForm<IngredientSwapperFormValues>({
    resolver: zodResolver(ingredientSwapperFormSchema),
    defaultValues: {
      originalIngredient: "",
      dietaryRestrictions: "",
      availability: "Common pantry staples, local supermarket access",
      recipeContext: "",
    },
  })

  async function onSubmit(data: IngredientSwapperFormValues) {
    setIsLoading(true);
    setSwapResult(null);
    
    const result = await smartIngredientSwapperAction(data as SmartIngredientSwapperInput);
    setIsLoading(false);

    if ('error' in result) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else if (result) {
      setSwapResult(result);
      toast({
        title: "Ingredient Swap Suggested!",
        description: `Alternative for ${data.originalIngredient}: ${result.alternativeIngredient}.`,
      });
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle>Smart Ingredient Swapper</CardTitle>
        <CardDescription>
          Need a substitute? Our AI will suggest alternatives based on your needs and what you have.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="originalIngredient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Ingredient</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., All-purpose flour, Eggs, Milk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dietaryRestrictions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dietary Restrictions</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Gluten-free, Vegan, Nut allergy" {...field} rows={2} />
                  </FormControl>
                  <FormDescription>
                    List any allergies, intolerances, or dietary preferences.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredient Availability</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Only have almond milk, access to standard grocery stores" {...field} rows={2}/>
                  </FormControl>
                  <FormDescription>
                    What ingredients do you have on hand or can easily find?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipeContext"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Context</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Baking a cake, making a creamy pasta sauce, need a binder for veggie burgers. Full recipe text is best." {...field} rows={4}/>
                  </FormControl>
                  <FormDescription>
                    Describe the recipe or how the ingredient is used. Providing the full recipe helps the AI make better suggestions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Finding Swaps..." : "Suggest Alternative"}
            </Button>
          </form>
        </Form>

        {swapResult && (
          <Card className="mt-8 bg-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary"/>Swap Suggestion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Alternative Ingredient:</h4>
                <p className="text-lg text-primary font-medium">{swapResult.alternativeIngredient}</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Reasoning:</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{swapResult.reasoning}</p>
              </div>
              {swapResult.notes && (
                <div>
                  <h4 className="font-semibold text-lg">Notes:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{swapResult.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
