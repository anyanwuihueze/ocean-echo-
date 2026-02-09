'use server';

import { suggestAlternateVibes } from "@/ai/flows/suggest-alternate-vibes";
import type { SuggestAlternateVibesOutput } from "@/ai/flows/suggest-alternate-vibes";

export async function getVibeSuggestions(
  currentVibeTags: string[],
  currentAtmosphere: string
): Promise<SuggestAlternateVibesOutput> {
  try {
    const result = await suggestAlternateVibes({
      currentVibeTags,
      currentAtmosphere,
    });
    return result;
  } catch (error) {
    console.error("Error calling suggestAlternateVibes flow:", error);
    throw new Error("Failed to get AI suggestions.");
  }
}
