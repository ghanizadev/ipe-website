export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type NotificationProps = {
  type: ToastType;
  message: string;
  title?: string;
};

export type ToastProps = NotificationProps & {
  onClose: () => void | Promise<void>;
};
