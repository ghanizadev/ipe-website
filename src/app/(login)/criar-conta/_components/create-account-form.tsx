'use client';

import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import PrimaryButton from '@/components/button/primary-button';
import SecondaryButton from '@/components/button/secondary-button';
import { CheckboxInput, TextAreaInput, TextInput } from '@/components/input';
import Link from '@/components/link';
import { RecaptchaInput } from '@/components/recaptcha-input';
import SelectInput from '@/components/select';

import createAccountAction from '@/app/(login)/criar-conta/_actions/create-account.action';

type SelectButtonProps = {
  label: string;
  onClick: () => void;
  selected: boolean;
};

function SelectButton({ label, onClick, selected }: SelectButtonProps) {
  let classStr =
    'p-8 border-2 border-[--secondary] w-full rounded-2xl hover:border-[--primary] hover:text-[--primary]';

  if (selected) {
    classStr = twMerge(
      classStr,
      'bg-[--secondary] text-white hover:border-white hover:text-white'
    );
  } else {
    classStr = twMerge(classStr, 'text-[--secondary] scale-90');
  }

  return (
    <button type={'button'} onClick={onClick} className={classStr}>
      {label}
    </button>
  );
}

export default function CreateAccountForm() {
  const [step, setStep] = useState('first');
  const [role, setRole] = useState('');
  const [formState, formAction, pending] = useActionState(createAccountAction, {
    success: false,
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleTypeSelect = (role: string) => () => {
    setRole(role);
  };

  const handleSelect = () => {
    setStep('second');
  };

  const handleGoBack = () => {
    setStep('first');
  };

  useEffect(() => {
    if (formState.success) {
      router.push('/criar-conta/sucesso');
    } else {
      setLoading(false);
    }
  }, [formState, router]);

  useEffect(() => {
    if (pending) setLoading(true);
  }, [pending]);

  return (
    <form action={formAction} className={'flex flex-col'}>
      {step === 'first' && (
        <>
          <p>Eu sou um:</p>
          <div className={'my-8 grid grid-cols-2 gap-2'}>
            <SelectButton
              selected={role === 'parathlete'}
              onClick={handleTypeSelect('parathlete')}
              label={'Paratleta'}
            />
            <SelectButton
              selected={role === 'guide'}
              onClick={handleTypeSelect('guide')}
              label={'Guia'}
            />
          </div>
          <SecondaryButton
            tag={'button'}
            type={'button'}
            onClick={handleSelect}
            disabled={!role}
          >
            Selecionar
          </SecondaryButton>
        </>
      )}
      {step === 'second' && (
        <>
          <p className={'mb-4'}>
            Você selecionou:{' '}
            <span className={'text-[--primary-darker]'}>
              {role === 'guide' ? 'Guia' : 'Paratleta'}
            </span>
          </p>
          <TextInput
            error={formState.error?.name?.[0]}
            label={'Nome completo'}
            name={'name'}
            required
            disabled={loading}
          />
          <TextInput
            error={formState.error?.email?.[0]}
            label={'E-mail'}
            name={'email'}
            required
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
            required
            disabled={loading}
          />
          {role === 'parathlete' ? (
            <SelectInput
              options={[
                { label: 'Deficiente Físico', value: 'physical' },
                { label: 'Deficiente Intelectual', value: 'intelectual' },
                { label: 'Deficiente Visual', value: 'visual' },
              ]}
              label={'Classificação PCD'}
              name={'pwdClassification'}
              required
              disabled={loading}
            />
          ) : (
            <></>
          )}
          <TextInput
            error={formState.error?.birthday?.[0]}
            type={'date'}
            label={'Data de nascimento'}
            name={'birthday'}
            disabled={loading}
          />
          <TextAreaInput
            label={'Endereço'}
            name={'address'}
            className={'mb-8'}
            disabled={loading}
          />
          <TextInput
            error={formState.error?.password?.[0]}
            label={'Senha'}
            name={'password'}
            type={'password'}
            required
            disabled={loading}
          />
          <TextInput
            error={formState.error?.['confirm-password']?.[0]}
            label={'Confirmar senha'}
            name={'confirm-password'}
            type={'password'}
            required
            disabled={loading}
          />
          <RecaptchaInput />
          <input type={'hidden'} name={'role'} value={role} />
          <small className={'text-gray-400 my-4'}>
            Este site é protegido pelo reCAPTCHA e as{' '}
            <Link href='https://policies.google.com/privacy'>
              Políticas de Privacidade
            </Link>{' '}
            e os{' '}
            <Link href='https://policies.google.com/terms'>
              Termos de Serviço
            </Link>{' '}
            da Google são aplicáveis.
          </small>
          <CheckboxInput
            name={'accept-terms'}
            error={formState.error?.['accept-terms']?.[0]}
            title={'Você deve aceitar os termos de serviço para continuar.'}
            required
            disabled={loading}
          >
            Eu concordo com os{' '}
            <Link href={'/termos-de-uso'} target={'_blank'}>
              Termos e Condições
            </Link>{' '}
            e as{' '}
            <Link href={'/politicas-de-privacidade'} target={'_blank'}>
              Políticas de Privacidade
            </Link>
            .
          </CheckboxInput>
          <PrimaryButton
            tag={'button'}
            type={'submit'}
            className={'mb-2'}
            loading={loading}
          >
            Criar conta
          </PrimaryButton>
          <SecondaryButton
            tag={'button'}
            type={'button'}
            onClick={handleGoBack}
          >
            Voltar
          </SecondaryButton>
        </>
      )}
    </form>
  );
}
