'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import PrimaryButton from '@/components/button/primary-button';
import SecondaryButton from '@/components/button/secondary-button';
import { TextInput } from '@/components/input';
import CheckboxInput from '@/components/input/checkbox-input';
import Link from '@/components/link';
import SelectInput from '@/components/select';
import TextArea from '@/components/textarea';

import createAccount from '@/services/create-account.service';
import grecaptchaService from '@/services/grecapcha.service';

import formEventParser from '@/helpers/form-event-parser.helper';

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
  const [errors, setErrors] = useState<Record<string, string | boolean>>({});
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const grecaptchaToken = await grecaptchaService();

    const data = formEventParser<CreateUserDTO>(e);
    let isOk = true;

    if (!data.email) {
      setErrors((errors) => ({ ...errors, email: 'E-mail é obrigatório' }));
      isOk = false;
    }

    if (!data.name) {
      setErrors((errors) => ({ ...errors, name: 'Nome é obrigatório' }));
      isOk = false;
    }

    if (!data.birthday) {
      setErrors((errors) => ({
        ...errors,
        birthday: 'Data de nascimento é obrigatória',
      }));
      isOk = false;
    }

    if (data.password !== (data['confirm-password'] as string)) {
      setErrors((errors) => ({
        ...errors,
        password: true,
        'confirm-password': 'As senhas não conferem',
      }));
      isOk = false;
    }

    if (!data['accept-terms']) {
      setErrors((errors) => ({
        ...errors,
        'accept-terms': 'Você deve aceitar os termos para prosseguir',
      }));
      isOk = false;
    }

    if (!isOk) return;

    const response = await createAccount({ ...data, role, grecaptchaToken });
    if (response) {
      router.push('/criar-conta/sucesso');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={'flex flex-col'}>
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
            error={errors['name']}
            label={'Nome completo'}
            name={'name'}
            required
          />
          <SelectInput
            label='Gênero'
            name='gender'
            options={[
              { label: 'Feminino', value: 'f' },
              { label: 'Masculino', value: 'm' },
              { label: 'Prefiro não dizer', value: 'nda' },
            ]}
            required
          ></SelectInput>
          <TextInput
            error={errors['email']}
            label={'E-mail'}
            name={'email'}
            required
          />
          <TextInput
            error={errors['birthday']}
            type={'date'}
            label={'Data de nascimento'}
            name={'birthday'}
          />
          <TextArea label={'Endereço'} name={'address'} className={'mb-8'} />
          <TextInput
            error={errors['password']}
            label={'Senha'}
            name={'password'}
            type={'password'}
            required
          />
          <TextInput
            error={errors['confirm-password']}
            label={'Confirmar senha'}
            name={'confirm-password'}
            type={'password'}
            required
          />
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
            error={errors['accept-terms']}
            title={'Você deve aceitar os termos de serviço para continuar.'}
            required
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
          <PrimaryButton tag={'button'} type={'submit'} className={'mb-2'}>
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
