import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import {
  CalendarDays,
  Clock,
  X,
  Paperclip,
  AlignLeft,
  Link2,
  MoreHorizontal,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Task } from "@/types";
import { useCreateTask, useUpdateTask } from "@/features/tasks/useTasks";

// ── Schema ─────────────────────────────────────────────────────────────────

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["high", "normal", "low"]).nullable(),
  difficultyLevel: z.enum(["easy", "medium", "hard"]).nullable(),
  dueDate: z.date().nullable(),
  estimatedDuration: z.number().nullable(),
  tags: z.array(z.string()),
});

type FormValues = z.infer<typeof schema>;

// ── Helpers ────────────────────────────────────────────────────────────────

const PRIORITY_DOT: Record<string, string> = {
  high: "bg-red-500",
  normal: "bg-amber-400",
  low: "bg-slate-400",
};

function minutesToDisplay(minutes: number | null): string {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h} Hour${h > 1 ? "s" : ""}`;
  return `${m} min`;
}

function buildDefaults(task?: Task): FormValues {
  return {
    title: task?.title ?? "",
    description: task?.description ?? "",
    priority: task?.priority ?? null,
    difficultyLevel: task?.difficultyLevel ?? null,
    dueDate: task?.dueDate ? new Date(task.dueDate) : null,
    estimatedDuration: task?.estimatedDuration ?? null,
    tags: task?.tags ?? [],
  };
}

// ── FieldRow ───────────────────────────────────────────────────────────────

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-0">
      <span className="w-40 shrink-0 text-sm font-semibold text-gray-800">
        {label}
      </span>
      <div className="flex-1 text-sm text-gray-400">{children}</div>
    </div>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionId: number;
  sectionName?: string;
  task?: Task;
}

// ── Component ──────────────────────────────────────────────────────────────

export function TaskFormDialog({
  open,
  onOpenChange,
  sectionId,
  sectionName,
  task,
}: TaskFormDialogProps) {
  const isEdit = !!task;
  const updateTask = useUpdateTask(sectionId);
  const createTask = useCreateTask(sectionId);
  const isSaving = updateTask.isPending || createTask.isPending;

  const [tagInput, setTagInput] = useState("");
  const tagInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaults(task),
  });

  useEffect(() => {
    if (open) {
      form.reset(buildDefaults(task));
      setTagInput("");
    }
  }, [open, task]);

  function addTag(value: string) {
    const tag = value.trim();
    if (!tag) return;
    const current = form.getValues("tags");
    if (!current.includes(tag)) form.setValue("tags", [...current, tag]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    form.setValue(
      "tags",
      form.getValues("tags").filter((t) => t !== tag)
    );
  }

  function onSubmit(values: FormValues) {
    const payload = {
      title: values.title,
      description: values.description,
      priority: values.priority ?? undefined,
      difficultyLevel: values.difficultyLevel ?? undefined,
      dueDate: values.dueDate ? values.dueDate.toISOString() : null,
      estimatedDuration: values.estimatedDuration,
      tags: values.tags,
      sectionId,
    };

    if (isEdit && task) {
      updateTask.mutate(
        { id: task.id, ...payload },
        { onSuccess: () => onOpenChange(false) }
      );
    } else {
      createTask.mutate(payload, { onSuccess: () => onOpenChange(false) });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-200">

        {/* ── Top bar ── */}
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
          <DialogTitle className="text-base font-semibold text-gray-900">
            {sectionName ?? "Task"}
          </DialogTitle>
          {/* <div className="flex items-center gap-4 text-gray-400">
            <Paperclip className="h-4 w-4 cursor-pointer hover:text-gray-600 transition-colors" />
            <AlignLeft className="h-4 w-4 cursor-pointer hover:text-gray-600 transition-colors" />
            <Link2 className="h-4 w-4 cursor-pointer hover:text-gray-600 transition-colors" />
            <MoreHorizontal className="h-4 w-4 cursor-pointer hover:text-gray-600 transition-colors" />
          </div> */}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-6 pt-3 pb-3">

              {/* ── Title ── */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Task Title"
                        className="w-full text-2xl font-bold bg-transparent border-none outline-none placeholder:text-gray-300 text-gray-800"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ── Due Date ── */}
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FieldRow label="Due Date:">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {field.value ? format(field.value, "d MMM yyyy") : "Add date"}
                          <CalendarDays className="h-3.5 w-3.5" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(d) => field.onChange(d ?? null)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FieldRow>
                )}
              />

              {/* ── Estimated Time ── */}
              <FormField
                control={form.control}
                name="estimatedDuration"
                render={({ field }) => (
                  <FieldRow label="Estimated Time">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={0}
                        placeholder="Add Duration"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : null)
                        }
                        className="h-6 w-32 border-none shadow-none p-0 text-sm placeholder:text-gray-400 text-gray-700 focus-visible:ring-0 bg-transparent"
                      />
                      {field.value ? (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          {minutesToDisplay(field.value)}
                        </span>
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                      )}
                    </div>
                  </FieldRow>
                )}
              />

              {/* ── Priority ── */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FieldRow label="Priority:">
                    <div className="flex items-center gap-2">
                      {field.value && (
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full shrink-0",
                            PRIORITY_DOT[field.value]
                          )}
                        />
                      )}
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger className="h-6 border-none shadow-none p-0 text-sm text-gray-400 focus:ring-0 w-36 gap-1 bg-transparent">
                          <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
                              High
                            </span>
                          </SelectItem>
                          <SelectItem value="normal">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-amber-400 inline-block" />
                              Normal
                            </span>
                          </SelectItem>
                          <SelectItem value="low">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-slate-400 inline-block" />
                              Low
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FieldRow>
                )}
              />

              {/* ── Difficulty Level ── */}
              <FormField
                control={form.control}
                name="difficultyLevel"
                render={({ field }) => (
                  <FieldRow label="Difficulty Level">
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger className="h-6 border-none shadow-none p-0 text-sm text-gray-400 focus:ring-0 w-36 gap-1 bg-transparent">
                        <SelectValue placeholder="Select Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy 🔥</SelectItem>
                        <SelectItem value="medium">Medium ⚡</SelectItem>
                        <SelectItem value="hard">Hard 💀</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldRow>
                )}
              />

              {/* ── Tags ── */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FieldRow label="Tag:">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-green-100 text-green-700 hover:bg-green-100 gap-1 pr-1.5 font-normal rounded-md"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-red-500 ml-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      <input
                        ref={tagInputRef}
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag(tagInput);
                          }
                        }}
                        onBlur={() => addTag(tagInput)}
                        placeholder={field.value.length === 0 ? "Add Tags" : ""}
                        className="text-sm bg-transparent outline-none placeholder:text-gray-400 text-gray-700 w-20"
                      />
                    </div>
                  </FieldRow>
                )}
              />

              {/* ── Description ── */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <p className="text-sm font-semibold text-gray-800 mb-3">Description</p>
                    <FormControl>
                      <div className="rounded-lg border border-gray-200 overflow-hidden">
                        <Textarea
                          {...field}
                          placeholder="Add a description…"
                          rows={4}
                          className="resize-none text-sm border-none shadow-none rounded-none focus-visible:ring-0 text-gray-600 placeholder:text-gray-300 bg-white"
                        />
                        <div className="flex items-center gap-3 px-3 py-2 border-t border-gray-100 text-gray-400">
                          <button type="button" className="text-base hover:text-gray-600 transition-colors leading-none">☺</button>
                          <button type="button" className="text-xs font-bold hover:text-gray-600 transition-colors">B</button>
                          <button type="button" className="text-xs italic hover:text-gray-600 transition-colors">I</button>
                          <button type="button" className="text-xs underline hover:text-gray-600 transition-colors">U</button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Footer ── */}
            <div className="flex justify-end px-6 py-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="rounded-full px-10 bg-violet-500 hover:bg-violet-600 text-white font-medium"
              >
                {isSaving ? "Saving…" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}