import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import { formatTime } from '../../utils/timeUtils';
import { usePomodoro } from '../../hooks/usePomodoro';

export function PomodoroTimer() {
  const {
    time,
    isActive,
    isBreak,
    toggleTimer,
    resetTimer,
    progress,
  } = usePomodoro();

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 text-white mb-8 shadow-xl backdrop-blur-lg border border-indigo-800/30">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {isBreak ? <Coffee className="animate-bounce" /> : <Play />}
          {isBreak ? 'Break Time' : 'Focus Session'}
        </h2>
      </div>

      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-current text-indigo-800"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-current text-indigo-400"
            strokeWidth="8"
            fill="none"
            strokeDasharray={553}
            strokeDashoffset={553 * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 0.5s' }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
          {formatTime(time)}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          {isActive ? <Pause size={20} /> : <Play size={20} />}
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 rounded-lg bg-indigo-800 hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>
    </div>
  );
}