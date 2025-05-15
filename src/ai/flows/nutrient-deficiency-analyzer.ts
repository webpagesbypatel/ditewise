// src/ai/flows/nutrient-deficiency-analyzer.ts
'use server';
/**
 * @fileOverview An AI agent that analyzes a user's food logs to identify potential nutritional deficiencies or excesses.
 *
 * - analyzeNutrientDeficiency - A function that analyzes nutrient deficiency based on food logs.
 * - NutrientDeficiencyInput - The input type for the analyzeNutrientDeficiency function.
 * - NutrientDeficiencyOutput - The return type for the analyzeNutrientDeficiency function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NutrientDeficiencyInputSchema = z.object({
  foodLogs: z
    .string()
    .describe(
      'A detailed log of the user’s food intake, including meal times, food items, portion sizes, and preparation methods.'
    ),
  userProfile: z
    .string()
    .describe(
      'The user profile containing information about the user’s age, gender, weight, height, activity level, health conditions, allergies, and dietary preferences.'
    ),
});
export type NutrientDeficiencyInput = z.infer<typeof NutrientDeficiencyInputSchema>;

const NutrientDeficiencyOutputSchema = z.object({
  summary: z.string().describe('A summary of potential nutrient deficiencies or excesses.'),
  recommendations: z
    .string()
    .describe('Specific dietary recommendations to address identified deficiencies or excesses.'),
});
export type NutrientDeficiencyOutput = z.infer<typeof NutrientDeficiencyOutputSchema>;

export async function analyzeNutrientDeficiency(input: NutrientDeficiencyInput): Promise<NutrientDeficiencyOutput> {
  return analyzeNutrientDeficiencyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nutrientDeficiencyPrompt',
  input: {schema: NutrientDeficiencyInputSchema},
  output: {schema: NutrientDeficiencyOutputSchema},
  prompt: `You are a registered dietitian. Analyze the user's food logs and user profile to identify potential nutrient deficiencies or excesses. Provide a summary of your findings and specific dietary recommendations to address any identified issues.

User Profile: {{{userProfile}}}
Food Logs: {{{foodLogs}}}

Respond in the following format:
Summary: [A summary of potential nutrient deficiencies or excesses]
Recommendations: [Specific dietary recommendations to address identified deficiencies or excesses]`,
});

const analyzeNutrientDeficiencyFlow = ai.defineFlow(
  {
    name: 'analyzeNutrientDeficiencyFlow',
    inputSchema: NutrientDeficiencyInputSchema,
    outputSchema: NutrientDeficiencyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
