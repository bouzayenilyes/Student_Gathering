import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-2xl backdrop-blur-lg shadow-lg
        dark:bg-white/5 dark:hover:bg-white/10
        bg-white/80 hover:bg-white/90
        border border-white/10
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}