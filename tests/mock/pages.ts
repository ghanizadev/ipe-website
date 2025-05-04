import { ObjectId } from 'mongodb';

export default [
  {
    _id: new ObjectId('6726c17e2005667766288f01'),
    title: 'Como ajudar?',
    slug: 'como-ajudar',
    shownOnNavbar: true,
    shownOnDrawer: true,
    shownOnFooter: false,
    createdAt: new Date('2025-01-01T00:00:00.000Z'),
    updatedAt: new Date('2025-01-01T00:00:00.000Z'),
    category: '6726c1a02005667766288f0c',
    html: '<h1>Somos gratos por sua ajuda</h1>',
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
                text: 'Somos gratos por sua ajuda',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: 'center',
            indent: 0,
            type: 'heading',
            version: 1,
            tag: 'h1',
          },
        ],
      },
    },
  },
];
