'use server';

import payloadConfig from '@payload-config';
import { headers as nextHeaders } from 'next/headers';
import { getPayload } from 'payload';
import { z } from 'zod';

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

export default async function updateUserProfileAction(
  initialState: {
    success: boolean;
    error?: Record<string, string[] | undefined>;
  },
  formData: FormData
) {
  const headers = await nextHeaders();
  const payload = await getPayload({ config: payloadConfig });

  const auth = await payload.auth({ headers });

  const jsonData = Object.fromEntries(formData.entries());
  const validateData = updateUserSchema.safeParse(jsonData);

  if (!validateData.success) {
    return {
      success: false,
      error: validateData.error.flatten().fieldErrors,
    };
  }

  await payload.update({
    collection: 'users',
    where: {
      id: {
        equals: auth.user?.id,
      },
    },
    data: validateData.data,
  });
}
