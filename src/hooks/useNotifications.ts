import { useCallback } from 'react';

const NOTIFICATION_SOUND = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

export function useNotifications() {
  const requestPermission = useCallback(async () => {
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
  }, []);

  const notify = useCallback(({ title, body }: { title: string; body: string }) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
      NOTIFICATION_SOUND.play().catch(console.error);
    }
  }, []);

  return { requestPermission, notify };
}