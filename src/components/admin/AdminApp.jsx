'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FaArrowRotateLeft,
  FaArrowUpRightFromSquare,
  FaBars,
  FaChartLine,
  FaClockRotateLeft,
  FaFileImage,
  FaFloppyDisk,
  FaGlobe,
  FaImage,
  FaLink,
  FaMagnifyingGlass,
  FaPaperPlane,
  FaPenToSquare,
  FaRightFromBracket,
  FaSliders,
  FaUsers,
  FaXmark,
} from 'react-icons/fa6';

const pages = [
  ['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Areas', '/areas'], ['Motion', '/motion'],
  ['Gallery', '/gallery'], ['Stories', '/stories'], ['FAQs', '/faqs'], ['Contact', '/contact'],
];

const nav = [
  ['dashboard', 'Overview', FaChartLine],
  ['editor', 'Visual Editor', FaPenToSquare],
  ['content', 'Website Content', FaGlobe],
  ['media', 'Media Library', FaImage],
  ['seo', 'SEO & Visibility', FaMagnifyingGlass],
  ['settings', 'Site Settings', FaSliders],
  ['enquiries', 'Enquiries', FaPaperPlane],
  ['redirects', 'Redirects', FaLink],
  ['users', 'Users & Roles', FaUsers],
  ['activity', 'Activity & History', FaClockRotateLeft],
];

function apiUrl(entity, key) {
  const params = new URLSearchParams({ entity });
  if (key) params.set('key', key);
  return `/api/cms/admin?${params}`;
}

async function apiRead(entity, key) {
  const response = await fetch(apiUrl(entity, key), { cache: 'no-store' });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(result.error || 'Unable to load data.');
  return result.data;
}

async function apiWrite(action, entity, payload) {
  const response = await fetch('/api/cms/admin', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, entity, payload }),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(result.error || 'Unable to save change.');
  return result.data;
}

function useAdminData(entity, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    setLoading(true); setError('');
    try { setData(await apiRead(entity)); }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to load data.'); }
    finally { setLoading(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity, ...deps]);
  useEffect(() => { reload(); }, [reload]);
  return { data, error, loading, reload };
}

function Status({ message, error }) {
  if (!message && !error) return null;
  return <div className={`admin-alert ${error ? 'error' : 'success'}`}>{error || message}</div>;
}

function SectionHeader({ eyebrow, title, description, actions }) {
  return <div className="admin-section-heading"><div><p className="admin-kicker">{eyebrow}</p><h1>{title}</h1><p className="admin-muted">{description}</p></div>{actions ? <div className="admin-heading-actions">{actions}</div> : null}</div>;
}

function Loading() { return <div className="admin-panel admin-loading">Loading…</div>; }
function ErrorPanel({ children }) { return <div className="admin-alert error">{children}</div>; }

function Dashboard() {
  const { data, error, loading, reload } = useAdminData('dashboard');
  if (loading) return <Loading />;
  if (error) return <ErrorPanel>{error}</ErrorPanel>;
  const cards = [
    ['Editable items', data?.overrides || 0, 'content'], ['Unpublished drafts', data?.drafts || 0, 'content'],
    ['Media files', data?.media || 0, 'media'], ['New enquiries', data?.newLeads || 0, 'enquiries'],
    ['Active redirects', data?.redirects || 0, 'redirects'], ['Back-office users', data?.users || 0, 'users'],
  ];
  return <>
    <SectionHeader eyebrow="Back Office" title="Website overview" description="Everything the client needs to manage Mendy Studios without touching code." actions={<button className="admin-secondary-button" onClick={reload}>Refresh</button>} />
    <div className="admin-stat-grid">{cards.map(([label, value, target]) => <button key={label} className="admin-stat-card" onClick={() => window.location.assign(`/admin/${target}`)}><span>{label}</span><strong>{value}</strong><small>Open section →</small></button>)}</div>
    <div className="admin-grid-two">
      <div className="admin-panel"><h2>Fast actions</h2><div className="admin-action-list"><a href="/admin/editor"><FaPenToSquare /> Edit the live website visually</a><a href="/admin/media"><FaFileImage /> Upload or replace imagery</a><a href="/admin/seo"><FaMagnifyingGlass /> Update search appearance</a><a href="/admin/enquiries"><FaPaperPlane /> Review new enquiries</a></div></div>
      <div className="admin-panel"><h2>Recent activity</h2>{(data?.recent || []).length ? <div className="admin-activity-list">{data.recent.map((item) => <div key={item.id}><strong>{item.action}</strong><span>{item.detail || item.entity_type}</span><small>{new Date(item.created_at).toLocaleString('en-ZA')}</small></div>)}</div> : <p className="admin-muted">Activity will appear here as the client starts making changes.</p>}</div>
    </div>
  </>;
}

