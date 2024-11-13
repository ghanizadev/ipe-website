import { nanoid } from 'nanoid';

import {
  AlertProps,
  ConfirmationReturnArgument,
  RemoveReturnArgument,
} from '@/components/alert/type';

export default async function callAlert(
  type: 'confirmation',
  props: AlertProps
): Promise<ConfirmationReturnArgument>;

export default async function callAlert(
  type: 'remove',
  props: AlertProps
): Promise<RemoveReturnArgument>;

export default async function callAlert<T>(
  type: string,
  props: AlertProps
): Promise<T> {
  const eventName = 'alert.' + type;
  const id = nanoid();
  const callbackName = `${eventName}.${id}`;

  const event = new CustomEvent(eventName, {
    detail: { ...props, callbackName },
  });

  const promise = new Promise<T>((resolve) => {
    function fn(event: Event) {
      event.preventDefault();
      const { detail } = event as CustomEvent;
      window.removeEventListener(callbackName, fn);
      resolve(detail);
    }

    window.addEventListener(callbackName, fn);
  });

  window.dispatchEvent(event);

  return await promise;
}
