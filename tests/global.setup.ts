import { MongoClient } from 'mongodb';

import categories from './mock/categories';
import events from './mock/events';
import media from './mock/media';
import pages from './mock/pages';
import redirects from './mock/redirects';

const collections = {
  events,
  media,
  redirects,
  pages,
  categories,
};

const globalSetup = async ({}) => {
  const client = new MongoClient(process.env.DATABASE_URI!);
  await client.connect();

  const database = client.db();

  for (const key in collections) {
    await database
      .collection(key)
      .insertMany(collections[key as keyof typeof collections]);

    console.log(
      `Inserted ${collections[key as keyof typeof collections].length} documents into ${key}`
    );
  }
};

export default globalSetup;
