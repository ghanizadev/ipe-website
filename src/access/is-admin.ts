import { Access, User } from 'payload';

export default function isAdmin(this: Access, props: Record<string, User>) {
  return props.data?.role === 'admin';
}
