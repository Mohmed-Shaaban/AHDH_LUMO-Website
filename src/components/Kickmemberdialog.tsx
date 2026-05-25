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
import { useKickMember } from "@/features/groups/useGroup";
import type { GroupMember } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: number;
  member: GroupMember | null;
}

export function KickMemberDialog({
  open,
  onOpenChange,
  groupId,
  member,
}: Props) {
  const { mutate: kick, isPending } = useKickMember(groupId);

  const handleConfirm = () => {
    if (!member) return;
    kick(member.userId, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove member?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove{" "}
            <span className="font-semibold text-foreground">
              {member?.fullName}
            </span>{" "}
            from the group? They will lose access immediately and can only
            rejoin via invite.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Removing..." : "Remove Member"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}