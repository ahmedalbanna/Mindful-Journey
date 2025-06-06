"use client";

import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOOD_OPTIONS } from "@/lib/constants";
import type { JournalEntry, Mood } from "@/types";
import { CalendarIcon, Save } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const journalEntrySchema = z.object({
  date: z.date({ required_error: "Date is required." }),
  mood: z.custom<Mood>((val) => MOOD_OPTIONS.some(option => option.value === val), {
    message: "Invalid mood selected.",
  }),
  rating: z.coerce.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  notes: z.string().min(3, "Notes must be at least 3 characters long.").max(1000, "Notes too long"),
});

type JournalFormValues = z.infer<typeof journalEntrySchema>;

interface MoodJournalFormProps {
  onSubmit: (data: Omit<JournalEntry, 'id'>) => void;
  defaultValues?: Partial<JournalFormValues>;
}

export function MoodJournalForm({ onSubmit, defaultValues }: MoodJournalFormProps) {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<JournalFormValues>({
    resolver: zodResolver(journalEntrySchema),
    defaultValues: {
      date: defaultValues?.date || new Date(),
      mood: defaultValues?.mood || 'neutral',
      rating: defaultValues?.rating || 3,
      notes: defaultValues?.notes || '',
    },
  });

  const handleFormSubmit: SubmitHandler<JournalFormValues> = (data) => {
    onSubmit({
      ...data,
      date: data.date.toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 p-6 bg-card rounded-lg shadow-md">
      <div>
        <Label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">Date</Label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.date && <p className="mt-1 text-sm text-destructive">{errors.date.message}</p>}
      </div>

      <div>
        <Label htmlFor="mood" className="block text-sm font-medium text-foreground mb-1">Mood</Label>
        <Controller
          name="mood"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger id="mood">
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>
              <SelectContent>
                {MOOD_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.mood && <p className="mt-1 text-sm text-destructive">{errors.mood.message}</p>}
      </div>

      <div>
        <Label htmlFor="rating" className="block text-sm font-medium text-foreground mb-1">Well-being Rating (1-5)</Label>
        <Input
          id="rating"
          type="number"
          min="1"
          max="5"
          {...register("rating")}
          className={errors.rating ? "border-destructive" : ""}
        />
        {errors.rating && <p className="mt-1 text-sm text-destructive">{errors.rating.message}</p>}
      </div>

      <div>
        <Label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1">Notes / Journal Entry</Label>
        <Textarea
          id="notes"
          rows={5}
          {...register("notes")}
          className={errors.notes ? "border-destructive" : ""}
          placeholder="How are you feeling today? What's on your mind?"
        />
        {errors.notes && <p className="mt-1 text-sm text-destructive">{errors.notes.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        <Save className="mr-2 h-4 w-4" />
        {isSubmitting ? "Saving..." : "Save Entry"}
      </Button>
    </form>
  );
}
