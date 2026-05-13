import { useState } from "react";
import { Plus } from "lucide-react";
import { TaskFormDialog } from "./TaskFormDialog";

interface AddTaskRowProps {
  sectionId: number;
  sectionName?: string;
}

export function AddTaskRow({ sectionId, sectionName }: AddTaskRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-3"
      >
        <Plus className="h-4 w-4" />
        Add task
      </button>

      <TaskFormDialog
        open={open}
        onOpenChange={setOpen}
        sectionId={sectionId}
        sectionName={sectionName}
      />
    </>
  );
}