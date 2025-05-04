'use server';

import RecoverAccountAlert from '@/components/recover-account/recover-account-alert';

import recoverAccount from '@/actions/recover-account.action';

export default async function RecoverAccount() {
  return <RecoverAccountAlert recoverAccountAction={recoverAccount} />;
}
