import { MongoClient } from 'mongodb';

const globalTeardown = async ({}) => {
  const client = new MongoClient(process.env.DATABASE_URI!);
  await client.connect();
  const database = client.db();
  await database.dropDatabase();
};

export default globalTeardown;
