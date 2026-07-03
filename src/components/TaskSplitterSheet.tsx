import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Sparkles, Clock, Loader2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { TaskSplitResponse } from '@/types/ai.types';
import { useTaskSplitter } from '@/features/ai/useTaskSplitter';
import { taskKeys } from '@/features/tasks/useTasks';


const TaskSplitterSheet = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<TaskSplitResponse | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useTaskSplitter();

  const handleSubmit = () => {
    if (!message.trim()) return;
    mutate(
      { message },
      {
        onSuccess: (data) => {
          setResult(data);
          queryClient.invalidateQueries({ queryKey: ['sections'] });
          queryClient.invalidateQueries({ queryKey: taskKeys.all });
        },
      },
    );
  };

  const handleClose = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setMessage('');
      setResult(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetTrigger asChild>
        <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
          <Sparkles className="size-4" />
          Split with AI
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col gap-4 sm:max-w-md bg-[#1a0f2e] text-white border-none">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-white">
            <Sparkles className="size-4 text-purple-400" />
            AI Task Splitter
          </SheetTitle>
        </SheetHeader>

        {!result ? (
          <div className="flex flex-1 flex-col gap-3 px-4">
            <p className="text-sm text-white/60">
              Describe the task you want broken down into smaller steps.
            </p>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. prepare for the client meeting on Friday"
              className="min-h-[100px] resize-none border-white/10 bg-white/5"
              maxLength={500}
            />
            <Button
              onClick={handleSubmit}
              disabled={isPending || !message.trim()}
              className="gap-2 bg-purple-600 hover:bg-purple-700"
            >
              {isPending ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Split Task
            </Button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
            <div>
              <h3 className="font-medium">{result.title}</h3>
              {result.vector_store_unavailable && (
                <span className="mt-1 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                  Less personalized this time
                </span>
              )}
            </div>

            <ul className="flex flex-col gap-2">
              {result.subtasks.map((s) => (
                <li
                  key={s.step}
                  className="rounded-lg border border-white/10 bg-white/5 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {s.step}. {s.title}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/50">
                      <Clock className="size-3" />
                      {s.duration_min}m
                    </span>
                  </div>
                  {s.tip && <p className="mt-1 text-xs text-white/50">{s.tip}</p>}
                </li>
              ))}
            </ul>

            <div className="rounded-lg bg-purple-600/20 p-3 text-sm">
                {result.adhd_note}
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/60">
                    <Clock className="size-3.5 shrink-0" />
                    <span>Suggested time: <span className="capitalize text-white/90">{result.schedule_suggestion}</span></span>
                </div>

            <Button variant="outline" onClick={() => handleClose(false)} className="border-white/10 text-black">
              Done
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default TaskSplitterSheet;