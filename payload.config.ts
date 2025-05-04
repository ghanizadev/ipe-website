import Administrators from '@/collections/Administrators';
import Avatars from '@/collections/Avatars';
import Categories from '@/collections/Categories';
import Enrollments from '@/collections/Enrollments';
import Events from '@/collections/Events';
import Logos from '@/collections/Logos';
import Media from '@/collections/Media';
import Messages from '@/collections/Messages';
import Pages from '@/collections/Pages';
import Parathletes from '@/collections/Parathletes';
import Partners from '@/collections/Partners';
import Photos from '@/collections/Photos';
import Products from '@/collections/Products';
import Receipts from '@/collections/Receipts';
import Redirects from '@/collections/Redirects';
import Services from '@/collections/Services';
import Testimonials from '@/collections/Testimonials';
import Users from '@/collections/Users';
import cronJobPlugin from '@/plugins/cron-job.plugin';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import {
  HTMLConverterFeature,
  defaultEditorFeatures,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import nodemailer from 'nodemailer';
import { Config, buildConfig } from 'payload';
import sharp from 'sharp';

const config: Config = {
  admin: {
    user: Administrators.slug,
  },
  collections: [
    Administrators,
    Avatars,
    Categories,
    Enrollments,
    Events,
    Logos,
    Media,
    Messages,
    Pages,
    Parathletes,
    Partners,
    Photos,
    Products,
    Receipts,
    Redirects,
    Services,
    Testimonials,
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
  plugins: [
    s3Storage({
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.AWS_REGION,
      },
      bucket: process.env.S3_BUCKET!,
      collections: {
        photos: {
          disableLocalStorage: true,
        },
        media: {
          disableLocalStorage: true,
        },
        avatars: {
          disableLocalStorage: true,
        },
        logos: {
          disableLocalStorage: true,
        },
        receipts: {
          disableLocalStorage: true,
        },
      },
    }),
    cronJobPlugin(),
  ],
};

if (process.env.EMAIL_ENABLED) {
  config.email = nodemailerAdapter({
    defaultFromAddress: 'no-reply@ghanizadev.com',
    defaultFromName: 'IPE - Inclusão Pelo Esporte',
    skipVerify: false,
    transport: nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      port: Number(process.env.SMTP_HOST),
      secure: Number(process.env.SMTP_PORT) === 465,
      requireTLS: true,
    }),
  });
}

export default buildConfig(config);
