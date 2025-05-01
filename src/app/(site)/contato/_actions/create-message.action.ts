'use server';

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';
import { z } from 'zod';

import validateRecaptcha from '@/actions/validate-recaptcha.action';

const messageSchema = z.object({
  email: z
    .string({
      required_error: 'Por favor, informe seu e-mail.',
    })
    .email(),
  message: z
    .string({ required_error: 'Por favor, informe sua mensagem' })
    .min(10),
  name: z.string().min(3).optional(),
  phone: z.string().optional(),
});

export default async function createMessageAction(
  initialState: {
    success: boolean;
    done: boolean;
    error?: Record<string, string[] | undefined>;
  },
  formData: FormData
): Promise<{
  success: boolean;
  done: boolean;
  error?: Record<string, string[] | undefined>;
}> {
  const recaptcha = formData.get('recaptcha')?.toString();

  if (!recaptcha) {
    return {
      success: false,
      done: true,
    };
  }

  const validRecaptcha = await validateRecaptcha(recaptcha);

  if (!validRecaptcha) {
    return {
      success: false,
      done: true,
    };
  }

  const jsonData = Object.fromEntries(formData.entries());
  const validateData = messageSchema.safeParse(jsonData);

  if (!validateData.success) {
    return {
      success: false,
      done: true,
      error: validateData.error.flatten().fieldErrors,
    };
  }

  const payload = await getPayload({ config: payloadConfig });

  const message = await payload.create({
    collection: 'messages',
    data: {
      message: validateData.data.message,
      email: validateData.data.email,
      name: validateData.data.name,
      phone: validateData.data.phone,
    },
  });

  if (!message) {
    return {
      success: false,
      done: true,
    };
  }

  return {
    success: true,
    done: true,
  };
}
