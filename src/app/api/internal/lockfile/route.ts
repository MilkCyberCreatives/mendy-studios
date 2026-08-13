import lockfile from '../../../../../package-lock.json';

const lockfileText = `${JSON.stringify(lockfile, null, 2)}\n`;

export async function GET() {
  return new Response(lockfileText, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
