const key = process.env.INDEXNOW_KEY || '';

export async function GET() {
  return new Response(key, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
