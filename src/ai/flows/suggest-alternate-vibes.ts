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
  prompt: `Suggest alternate vibe tags for a user at a seaside bar.
Current vibes: {{#each currentVibeTags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Atmosphere: {{{currentAtmosphere}}}
Output JSON only.`,
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