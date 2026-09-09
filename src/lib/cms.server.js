import 'server-only';
import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const CMS_SESSION_COOKIE = 'mendy_cms_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function normaliseRpcResult(data) {
  if (data && typeof data === 'object' && 'cms_admin_read' in data) return data.cms_admin_read;
  if (data && typeof data === 'object' && 'cms_admin_write' in data) return data.cms_admin_write;
  if (data && typeof data === 'object' && 'cms_public_snapshot' in data) return data.cms_public_snapshot;
  if (data && typeof data === 'object' && 'cms_public_media' in data) return data.cms_public_media;
  if (data && typeof data === 'object' && 'cms_create_lead' in data) return data.cms_create_lead;
  return data;
}

async function rpc(name, payload) {
  const baseUrl = requireEnv('CMS_DATA_API_URL').replace(/\/$/, '');
  const response = await fetch(`${baseUrl}/rpc/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`CMS RPC ${name} failed (${response.status})${detail ? `: ${detail.slice(0, 280)}` : ''}`);
  }
  return normaliseRpcResult(await response.json());
}

export async function cmsPublicSnapshot(route = '/') {
  return rpc('cms_public_snapshot', { p_route: route || '/' });
}

export async function cmsPublicMedia(id) {
  return rpc('cms_public_media', { p_id: id });
}

export async function cmsCreateLead(payload) {
  return rpc('cms_create_lead', { p_payload: payload });
}

export async function cmsAdminRead(entity, key = null) {
  return rpc('cms_admin_read', { p_secret: requireEnv('CMS_API_SECRET'), p_entity: entity, p_key: key });
}

export async function cmsAdminWrite(action, entity, payload = {}, actor = null) {
  return rpc('cms_admin_write', { p_secret: requireEnv('CMS_API_SECRET'), p_action: action, p_entity: entity, p_payload: payload, p_actor: actor });
}

function toBase64Url(input) { return Buffer.from(input).toString('base64url'); }
function sign(value) { return crypto.createHmac('sha256', requireEnv('CMS_SESSION_SECRET')).update(value).digest('base64url'); }

export function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return `scrypt$16384$8$1$${salt.toString('base64url')}$${derived.toString('base64url')}`;
}

export function verifyPassword(password, encoded) {
  try {
    const [kind, n, r, p, saltValue, hashValue] = String(encoded || '').split('$');
    if (kind !== 'scrypt' || !saltValue || !hashValue) return false;
    const salt = Buffer.from(saltValue, 'base64url');
    const expected = Buffer.from(hashValue, 'base64url');
    const actual = crypto.scryptSync(password, salt, expected.length, { N: Number(n), r: Number(r), p: Number(p), maxmem: 64 * 1024 * 1024 });
    return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
  } catch { return false; }
}

export async function setCmsSession(user) {
  const now = Math.floor(Date.now() / 1000);
  const payload = { id: user.id, email: user.email, name: user.name || user.email, role: user.role, iat: now, exp: now + SESSION_TTL_SECONDS };
  const body = toBase64Url(JSON.stringify(payload));
  const token = `${body}.${sign(body)}`;
  const store = await cookies();
  store.set(CMS_SESSION_COOKIE, token, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: SESSION_TTL_SECONDS });
}

export async function clearCmsSession() {
  const store = await cookies();
  store.set(CMS_SESSION_COOKIE, '', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 });
}

export async function getCmsSession() {
  try {
    const store = await cookies();
    const token = store.get(CMS_SESSION_COOKIE)?.value;
    if (!token) return null;
    const [body, signature] = token.split('.');
    if (!body || !signature) return null;
    const expected = sign(body);
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!payload?.id || !payload?.email || !payload?.role || Number(payload.exp) <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

export function canManageUsers(session) { return session?.role === 'super_admin' || session?.role === 'admin'; }
export function canPublish(session) { return ['super_admin', 'admin', 'editor', 'marketing'].includes(session?.role); }

export function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try { return new URL(origin).origin === new URL(request.url).origin; } catch { return false; }
}
