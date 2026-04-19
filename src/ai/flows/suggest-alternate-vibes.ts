'use server';

/**
 * @fileOverview This file contains the Genkit flow for suggesting alternate vibe tags to a user.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternateVibesInputSchema = z.object({
  currentVibeTags: z
    .array(z.string())
    .describe('The vibe tags currently selected by the user.'),
  currentAtmosphere: z
    .string()
    .describe('A description of the current atmosphere of the venue.'),
});
export type SuggestAlternateVibesInput = z.infer<typeof SuggestAlternateVibesInputSchema>;

const SuggestAlternateVibesOutputSchema = z.object({
  suggestedVibeTags: z
    .array(z.string())
    .describe('A list of suggested vibe tags that better match the current atmosphere.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested vibe tags.'),
});
export type SuggestAlternateVibesOutput = z.infer<typeof SuggestAlternateVibesOutputSchema>;

export async function suggestAlternateVibes(
  input: SuggestAlternateVibesInput
): Promise<SuggestAlternateVibesOutput> {
  return suggestAlternateVibesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternateVibesPrompt',
  input: {schema: SuggestAlternateVibesInputSchema},
  output: {schema: SuggestAlternateVibesOutputSchema},
  config: {
    model: 'googleai/gemini-1.5-flash',
  },
  prompt: `You are an AI assistant designed to suggest alternate vibe tags for users checking into a venue.

The user has selected the following vibe tags: {{#each currentVibeTags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

The current atmosphere of the venue can be described as: {{{currentAtmosphere}}}

Based on this information, suggest a list of alternate vibe tags that would be a better fit for the user.
Explain your reasoning for the suggestions.

Output only the suggested vibe tags and the reasoning in a JSON format.
`,
});

const suggestAlternateVibesFlow = ai.defineFlow(
  {
    name: 'suggestAlternateVibesFlow',
    inputSchema: SuggestAlternateVibesInputSchema,
    outputSchema: SuggestAlternateVibesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI model failed to generate a valid response.");
    }
    return output;
  }
);
