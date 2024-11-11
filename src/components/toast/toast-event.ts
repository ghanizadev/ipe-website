import { NotificationProps } from './types';

export default function notificationEvent(notification: NotificationProps) {
  const event = new CustomEvent('toast.show', { detail: notification });
  window.dispatchEvent(event);
}
