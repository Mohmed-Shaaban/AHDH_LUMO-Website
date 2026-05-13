interface NavigatorWithNetworkInfo extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

interface NetworkInformation {
  downlink: number;
  downlinkMax?: number;
  effectiveType: string;
  rtt: number;
  saveData: boolean;
  type: string;
  addEventListener?: (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ) => void;
  removeEventListener?: (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ) => void;
}

export type NetworkStateT = {
  online: boolean;
  downlink: number | null;
  downlinkMax: number | null;
  effectiveType: string | null;
  rtt: number | null;
  saveData: boolean | null;
  type: string | null;
};

export type NetworkServerErrorStateT = {
  error: string | null;
};

export interface Section {
  id: number;
  name: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type Priority = "high" | "normal" | "low";
export type TaskStatus = "pending" | "completed" | "in_progress";
export type DifficultyLevel = "easy" | "medium" | "hard";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string | null;
  sectionId: number | null;
  tags: string[];
  difficultyLevel: DifficultyLevel;
  estimatedDuration: number | null;
  actualDuration: number | null;
  completedAt: string | null;
  createdByType: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  meta: {
    timestamp: string;
    path: string;
  };
  pagination?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    links: Record<string, string>;
  };
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: string | null;
  sectionId?: number | null;
  tags?: string[];
  difficultyLevel?: DifficultyLevel;
  estimatedDuration?: number | null;
}

export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {
  id: number;
}


