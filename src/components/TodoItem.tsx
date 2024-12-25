import React from 'react';
import { Check, Trash2, Clock, Calendar } from 'lucide-react';
import { Todo } from '../types/todo';
import { formatDistanceToNow } from '../utils/dateUtils';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateDueDate: (id: string, date: Date) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdateDueDate }: TodoItemProps) {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date();
  const timeLeft = todo.dueDate ? formatDistanceToNow(new Date(todo.dueDate)) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`
        group flex items-center gap-4 p-4 sm:p-5 rounded-xl transition-all
        bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/80
        border border-gray-100 dark:border-gray-700/50 hover:border-gray-200 dark:hover:border-gray-700
        shadow-sm hover:shadow-md backdrop-blur-sm
        ${isOverdue && !todo.completed ? 'border-l-4 border-l-red-500' : ''}
      `}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center 
          transition-all duration-300 hover:scale-110
          ${todo.completed
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-transparent'
            : 'border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400'
          }
        `}
      >
        {todo.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Check size={14} className="text-white" />
          </motion.div>
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <h3 className={`
          text-base sm:text-lg font-medium transition-all duration-300
          dark:text-white
          ${todo.completed ? 'line-through opacity-50' : ''}
        `}>
          {todo.title}
        </h3>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className={`
            px-2.5 py-1 rounded-full text-xs font-medium
            transition-colors duration-300
            ${todo.category === 'work' 
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' 
              : todo.category === 'personal'
              ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300'
              : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300'}
          `}>
            {todo.category === 'personal' ? '✌️ Personal' : 
             todo.category === 'work' ? '💼 Work' : '🚨 Urgent'}
          </span>
          {timeLeft && (
            <span className={`
              flex items-center gap-1.5 text-xs font-medium
              ${isOverdue 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-gray-600 dark:text-gray-400'}
            `}>
              <Clock size={12} className="animate-pulse" />
              {timeLeft}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="relative">
          <input
            type="datetime-local"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            value={todo.dueDate?.slice(0, 16) || ''}
            onChange={(e) => onUpdateDueDate(todo.id, new Date(e.target.value))}
          />
          <button className="p-2 text-gray-500 hover:text-indigo-500 dark:text-gray-400 
            dark:hover:text-indigo-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 
            transition-all">
            <Calendar size={18} />
          </button>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 
            dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 
            transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}