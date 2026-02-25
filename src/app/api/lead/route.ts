import { NextResponse } from 'next/server';
import { SITE } from '../../../lib/seo';

type LeadPayload = {
  formId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
  location?: string;
  page?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function validate(payload: LeadPayload) {
  const errors: string[] = [];

  if (!payload.name || payload.name.length < 2) {
    errors.push('Please provide your full name.');
  }

  if (!payload.email || !EMAIL_PATTERN.test(payload.email)) {
    errors.push('Please provide a valid email address.');
  }

  if (!payload.message || payload.message.length < 10) {
    errors.push('Please provide a more detailed message.');
  }

  return errors;
}

function buildLeadRecord(payload: LeadPayload, request: Request) {
  return {
    ...payload,
    createdAt: new Date().toISOString(),
    source: 'website',
    userAgent: request.headers.get('user-agent') || undefined,
    referrer: request.headers.get('referer') || undefined,
  };
}

async function sendWebhook(lead: ReturnType<typeof buildLeadRecord>) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return { sent: false, channel: 'webhook' as const };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Webhook delivery failed with status ${response.status}`);
  }

  return { sent: true, channel: 'webhook' as const };
}

async function sendResendEmail(lead: ReturnType<typeof buildLeadRecord>) {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;

  if (!resendKey || !toEmail) {
    return { sent: false, channel: 'resend' as const };
  }

  const fromEmail = process.env.LEAD_FROM_EMAIL || 'Leads <onboarding@resend.dev>';

  const text = [
    `New lead from ${lead.formId}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || 'Not provided'}`,
    `Service: ${lead.service || 'Not provided'}`,
    `Location: ${lead.location || 'Not provided'}`,
    `Page: ${lead.page || 'Not provided'}`,
    '',
    'Message:',
    lead.message,
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `New lead: ${lead.name} (${lead.formId})`,
      text,
      reply_to: lead.email,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend delivery failed with status ${response.status}`);
  }

  return { sent: true, channel: 'resend' as const };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadPayload>;

    const payload: LeadPayload = {
      formId: sanitize(body.formId) || 'unknown_form',
      name: sanitize(body.name),
      email: sanitize(body.email).toLowerCase(),
      phone: sanitize(body.phone),
      message: sanitize(body.message),
      service: sanitize(body.service),
      location: sanitize(body.location),
      page: sanitize(body.page),
    };

    const errors = validate(payload);

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const lead = buildLeadRecord(payload, request);

    const deliveries = await Promise.allSettled([sendWebhook(lead), sendResendEmail(lead)]);
    const sentChannels = deliveries.flatMap((result) => {
      if (result.status !== 'fulfilled' || !result.value.sent) {
        return [];
      }
      return [result.value.channel];
    });

    if (sentChannels.length === 0) {
      console.info('[lead] captured without external integration', {
        lead,
        fallback: `Configure LEAD_WEBHOOK_URL or RESEND_API_KEY + LEAD_TO_EMAIL for delivery to ${SITE.email}.`,
      });
    }

    return NextResponse.json({ ok: true, channels: sentChannels }, { status: 200 });
  } catch (error) {
    console.error('[lead] submission failed', error);
    return NextResponse.json(
      {
        ok: false,
        errors: ['Unable to submit your message right now. Please try again shortly.'],
      },
      { status: 500 }
    );
  }
}
