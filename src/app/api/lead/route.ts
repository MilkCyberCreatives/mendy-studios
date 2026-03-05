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

    const channelErrors = deliveries.flatMap((result) => {
      if (result.status !== 'fulfilled' || !result.value.error) {
        return [];
      }
      return [`${result.value.channel}: ${result.value.error}`];
    });

    if (sentChannels.length === 0) {
      console.error('[lead] submission could not be delivered', {
        formId: lead.formId,
        email: lead.email,
        channels: channelErrors,
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
