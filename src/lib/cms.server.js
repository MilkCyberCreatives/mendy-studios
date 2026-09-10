import 'server-only';
import { cookies } from 'next/headers';

const CMS_SESSION_COOKIE = 'mendy_cms_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const DEFAULT_DATA_API_URL = 'https://ep-young-waterfall-b2lfjemj.apirest.c-6.eu-central-1.aws.neon.tech/mendy_cms/rest/v1';

function normaliseRpcResult(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return data;
  const keys = [
    'cms_admin_read', 'cms_admin_write', 'cms_public_snapshot', 'cms_public_media',
    'cms_create_lead', 'cms_login', 'cms_bootstrap', 'cms_session_user', 'cms_logout',
    'cms_user_write', 'cms_public_redirect',
  ];
  for (const key of keys) if (key in data) return data[key];
  return data;
}

async function rpc(name, payload) {
  const baseUrl = (process.env.CMS_DATA_API_URL || DEFAULT_DATA_API_URL).replace(/\/$/, '');
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  const vercelOidcToken = process.env.VERCEL_OIDC_TOKEN;
  if (vercelOidcToken) headers.Authorization = `Bearer ${vercelOidcToken}`;

  const response = await fetch(`${baseUrl}/rpc/${name}`, {
    method: 'POST',
    headers,
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

export async function cmsLogin(email, password) {
  return rpc('cms_login', { p_email: email, p_password: password });
}

export async function cmsBootstrap(token, email, password) {
  return rpc('cms_bootstrap', { p_token: token, p_email: email, p_password: password });
}

export async function getCmsSessionToken() {
  const store = await cookies();
  return store.get(CMS_SESSION_COOKIE)?.value || null;
}

async function sessionSecret() {
  const token = await getCmsSessionToken();
  if (!token) throw new Error('CMS session is required.');
  return `session:${token}`;
}

export async function cmsAdminRead(entity, key = null) {
  return rpc('cms_admin_read', { p_secret: await sessionSecret(), p_entity: entity, p_key: key });
}

export async function cmsAdminWrite(action, entity, payload = {}, actor = null) {
  return rpc('cms_admin_write', { p_secret: await sessionSecret(), p_action: action, p_entity: entity, p_payload: payload, p_actor: actor });
}

export async function cmsUserWrite(action, payload = {}, actor = null) {
  return rpc('cms_user_write', { p_secret: await sessionSecret(), p_action: action, p_payload: payload, p_actor: actor });
}

export async function setCmsSession(token) {
  const store = await cookies();
  store.set(CMS_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearCmsSession() {
  const store = await cookies();
  store.set(CMS_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export async function getCmsSession() {
  try {
    const token = await getCmsSessionToken();
    if (!token) return null;
    return await rpc('cms_session_user', { p_token: token });
  } catch {
    return null;
  }
}

export async function destroyCmsSession() {
  const token = await getCmsSessionToken();
  if (token) await rpc('cms_logout', { p_token: token }).catch(() => null);
  await clearCmsSession();
}

export function canManageUsers(session) {
  return session?.role === 'super_admin' || session?.role === 'admin';
}

export function canPublish(session) {
  return ['super_admin', 'admin', 'editor', 'marketing'].includes(session?.role);
}

export function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
