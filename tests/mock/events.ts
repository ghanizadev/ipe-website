import { ObjectId } from 'mongodb';

export default [
  {
    _id: new ObjectId('67d75b2c08e7492cd70f8ce9'),
    slug: 'maratona-ipe',
    title: 'MARATONA IPE',
    date: new Date(new Date().getFullYear() + 1 + '-01-02T00:00:00.000Z'),
    dueDate: new Date('2025-01-01T00:00:00.000Z'),
    standFirst: 'Venha participar da maratona IPE.',
    location: 'Florianópolis, Santa Catarina.',
    fee: 15,
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Venha participar da maratona IPE que acontecerá em Florianópolis, Santa Catarina, no dia 2 de janeiro de 2025.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    instructions: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Chegar com 1 hora de antecedência no ponto de encontro que será a Tenda do IPE. ',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Vestir a camiseta do IPE, calça ou bermuda confortável, e tênis confortável.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    image: '67ffe5fc719006b1d02c9c92',
    createdAt: new Date('2025-01-01T00:00:00.000Z'),
    updatedAt: new Date('2025-01-01T00:00:00.000Z'),
    html: '<p>Venha participar da maratona IPE que acontecerá em Florianópolis, Santa Catarina, no dia 2 de janeiro de 2025.</p>',
    instructionsHtml:
      '<p>Chegar com 1 hora de antecedência no ponto de encontro que será a Tenda do IPE. </p><p>Vestir a camiseta do IPE, calça ou bermuda confortável, e tênis confortável.</p>',
    modality: ['3km (caminhada)'],
  },
];
