'use client';

import { useUser } from '@/context/user.context';
import React, { useActionState, useEffect } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextAreaInput, TextInput } from '@/components/input';
import SelectInput from '@/components/select';
import notificationEvent from '@/components/toast/toast-event';

import { tshirtSizes, tshirtTypes } from '@/constants/account.constants';

export default function UpdateForm(props: {
  updateAction: (
    initialState: {
      success: boolean;
      error?: Record<string, string[] | undefined>;
    },
    formData: FormData
  ) => Promise<{
    success: boolean;
    error?: Record<string, string[] | undefined>;
  }>;
}) {
  const [formState, formAction, pending] = useActionState(props.updateAction, {
    success: false,
  });
  const [user, refresh] = useUser();

  useEffect(() => {
    if (formState.success) {
      refresh();
      notificationEvent({
        type: 'success',
        title: 'Sucesso',
        message: 'Dados atualizados com sucesso.',
      });
    } else {
      notificationEvent({
        type: 'error',
        title: 'Erro',
        message: 'Falha ao atualizar os dados. Tente novamente mais tarde.',
      });
    }
  }, [formState, refresh]);

  return (
    <form action={formAction} className={'grid gap-1'}>
      <h3 className={'my-4 text-lg leading-none text-[--primary]'}>Geral</h3>
      <TextInput
        label={'Nome'}
        name={'name'}
        defaultValue={user?.name}
        required
        error={formState.error?.name?.[0]}
        disabled={pending}
      />
      <TextInput
        label={'E-mail'}
        name={'email'}
        defaultValue={user?.email}
        required
        error={formState.error?.email?.[0]}
        disabled={pending}
      />
      <SelectInput
        options={[
          { label: 'Feminino', value: 'f' },
          { label: 'Masculino', value: 'm' },
          { label: 'Prefiro não dizer', value: 'other' },
        ]}
        label={'Gênero'}
        name={'gender'}
        defaultValue={user?.gender}
        required
        disabled={pending}
      />
      {user?.role === 'parathlete' ? (
        <SelectInput
          options={[
            { label: 'Deficiente Físico', value: 'physical' },
            { label: 'Deficiente Intelectual', value: 'intelectual' },
            { label: 'Deficiente Visual', value: 'visual' },
          ]}
          label={'Classificação PCD'}
          name={'pwdClassification'}
          defaultValue={user?.pwdClassification}
          required
          disabled={pending}
        />
      ) : (
        <></>
      )}
      <TextInput
        label={'Data de Nascimento'}
        name={'birthday'}
        type={'date'}
        defaultValue={user?.birthday}
        required
        error={formState.error?.birthday?.[0]}
        disabled={pending}
      />
      <TextAreaInput
        label={'Endereço'}
        name={'address'}
        defaultValue={user?.address}
        required
        error={formState.error?.address?.[0]}
        disabled={pending}
      />
      <h3 className={'my-4 text-lg leading-none text-[--primary]'}>
        Documentação
      </h3>
      <TextInput
        label={'CPF (Certidão de Pessoa Física)'}
        name={'cpf'}
        defaultValue={user?.cpf}
        required
        error={formState.error?.cpf?.[0]}
        disabled={pending}
      />
      <TextInput
        label={'RG (Registro Geral)'}
        name={'rg'}
        defaultValue={user?.rg}
        required
        error={formState.error?.rg?.[0]}
        disabled={pending}
      />
      <h3 className={'my-4 text-lg leading-none text-[--primary]'}>Camiseta</h3>
      <SelectInput
        name={'tshirt.type'}
        label={'Tipo da Camiseta'}
        options={tshirtTypes}
        defaultValue={user?.tshirt?.type}
        required
        error={formState.error?.['tshirt.type']?.[0]}
        disabled={pending}
      />
      <SelectInput
        name={'tshirt.size'}
        label={'Tamanho da Camiseta'}
        options={tshirtSizes}
        defaultValue={user?.tshirt?.size}
        required
        error={formState.error?.['tshirt.size']?.[0]}
        disabled={pending}
      />
      <input type={'hidden'} name={'id'} value={user?.id} />
      <br />
      <small>
        <span className={'text-red-600'}>*</span> Campos obrigatórios.
      </small>
      <PrimaryButton
        tag={'button'}
        className={'w-min justify-self-end'}
        loading={pending}
      >
        Salvar
      </PrimaryButton>
    </form>
  );
}
