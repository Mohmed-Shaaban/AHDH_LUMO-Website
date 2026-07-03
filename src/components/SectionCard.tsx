import { useState } from "react";
import { ChevronDown, ChevronRight, Circle, CheckCircle2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Section } from "@/types";
import { useTasksBySection } from "@/features/tasks/useTasks";
import { TaskRow } from "./TaskRow";
import { AddTaskRow } from "./AddTaskRow";
import { useDeleteSection } from "@/features/sections/useCreateSection";

// import type { Section } from "../../types";
// import { useTasksBySection } from "../../hooks/useTasks";
// import { TaskRow } from "./TaskRow";
// import { AddTaskRow } from "./AddTaskRow";

interface SectionCardProps {
  section: Section;
}

const STATUS_STYLE: Record<
  string,
  { dotClass: string; badgeClass: string; label?: string }
> = {
  pending: {
    dotClass: "border-2 border-slate-400",
    badgeClass: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  },
  completed: {
    dotClass: "bg-green-500",
    badgeClass: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
};

function getSectionStatus(tasks: ReturnType<typeof useTasksBySection>["data"]) {
  if (!tasks || tasks.length === 0) return "pending";
  const allDone = tasks.every((t) => t.status === "completed");
  return allDone ? "completed" : "pending";
}

export function SectionCard({ section }: SectionCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { data: tasks, isLoading, isError } = useTasksBySection(section.id);
  const { mutateDeleteSection } = useDeleteSection();

  const status = getSectionStatus(tasks);
  const style = STATUS_STYLE[status];

  const handleDelete = (id: number) => {
  mutateDeleteSection(id);
};

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden ">
      {/* Section header */}
      <div className="flex items-center  gap-2 px-4 py-4 border-b bg-card">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label={collapsed ? "Expand section" : "Collapse section"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {/* Status dot + section name badge */}
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
            style.badgeClass
          )}
        >
          <span
            className={cn("inline-block h-3 w-3 rounded-full", style.dotClass)}
          />
          {section.name}
        </div>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>Rename section</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(section.id)} className="text-destructive focus:text-destructive">
                Delete section
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Body */}
      {!collapsed && (
        <div className="flex flex-col gap-3">
          {/* Column headers */}
          <div className="flex items-center justify-center gap-3 py-2  font-medium text-muted-foreground border-b ">
            <span className="w-5 shrink-0" />
            <span className="flex-1">Name</span>
            <span className="w-[140px] shrink-0">Priority</span>
            <span className="w-28 shrink-0">Due Date</span>
            <span className="w-7" />
          </div>

          {/* Tasks */}
          {isLoading && (
            <div className="space-y-2 px-3 py-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-8 w-full rounded" />
              ))}
            </div>
          )}

          {isError && (
            <p className="text-sm text-destructive px-3 py-2">
              Failed to load tasks.
            </p>
          )}

          {tasks && tasks.length === 0 && (
            <p className="text-sm text-muted-foreground px-3 py-2">
              No tasks yet.
            </p>
          )}
            <div className="flex flex-col gap-0.5">
              {tasks?.map((task) => (
                <TaskRow key={task.id} task={task} sectionId={section.id} sectionName={section.name} />
              ))}
          </div>

          <div className="mt-1 border-t pt-1">
            <AddTaskRow sectionId={section.id}  sectionName={section.name}/>
          </div>
        </div>
      )}
    </div>
  );
}
