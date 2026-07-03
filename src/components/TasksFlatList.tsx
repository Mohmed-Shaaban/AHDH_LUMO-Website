import { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
// import useAllTasks from './useAllTasks';
import { Spinner } from '@/components/ui/spinner';
import useAllTasks from '@/features/tasks/useAlltasks';

interface FlatTask {
  id: number;
  title: string;
  status: string;
  priority: string;
  sectionId: number | null;
  parentTaskId: number | null;
  createdByType: 'ai' | 'user';
  dueDate: string | null;
}

const priorityColor: Record<string, string> = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-amber-100 text-amber-600',
  low: 'bg-gray-100 text-gray-500',
};

const TaskRow = ({ task, isChild = false }: { task: FlatTask; isChild?: boolean }) => (
  <div className={cn('flex items-center gap-3 py-2', isChild && 'pl-8')}>
    {task.status === 'completed' ? (
      <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
    ) : (
      <Circle className="size-4 shrink-0 text-gray-300" />
    )}
    <span
      className={cn(
        'flex-1 truncate text-sm',
        task.status === 'completed' && 'text-gray-400 line-through',
      )}
      dir="auto"
    >
      {task.title}
    </span>
    {task.createdByType === 'ai' && (
      <Sparkles className="size-3.5 shrink-0 text-purple-400" />
    )}
    <span
      className={cn(
        'shrink-0 rounded-full px-2 py-0.5 text-[10px] capitalize',
        priorityColor[task.priority] ?? 'bg-gray-100 text-gray-500',
      )}
    >
      {task.priority}
    </span>
  </div>
);

const ParentGroup = ({ parent, children }: { parent: FlatTask; children: FlatTask[] }) => {
  const [expanded, setExpanded] = useState(false);
  const doneCount = children.filter((c) => c.status === 'completed').length;

  return (
    <li className="rounded-lg border bg-white px-3">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center gap-2 py-1"
        disabled={children.length === 0}
      >
        {children.length > 0 ? (
          expanded ? (
            <ChevronDown className="size-4 shrink-0 text-gray-400" />
          ) : (
            <ChevronRight className="size-4 shrink-0 text-gray-400" />
          )
        ) : (
          <span className="size-4 shrink-0" />
        )}
        <div className="flex-1">
          <TaskRow task={parent} />
        </div>
        {children.length > 0 && (
          <span className="shrink-0 text-[10px] text-gray-400">
            {doneCount}/{children.length}
          </span>
        )}
      </button>

      {expanded && children.length > 0 && (
        <div className="flex flex-col divide-y border-t">
          {children
            .sort((a, b) => a.id - b.id)
            .map((child) => (
              <TaskRow key={child.id} task={child} isChild />
            ))}
        </div>
      )}
    </li>
  );
};

const TasksFlatList = () => {
const { tasks, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useAllTasks();
console.log({ hasNextPage, isFetchingNextPage, tasksLength: tasks.length });

  if (isLoading) return <Spinner />;

  // Group ALL children by parentTaskId first, from the whole (multi-page) dataset
  const childrenByParent = new Map<number, FlatTask[]>();
  tasks.forEach((t) => {
    if (t.parentTaskId !== null) {
      const list = childrenByParent.get(t.parentTaskId) ?? [];
      list.push(t);
      childrenByParent.set(t.parentTaskId, list);
    }
  });

  // Unsectioned parents = top-level AI tasks with nowhere to live in Sections
  const unsectionedParents = tasks.filter(
    (t) => t.parentTaskId === null && t.sectionId === null,
  );

  // Orphans: a subtask whose parent isn't in the unsectioned-parent set
  // (e.g. parent is sectioned, or parent got deleted) — still show them, just ungrouped
  const parentIds = new Set(unsectionedParents.map((p) => p.id));
  const orphanChildren = tasks.filter(
    (t) => t.parentTaskId !== null && t.sectionId === null && !parentIds.has(t.parentTaskId),
  );

 if (unsectionedParents.length === 0 && orphanChildren.length === 0 && !hasNextPage) {
    return (
      <p className="text-sm text-gray-500">
        No AI-created tasks yet — try the splitter or the assistant.
      </p>
    );
  }

  return (
  <div className="flex flex-col gap-3">
    <ul className="flex flex-col gap-2">
      {unsectionedParents.map((parent) => (
        <ParentGroup
          key={parent.id}
          parent={parent}
          children={childrenByParent.get(parent.id) ?? []}
        />
      ))}

      {orphanChildren.length > 0 && (
        <li className="rounded-lg border bg-white px-3 py-2">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-gray-400">
            Steps (parent task is sectioned, removed, or not loaded yet)
          </p>
          <div className="flex flex-col divide-y">
            {orphanChildren.map((child) => (
              <TaskRow key={child.id} task={child} />
            ))}
          </div>
        </li>
      )}
    </ul>

    {hasNextPage && (
      <button
  onClick={() => {
    console.log('clicked, hasNextPage:', hasNextPage);
    fetchNextPage();
  }}
  disabled={isFetchingNextPage}
  className="self-center rounded-lg border px-4 py-1.5 text-xs text-gray-500 hover:bg-gray-50 disabled:opacity-50"
>
  {isFetchingNextPage ? 'Loading…' : 'Load more'}
</button>
    )}
  </div>
);}
export default TasksFlatList;