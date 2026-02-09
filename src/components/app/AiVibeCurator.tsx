"use client";

import { useState } from "react";
import { Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getVibeSuggestions } from "@/app/actions";
import type { SuggestAlternateVibesOutput } from "@/ai/flows/suggest-alternate-vibes";
import { Badge } from "@/components/ui/badge";

interface AiVibeCuratorProps {
  currentVibes: string[];
}

export function AiVibeCurator({ currentVibes }: AiVibeCuratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestAlternateVibesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const atmosphere = "A trendy seaside bar with a mix of relaxed and energetic people. The sun is setting, and music is playing.";

    try {
      const response = await getVibeSuggestions(currentVibes, atmosphere);
      setResult(response);
    } catch (e) {
      setError("Could not get suggestions. Please try again later.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Bot />
          AI Vibe Curator
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>AI Vibe Curator</SheetTitle>
          <SheetDescription>
            Not feeling the crowd? Let our AI suggest a different vibe for you.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <h4 className="text-sm font-semibold text-muted-foreground">Your Current Vibes</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {currentVibes.map((vibe) => (
              <Badge key={vibe} variant="secondary">{vibe}</Badge>
            ))}
          </div>
        </div>
        <Button onClick={handleSuggestion} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            "Suggest New Vibes"
          )}
        </Button>
        <ScrollArea className="flex-grow mt-4">
          <div className="pr-6">
          {error && <p className="text-sm text-destructive">{error}</p>}
          {result && (
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-accent mb-2">Suggested Vibes</h4>
                <div className="flex flex-wrap gap-2">
                  {result.suggestedVibeTags.map((tag) => (
                     <Badge key={tag} variant="outline" className="border-accent text-accent">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-accent mb-2">Reasoning</h4>
                <p className="text-muted-foreground leading-relaxed">{result.reasoning}</p>
              </div>
            </div>
          )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
