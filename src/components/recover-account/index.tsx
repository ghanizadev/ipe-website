'use server';

import RecoverAccountAlert from '@/components/recover-account/recover-account-alert';

import getUserAction from '@/actions/get-user.action';
import recoverAccount from '@/actions/recover-account.action';

export default async function RecoverAccount() {
  return (
    <>
      <RecoverAccountAlert
        getUserAction={getUserAction}
        recoverAccountAction={recoverAccount}
      />
    </>
  );
}
