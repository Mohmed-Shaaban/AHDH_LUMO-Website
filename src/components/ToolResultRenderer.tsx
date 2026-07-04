import { CheckCircle2, Circle, Trash2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuickTaskAction } from '@/features/ai/useAssistant';
import type { AssistantToolEnvelope } from '@/types/ai.types';
// import { useQuickTaskAction } from './useAssistant';
// import type { AssistantToolEnvelope } from '@/types/ai';

interface AssistantTaskItem {
  id: number;
  title: string;
  status: 'pending' | 'completed' | string;
  priority: 'low' | 'medium' | 'high' | string;
  dueDate: string | null;
}

const priorityColor: Record<string, string> = {
  high: 'bg-red-500/20 text-red-300',
  medium: 'bg-amber-500/20 text-amber-300',
  low: 'bg-white/10 text-white/50',
};

const TaskRow = ({ task }: { task: AssistantTaskItem }) => {
  const quickAction = useQuickTaskAction();
  const isDone = task.status === 'completed';

  return (
    <li className="flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs">
      <button
        onClick={() => quickAction.mutate({ name: 'complete_task', taskId: task.id })}
        disabled={isDone || quickAction.isPending}
        title={isDone ? 'Completed' : 'Mark complete'}
      >
        {isDone ? (
          <CheckCircle2 className="size-3.5 shrink-0 text-emerald-400" />
        ) : (
          <Circle className="size-3.5 shrink-0 text-white/30 hover:text-emerald-400" />
        )}
      </button>

      <span
        className={cn('flex-1 truncate', isDone && 'text-white/40 line-through')}
        dir="auto"
      >
        {task.title}
      </span>

      <span
        className={cn(
          'shrink-0 rounded-full px-1.5 py-0.5 text-[10px] capitalize',
          priorityColor[task.priority] ?? 'bg-white/10 text-white/50',
        )}
      >
        {task.priority}
      </span>

      <button
        onClick={() => quickAction.mutate({ name: 'delete_task', taskId: task.id })}
        disabled={quickAction.isPending}
        title="Delete"
      >
        {quickAction.isPending ? (
          <Loader2 className="size-3.5 shrink-0 animate-spin text-white/30" />
        ) : (
          <Trash2 className="size-3.5 shrink-0 text-white/30 hover:text-red-400" />
        )}
      </button>
    </li>
  );
};

const TaskListResult = ({ tasks }: { tasks: AssistantTaskItem[] }) => {
  if (tasks.length === 0) {
    return <p className="text-xs text-white/40">No tasks found.</p>;
  }
  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {tasks.slice(0, 8).map((t) => (
        <TaskRow key={t.id} task={t} />
      ))}
    </ul>
  );
};

const ToolResultRenderer = ({ tool }: { tool: AssistantToolEnvelope }) => {
  if (!tool.executed || !tool.result) return null;

  switch (tool.name) {
    case 'list_tasks': {
      const result = tool.result as { data: AssistantTaskItem[] };
      return <TaskListResult tasks={result.data ?? []} />;
    }
    case 'complete_task':
    case 'update_task':
    case 'delete_task':
    case 'create_task': {
      const task = tool.result as { title?: string };
      return task.title ? <p className="mt-2 text-xs text-white/50">✓ {task.title}</p> : null;
    }
    default:
      return null;
  }
};

export default ToolResultRenderer;