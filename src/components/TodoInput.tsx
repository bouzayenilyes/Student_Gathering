import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface TodoInputProps {
  onAdd: (title: string, category: 'work' | 'personal' | 'urgent') => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'work' | 'personal' | 'urgent'>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), category);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="✨ Add a new task..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            dark:border-gray-700 dark:bg-gray-800/50 dark:text-white 
            dark:placeholder-gray-400 transition-all duration-200
            hover:border-gray-300 dark:hover:border-gray-600"
        />
        
        <div className="flex gap-3 sm:gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as 'work' | 'personal' | 'urgent')}
            className="w-32 px-3 py-2.5 rounded-xl border border-gray-200 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              dark:border-gray-700 dark:bg-gray-800/50 dark:text-white
              hover:border-gray-300 dark:hover:border-gray-600
              transition-all duration-200"
          >
            <option value="personal" className="dark:bg-gray-800">✌️ Personal</option>
            <option value="work" className="dark:bg-gray-800">💼 Work</option>
            <option value="urgent" className="dark:bg-gray-800">🚨 Urgent</option>
          </select>
          
          <button
            type="submit"
            className="flex-shrink-0 px-4 sm:px-6 py-2.5 bg-gradient-to-r 
              from-indigo-600 via-purple-600 to-pink-600
              hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700
              text-white rounded-xl transition-all duration-300
              shadow-md hover:shadow-lg active:scale-95
              flex items-center justify-center gap-2 min-w-[90px]
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusCircle size={20} className="animate-spin-slow" />
            <span className="hidden sm:inline">Add</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </form>
  );
}