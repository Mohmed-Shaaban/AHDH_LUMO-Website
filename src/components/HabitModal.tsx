// src/components/habits/HabitModal.tsx
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  CreateHabitPayload,
  HabitCategory,
  HabitGoalType,
  HabitWithProgress,
  Habit,
} from "@/types"; // adjust path
import { useCreateHabit, useUpdateHabit } from "@/features/habits/useHabits";

// ─── Constants ────────────────────────────────────────────────────────────────

type UIGoalType = "once" | "repetitions" | "duration-timer";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CATEGORIES: { value: HabitCategory; label: string }[] = [
  { value: "health", label: "Health" },
  { value: "fitness", label: "Fitness" },
  { value: "productivity", label: "Productivity" },
  { value: "mindfulness", label: "Mindfulness" },
  { value: "learning", label: "Learning" },
  { value: "social", label: "Social" },
  { value: "finance", label: "Finance" },
  { value: "other", label: "Other" },
];

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const habitSchema = z
  .object({
    title: z
      .string()
      .min(1, "Habit name is required")
      .max(100, "Name must be 100 characters or less")
      .trim(),
    description: z
      .string()
      .max(500, "Description must be 500 characters or less")
      .optional(),
    // "daily" or a string number "0"-"6" for a single weekday
    frequencyValue: z.string(),
    uiGoalType: z.enum(["once", "repetitions", "duration-timer"]),
    // Always coerce to number; cross-field validation handled by .refine() below
    goalTarget: z.coerce.number().int("Must be a whole number").min(1, "Must be at least 1"),
    estimatedDuration: z.coerce
      .number()
      .int("Must be a whole number")
      .min(1, "Must be at least 1 minute"),
    scheduledTime: z.string().optional(),
    reminderEnabled: z.boolean(),
    category: z.enum([
      "health",
      "fitness",
      "productivity",
      "mindfulness",
      "learning",
      "social",
      "finance",
      "other",
    ]),
  })
  .refine(
    (data) => data.uiGoalType !== "repetitions" || data.goalTarget >= 1,
    { message: "Target repetitions must be at least 1", path: ["goalTarget"] }
  )
  .refine(
    (data) => data.uiGoalType !== "duration-timer" || data.estimatedDuration >= 1,
    { message: "Duration must be at least 1 minute", path: ["estimatedDuration"] }
  );

type HabitFormValues = z.infer<typeof habitSchema>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapUIGoalToApi(uiGoal: UIGoalType): {
  goalType: HabitGoalType;
  isTimed: boolean;
} {
  switch (uiGoal) {
    case "once":
      return { goalType: "once", isTimed: false };
    case "repetitions":
      return { goalType: "count", isTimed: false };
    case "duration-timer":
      return { goalType: "once", isTimed: true };
  }
}

function mapApiGoalToUI(habit: Habit | HabitWithProgress): UIGoalType {
  if (habit.isTimed) return "duration-timer";
  if (habit.goalType === "count") return "repetitions";
  return "once";
}

