import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Group } from "@/types";
import { useNavigate } from "react-router";
import { useJoinGroup } from "@/features/groups/useGroup";

interface Props {
  group: Group;
  /** Pass currentUserId so we can hide Join if already a member */
  currentUserId?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  academic: "bg-blue-500",
  wellness: "bg-green-500",
  business: "bg-emerald-700",
  creative: "bg-orange-400",
  remote: "bg-sky-500",
  personal: "bg-stone-400",
  career: "bg-teal-600",
  focus: "bg-violet-500",
};

export function GroupCard({ group, currentUserId }: Props) {
  const navigate = useNavigate();
  const { mutate: join, isPending } = useJoinGroup();

  const isOwner = group.creatorId === currentUserId;

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    join(group.id);
  };

  const handleCardClick = () => {
    navigate(`/dash/groups/${group.id}`);
  };

  const badgeColor =
    CATEGORY_COLORS[group.category.toLowerCase()] ?? "bg-gray-500";

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col rounded-2xl border bg-card overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      {/* Cover / Color banner */}
      <div className="relative h-36 overflow-hidden">
        {group.coverImage ? (
          <img
            src={group.coverImage}
            alt={group.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundColor: group.color }}
          />
        )}

        {/* Category badge */}
        <span
          className={cn(
            "absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded",
            badgeColor
          )}
        >
          {group.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-semibold text-sm leading-tight line-clamp-1">
          {group.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
          {group.description}
        </p>

        {/* Tags */}
        {group.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {group.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-1">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            {group.currentMemberCount.toLocaleString()}
            {group.currentMemberCount >= 1000
              ? ""
              : `/${group.maxMembers}`}{" "}
            members
          </span>

          {!isOwner && (
            <Button
              size="sm"
              className="h-7 px-3 text-xs rounded-full"
              onClick={handleJoin}
              disabled={isPending}
            >
              {isPending ? "..." : "Join"}
            </Button>
          )}

          {isOwner && (
            <Badge variant="outline" className="text-[10px]">
              Owner
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
