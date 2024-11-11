import PrimaryButton from '@/components/button/primary-button';

type ObjectiveItemProps = {
  title: string;
  message: string;
  cta?: {
    label: string;
    path: string;
  };
};

function ObjectiveItem(props: ObjectiveItemProps) {
  return (
    <div
      className={
        'mx-4 flex h-[100%] w-48 flex-col items-center justify-center rounded-xl border-2 border-[--primary] px-4 py-4'
      }
    >
      <span className={'mb-4 text-xl text-[--primary]'}>{props.title}</span>
      <p className={'text-md mb-4 text-gray-600'}>{props.message}</p>
      {props.cta && (
        <PrimaryButton tag={'button'}>{props.cta.label}</PrimaryButton>
      )}
    </div>
  );
}

export default async function Objectives() {
  return (
    <div className={'flex flex-row justify-center'}>
      <ObjectiveItem
        title={'Nossos objectivos'}
        message={'O começo voluntário de um grande e possível sonho'}
        cta={{ label: 'Conheça-nos', path: '/institucional/sobre-nos' }}
      />
      <ObjectiveItem
        title={'Nossos paratletas'}
        message={
          'Conheça nossos paratletas e saiba como é possível ajudá-los neste projeto.'
        }
        cta={{ label: 'Paratletas', path: '/paratletas' }}
      />
    </div>
  );
}
