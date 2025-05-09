'use client';

import { useUser } from '@/context/user.context';
import { Event } from '@/payload-types';
import React, { useActionState, useEffect, useState } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextAreaInput, TextInput } from '@/components/input';
import { RecaptchaInput } from '@/components/recaptcha-input';
import SelectInput from '@/components/select';
import { H3 } from '@/components/typography';

import { tshirtSizes, tshirtTypes } from '@/constants/account.constants';

export default function UpdateAndSubmitForm(props: {
  updateAndEnrollAction: (
    initialState: {
      success: boolean;
      error?: Record<string, string[] | undefined>;
    },
    formData: FormData
  ) => Promise<{
    success: boolean;
    error?: Record<string, string[] | undefined>;
  }>;
  event: Event;
  redirectTo?: string | null;
}) {
  const [formState, formAction, pending] = useActionState(
    props.updateAndEnrollAction,
    {
      success: false,
    }
  );
  const [user] = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!formState.success) {
      setLoading(false);
    }
  }, [formState]);

  useEffect(() => {
    if (pending) setLoading(true);
  }, [pending]);

  return (
    <form action={formAction}>
      <TextInput
        className={'mb-2'}
        label={'Nome'}
        name={'name'}
        defaultValue={user?.name}
        required
        error={formState.error?.name?.[0]}
        disabled={loading}
      />
      <TextInput
        className={'mb-2'}
        label={'E-mail'}
        name={'email'}
        defaultValue={user?.email}
        required
        error={formState.error?.email?.[0]}
        disabled={loading}
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
        disabled={loading}
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
          disabled={loading}
        />
      ) : (
        <></>
      )}
      <TextAreaInput
        label={'Endereço'}
        name={'address'}
        defaultValue={user?.address}
        required
        error={formState.error?.address?.[0]}
        disabled={loading}
      />
      <H3>Documentação</H3>
      <TextInput
        className={'mb-2'}
        label={'Data de Nascimento'}
        name={'birthday'}
        type={'date'}
        defaultValue={user?.birthday}
        required
        error={formState.error?.birthday?.[0]}
        disabled={loading}
      />
      <TextInput
        className={'mb-2'}
        label={'CPF (Certidão de Pessoa Física)'}
        name={'cpf'}
        defaultValue={user?.cpf}
        required
        error={formState.error?.cpf?.[0]}
        disabled={loading}
      />
      <TextInput
        className={'mb-2'}
        label={'RG (Registro Geral)'}
        name={'rg'}
        defaultValue={user?.rg}
        required
        error={formState.error?.rg?.[0]}
        disabled={loading}
      />
      {props.event.modality?.length ? (
        <>
          <H3>Corrida</H3>
          <SelectInput
            options={props.event.modality.map(function (modality) {
              return {
                label: modality,
                value: modality,
              };
            })}
            label={'Modalidade'}
            name={'modality'}
            required
            error={formState.error?.modality?.[0]}
            disabled={loading}
          />
        </>
      ) : (
        <></>
      )}
      <H3>Camiseta</H3>
      <SelectInput
        className={'mb-2'}
        label={'Tipo da Camiseta'}
        name={'tshirt.type'}
        defaultValue={user?.tshirt?.type}
        options={tshirtTypes}
        required
        error={formState.error?.['tshirt.type']?.[0]}
        disabled={loading}
      />
      <SelectInput
        className={'mb-4'}
        label={'Tamanho da Camiseta'}
        name={'tshirt.size'}
        defaultValue={user?.tshirt?.size}
        options={tshirtSizes}
        required
        error={formState.error?.['tshirt.size']?.[0]}
        disabled={loading}
      />
      <RecaptchaInput />
      <input type={'hidden'} name={'userId'} value={user?.id} />
      <input type={'hidden'} name={'eventId'} value={props.event?.id} />
      <input
        type={'hidden'}
        name={'redirectTo'}
        value={props.redirectTo ?? '/'}
      />
      <small>
        <span className={'text-red-600'}>*</span> Campos obrigatórios.
      </small>
      <div className='mt-4 flex items-center justify-end rounded-b border-t border-gray-200 py-4 md:py-5'>
        <PrimaryButton tag={'button'} type={'submit'} loading={loading}>
          Salvar e Inscrever-se
        </PrimaryButton>
      </div>
    </form>
  );
}
