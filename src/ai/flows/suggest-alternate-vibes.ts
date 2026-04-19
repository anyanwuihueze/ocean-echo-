'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternateVibesInputSchema = z.object({
  currentVibeTags: z.array(z.string()),
  currentAtmosphere: z.string(),
});
export type SuggestAlternateVibesInput = z.infer<typeof SuggestAlternateVibesInputSchema>;

const SuggestAlternateVibesOutputSchema = z.object({
  suggestedVibeTags: z.array(z.string()),
  reasoning: z.string(),
});
export type SuggestAlternateVibesOutput = z.infer<typeof SuggestAlternateVibesOutputSchema>;

export async function suggestAlternateVibes(input: SuggestAlternateVibesInput): Promise<SuggestAlternateVibesOutput> {
  return suggestAlternateVibesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternateVibesPrompt',
  input: {schema: SuggestAlternateVibesInputSchema},
  output: {schema: SuggestAlternateVibesOutputSchema},
  config: {
    model: 'googleai/gemini-1.5-flash',
  },
  prompt: `You are the AI Vibe Curator for Echoes at Dusk, a high-end social discovery app at a seaside bar.
Given the user's current vibes and the venue's atmosphere, suggest 3 new vibe tags that might help them connect with others better.

Current vibes: {{#each currentVibeTags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Atmosphere: {{{currentAtmosphere}}}

Provide the 3 suggested tags and a short, poetic reasoning for your choice.`,
});

const suggestAlternateVibesFlow = ai.defineFlow(
  {
    name: 'suggestAlternateVibesFlow',
    inputSchema: SuggestAlternateVibesInputSchema,
    outputSchema: SuggestAlternateVibesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) throw new Error("AI suggestion failed");
    return output;
  }
);