import CreateSectionModal from '@/components/CreateSectionModal';
import { TaskBoard } from '@/components/TaskBoard';
import TasksFlatList from '@/components/TasksFlatList';
import TaskSplitterSheet from '@/components/TaskSplitterSheet';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useSections from '@/features/sections/useSections';
// import TaskSplitterSheet from '@/features/taskSplitter/TaskSplitterSheet';
// import TasksFlatList from '@/features/tasks/TasksFlatList';
import type { Section } from '@/types';

const Tasks = () => {
  const { sections: sectionsData, loadingSections } = useSections();

  if (loadingSections) return <Spinner />;

  return (
    <div className="flex-1 flex flex-col pb-10 gap-y-7 max-w-6xl mx-auto">
      <Tabs defaultValue="sections">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="tasks">All Tasks</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-3">
            <CreateSectionModal />
            <TaskSplitterSheet />
          </div>
        </div>

        <TabsContent value="sections" className="mt-4">
          {sectionsData?.length === 0 ? (
            <p>No sections. Add one.</p>
          ) : (
            <TaskBoard sections={sectionsData as Section[]} />
          )}
        </TabsContent>

        <TabsContent value="tasks" className="mt-4">
          <TasksFlatList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;