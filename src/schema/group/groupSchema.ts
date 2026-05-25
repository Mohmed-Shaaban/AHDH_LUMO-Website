import { z } from "zod";

export const createGroupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(60, "Name must be under 60 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description must be under 300 characters"),
  category: z.string().min(1, "Please select a category"),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color"),
  isPublic: z.boolean().default(true),
  maxMembers: z.coerce
    .number()
    .min(2, "At least 2 members")
    .max(500, "Max 500 members"),
  tags: z.array(z.string()).max(5, "Max 5 tags").default([]),
});
export const updateGroupSchema = z.object({
  name: z.string().min(3).max(60).optional(),
  description: z.string().min(10).max(300).optional(),
  category: z.string().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  isPublic: z.boolean().optional(),

  maxMembers: z.coerce
    .number()
    .min(2)
    .max(500)
    .optional(),

  tags: z.array(z.string()).max(5).optional(),
});

export type UpdateGroupFormValues =
  z.infer<typeof updateGroupSchema>;

export type CreateGroupFormValues = z.infer<typeof createGroupSchema>;

export const joinByCodeSchema = z.object({
  code: z
    .string()
    .min(6, "Code is too short")
    .max(20, "Code is too long")
    .toUpperCase(),
});

export type JoinByCodeFormValues = z.infer<typeof joinByCodeSchema>;

export const GROUP_CATEGORIES = [
  { value: "focus", label: "Focus" },
  { value: "academic", label: "Academic" },
  { value: "wellness", label: "Wellness" },
  { value: "business", label: "Business" },
  { value: "creative", label: "Creative" },
  { value: "remote", label: "Remote" },
  { value: "personal", label: "Personal" },
  { value: "career", label: "Career" },
] as const;

export const MAX_MEMBERS_OPTIONS = [10, 25, 50, 100, 200, 500];

export const PRESET_COLORS = [
  "#22c55e", "#16a34a", "#4ade80",
  "#ef4444", "#f87171", "#fca5a5",
  "#92400e", "#f59e0b", "#a16207",
  "#f97316", "#fb923c", "#7c3aed",
  "#a855f7", "#ec4899", "#1e3a5f",
  "#1e293b", "#0f172a", "#3b82f6",
  "#8b5cf6", "#fb923c", "#60a5fa",
  "#93c5fd", "#bfdbfe", "#06b6d4",
];
