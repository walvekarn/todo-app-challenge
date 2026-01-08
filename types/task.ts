export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  user_identifier: string;
  title: string;
  description: string | null;
  enhanced_title: string | null;
  is_completed: boolean;
  priority: Priority;
  due_date: string | null;
  sort_order: number;
  is_recurring: boolean;
  recurrence_pattern: Record<string, any> | null;
  description_html: string | null;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  due_date?: string;
}

export interface UpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  is_completed?: boolean;
  priority?: Priority;
  due_date?: string;
  sort_order?: number;
}

