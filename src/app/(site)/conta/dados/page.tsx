'use server';

import { redirect } from 'next/navigation';

import { getUserAuth } from '@/actions/get-user-auth.action';

import UpdateForm from '@/app/(site)/conta/dados/_components/update-form';

import removeAccountAction from './_actions/remove-account.action';
import updateUserProfileAction from './_actions/update-user-profile.action';
import RemoveAccountButton from './_components/remove-acount-button';

export default async function AccountDataPage() {
  const { user } = await getUserAuth();

  if (!user) {
    return redirect('/');
  }

  return (
    <div>
      <UpdateForm updateAction={updateUserProfileAction} />
      <h3 className={'my-4 text-lg leading-none text-[--primary]'}>Outros</h3>
      <RemoveAccountButton
        userId={user?.id}
        removeAccountAction={removeAccountAction}
      />
    </div>
  );
}
