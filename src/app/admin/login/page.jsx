import { redirect } from 'next/navigation';
import LoginForm from '../../../components/admin/LoginForm';
import { getCmsSession } from '../../../lib/cms.server';

export default async function AdminLoginPage() {
  const session = await getCmsSession();
  if (session) redirect('/admin');
  return <LoginForm />;
}
