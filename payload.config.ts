import Administrators from '@/collections/Administrators';
import Avatars from '@/collections/Avatars';
import Categories from '@/collections/Categories';
import Users from '@/collections/Users';
import cronJobPlugin from '@/plugins/cron-job.plugin';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import {
  HTMLConverterFeature,
  defaultEditorFeatures,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

export default buildConfig({
  admin: {
    user: Administrators.slug,
  },
  collections: [Users, Administrators, Avatars, Categories],
  editor: lexicalEditor({
    features: [...defaultEditorFeatures, HTMLConverterFeature({})],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  typescript: {
    outputFile: 'payload-types.ts',
  },
  telemetry: false,
  plugins: [cronJobPlugin()],
});
