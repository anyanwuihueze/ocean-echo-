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
      id: Math.random().toString(36).substring(7),
      nickname: data.nickname,
      avatarUrl: selectedAvatar,
      vibeTags: selectedVibes,
    };
    onCheckIn(profile);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-zinc-950/50 backdrop-blur-2xl border-white/5 shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-gradient-to-br from-accent to-primary p-2.5 rounded-2xl w-fit mb-6 shadow-lg shadow-accent/20">
          <Sparkles className="text-white h-7 w-7" />
        </div>
        <CardTitle className="font-headline text-4xl text-white tracking-tighter">Echoes at Dusk</CardTitle>
        <CardDescription className="text-zinc-500 font-medium mt-2">Enter the corner. Set your vibe.</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <div className="space-y-4">
              <FormLabel className="text-zinc-400 text-[10px] uppercase font-black tracking-widest">1. Your Look</FormLabel>
              <div className="grid grid-cols-4 gap-4">
                {PlaceHolderImages.slice(0, 8).map((img) => (
                  <button
                    type="button"
                    key={img.id}
                    onClick={() => setSelectedAvatar(img.imageUrl)}
                    className={cn(
                      "relative rounded-2xl overflow-hidden aspect-square transition-all duration-500",
                      selectedAvatar === img.imageUrl
                        ? "ring-2 ring-accent scale-105 shadow-[0_0_20px_rgba(var(--accent),0.3)]"
                        : "opacity-40 hover:opacity-100 grayscale hover:grayscale-0"
                    )}
                  >
                    <Image
                      src={img.imageUrl}
                      alt={img.description}
                      fill
                      className="object-cover"
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
                  <FormLabel className="text-zinc-400 text-[10px] uppercase font-black tracking-widest">2. Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Nickname..." {...field} className="h-14 bg-white/5 border-white/5 text-white rounded-2xl focus:ring-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel className="text-zinc-400 text-[10px] uppercase font-black tracking-widest">3. Your Vibe (Max 3)</FormLabel>
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

            <Button type="submit" size="lg" className="w-full h-14 bg-accent hover:bg-accent/90 text-black font-black uppercase tracking-widest rounded-2xl transition-all duration-300">
              Enter Echo Corner
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}