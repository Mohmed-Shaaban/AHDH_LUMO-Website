import axiosInstance from '@/services/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';
import { taskKeys } from './useTasks';
// import axiosInstance from '@/lib/axiosInstance';
// import { taskKeys } from '@/services/Tasks/taskKeys';

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

interface TasksEnvelope {
  status: boolean;
  message: string;
  data: FlatTask[];
  meta: { timestamp: string; path: string };
  pagination: { page: number; limit: number; totalItems: number; totalPages: number };
}

const PAGE_LIMIT = 50;

const getTasksPage = async (page: number) => {
  const { data } = await axiosInstance.get<TasksEnvelope>(
    `/tasks?includeSubtasks=true&page=${page}&limit=${PAGE_LIMIT}`,
  );
  return data;
};

const useAllTasks = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: taskKeys.all,
      queryFn: ({ pageParam }) => getTasksPage(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.pagination.page < lastPage.pagination.totalPages
          ? lastPage.pagination.page + 1
          : undefined,
    });

  if (error) {
    console.error('useAllTasks error:', error);
  }

  const tasks = data?.pages.flatMap((p) => p.data) ?? [];

  return { tasks, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage };
};
export default useAllTasks;