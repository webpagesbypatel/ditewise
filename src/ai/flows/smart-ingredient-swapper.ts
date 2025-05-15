'use server';

/**
 * @fileOverview An AI agent that suggests alternative ingredients based on user preferences, allergies, or availability.
 *
 * - smartIngredientSwapper - A function that handles the ingredient swapping process.
 * - SmartIngredientSwapperInput - The input type for the smartIngredientSwapper function.
 * - SmartIngredientSwapperOutput - The return type for the smartIngredientSwapper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartIngredientSwapperInputSchema = z.object({
  originalIngredient: z.string().describe('The ingredient to be replaced.'),
  dietaryRestrictions: z.string().describe('The dietary restrictions of the user (e.g., allergies, preferences).'),
  availability: z.string().describe('Information about ingredient availability (e.g., what is in stock at the grocery store).'),
  recipeContext: z.string().describe('The recipe in which the ingredient is used; include the full recipe text.'),
});
export type SmartIngredientSwapperInput = z.infer<typeof SmartIngredientSwapperInputSchema>;

const SmartIngredientSwapperOutputSchema = z.object({
  alternativeIngredient: z.string().describe('A suggested alternative ingredient.'),
  reasoning: z.string().describe('The reasoning behind the suggested alternative, considering dietary restrictions and availability.'),
  notes: z.string().optional().describe('Any additional notes or considerations when using the alternative ingredient.'),
});
export type SmartIngredientSwapperOutput = z.infer<typeof SmartIngredientSwapperOutputSchema>;

export async function smartIngredientSwapper(input: SmartIngredientSwapperInput): Promise<SmartIngredientSwapperOutput> {
  return smartIngredientSwapperFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartIngredientSwapperPrompt',
  input: {schema: SmartIngredientSwapperInputSchema},
  output: {schema: SmartIngredientSwapperOutputSchema},
  prompt: `You are a culinary expert with a deep understanding of dietary restrictions and ingredient substitutions.

  Given the original ingredient, the user's dietary restrictions, ingredient availability, and the recipe context, suggest an alternative ingredient that maintains the recipe's integrity while adhering to the user's needs.

  Original Ingredient: {{{originalIngredient}}}
  Dietary Restrictions: {{{dietaryRestrictions}}}
  Availability: {{{availability}}}
  Recipe Context: {{{recipeContext}}}

  Consider the following:
  - Allergies: Absolutely avoid any ingredients that could trigger an allergic reaction.
  - Preferences: Try to align with the user's preferences (e.g., vegetarian, vegan, low-carb).
  - Availability: Suggest ingredients that are likely to be readily available to the user.
  - Taste and Texture: Aim for alternative ingredients that closely match the taste and texture of the original ingredient.

  Provide a clear reasoning for your suggestion and any notes or considerations for using the alternative ingredient.
  Output only the alternative ingredient name, a detailed explanation of your reasoning, and any relevant notes about its usage.
`,
});

const smartIngredientSwapperFlow = ai.defineFlow(
  {
    name: 'smartIngredientSwapperFlow',
    inputSchema: SmartIngredientSwapperInputSchema,
    outputSchema: SmartIngredientSwapperOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