function propertyOptions(element) {
  const base = [['text','Text'], ['title','Tooltip / title'], ['class','CSS classes'], ['style','Inline style'], ['hidden','Show / hide']];
  if (element?.tag === 'a') base.splice(1, 0, ['href','Link destination']);
  if (element?.tag === 'img') base.splice(0, 1, ['src','Image source'], ['alt','Image alt text'], ['title','Tooltip / title'], ['class','CSS classes'], ['style','Inline style'], ['hidden','Show / hide']);
  return base;
}

function VisualEditor() {
  const frame = useRef(null);
  const [route, setRoute] = useState('/');
  const [selected, setSelected] = useState(null);
  const [property, setProperty] = useState('text');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [savedId, setSavedId] = useState(null);
  const iframeUrl = `${route}${route.includes('?') ? '&' : '?'}cms-edit=1`;

  useEffect(() => {
    const listener = (event) => {
      if (event.origin !== window.location.origin || event.data?.type !== 'mendy-cms-selected') return;
      const element = event.data.element;
      setSelected(element); setSavedId(null); setMessage(''); setError('');
      const first = propertyOptions(element)[0]?.[0] || 'text';
      setProperty(first); setValue(element?.[first] || '');
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  useEffect(() => {
    if (!selected) return;
    setValue(selected[property] ?? '');
  }, [property, selected]);

  function preview(next) {
    setValue(next);
    frame.current?.contentWindow?.postMessage({ type: 'mendy-cms-preview', selector: selected?.selector, property, value: next }, window.location.origin);
  }

  async function save(publish = false) {
    if (!selected?.selector) return;
    setBusy(true); setMessage(''); setError('');
    try {
      const targetRoute = selected.global ? '*' : route;
      const saved = await apiWrite('save', 'override', { route: targetRoute, selector: selected.selector, property, value, is_enabled: true, note: `${selected.tag} edited in Visual Editor${selected.global ? ' (site-wide)' : ''}` });
      setSavedId(saved.id);
      if (publish) {
        await apiWrite('publish', 'override', { id: saved.id });
        setMessage('Published. The live website now uses this change.');
        frame.current?.contentWindow?.postMessage({ type: 'mendy-cms-refresh' }, window.location.origin);
      } else setMessage('Draft saved. It is not live until you publish it.');
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save.'); }
    finally { setBusy(false); }
  }

  return <>
    <SectionHeader eyebrow="Visual Editor" title="Click the website. Change the detail." description="The preview is the real Mendy Studios website. Click text, buttons, links or images, edit the selected property, then save or publish." actions={<a className="admin-secondary-button" href={route} target="_blank" rel="noreferrer">View live <FaArrowUpRightFromSquare /></a>} />
    <div className="admin-editor-toolbar"><label><span>Page</span><select value={route} onChange={(event) => { setRoute(event.target.value); setSelected(null); setSavedId(null); }}>{pages.map(([label, path]) => <option key={path} value={path}>{label} — {path}</option>)}</select></label><p><strong>Tip:</strong> click exactly the text, image or button you want to change.</p></div>
    <div className="admin-editor-layout">
      <div className="admin-preview-panel"><div className="admin-browser-bar"><span></span><span></span><span></span><b>mendystudios.co.za{route}</b></div><iframe ref={frame} key={iframeUrl} title="Mendy Studios visual editor" src={iframeUrl} /></div>
      <aside className="admin-inspector">
        <h2>Selected element</h2>
        {!selected ? <div className="admin-empty"><FaPenToSquare /><p>Click an item in the website preview to start editing.</p></div> : <>
          <div className="admin-selected-meta"><code>{selected.tag}{selected.global ? ' · site-wide' : ''}</code><small>{selected.selector}</small></div>
          <label><span>What do you want to change?</span><select value={property} onChange={(event) => setProperty(event.target.value)}>{propertyOptions(selected).map(([key,label]) => <option key={key} value={key}>{label}</option>)}</select></label>
          {property === 'hidden' ? <label><span>Visibility</span><select value={value} onChange={(event) => preview(event.target.value)}><option value="false">Visible</option><option value="true">Hidden</option></select></label> : <label><span>New value</span><textarea rows={property === 'text' ? 7 : 4} value={value} onChange={(event) => preview(event.target.value)} /></label>}
          {property === 'src' ? <p className="admin-hint">Upload an image in Media Library, copy its URL and paste it here.</p> : null}
          <Status message={message} error={error} />
          <div className="admin-button-row"><button className="admin-secondary-button" disabled={busy} onClick={() => save(false)}><FaFloppyDisk /> Save draft</button><button className="admin-primary-button" disabled={busy} onClick={() => save(true)}><FaPaperPlane /> Publish</button></div>
          {savedId ? <small className="admin-muted">Change ID: {savedId}</small> : null}
        </>}
      </aside>
    </div>
  </>;
}

function ContentManager() {
  const { data, error, loading, reload } = useAdminData('overrides');
  const [notice, setNotice] = useState('');
  async function action(actionName, item) {
    if (actionName === 'delete' && !window.confirm('Delete this editable override? The original website content will show again.')) return;
    try { await apiWrite(actionName, 'override', { id: item.id, is_enabled: !item.is_enabled }); setNotice(`${actionName} completed.`); reload(); }
    catch (err) { setNotice(err instanceof Error ? err.message : 'Action failed.'); }
  }
  return <><SectionHeader eyebrow="Website" title="Editable content" description="Every visual-editor change is listed here with its draft and published value. Original code remains untouched underneath as a safe fallback." actions={<a className="admin-primary-button" href="/admin/editor">Add visual edit</a>} />{notice ? <div className="admin-alert success">{notice}</div> : null}{loading ? <Loading /> : error ? <ErrorPanel>{error}</ErrorPanel> : <div className="admin-panel admin-table-wrap"><table><thead><tr><th>Page</th><th>Element</th><th>Property</th><th>Draft</th><th>Status</th><th>Actions</th></tr></thead><tbody>{(data || []).map((item) => <tr key={item.id}><td><code>{item.route}</code></td><td className="admin-selector-cell">{item.selector}</td><td>{item.property}</td><td>{item.draft_value || <em>Empty</em>}</td><td>{item.draft_value !== item.published_value ? <span className="admin-badge warn">Draft</span> : <span className="admin-badge">Published</span>}</td><td><div className="admin-table-actions"><button onClick={() => action('publish', item)}>Publish</button><button onClick={() => action('revert', item)}><FaArrowRotateLeft /> Revert</button><button onClick={() => action('toggle', item)}>{item.is_enabled ? 'Disable' : 'Enable'}</button><button className="danger" onClick={() => action('delete', item)}>Delete</button></div></td></tr>)}{!data?.length ? <tr><td colSpan="6" className="admin-empty-row">No visual edits yet. Open Visual Editor to make the first change.</td></tr> : null}</tbody></table></div>}</>;
}

function MediaLibrary() {
  const { data, error, loading, reload } = useAdminData('media');
  const [file, setFile] = useState(null); const [alt, setAlt] = useState(''); const [notice, setNotice] = useState(''); const [busy,setBusy]=useState(false);
  async function upload(event) {
    event.preventDefault(); if (!file) return; setBusy(true); setNotice('');
    const form = new FormData(); form.set('file', file); form.set('altText', alt);
    try { const response=await fetch('/api/cms/media',{method:'POST',body:form}); const result=await response.json(); if(!response.ok||!result.ok) throw new Error(result.error||'Upload failed.'); setFile(null); setAlt(''); setNotice('Image uploaded. Copy its URL to use it anywhere on the website.'); event.currentTarget.reset(); reload(); } catch(err){setNotice(err instanceof Error?err.message:'Upload failed.');} finally{setBusy(false);}
  }
  async function remove(item){ if(!window.confirm(`Delete ${item.filename}?`))return; try{await apiWrite('delete','media',{id:item.id});reload();}catch(err){setNotice(err instanceof Error?err.message:'Delete failed.');}}
  return <><SectionHeader eyebrow="Media" title="Media library" description="Upload reusable website images. Every image gets a permanent CMS URL that can replace any image from the Visual Editor." />
    <form className="admin-panel admin-upload-form" onSubmit={upload}><label><span>Image file</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={(e)=>setFile(e.target.files?.[0]||null)} required /></label><label><span>Alt text</span><input value={alt} onChange={(e)=>setAlt(e.target.value)} placeholder="Describe the image for accessibility and SEO" /></label><button className="admin-primary-button" disabled={busy}>{busy?'Uploading…':'Upload image'}</button>{notice?<p className="admin-muted">{notice}</p>:null}</form>
    {loading?<Loading/>:error?<ErrorPanel>{error}</ErrorPanel>:<div className="admin-media-grid">{(data||[]).map(item=><div className="admin-media-card" key={item.id}><div className="admin-media-image"><img src={item.url} alt={item.alt_text||item.filename}/></div><div><strong>{item.filename}</strong><p>{item.alt_text||'No alt text'}</p><code>{item.url}</code><div className="admin-button-row"><button className="admin-secondary-button" onClick={()=>navigator.clipboard.writeText(item.url)}>Copy URL</button><button className="admin-danger-button" onClick={()=>remove(item)}>Delete</button></div></div></div>)}{!data?.length?<div className="admin-empty admin-panel"><FaImage/><p>No media uploaded yet.</p></div>:null}</div>}
  </>;
}

function SeoManager() {
  const { data, error, loading, reload } = useAdminData('page_meta');
  const [path,setPath]=useState('/'); const [form,setForm]=useState({title:'',description:'',ogTitle:'',ogDescription:'',ogImage:'',robots:'index,follow'}); const [notice,setNotice]=useState('');
  const current=useMemo(()=> (data||[]).find(item=>item.path===path),[data,path]);
  useEffect(()=>{const value=current?.draft_value||{};setForm({title:value.title||'',description:value.description||'',ogTitle:value.ogTitle||'',ogDescription:value.ogDescription||'',ogImage:value.ogImage||'',robots:value.robots||'index,follow'});},[current,path]);
  async function save(publish){setNotice('');try{await apiWrite('save','page_meta',{path,value:form});if(publish)await apiWrite('publish','page_meta',{path});setNotice(publish?'SEO settings published.':'SEO draft saved.');reload();}catch(err){setNotice(err instanceof Error?err.message:'Unable to save.');}}
  return <><SectionHeader eyebrow="SEO / GEO / AEO" title="Search appearance" description="Control page titles, descriptions and social sharing metadata without editing source code. Existing technical SEO remains the fallback." />{loading?<Loading/>:error?<ErrorPanel>{error}</ErrorPanel>:<div className="admin-grid-two"><div className="admin-panel admin-form-stack"><label><span>Website page</span><select value={path} onChange={e=>setPath(e.target.value)}>{pages.map(([label,p])=><option key={p} value={p}>{label} — {p}</option>)}</select></label><label><span>SEO title</span><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} maxLength={70}/><small>{form.title.length}/70</small></label><label><span>Meta description</span><textarea rows="4" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} maxLength={180}/><small>{form.description.length}/180</small></label><label><span>Social title</span><input value={form.ogTitle} onChange={e=>setForm({...form,ogTitle:e.target.value})}/></label><label><span>Social description</span><textarea rows="3" value={form.ogDescription} onChange={e=>setForm({...form,ogDescription:e.target.value})}/></label><label><span>Social image URL</span><input value={form.ogImage} onChange={e=>setForm({...form,ogImage:e.target.value})} placeholder="/images/og/og-image.jpg"/></label><label><span>Robots</span><select value={form.robots} onChange={e=>setForm({...form,robots:e.target.value})}><option value="index,follow">Index, follow</option><option value="noindex,follow">No index, follow</option><option value="noindex,nofollow">No index, no follow</option></select></label><Status message={notice}/><div className="admin-button-row"><button className="admin-secondary-button" onClick={()=>save(false)}>Save draft</button><button className="admin-primary-button" onClick={()=>save(true)}>Publish SEO</button></div></div><div className="admin-panel admin-serp-preview"><p className="admin-kicker">Google preview</p><h3>{form.title||'Mendy Studios | Professional Photography & Videography in Gauteng'}</h3><small>https://www.mendystudios.co.za{path==='/'?'':path}</small><p>{form.description||'Current site description remains active until this page metadata is published.'}</p><hr/><p className="admin-kicker">Answer-engine guidance</p><ul><li>Use a clear service + location title.</li><li>Write a factual, human description.</li><li>Keep FAQs and service information accurate.</li><li>Do not keyword-stuff.</li></ul></div></div>}</>;
}

function SettingsManager() {
  const {data,error,loading,reload}=useAdminData('settings'); const [drafts,setDrafts]=useState({}); const [notice,setNotice]=useState('');
  useEffect(()=>{const next={};(data||[]).forEach(item=>{next[item.key]=item.draft_value??'';});setDrafts(next);},[data]);
  const groups=useMemo(()=>{const result={};(data||[]).forEach(item=>{(result[item.group_name]??=[]).push(item);});return result;},[data]);
  async function save(item,publish){try{await apiWrite('save','setting',{key:item.key,group_name:item.group_name,label:item.label,field_type:item.field_type,value:drafts[item.key]});if(publish)await apiWrite('publish','setting',{key:item.key});setNotice(`${item.label} ${publish?'published':'saved as draft'}.`);reload();}catch(err){setNotice(err instanceof Error?err.message:'Unable to save.');}}
  return <><SectionHeader eyebrow="Global settings" title="Site-wide details" description="Manage company, contact and social details in one place. These settings are available to the CMS and can be linked to repeated website elements." />{notice?<div className="admin-alert success">{notice}</div>:null}{loading?<Loading/>:error?<ErrorPanel>{error}</ErrorPanel>:Object.entries(groups).map(([group,items])=><div className="admin-panel" key={group}><h2>{group}</h2><div className="admin-settings-grid">{items.map(item=><div className="admin-setting-row" key={item.key}><label><span>{item.label}</span><input type={item.field_type==='email'?'email':'text'} value={typeof drafts[item.key]==='string'?drafts[item.key]:JSON.stringify(drafts[item.key]??'')} onChange={e=>setDrafts({...drafts,[item.key]:e.target.value})}/><small>{item.key}</small></label><div className="admin-button-row"><button className="admin-secondary-button" onClick={()=>save(item,false)}>Save</button><button className="admin-primary-button" onClick={()=>save(item,true)}>Publish</button></div></div>)}</div></div>)}</>;
}

function Enquiries() {
  const {data,error,loading,reload}=useAdminData('leads'); const [notice,setNotice]=useState('');
  async function status(item,value){try{await apiWrite('update','lead',{id:item.id,status:value});reload();}catch(err){setNotice(err instanceof Error?err.message:'Unable to update.');}}
  return <><SectionHeader eyebrow="Leads" title="Website enquiries" description="New contact and quote requests can be stored here as a simple client inbox while the existing email delivery continues." />{notice?<ErrorPanel>{notice}</ErrorPanel>:null}{loading?<Loading/>:error?<ErrorPanel>{error}</ErrorPanel>:<div className="admin-panel admin-table-wrap"><table><thead><tr><th>Date</th><th>Person</th><th>Service</th><th>Message</th><th>Status</th></tr></thead><tbody>{(data||[]).map(item=><tr key={item.id}><td>{new Date(item.created_at).toLocaleDateString('en-ZA')}</td><td><strong>{item.name||'Unknown'}</strong><br/><a href={`mailto:${item.email}`}>{item.email}</a><br/>{item.phone?<a href={`tel:${item.phone}`}>{item.phone}</a>:null}</td><td>{item.service||'—'}</td><td className="admin-message-cell">{item.message||'—'}</td><td><select value={item.status} onChange={e=>status(item,e.target.value)}><option>new</option><option>contacted</option><option>qualified</option><option>booked</option><option>closed</option><option>spam</option></select></td></tr>)}{!data?.length?<tr><td colSpan="5" className="admin-empty-row">No stored enquiries yet.</td></tr>:null}</tbody></table></div>}</>;
}

function Redirects() {
  const {data,error,loading,reload}=useAdminData('redirects'); const [form,setForm]=useState({from_path:'',to_path:'',status_code:301,enabled:true}); const [notice,setNotice]=useState('');
  async function save(e){e.preventDefault();try{await apiWrite('save','redirect',form);setForm({from_path:'',to_path:'',status_code:301,enabled:true});setNotice('Redirect saved.');reload();}catch(err){setNotice(err instanceof Error?err.message:'Unable to save.');}}
  async function remove(id){if(!window.confirm('Delete this redirect?'))return;await apiWrite('delete','redirect',{id});reload();}
  return <><SectionHeader eyebrow="URL management" title="Redirects" description="Keep old campaign or page URLs organised when website addresses change."/><form className="admin-panel admin-inline-form" onSubmit={save}><label><span>From path</span><input required placeholder="/old-page" value={form.from_path} onChange={e=>setForm({...form,from_path:e.target.value})}/></label><label><span>To path / URL</span><input required placeholder="/new-page" value={form.to_path} onChange={e=>setForm({...form,to_path:e.target.value})}/></label><label><span>Type</span><select value={form.status_code} onChange={e=>setForm({...form,status_code:Number(e.target.value)})}><option value="301">301 Permanent</option><option value="302">302 Temporary</option><option value="307">307 Temporary</option><option value="308">308 Permanent</option></select></label><button className="admin-primary-button">Save redirect</button></form>{notice?<div className="admin-alert success">{notice}</div>:null}{loading?<Loading/>:error?<ErrorPanel>{error}</ErrorPanel>:<div className="admin-panel admin-table-wrap"><table><thead><tr><th>From</th><th>To</th><th>Code</th><th>Status</th><th></th></tr></thead><tbody>{(data||[]).map(item=><tr key={item.id}><td><code>{item.from_path}</code></td><td><code>{item.to_path}</code></td><td>{item.status_code}</td><td>{item.enabled?'Active':'Disabled'}</td><td><button className="admin-danger-button" onClick={()=>remove(item.id)}>Delete</button></td></tr>)}</tbody></table></div>}</>;
}

function Users({ currentUser }) {
  const {data,error,loading,reload}=useAdminData('users'); const [form,setForm]=useState({name:'',email:'',password:'',role:'editor'}); const [notice,setNotice]=useState('');
  async function add(e){e.preventDefault();try{await apiWrite('create','user',form);setForm({name:'',email:'',password:'',role:'editor'});setNotice('User created.');reload();}catch(err){setNotice(err instanceof Error?err.message:'Unable to create user.');}}
  return <><SectionHeader eyebrow="Access control" title="Users & roles" description="Give the client exactly the access they need while keeping technical control protected."/>{['super_admin','admin'].includes(currentUser.role)?<form className="admin-panel admin-inline-form" onSubmit={add}><label><span>Name</span><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label><span>Email</span><input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label><span>Temporary password</span><input type="password" minLength="8" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label><label><span>Role</span><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option value="editor">Editor</option><option value="marketing">Marketing</option><option value="admin">Administrator</option>{currentUser.role==='super_admin'?<option value="super_admin">Super Admin</option>:null}</select></label><button className="admin-primary-button">Add user</button></form>:null}{notice?<div className="admin-alert success">{notice}</div>:null}{loading?<Loading/>:error?<ErrorPanel>{error}</ErrorPanel>:<div className="admin-panel admin-table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last login</th></tr></thead><tbody>{(data||[]).map(item=><tr key={item.id}><td>{item.name}</td><td>{item.email}</td><td><span className="admin-badge">{item.role.replace('_',' ')}</span></td><td>{item.active?'Active':'Disabled'}</td><td>{item.last_login?new Date(item.last_login).toLocaleString('en-ZA'):'Never'}</td></tr>)}</tbody></table></div>}</>;
}

function Activity() {
  const {data,error,loading,reload}=useAdminData('activity');
  return <><SectionHeader eyebrow="Audit trail" title="Activity & history" description="See who changed what and when. Content changes also keep revision history for safer client self-service." actions={<button className="admin-secondary-button" onClick={reload}>Refresh</button>}/>{loading?<Loading/>:error?<ErrorPanel>{error}</ErrorPanel>:<div className="admin-panel admin-activity-timeline">{(data||[]).map(item=><div key={item.id}><span className="admin-activity-dot"></span><div><strong>{item.action} · {item.entity_type}</strong><p>{item.detail||item.entity_id}</p><small>{item.actor||'System'} · {new Date(item.created_at).toLocaleString('en-ZA')}</small></div></div>)}{!data?.length?<p className="admin-muted">No activity recorded yet.</p>:null}</div>}</>;
}

export default function AdminApp({ user, initialSection }) {
  const allowedSections = new Set(nav.map(item=>item[0]));
  const section = allowedSections.has(initialSection) ? initialSection : 'dashboard';
  const [menuOpen,setMenuOpen]=useState(false);
  async function logout(){await fetch('/api/cms/auth/logout',{method:'POST'});window.location.assign('/admin/login');}
  let content;
  switch(section){case'editor':content=<VisualEditor/>;break;case'content':content=<ContentManager/>;break;case'media':content=<MediaLibrary/>;break;case'seo':content=<SeoManager/>;break;case'settings':content=<SettingsManager/>;break;case'enquiries':content=<Enquiries/>;break;case'redirects':content=<Redirects/>;break;case'users':content=<Users currentUser={user}/>;break;case'activity':content=<Activity/>;break;default:content=<Dashboard/>;}
  return <div className="admin-shell">
    <aside className={`admin-sidebar ${menuOpen?'open':''}`}><div className="admin-brand"><Image src="/mendy-studios-logo-white.svg" alt="Mendy Studios" width={165} height={60}/><button className="admin-mobile-close" onClick={()=>setMenuOpen(false)}><FaXmark/></button><small>Back Office</small></div><nav>{nav.map(([key,label,Icon])=>{if(key==='users'&&!['super_admin','admin'].includes(user.role))return null;return <a key={key} href={`/admin/${key}`} className={section===key?'active':''}><Icon/><span>{label}</span></a>})}</nav><div className="admin-sidebar-foot"><div className="admin-user"><span>{(user.name||user.email).slice(0,1).toUpperCase()}</span><div><strong>{user.name||'Administrator'}</strong><small>{user.role.replace('_',' ')}</small></div></div><button onClick={logout}><FaRightFromBracket/> Sign out</button></div></aside>
    {menuOpen?<button className="admin-overlay" onClick={()=>setMenuOpen(false)} aria-label="Close navigation"/>:null}
    <div className="admin-main"><header className="admin-topbar"><button className="admin-menu-button" onClick={()=>setMenuOpen(true)}><FaBars/></button><div><strong>Mendy Studios</strong><span>Website Management</span></div><a href="/" target="_blank" rel="noreferrer">View Website <FaArrowUpRightFromSquare/></a></header><main className="admin-content">{content}</main></div>
  </div>;
}
