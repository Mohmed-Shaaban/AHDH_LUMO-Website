import { useState } from "react";
import { Plus, Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useGroups, useMyGroups } from "@/features/groups/useGroup";
import { GroupCard } from "@/components/GroupCard";
import { CreateGroupDialog } from "@/components/CreateGroupDialog";
import { JoinGroupDialog } from "@/components/JoinGroupDialog";


function Group() {
  const [tab, setTab] = useState<"all" | "mine">("all");
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  const allGroups = useGroups();
  const myGroups = useMyGroups();

  const activeQuery = tab === "all" ? allGroups : myGroups;
  const groups = activeQuery.data?.data ?? [];

  const filtered = groups.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 ">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="px-7!"
            placeholder="Search for people and teams"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => setJoinOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Join Group
        </Button>
      </div>

      {/* Tabs + create */}
      <div className="flex items-center justify-between">
        <Tabs value={tab} onValueChange={(v) => setTab(v as "all" | "mine")}>
          <TabsList>
            <TabsTrigger value="all">Groups</TabsTrigger>
            <TabsTrigger value="mine">Your Groups</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Grid */}
      {activeQuery.isLoading ? (
        <GroupsGridSkeleton />
      ) : activeQuery.isError ? (
        <p className="text-center text-muted-foreground py-12">
          Failed to load groups. Please try again.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Create card */}
          {tab === "mine" && (
            <button
              onClick={() => setCreateOpen(true)}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors min-h-[220px] gap-3 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">
                Create Group
              </span>
            </button>
          )}

          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-12">
              {search ? "No groups match your search." : "No groups yet."}
            </p>
          )}

          {filtered.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}

      <CreateGroupDialog open={createOpen} onOpenChange={setCreateOpen} />
      <JoinGroupDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}

function GroupsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="rounded-2xl border overflow-hidden">
          <Skeleton className="h-36 w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <div className="flex justify-between items-center pt-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-14 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Group