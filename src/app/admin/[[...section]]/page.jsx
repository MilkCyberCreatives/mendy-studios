import { redirect } from 'next/navigation';
import AdminApp from '../../../components/admin/AdminApp';
import { getCmsSession } from '../../../lib/cms.server';

export default async function AdminPage({ params }) {
  const session = await getCmsSession();
  if (!session) redirect('/admin/login');
  const resolved = await params;
  const section = resolved?.section?.[0] || 'dashboard';
  return <AdminApp user={session} initialSection={section} />;
}
