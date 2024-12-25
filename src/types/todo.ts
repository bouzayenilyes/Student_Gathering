export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: 'work' | 'personal' | 'urgent';
  createdAt: Date;
  dueDate?: string;
}

export type TodoCategory = 'all' | 'work' | 'personal' | 'urgent';