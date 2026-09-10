'use client';

import { useEffect } from 'react';

const EDIT_QUERY = 'cms-edit';
const editableSelector = 'h1,h2,h3,h4,h5,h6,p,span,a,button,img,li,label,strong,em,small,figcaption,section,div';

function cssEscape(value) {
  if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(value);
  return String(value).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
}

function stableSelector(element) {
  if (!(element instanceof Element)) return '';
  if (element.id) return `#${cssEscape(element.id)}`;
  if (element.dataset.cmsKey) return `[data-cms-key="${cssEscape(element.dataset.cmsKey)}"]`;
  const parts = [];
  let node = element;
  while (node && node !== document.body && parts.length < 7) {
    let part = node.tagName.toLowerCase();
    const usefulClass = [...node.classList].find((name) => !name.includes(':') && !name.includes('[') && name.length < 50);
    if (usefulClass) part += `.${cssEscape(usefulClass)}`;
    const parent = node.parentElement;
    if (parent) {
      const peers = [...parent.children].filter((child) => child.tagName === node.tagName);
      if (peers.length > 1) part += `:nth-of-type(${peers.indexOf(node) + 1})`;
    }
    parts.unshift(part);
    try { if (document.querySelectorAll(parts.join(' > ')).length === 1) break; } catch {}
    node = parent;
  }
  return parts.join(' > ');
}

function applyValue(element, property, value) {
  if (!(element instanceof Element)) return;
  const safeValue = value ?? '';
  switch (property) {
    case 'text': element.textContent = safeValue; break;
    case 'html': element.innerHTML = safeValue; break;
    case 'href': if (safeValue) element.setAttribute('href', safeValue); else element.removeAttribute('href'); break;
    case 'src':
      if (safeValue) { element.setAttribute('src', safeValue); element.removeAttribute('srcset'); element.removeAttribute('sizes'); }
      else element.removeAttribute('src');
      break;
    case 'alt':
    case 'title':
      if (safeValue) element.setAttribute(property, safeValue); else element.removeAttribute(property);
      break;
    case 'class': element.setAttribute('class', safeValue); break;
    case 'style': element.setAttribute('style', safeValue); break;
    case 'hidden': element.toggleAttribute('hidden', ['true', '1', 'yes', 'hidden'].includes(String(safeValue).toLowerCase())); break;
    default: element.textContent = safeValue;
  }
}

function applySnapshot(snapshot) {
  const overrides = Array.isArray(snapshot?.overrides) ? snapshot.overrides : [];
  overrides.forEach((entry) => {
    if (!entry?.selector || entry.value == null) return;
    try { document.querySelectorAll(entry.selector).forEach((element) => applyValue(element, entry.property || 'text', entry.value)); } catch {}
  });

  const settings = snapshot?.settings || {};
  Object.entries(settings).forEach(([key, settingValue]) => {
    try { document.querySelectorAll(`[data-cms-setting="${key}"]`).forEach((element) => applyValue(element, element.getAttribute('data-cms-property') || 'text', settingValue)); } catch {}
  });

  const meta = snapshot?.meta || {};
  if (meta.title) document.title = meta.title;
  if (meta.description) {
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute('name', 'description'); document.head.appendChild(tag); }
    tag.setAttribute('content', meta.description);
  }
  if (meta.robots) {
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots); }
    robots.setAttribute('content', meta.robots);
  }
  const social = [['og:title', meta.ogTitle || meta.title], ['og:description', meta.ogDescription || meta.description], ['og:image', meta.ogImage]];
  social.forEach(([property, content]) => {
    if (!content) return;
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag); }
    tag.setAttribute('content', content);
  });
}

function elementPayload(element) {
  return {
    tag: element.tagName.toLowerCase(), selector: stableSelector(element), text: element.textContent || '', html: element.innerHTML || '',
    href: element.getAttribute('href') || '', src: element.getAttribute('src') || '', alt: element.getAttribute('alt') || '',
    title: element.getAttribute('title') || '', class: element.getAttribute('class') || '', style: element.getAttribute('style') || '',
    hidden: element.hasAttribute('hidden') ? 'true' : 'false', global: Boolean(element.closest('header,footer')),
  };
}

export default function CmsRuntime() {
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) return undefined;
    let cancelled = false;
    const currentRoute = window.location.pathname || '/';
    const load = async () => {
      try {
        const response = await fetch(`/api/cms/public?route=${encodeURIComponent(currentRoute)}`, { cache: 'no-store' });
        if (!response.ok) return;
        const snapshot = await response.json();
        if (!cancelled) applySnapshot(snapshot);
      } catch {}
    };
    load();

    const params = new URLSearchParams(window.location.search);
    const editMode = params.get(EDIT_QUERY) === '1' && window.parent !== window;
    if (!editMode) return () => { cancelled = true; };

    document.documentElement.dataset.cmsEditMode = 'true';
    const style = document.createElement('style');
    style.id = 'mendy-cms-editor-style';
    style.textContent = `[data-cms-edit-mode="true"] body *{cursor:crosshair!important}[data-cms-edit-mode="true"] [data-cms-hover="true"]{outline:2px dashed #F26722!important;outline-offset:3px!important}[data-cms-edit-mode="true"] [data-cms-selected="true"]{outline:3px solid #F26722!important;outline-offset:3px!important}`;
    document.head.appendChild(style);
    let hovered = null;
    let selected = null;
    const findEditable = (target) => target instanceof Element ? target.closest(editableSelector) : null;
    const onMove = (event) => {
      const next = findEditable(event.target);
      if (!next || next === document.body || next === document.documentElement) return;
      if (hovered && hovered !== selected) hovered.removeAttribute('data-cms-hover');
      hovered = next;
      if (hovered !== selected) hovered.setAttribute('data-cms-hover', 'true');
    };
    const onLeave = () => { if (hovered && hovered !== selected) hovered.removeAttribute('data-cms-hover'); hovered = null; };
    const onClick = (event) => {
      const next = findEditable(event.target);
      if (!next || next === document.body || next === document.documentElement) return;
      event.preventDefault(); event.stopPropagation();
      if (selected) selected.removeAttribute('data-cms-selected');
      if (hovered) hovered.removeAttribute('data-cms-hover');
      selected = next; selected.setAttribute('data-cms-selected', 'true');
      window.parent.postMessage({ type: 'mendy-cms-selected', route: currentRoute, element: elementPayload(selected) }, window.location.origin);
    };
    const onMessage = (event) => {
      if (event.origin !== window.location.origin || !event.data) return;
      if (event.data.type === 'mendy-cms-preview' && event.data.selector) {
        try { document.querySelectorAll(event.data.selector).forEach((element) => applyValue(element, event.data.property, event.data.value)); } catch {}
      }
      if (event.data.type === 'mendy-cms-refresh') load();
    };
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('mouseleave', onLeave, true);
    document.addEventListener('click', onClick, true);
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ type: 'mendy-cms-ready', route: currentRoute }, window.location.origin);
    return () => {
      cancelled = true;
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('mouseleave', onLeave, true);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('message', onMessage);
      style.remove();
      delete document.documentElement.dataset.cmsEditMode;
    };
  }, []);
  return null;
}
