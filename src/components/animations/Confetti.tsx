import React from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '../../hooks/useWindowSize';

interface ConfettiProps {
  duration?: number;
}

export function Confetti({ duration = 3000 }: ConfettiProps) {
  const [isActive, setIsActive] = React.useState(true);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    const timer = setTimeout(() => setIsActive(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isActive) return null;

  return (
    <ReactConfetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.3}
    />
  );
}