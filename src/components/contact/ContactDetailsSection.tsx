'use client';

import { useState, type FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaClock,
} from 'react-icons/fa';
import { trackLead } from '../../lib/marketing';
import { submitLead } from '../../lib/lead-client';
import { SITE } from '../../lib/seo';

export default function ContactDetailsSection() {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage('');
    setFormError('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await submitLead({
        formId: 'contact_page_form',
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        message: String(formData.get('message') || ''),
        page: pathname,
      });

      trackLead('form', 'contact_page');
      setFormMessage('Thank you. Your message has been sent successfully.');
      event.currentTarget.reset();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to send your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section data-reveal className="relative overflow-hidden bg-black px-4 py-24 text-white md:px-6">
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <div className="hover-lift hover-glow space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div>
            <h2 className="text-3xl font-semibold">Contact Details</h2>
            <p className="mt-2 text-sm text-gray-300">
              Reach out through your preferred channel. We&apos;ll guide you on packages, dates, and
              coverage options.
            </p>
          </div>

          <div className="space-y-4 text-base">
            <a
              href={SITE.phoneHref}
              className="hover-lift flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 transition hover:border-[#F26722]/60 hover:text-[#F9A26E]"
              onClick={() => trackLead('phone', 'contact_page')}
            >
              <FaPhone className="text-[#F26722]" />
              <span>{SITE.phone}</span>
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="hover-lift flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 transition hover:border-[#F26722]/60 hover:text-[#F9A26E]"
              onClick={() => trackLead('email', 'contact_page')}
            >
              <FaEnvelope className="text-[#F26722]" />
              <span>{SITE.email}</span>
            </a>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <FaMapMarkerAlt className="text-[#F26722]" />
              <span>Midrand, Gauteng, South Africa</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="hover-lift rounded-xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#F9A26E]">Typical Reply</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-gray-200">
                <FaClock className="text-[#F26722]" />
                Under 24 hours
              </p>
            </div>
            <div className="hover-lift rounded-xl border border-white/10 bg-black/35 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#F9A26E]">Coverage</p>
              <p className="mt-2 text-sm text-gray-200">
                Eastern Cape, Free State, Gauteng, KwaZulu-Natal, Limpopo, Mpumalanga, North
                West, Northern Cape, Western Cape
              </p>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-gray-300">
              Socials
            </h3>
            <div className="flex gap-4 text-xl text-white">
              <a
                href={SITE.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mendy Studios on Facebook"
                className="hover-lift rounded-full border border-white/15 bg-white/5 p-3 transition hover:border-[#F26722] hover:text-[#F26722]"
              >
                <FaFacebook aria-hidden="true" />
              </a>
              <a
                href={SITE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mendy Studios on Instagram"
                className="hover-lift rounded-full border border-white/15 bg-white/5 p-3 transition hover:border-[#F26722] hover:text-[#F26722]"
              >
                <FaInstagram aria-hidden="true" />
              </a>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mendy Studios on LinkedIn"
                className="hover-lift rounded-full border border-white/15 bg-white/5 p-3 transition hover:border-[#F26722] hover:text-[#F26722]"
              >
                <FaLinkedinIn aria-hidden="true" />
              </a>
              <a
                href={SITE.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Mendy Studios on WhatsApp"
                className="hover-lift rounded-full border border-white/15 bg-white/5 p-3 transition hover:border-[#F26722] hover:text-[#F26722]"
                onClick={() => trackLead('whatsapp', 'contact_page')}
              >
                <FaWhatsapp aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="hover-lift hover-glow rounded-2xl border border-white/10 bg-[#0d0d0d]/90 p-6 md:p-8">
          <h2 className="text-3xl font-semibold">Send Us a Message</h2>
          <p className="mt-2 text-sm text-gray-300">
            Share your event date, type of shoot, and location. We&apos;ll respond with the best next
            step.
          </p>

          <form className="mt-7 grid gap-4" onSubmit={handleContactSubmit}>
            <div className="grid gap-2">
              <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-300">
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                placeholder="Your full name"
                className="rounded-xl border border-white/15 bg-white/8 p-3 text-white outline-none transition focus:border-[#F26722]/80 focus:ring-2 focus:ring-[#F26722]/30"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="contact-email"
                className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-300"
              >
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="rounded-xl border border-white/15 bg-white/8 p-3 text-white outline-none transition focus:border-[#F26722]/80 focus:ring-2 focus:ring-[#F26722]/30"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="contact-phone"
                className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-300"
              >
                Phone Number
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                placeholder="e.g. +27 73 278 5349"
                className="rounded-xl border border-white/15 bg-white/8 p-3 text-white outline-none transition focus:border-[#F26722]/80 focus:ring-2 focus:ring-[#F26722]/30"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="contact-message"
                className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-300"
              >
                Project Brief
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                placeholder="Tell us about your project or event..."
                rows={6}
                className="rounded-xl border border-white/15 bg-white/8 p-3 text-white outline-none transition focus:border-[#F26722]/80 focus:ring-2 focus:ring-[#F26722]/30"
              />
            </div>

            {formError ? <p className="text-sm text-red-400">{formError}</p> : null}
            {formMessage ? <p className="text-sm text-emerald-400">{formMessage}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="hover-lift hover-glow hover-shine mt-2 rounded-xl bg-[#F26722] px-6 py-3 font-semibold text-white transition hover:bg-[#d9561b] disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