function getDefaultValues(editHabit?: Habit | HabitWithProgress | null): HabitFormValues {
  if (editHabit) {
    const isSingleDay = editHabit.scheduledDays.length === 1;
    return {
      title: editHabit.title,
      description: editHabit.description ?? "",
      frequencyValue: isSingleDay ? editHabit.scheduledDays[0] : "daily",
      uiGoalType: mapApiGoalToUI(editHabit),
      goalTarget: editHabit.goalTarget,
      estimatedDuration: editHabit.estimatedDuration ?? 25,
      scheduledTime: editHabit.scheduledTime?.slice(0, 5) ?? "",
      reminderEnabled: editHabit.reminderEnabled,
      category: editHabit.category,
    };
  }
  return {
    title: "",
    description: "",
    frequencyValue: "daily",
    uiGoalType: "once",
    goalTarget: 1,
    estimatedDuration: 25,
    scheduledTime: "",
    reminderEnabled: true,
    category: "health",
  };
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface HabitModalProps {
  open: boolean;
  onClose: () => void;
  editHabit?: Habit | HabitWithProgress | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HabitModal({ open, onClose, editHabit }: HabitModalProps) {
  const isEditing = !!editHabit;
  const createMutation = useCreateHabit();
  const updateMutation = useUpdateHabit();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: getDefaultValues(editHabit),
  });

  // Re-populate form when editHabit changes or modal opens
  useEffect(() => {
    reset(getDefaultValues(editHabit));
  }, [editHabit, open, reset]);

  const uiGoalType = watch("uiGoalType");

  const handleClose = () => {
    reset(getDefaultValues());
    onClose();
  };

  const onSubmit = (values: HabitFormValues) => {
    const { goalType, isTimed } = mapUIGoalToApi(values.uiGoalType);

    const scheduledDays: number[] =
      values.frequencyValue === "daily"
        ? [0, 1, 2, 3, 4, 5, 6]
        : [Number(values.frequencyValue)];

    const frequency = values.frequencyValue === "daily" ? "daily" : "weekly";

    const payload: CreateHabitPayload = {
      title: values.title.trim(),
      description: values.description?.trim() || undefined,
      frequency,
      scheduledDays,
      scheduledTime: values.scheduledTime || null,
      reminderEnabled: values.reminderEnabled,
      goalType,
      goalTarget: values.uiGoalType === "repetitions" ? values.goalTarget : 1,
      isTimed,
      estimatedDuration:
        values.uiGoalType === "duration-timer" ? values.estimatedDuration : null,
      category: values.category,
    };

    if (isEditing && editHabit) {
      updateMutation.mutate(
        { id: editHabit.id, ...payload },
        { onSuccess: handleClose }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: handleClose });
    }
  };

  const isPending =
    createMutation.isPending || updateMutation.isPending || isSubmitting;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {isEditing ? "Edit Habit" : "Create New Habit"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-1" noValidate>
          {/* Habit Name */}
          <div className="space-y-1.5">
            <Label htmlFor="habit-title">Habit Name</Label>
            <Input
              id="habit-title"
              placeholder="e.g. Morning Meditation"
              className="rounded-xl"
              aria-invalid={!!errors.title}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Frequency + Goal Type row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Frequency */}
            <div className="space-y-1.5">
              <Label>Frequency</Label>
              <Controller
                name="frequencyValue"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      {DAY_LABELS.map((day, idx) => (
                        <SelectItem key={idx} value={String(idx)}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Goal Type */}
            <div className="space-y-1.5">
              <Label>Goal Type</Label>
              <Controller
                name="uiGoalType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-red-400 inline-block" />
                          Once
                        </span>
                      </SelectItem>
                      <SelectItem value="repetitions">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-pink-400 inline-block" />
                          Repetitions
                        </span>
                      </SelectItem>
                      <SelectItem value="duration-timer">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
                          Duration-Timer
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Repetitions target */}
          {uiGoalType === "repetitions" && (
            <div className="space-y-1.5">
              <Label htmlFor="goal-target">Target Repetitions</Label>
              <Input
                id="goal-target"
                type="number"
                min={1}
                className="rounded-xl"
                aria-invalid={!!errors.goalTarget}
                {...register("goalTarget")}
              />
              {errors.goalTarget && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.goalTarget.message}
                </p>
              )}
            </div>
          )}

          {/* Duration goal */}
          {uiGoalType === "duration-timer" && (
            <div className="space-y-1.5">
              <Label htmlFor="duration">Duration Goal (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min={1}
                className="rounded-xl"
                aria-invalid={!!errors.estimatedDuration}
                {...register("estimatedDuration")}
              />
              {errors.estimatedDuration && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.estimatedDuration.message}
                </p>
              )}
            </div>
          )}

          {/* Scheduled Time */}
          <div className="space-y-1.5">
            <Label htmlFor="scheduled-time">Scheduled Time (optional)</Label>
            <Input
              id="scheduled-time"
              type="time"
              className="rounded-xl"
              {...register("scheduledTime")}
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Smart Reminder toggle */}
          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                <span className="text-sm">🔔</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Smart Reminder</p>
                <p className="text-xs text-gray-400">Predictive AI Notifications</p>
              </div>
            </div>
            <Controller
              name="reminderEnabled"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-violet-600"
                />
              )}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a note about this habit..."
              className="rounded-xl resize-none min-h-[80px] text-sm"
              aria-invalid={!!errors.description}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isPending}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white"
            >
              {isPending
                ? isEditing
                  ? "Saving..."
                  : "Creating..."
                : isEditing
                ? "Save Changes"
                : "Create Habit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}