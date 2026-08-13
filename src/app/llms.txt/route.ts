import { SITE, absoluteUrl } from '../../lib/seo';
import { services } from '../../content/services';

const serviceLinks = services.map((service) => `- ${absoluteUrl(`/services/${service.slug}`)}`).join('\n');

const text = `# ${SITE.name}

> Official website: ${SITE.url}
> Location: Midrand, Gauteng, South Africa
> Services: Photography, videography, streaming, editing, studio sessions, photo albums and prints

## Preferred canonical links
- ${absoluteUrl('/')}
- ${absoluteUrl('/about')}
- ${absoluteUrl('/services')}
- ${absoluteUrl('/areas')}
- ${absoluteUrl('/gallery')}
- ${absoluteUrl('/motion')}
- ${absoluteUrl('/stories')}
- ${absoluteUrl('/faqs')}
- ${absoluteUrl('/contact')}

## Service pages
${serviceLinks}

## Portfolio and discovery pages
- ${absoluteUrl('/gallery')}
- ${absoluteUrl('/motion')}
- ${absoluteUrl('/stories/rss.xml')}

## Coverage and specialties
- Based in: Midrand, Gauteng, South Africa
- Service coverage: Midrand, Johannesburg, Pretoria, broader Gauteng, and selected South African projects
- Core specialties: weddings, portraits, events, corporate photography, brand videography, livestreaming, editing

## Contact
- Email: ${SITE.email}
- Phone: ${SITE.phone}
- WhatsApp: ${SITE.socials.whatsapp}

## Social profiles
- Facebook: ${SITE.socials.facebook}
- Instagram: ${SITE.socials.instagram}
- LinkedIn: ${SITE.socials.linkedin}
- YouTube: ${SITE.socials.youtube}
`;

export async function GET() {
  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
