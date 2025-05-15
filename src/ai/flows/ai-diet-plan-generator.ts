// src/ai/flows/ai-diet-plan-generator.ts
'use server';

/**
 * @fileOverview AI-powered diet plan generator.
 *
 * - generateDietPlan - A function that generates a personalized diet plan based on user health profile.
 * - GenerateDietPlanInput - The input type for the generateDietPlan function.
 * - GenerateDietPlanOutput - The return type for the generateDietPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDietPlanInputSchema = z.object({
  diseases: z.string().describe('List of diseases the user has.'),
  medications: z.string().describe('List of medications the user is taking.'),
  allergies: z.string().describe('List of allergies the user has.'),
  preferences: z.string().describe('Dietary preferences of the user.'),
  lifestyle: z.string().describe('Lifestyle information of the user.'),
  anthropometrics: z.string().describe('Anthropometric data of the user (e.g., height, weight, age).'),
  labResults: z.string().describe('Lab results of the user.'),
});

export type GenerateDietPlanInput = z.infer<typeof GenerateDietPlanInputSchema>;

const GenerateDietPlanOutputSchema = z.object({
  dietaryRecommendations: z.string().describe('Personalized dietary recommendations for the user.'),
  macroNutrientTargets: z.string().describe('Macro nutrient targets for the user (e.g., protein, carbs, fats).'),
  foodSuggestions: z.string().describe('Food suggestions for the user based on their health profile.'),
});

export type GenerateDietPlanOutput = z.infer<typeof GenerateDietPlanOutputSchema>;

export async function generateDietPlan(input: GenerateDietPlanInput): Promise<GenerateDietPlanOutput> {
  return generateDietPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDietPlanPrompt',
  input: {schema: GenerateDietPlanInputSchema},
  output: {schema: GenerateDietPlanOutputSchema},
  prompt: `You are an AI-powered diet plan generator. Generate personalized dietary recommendations, macro/micronutrient targets, and food suggestions based on the user's health profile.

  Consider the following factors:
  - Diseases: {{{diseases}}}
  - Medications: {{{medications}}}
  - Allergies: {{{allergies}}}
  - Preferences: {{{preferences}}}
  - Lifestyle: {{{lifestyle}}}
  - Anthropometrics: {{{anthropometrics}}}
  - Lab Results: {{{labResults}}}
  \n  Dietary Recommendations: 
  Macro Nutrient Targets:
  Food Suggestions:`,
});

const generateDietPlanFlow = ai.defineFlow(
  {
    name: 'generateDietPlanFlow',
    inputSchema: GenerateDietPlanInputSchema,
    outputSchema: GenerateDietPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
