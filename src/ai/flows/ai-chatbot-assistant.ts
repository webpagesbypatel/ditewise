// 'use server';

/**
 * @fileOverview AI-powered chatbot to answer user questions related to diet plans and nutrition.
 *
 * - aiChatbotAssistant - A function that handles the chatbot interaction.
 * - AIChatbotAssistantInput - The input type for the aiChatbotAssistant function.
 * - AIChatbotAssistantOutput - The return type for the aiChatbotAssistant function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotAssistantInputSchema = z.object({
  question: z.string().describe('The user question about diet plans and nutrition.'),
  dietPlan: z.string().optional().describe('The user\'s current diet plan, if available.'),
  userProfile: z.string().optional().describe('Relevant details from the user\'s health profile.'),
});
export type AIChatbotAssistantInput = z.infer<typeof AIChatbotAssistantInputSchema>;

const AIChatbotAssistantOutputSchema = z.object({
  answer: z.string().describe('The chatbot\'s answer to the user question.'),
});
export type AIChatbotAssistantOutput = z.infer<typeof AIChatbotAssistantOutputSchema>;

export async function aiChatbotAssistant(input: AIChatbotAssistantInput): Promise<AIChatbotAssistantOutput> {
  return aiChatbotAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotAssistantPrompt',
  input: {
    schema: AIChatbotAssistantInputSchema,
  },
  output: {
    schema: AIChatbotAssistantOutputSchema,
  },
  prompt: `You are a helpful AI chatbot assistant specialized in answering questions related to diet plans and nutrition.

  Use the following information to provide helpful and accurate responses. If the information is not available, answer to the best of your ability.

  User Question: {{{question}}}

  {{#if dietPlan}}
  User's Diet Plan: {{{dietPlan}}}
  {{/if}}

  {{#if userProfile}}
  User Profile Details: {{{userProfile}}}
  {{/if}}

  Answer:`,
});

const aiChatbotAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatbotAssistantFlow',
    inputSchema: AIChatbotAssistantInputSchema,
    outputSchema: AIChatbotAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
