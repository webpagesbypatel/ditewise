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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { GenerateDietPlanInput } from "@/ai/flows/ai-diet-plan-generator"
import { generateDietPlanAction } from "@/lib/actions"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import type { DietPlan } from "@/types"

const profileFormSchema = z.object({
  diseases: z.string().min(1, { message: "Please list any known diseases or conditions." }),
  medications: z.string().min(1, { message: "Please list current medications." }),
  allergies: z.string().min(1, { message: "Please list any allergies." }),
  preferences: z.string().min(1, { message: "Describe your dietary preferences (e.g., vegetarian, vegan, dislikes)." }),
  lifestyle: z.string().min(1, { message: "Describe your lifestyle (e.g., activity level, occupation)." }),
  anthropometrics: z.string().min(1, { message: "Enter anthropometric data (e.g., age, gender, height, weight)." }),
  labResults: z.string().min(1, { message: "Summarize relevant lab results if available." }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      diseases: "",
      medications: "",
      allergies: "",
      preferences: "",
      lifestyle: "",
      anthropometrics: "",
      labResults: "",
    },
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    setDietPlan(null);
    
    const result = await generateDietPlanAction(data as GenerateDietPlanInput);
    setIsLoading(false);

    if ('error' in result) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else if (result) {
      setDietPlan(result);
      toast({
        title: "Profile Updated & Diet Plan Generated!",
        description: "Your personalized diet plan is ready below.",
      });
    }
  }

  const formFields: { name: keyof ProfileFormValues; label: string; description: string; placeholder: string, type?: 'textarea' | 'input' }[] = [
    { name: "diseases", label: "Diseases/Conditions", description: "List any chronic diseases or health conditions (e.g., diabetes, hypertension).", placeholder: "e.g., Type 2 Diabetes, High Cholesterol" },
    { name: "medications", label: "Medications", description: "List all current medications and supplements.", placeholder: "e.g., Metformin 500mg, Vitamin D3" },
    { name: "allergies", label: "Allergies & Intolerances", description: "List any food allergies or intolerances.", placeholder: "e.g., Peanuts, Lactose, Gluten" },
    { name: "preferences", label: "Dietary Preferences", description: "Describe your food preferences, dislikes, or dietary patterns (e.g., vegetarian, vegan).", placeholder: "e.g., Vegetarian, dislike mushrooms, prefer spicy food", type: "textarea" },
    { name: "lifestyle", label: "Lifestyle", description: "Describe your daily activity level, occupation, and sleep patterns.", placeholder: "e.g., Sedentary office job, 30 mins walk daily, 7 hours sleep", type: "textarea" },
    { name: "anthropometrics", label: "Anthropometrics", description: "Provide your age, gender, height (cm/ft), and weight (kg/lbs).", placeholder: "e.g., 35 y.o. male, 180cm, 75kg" },
    { name: "labResults", label: "Lab Results (Optional)", description: "Summarize any recent relevant lab results (e.g., blood glucose, cholesterol levels).", placeholder: "e.g., A1c 6.5%, LDL Cholesterol 130 mg/dL", type: "textarea" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="card-responsive shadow-xl">
        <CardHeader className="touch-spacing">
          <CardTitle className="responsive-heading">Your Health Profile</CardTitle>
          <CardDescription className="responsive-text">
            Provide your health details to generate a personalized diet plan. 
            This information helps our AI create the most suitable recommendations for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="touch-spacing">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="responsive-spacing form-responsive">
              {formFields.map((fieldInfo) => (
                <FormField
                  key={fieldInfo.name}
                  control={form.control}
                  name={fieldInfo.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base font-medium">{fieldInfo.label}</FormLabel>
                      <FormControl>
                        {fieldInfo.type === 'textarea' ? (
                          <Textarea placeholder={fieldInfo.placeholder} {...field} rows={3} className="resize-none"/>
                        ) : (
                          <Input placeholder={fieldInfo.placeholder} {...field} />
                        )}
                      </FormControl>
                      <FormDescription className="text-xs sm:text-sm">
                        {fieldInfo.description}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" disabled={isLoading} className="button-responsive bg-gradient-to-r from-primary to-yellow-500 hover:from-yellow-500 hover:to-primary text-white font-medium shadow-md hover:shadow-lg transition-all duration-300">
                {isLoading ? "Generating Plan..." : "Save Profile & Generate Diet Plan"}
              </Button>
            </form>
          </Form>

          {dietPlan && (
            <Card className="mt-6 sm:mt-8 bg-secondary/50 card-responsive">
              <CardHeader className="touch-spacing">
                <CardTitle className="responsive-text">Your Personalized Diet Plan</CardTitle>
              </CardHeader>
              <CardContent className="touch-spacing responsive-spacing">
                <div>
                  <h4 className="font-semibold text-base sm:text-lg mb-2">Dietary Recommendations:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{dietPlan.dietaryRecommendations}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg mb-2">Macro Nutrient Targets:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{dietPlan.macroNutrientTargets}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg mb-2">Food Suggestions:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{dietPlan.foodSuggestions}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}