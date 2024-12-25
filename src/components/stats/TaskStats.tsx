import React from 'react';
import { Card } from '../ui/Card';
import { Todo } from '../../types/todo';
import { BarChart, Target, Clock } from 'lucide-react';

interface TaskStatsProps {
  todos: Todo[];
}

export function TaskStats({ todos }: TaskStatsProps) {
  const stats = {
    completed: todos.filter(t => t.completed).length,
    total: todos.length,
    urgent: todos.filter(t => t.category === 'urgent').length,
    overdue: todos.filter(t => t.dueDate && new Date(t.dueDate) < new Date()).length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <BarChart className="w-5 h-5 text-blue-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Progress</h3>
            <p className="text-2xl font-bold">
              {stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)}%
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-red-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Urgent Tasks</h3>
            <p className="text-2xl font-bold">{stats.urgent}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-yellow-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue</h3>
            <p className="text-2xl font-bold">{stats.overdue}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}