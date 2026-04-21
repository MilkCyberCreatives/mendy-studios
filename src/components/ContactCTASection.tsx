'use client';

import { useState, type FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { trackLead } from '../lib/marketing';
import { submitLead } from '../lib/lead-client';
import { SITE } from '../lib/seo';

export default function ContactCTASection() {
  const pathname = usePathname();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handleQuickMessageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage('');
    setFormError('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await submitLead({
        formId: 'home_quick_message_modal',
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        message: String(formData.get('message') || ''),
        page: pathname,
      });

      trackLead('form', 'quick_message_modal');
      setFormMessage('Thank you. Your message has been sent successfully.');
      event.currentTarget.reset();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to send your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      data-reveal
      className="relative py-24 md:py-28 px-6 flex items-center justify-center text-white overflow-hidden"
    >
      <Image
        src="/images/contact-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={60}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl text-center space-y-6"
      >
        <h2 className="text-3xl sm:text-4xl font-bold">
          Ready to collaborate with <span className="text-[#F26722]">Mendy Studios?</span>
        </h2>
        <p className="text-gray-200">
          Let&apos;s make magic together - professional, creative and right on time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-white hover:text-[#F26722] transition"
            onClick={() => trackLead('phone', 'contact_cta')}
          >
            <FaPhoneAlt /> {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-2 text-white hover:text-[#F26722] transition"
            onClick={() => trackLead('email', 'contact_cta')}
          >
            <FaEnvelope /> {SITE.email}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#F26722] px-6 py-3 rounded-full hover:bg-white hover:text-[#F26722] transition"
          >
            Send Message
          </button>
          <a
            href={SITE.socials.whatsapp}
            target="_blank"
            className="bg-green-500 px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-green-400 transition"
            onClick={() => trackLead('whatsapp', 'contact_cta')}
          >
            <FaWhatsapp /> WhatsApp Us
          </a>
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 max-w-md w-full relative text-black border border-black/10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
                onClick={() => setShowForm(false)}
                aria-label="Close quick message form"
              >
                <FaTimes />
              </button>
              <h3 className="text-xl font-semibold mb-4">Quick Message</h3>
              <form className="space-y-4" onSubmit={handleQuickMessageSubmit}>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full border px-4 py-2 rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full border px-4 py-2 rounded-md"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  className="w-full border px-4 py-2 rounded-md"
                />
                <textarea
                  name="message"
                  required
                  minLength={10}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full border px-4 py-2 rounded-md"
                />

                {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
                {formMessage ? <p className="text-sm text-green-600">{formMessage}</p> : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#F26722] text-white px-4 py-2 rounded-md w-full hover:bg-black disabled:opacity-60 transition"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
