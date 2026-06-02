// src/components/habits/DeleteHabitDialog.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteHabit } from "@/features/habits/useHabits";

interface DeleteHabitDialogProps {
  habitId: number | null;
  onClose: () => void;
}

export function DeleteHabitDialog({ habitId, onClose }: DeleteHabitDialogProps) {
  const deleteMutation = useDeleteHabit();

  const handleConfirm = () => {
    if (!habitId) return;
    deleteMutation.mutate(habitId, { onSuccess: onClose });
  };

  return (
    <AlertDialog open={!!habitId} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this habit?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone. All progress and
            history for this habit will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
