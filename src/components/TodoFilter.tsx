import React from 'react';
import { TodoCategory } from '../types/todo';

interface TodoFilterProps {
  currentFilter: TodoCategory;
  onFilterChange: (filter: TodoCategory) => void;
}

export function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
  const filters: TodoCategory[] = ['all', 'work', 'personal', 'urgent'];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-lg capitalize ${
            currentFilter === filter
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}