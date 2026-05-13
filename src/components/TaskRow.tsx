import { useState } from "react";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// import type { Task } from "../../types";
// import {
//   useDeleteTask,
//   useMarkTaskComplete,
//   useMarkTaskIncomplete,
// } from "../../hooks/useTasks";
import { TaskFormDialog } from "./TaskFormDialog";
import type { Task } from "@/types";
import { useDeleteTask, useMarkTaskComplete, useMarkTaskIncomplete } from "@/features/tasks/useTasks";

interface TaskRowProps {
  task: Task;
  sectionId: number;
  sectionName?: string;
}

const PRIORITY_CONFIG: Record<
  Task["priority"],
  { label: string; className: string }
> = {
  high: {
    label: "High Priority",
    className: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950 dark:text-red-400",
  },
  normal: {
    label: "Normal Priority",
    className: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:text-amber-400",
  },
  low: {
    label: "Low Priority",
    className: "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400",
  },
};

export function TaskRow({ task, sectionId, sectionName }: TaskRowProps) {
  const [editOpen, setEditOpen] = useState(false);

  const markComplete = useMarkTaskComplete(sectionId);
  const markIncomplete = useMarkTaskIncomplete(sectionId);
  const deleteTask = useDeleteTask(sectionId);

  const isCompleted = task.status === "completed";
  const isBusy = markComplete.isPending || markIncomplete.isPending || deleteTask.isPending;
  const priority = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.normal;

  function handleToggle() {
    if (isBusy) return;
    isCompleted ? markIncomplete.mutate(task.id) : markComplete.mutate(task.id);
  }

  return (
    <>
      <div
        className={cn(
          "group flex items-center gap-3  rounded-md transition-colors hover:bg-muted/50",
          isBusy && "opacity-60 pointer-events-none"
        )}
      >
        <span className="w-5 shrink-0" />
        {/* Toggle */}
        <button
          onClick={handleToggle}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <Circle className="h-4 w-4" />
          )}
        </button>

        {/* Title */}
        <span
          className={cn(
            "flex-1 text-sm truncate",
            isCompleted && "line-through text-muted-foreground"
          )}
        >
          {task.title}
        </span>

        {/* Priority badge */}
        <Badge
          variant="outline"
          className={cn(" font-normal shrink-0 w-[140px] justify-start", priority.className)}
        >
          <Circle className="h-2 w-2 mr-1 fill-current" />
          {priority.label}
        </Badge>

        {/* Due date */}
        <span className="flex items-center gap-1 text-xs text-muted-foreground w-28 shrink-0">
          <CalendarDays className="h-3 w-3" />
          {task.dueDate ? (
            format(new Date(task.dueDate), "d MMM yyyy")
          ) : (
            <span className="text-muted-foreground/50">Add date</span>
          )}
        </span>

        {/* Context menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleToggle}>
              {isCompleted ? (
                <>
                  <Circle className="h-4 w-4 mr-2" />
                  Mark incomplete
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark complete
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deleteTask.mutate(task.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Edit dialog */}
      <TaskFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        task={task}
        sectionId={sectionId}
        sectionName={sectionName}
      />
    </>
  );
}