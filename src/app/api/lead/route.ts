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

type DeliveryChannel = 'smtp' | 'webhook' | 'resend';
type DeliveryResult = {
  sent: boolean;
  channel: DeliveryChannel;
  error?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 32 * 1024;
const FIELD_LIMITS = {
  formId: 80,
  name: 120,
  email: 254,
  phone: 50,
  message: 5000,
  service: 160,
  location: 200,
  page: 500,
} as const;

function sanitize(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isSameOriginRequest(request: Request) {
  const origin = request.headers.get('origin');

  if (!origin) {
    return true;
  }

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function validate(payload: LeadPayload) {
  const errors: string[] = [];

  if (!payload.name || payload.name.length < 2) {
    errors.push('Please provide your full name.');
  } else if (payload.name.length > FIELD_LIMITS.name) {
    errors.push('Please shorten your name.');
  }

  if (!payload.email || !EMAIL_PATTERN.test(payload.email)) {
    errors.push('Please provide a valid email address.');
  } else if (payload.email.length > FIELD_LIMITS.email) {
    errors.push('Please provide a shorter email address.');
  }

  if (!payload.message || payload.message.length < 10) {
    errors.push('Please provide a more detailed message.');
  } else if (payload.message.length > FIELD_LIMITS.message) {
    errors.push('Please shorten your message.');
  }

  if (payload.formId.length > FIELD_LIMITS.formId) {
    errors.push('Invalid form identifier.');
  }

  if (payload.phone && payload.phone.length > FIELD_LIMITS.phone) {
    errors.push('Please provide a shorter phone number.');
  }

  if (payload.service && payload.service.length > FIELD_LIMITS.service) {
    errors.push('Please shorten the service selection.');
  }

  if (payload.location && payload.location.length > FIELD_LIMITS.location) {
    errors.push('Please shorten the location.');
  }

  if (payload.page && payload.page.length > FIELD_LIMITS.page) {
    errors.push('Invalid page value.');
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

async function sendSmtpEmail(lead: ReturnType<typeof buildLeadRecord>): Promise<DeliveryResult> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const toEmail = process.env.LEAD_TO_EMAIL || SITE.email;

  if (!host || !user || !pass || !toEmail) {
    return { sent: false, channel: 'smtp' };
  }

  const configuredPort = Number(process.env.SMTP_PORT || 465);
  const port = Number.isFinite(configuredPort) && configuredPort > 0 ? configuredPort : 465;
  const secure =
    process.env.SMTP_SECURE?.toLowerCase() === 'true' ||
    (!process.env.SMTP_SECURE && port === 465);
  const fromEmail = process.env.LEAD_FROM_EMAIL || `Mendy Studios Leads <${user}>`;

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

  try {
    const { default: nodemailer } = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: [toEmail],
      subject: `New lead: ${lead.name} (${lead.formId})`,
      text,
      replyTo: lead.email,
    });

    return { sent: true, channel: 'smtp' };
  } catch (error) {
    return {
      sent: false,
      channel: 'smtp',
      error: error instanceof Error ? error.message : 'SMTP delivery failed',
    };
  }
}

async function sendWebhook(lead: ReturnType<typeof buildLeadRecord>): Promise<DeliveryResult> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return { sent: false, channel: 'webhook' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      return {
        sent: false,
        channel: 'webhook',
        error: `Webhook delivery failed with status ${response.status}`,
      };
    }

    return { sent: true, channel: 'webhook' };
  } catch (error) {
    return {
      sent: false,
      channel: 'webhook',
      error: error instanceof Error ? error.message : 'Webhook delivery failed',
    };
  }
}

async function sendResendEmail(lead: ReturnType<typeof buildLeadRecord>): Promise<DeliveryResult> {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;

  if (!resendKey || !toEmail) {
    return { sent: false, channel: 'resend' };
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

  try {
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
      return {
        sent: false,
        channel: 'resend',
        error: `Resend delivery failed with status ${response.status}`,
      };
    }

    return { sent: true, channel: 'resend' };
  } catch (error) {
    return {
      sent: false,
      channel: 'resend',
      error: error instanceof Error ? error.message : 'Resend delivery failed',
    };
  }
}

export async function POST(request: Request) {
  try {
    if (!isSameOriginRequest(request)) {
      return NextResponse.json(
        { ok: false, errors: ['Request origin is not allowed.'] },
        { status: 403 }
      );
    }

    const declaredLength = Number(request.headers.get('content-length') || 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, errors: ['Request is too large.'] },
        { status: 413 }
      );
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, errors: ['Request is too large.'] },
        { status: 413 }
      );
    }

    const body = JSON.parse(rawBody) as Partial<LeadPayload>;
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
    const deliveries = await Promise.allSettled([
      sendSmtpEmail(lead),
      sendWebhook(lead),
      sendResendEmail(lead),
    ]);
    const sentChannels = deliveries.flatMap((result) => {
      if (result.status !== 'fulfilled' || !result.value.sent) {
        return [];
      }
      return [result.value.channel];
    });

    if (sentChannels.length === 0) {
      const failedChannels = deliveries.flatMap((result) => {
        if (result.status === 'fulfilled') {
          return [result.value.channel];
        }
        return ['unknown'];
      });

      console.error('[lead] submission could not be delivered', {
        formId: lead.formId,
        channels: failedChannels,
        fallback:
          'Configure SMTP_HOST/SMTP_USER/SMTP_PASSWORD and LEAD_TO_EMAIL, or LEAD_WEBHOOK_URL, or RESEND_API_KEY.',
      });

      return NextResponse.json(
        {
          ok: false,
          errors: ['Unable to submit your message right now. Please try again shortly.'],
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('[lead] submission failed', error instanceof Error ? error.name : 'unknown_error');
    return NextResponse.json(
      {
        ok: false,
        errors: ['Unable to submit your message right now. Please try again shortly.'],
      },
      { status: 500 }
    );
  }
}
