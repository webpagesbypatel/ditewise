"use server";

import { z } from "zod";
import { generateDietPlan, type GenerateDietPlanInput, type GenerateDietPlanOutput } from "@/ai/flows/ai-diet-plan-generator";
import { aiChatbotAssistant, type AIChatbotAssistantInput, type AIChatbotAssistantOutput } from "@/ai/flows/ai-chatbot-assistant";
import { analyzeNutrientDeficiency, type NutrientDeficiencyInput, type NutrientDeficiencyOutput } from "@/ai/flows/nutrient-deficiency-analyzer";
import { smartIngredientSwapper, type SmartIngredientSwapperInput, type SmartIngredientSwapperOutput } from "@/ai/flows/smart-ingredient-swapper";

// Schemas for form validation (can be more detailed matching individual form fields)
const ProfileFormSchema = z.object({
  diseases: z.string().min(1, "Diseases are required."),
  medications: z.string().min(1, "Medications are required."),
  allergies: z.string().min(1, "Allergies are required."),
  preferences: z.string().min(1, "Preferences are required."),
  lifestyle: z.string().min(1, "Lifestyle information is required."),
  anthropometrics: z.string().min(1, "Anthropometrics data is required."),
  labResults: z.string().min(1, "Lab results are required."),
});

const ChatbotFormSchema = z.object({
  question: z.string().min(1, "Question cannot be empty."),
  dietPlan: z.string().optional(),
  userProfile: z.string().optional(),
});

const NutrientAnalyzerFormSchema = z.object({
  foodLogs: z.string().min(1, "Food logs cannot be empty."),
  userProfile: z.string().min(1, "User profile information is required."),
});

const IngredientSwapperFormSchema = z.object({
  originalIngredient: z.string().min(1, "Original ingredient is required."),
  dietaryRestrictions: z.string().min(1, "Dietary restrictions are required."),
  availability: z.string().min(1, "Availability information is required."),
  recipeContext: z.string().min(1, "Recipe context is required."),
});


export async function generateDietPlanAction(
  data: GenerateDietPlanInput
): Promise<GenerateDietPlanOutput | { error: string }> {
  const validation = ProfileFormSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors.toString() };
  }
  try {
    const result = await generateDietPlan(data);
    return result;
  } catch (e: any) {
    console.error("generateDietPlanAction error:", e);
    return { error: e.message || "Failed to generate diet plan." };
  }
}

export async function aiChatbotAssistantAction(
  data: AIChatbotAssistantInput
): Promise<AIChatbotAssistantOutput | { error: string }> {
  const validation = ChatbotFormSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors.toString() };
  }
  try {
    const result = await aiChatbotAssistant(data);
    return result;
  } catch (e: any) {
    console.error("aiChatbotAssistantAction error:", e);
    return { error: e.message || "Failed to get response from chatbot." };
  }
}

export async function analyzeNutrientDeficiencyAction(
  data: NutrientDeficiencyInput
): Promise<NutrientDeficiencyOutput | { error: string }> {
  const validation = NutrientAnalyzerFormSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors.toString() };
  }
  try {
    const result = await analyzeNutrientDeficiency(data);
    return result;
  } catch (e: any) {
    console.error("analyzeNutrientDeficiencyAction error:", e);
    return { error: e.message || "Failed to analyze nutrient deficiency." };
  }
}

export async function smartIngredientSwapperAction(
  data: SmartIngredientSwapperInput
): Promise<SmartIngredientSwapperOutput | { error: string }> {
  const validation = IngredientSwapperFormSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors.toString() };
  }
  try {
    const result = await smartIngredientSwapper(data);
    return result;
  } catch (e: any) {
    console.error("smartIngredientSwapperAction error:", e);
    return { error: e.message || "Failed to swap ingredient." };
  }
}
