import Administrators from '@/collections/Administrators';
import Avatars from '@/collections/Avatars';
import Categories from '@/collections/Categories';
import Enrollments from '@/collections/Enrollments';
import Events from '@/collections/Events';
import Media from '@/collections/Media';
import Messages from '@/collections/Messages';
import Receipts from '@/collections/Receipts';
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
  collections: [
    Administrators,
    Avatars,
    Categories,
    Enrollments,
    Events,
    Media,
    Messages,
    Receipts,
    Users,
  ],
  editor: lexicalEditor({
    features: [...defaultEditorFeatures, HTMLConverterFeature({})],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
  telemetry: false,
  plugins: [cronJobPlugin()],
});
