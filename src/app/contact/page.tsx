'use client';

import React from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';

import ContactHero from '../../components/contact/ContactHero';
import MainHeader from '../../components/MainHeader';
import FooterSection from '../../components/FooterSection';

export default function ContactPage() {
  return (
    <>
      <MainHeader />
      <ContactHero />

      <section className="bg-[#0B0B0B] text-white py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10">

          {/* Contact Info Block - Styled Like Form */}
          <div className="md:w-1/2 bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Contact Details</h2>

            <div className="space-y-4 text-base">
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#F26722]" />
                <span>+27 71 234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#F26722]" />
                <span>info@mendystudios.co.za</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#F26722]" />
                <span>Midrand, Gauteng, South Africa</span>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
              <div className="flex gap-5 text-2xl text-white">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="hover:text-[#F26722] transition" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="hover:text-[#F26722] transition" />
                </a>
                <a href="https://wa.me/27712345678" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="hover:text-[#F26722] transition" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Block */}
          <div className="md:w-1/2 bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form className="grid gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-white/10 border border-white/20 p-3 rounded text-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white/10 border border-white/20 p-3 rounded text-white"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="bg-white/10 border border-white/20 p-3 rounded text-white"
              ></textarea>
              <button
                type="submit"
                className="bg-[#F26722] hover:bg-[#d9561b] text-white px-6 py-3 rounded transition-all"
              >
                Submit
              </button>
            </form>
          </div>

        </div>
      </section>

      <FooterSection />
    </>
  );
}
