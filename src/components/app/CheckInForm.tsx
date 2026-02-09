"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VibeTag } from "@/components/app/VibeTag";
import { vibeTags, type Vibe } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { UserProfile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  nickname: z.string().min(2, "Must be at least 2 characters").max(20, "Must be 20 characters or less"),
});
type FormValues = z.infer<typeof formSchema>;

interface CheckInFormProps {
  onCheckIn: (profile: UserProfile) => void;
}

export function CheckInForm({ onCheckIn }: CheckInFormProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(PlaceHolderImages[0].imageUrl);
  const [selectedVibes, setSelectedVibes] = useState<Vibe[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
    },
  });

  const toggleVibe = (vibe: Vibe) => {
    setSelectedVibes((prev) => {
      const isSelected = prev.some((v) => v.id === vibe.id);
      if (isSelected) {
        return prev.filter((v) => v.id !== vibe.id);
      }
      if (prev.length < 3) {
        return [...prev, vibe];
      }
      toast({
        title: "Max 3 vibes",
        description: "You can only select up to 3 vibes.",
        variant: "destructive",
      });
      return prev;
    });
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (selectedVibes.length === 0) {
      toast({
        title: "Select a vibe",
        description: "Please choose at least one vibe to check in.",
        variant: "destructive",
      });
      return;
    }

    const profile: UserProfile = {
      id: crypto.randomUUID(),
      nickname: data.nickname,
      avatarUrl: selectedAvatar,
      vibeTags: selectedVibes,
    };
    onCheckIn(profile);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/70 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="mx-auto bg-gradient-to-br from-primary to-accent p-2 rounded-full w-fit mb-4">
          <Sparkles className="text-primary-foreground h-8 w-8" />
        </div>
        <CardTitle className="font-headline text-3xl">Echoes at Dusk</CardTitle>
        <CardDescription>You're about to enter Echo Corner. Set your vibe.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormLabel>1. Choose your look</FormLabel>
              <div className="grid grid-cols-4 gap-4">
                {PlaceHolderImages.slice(0, 8).map((img) => (
                  <button
                    type="button"
                    key={img.id}
                    onClick={() => setSelectedAvatar(img.imageUrl)}
                    className={cn(
                      "rounded-full overflow-hidden aspect-square transition-all duration-300 ring-offset-background ring-offset-2",
                      selectedAvatar === img.imageUrl
                        ? "ring-2 ring-accent scale-110"
                        : "opacity-60 hover:opacity-100 hover:scale-105"
                    )}
                  >
                    <Image
                      src={img.imageUrl}
                      alt={img.description}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      data-ai-hint={img.imageHint}
                    />
                  </button>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>2. What's your name?</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a nickname..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>3. What's the vibe? (Max 3)</FormLabel>
              <div className="flex flex-wrap gap-2">
                {vibeTags.map((vibe) => (
                  <VibeTag
                    key={vibe.id}
                    vibe={vibe}
                    isSelected={selectedVibes.some((v) => v.id === vibe.id)}
                    onClick={() => toggleVibe(vibe)}
                  />
                ))}
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Enter Echo Corner
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
