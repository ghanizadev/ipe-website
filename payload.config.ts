import Administrators from '@/collections/Administrators';
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
  editor: lexicalEditor({
    features: [...defaultEditorFeatures, HTMLConverterFeature({})],
  }),
  collections: [Users, Administrators],
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
