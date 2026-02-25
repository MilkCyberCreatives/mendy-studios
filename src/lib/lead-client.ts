export type LeadPayload = {
  formId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
  location?: string;
  page?: string;
};

export async function submitLead(payload: LeadPayload) {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data?.ok) {
    throw new Error(data?.errors?.[0] || 'Lead submission failed');
  }

  return data;
}
