import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useJoinGroupByCode } from "@/features/groups/useGroup";
import { joinByCodeSchema, type JoinByCodeFormValues } from "@/schema/group/groupSchema";


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinGroupDialog({ open, onOpenChange }: Props) {
  const { mutate: joinByCode, isPending } = useJoinGroupByCode();

  const form = useForm<JoinByCodeFormValues>({
    resolver: zodResolver(joinByCodeSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = (values: JoinByCodeFormValues) => {
    joinByCode(values.code, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Join an Existing Group</DialogTitle>
          <DialogDescription>
            Use the group code to enter and become a member.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Group Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. AB12CD34"
                      className="font-mono tracking-widest uppercase"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Joining..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
