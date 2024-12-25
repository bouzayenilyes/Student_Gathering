import { useState, useEffect, useCallback } from 'react';

const POMODORO_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export function usePomodoro() {
  const [time, setTime] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const resetTimer = useCallback(() => {
    setTime(isBreak ? BREAK_TIME : POMODORO_TIME);
    setIsActive(false);
  }, [isBreak]);

  const toggleTimer = () => setIsActive(!isActive);

  useEffect(() => {
    let interval: number;

    if (isActive && time > 0) {
      interval = window.setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsBreak(!isBreak);
      setTime(isBreak ? POMODORO_TIME : BREAK_TIME);
      setIsActive(false);
      
      // Notify user
      if (Notification.permission === 'granted') {
        new Notification(isBreak ? 'Time to focus!' : 'Time for a break!');
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  const progress = time / (isBreak ? BREAK_TIME : POMODORO_TIME);

  return {
    time,
    isActive,
    isBreak,
    toggleTimer,
    resetTimer,
    progress,
  };
}