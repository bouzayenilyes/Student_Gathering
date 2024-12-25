import React from 'react';
import { Layout, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { ShareQRCode } from '../sharing/ShareQRCode';
import { motion } from 'framer-motion';
import { Todo } from '../../types/todo';

interface HeaderProps {
  todos: Todo[];
}

export function Header({ todos }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 
        border-b border-gray-200/20 dark:border-gray-700/30 mb-8 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <Layout className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400" />
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
              dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 
              truncate tracking-tight">
              Student Gathering
            </h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <ShareQRCode todos={todos} />
            <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-gray-200 to-gray-300 
              dark:from-gray-700 dark:to-gray-600 mx-0.5" />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </motion.header>
  );
}