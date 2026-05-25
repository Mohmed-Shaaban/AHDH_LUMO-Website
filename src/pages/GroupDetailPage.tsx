import { useParams, useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  Play,
  RefreshCw,
  UserPlus,
  Users,
  MoreVertical,
  Rss,
  Trophy,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { useGroup, useGroupActivity, useGroupMembers, useJoinGroup, useRegenerateCode } from "@/features/groups/useGroup";
import type { GroupActivity, GroupMember } from "@/types";

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  member_joined: <UserPlus className="h-4 w-4 text-green-500" />,
  member_left: <UserPlus className="h-4 w-4 text-red-400" />,
  group_updated: <RefreshCw className="h-4 w-4 text-blue-400" />,
  resource_shared: <Paperclip className="h-4 w-4 text-violet-400" />,
  session_started: <Play className="h-4 w-4 text-emerald-500" />,
  milestone_reached: <Trophy className="h-4 w-4 text-amber-400" />,
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function GroupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const groupId = Number(id);

  const { data: groupRes, isLoading: groupLoading } = useGroup(groupId);
  const { data: activityRes, isLoading: activityLoading } =
    useGroupActivity(groupId);
  const { data: membersRes, isLoading: membersLoading } =
    useGroupMembers(groupId);
  const { mutate: join, isPending: joining } = useJoinGroup();
  const { mutate: regen, isPending: regening } = useRegenerateCode();

  const group = groupRes?.data;
  const activities = activityRes?.data ?? [];
  const members = membersRes?.data ?? [];

  if (groupLoading) return <GroupDetailSkeleton />;
  if (!group)
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground">Group not found.</p>
        <Button variant="outline" onClick={() => navigate("/groups")}>
          Back to Groups
        </Button>
      </div>
    );

  return (
    <div className="max-w-8xl mx-auto py-4 ">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 -ml-2 gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* ── Left column ── */}
        <div className="space-y-6">
          {/* Header card */}
          <div className="rounded-2xl border bg-card p-6 flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Color avatar */}
            <div
              className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xl font-bold shadow"
              style={{ backgroundColor: group.color }}
            >
              {group.name[0].toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold leading-tight">{group.name}</h1>
                <Badge variant="secondary" className="text-xs capitalize">
                  {group.category}
                </Badge>

              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {group.description}
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {group.currentMemberCount}/{group.maxMembers} members
                </span>
                {group.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => regen(groupId)}
                    disabled={regening}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate Invite Code
                  </DropdownMenuItem>
                  {group.invitationCode && (
                    <DropdownMenuItem
                      onClick={() =>
                        navigator.clipboard.writeText(group.invitationCode)
                      }
                    >
                      Copy Code: {group.invitationCode}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="rounded-2xl border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Rss className="h-4 w-4 text-primary" />
                Live Activity Feed
              </div>
              <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                View all updates
              </Button>
            </div>

            {activityLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-9 w-9 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : activities.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No activity yet.
              </p>
            ) : (
              <div className="space-y-1">
                {activities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right column: Members ── */}
        <div className="rounded-2xl border bg-card p-5 space-y-4 h-fit">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">Group Members</h2>
            <Badge className="bg-primary/10 text-primary border-0 text-xs">
              {membersRes?.pagination.totalItems ?? members.length}
            </Badge>
          </div>

          {membersLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2.5 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {members.map((member) => (
                <MemberItem key={member.id} member={member} />
              ))}
            </div>
          )}

          <Separator />
          <Button variant="outline" className="w-full gap-2 text-sm" size="sm">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Activity Item ─────────────────────────────────────────────────────────────

function ActivityItem({ activity }: { activity: GroupActivity }) {
  const resourceUrl =
    activity.metadata?.resourceUrl as string | undefined;

  return (
    <div className="flex items-start gap-3 rounded-xl p-3 hover:bg-muted/50 transition-colors">
      <Avatar className="h-9 w-9 flex-shrink-0">
        <AvatarImage src={activity.userProfilePicture ?? undefined} />
        <AvatarFallback className="text-xs">
          {initials(activity.userFullName)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug">
          <span className="font-semibold">{activity.userFullName}</span>{" "}
          {activity.type === "resource_shared" && resourceUrl ? (
            <>
              shared a new resource:{" "}
              <a
                href={resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                {activity.message.replace("shared a new resource: ", "")}
              </a>
            </>
          ) : (
            activity.message
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatDistanceToNow(new Date(activity.createdAt), {
            addSuffix: true,
          })}{" "}
          •{" "}
          <span className="capitalize">
            {activity.type.replace("_", " ")}
          </span>
        </p>
      </div>

      <div className="flex-shrink-0 mt-0.5">
        {ACTIVITY_ICONS[activity.type]}
      </div>
    </div>
  );
}

// ─── Member Item ───────────────────────────────────────────────────────────────

function MemberItem({ member }: { member: GroupMember }) {
  const isStudying = member.role === "creator"; // placeholder until sessions API

  return (
    <div
      className={cn(
        "rounded-xl p-3 transition-colors",
        isStudying ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <Avatar className="h-9 w-9">
            <AvatarImage src={member.profilePicture ?? undefined} />
            <AvatarFallback className="text-xs">
              {initials(member.fullName)}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card",
              isStudying ? "bg-amber-500" : "bg-green-500"
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-tight truncate">
            {member.fullName}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {isStudying ? "Studying Mode" : "Online"}
          </p>
        </div>

        {member.role === "creator" && (
          <Badge variant="outline" className="text-[10px] flex-shrink-0">
            Creator
          </Badge>
        )}
      </div>

      {member.isTopPerformer && (
        <div className="mt-2 flex items-center gap-1.5">
          <Trophy className="h-3 w-3 text-amber-500" />
          <span className="text-xs text-muted-foreground">Top Performer</span>
        </div>
      )}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function GroupDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <Skeleton className="h-8 w-16" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-4">
          <Skeleton className="h-36 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}
