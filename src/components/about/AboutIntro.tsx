'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCameraRetro,
  FaHandshake,
  FaLightbulb,
  FaHeart,
  FaStar,
} from 'react-icons/fa';

export default function AboutIntro() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
            Who We Are
          </h2>
          <p className="text-gray-300 leading-relaxed">
            <strong>Mendy Studios</strong> is a high-end photography and videography company based in Midrand, Gauteng, South Africa. Founded by professional photographer <strong>Ndomiso</strong>, the studio is known for its sharp eye, creativity, and excellence in capturing great moments.
          </p>
          <p className="text-gray-300 mt-4 leading-relaxed">
            With a strong corporate approach, Mendy Studios offers tailored services in photography, videography, video editing, and video enhancement. Driven by a passion for visual storytelling, the studio blends technical skill with artistic intuition to deliver exceptional results for both personal and corporate clients.
          </p>
        </motion.div>

        {/* Image Collage */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/images/about/about1.jpg"
            alt="Mendy Studio Work 1"
            className="rounded-xl object-cover w-full h-[240px]"
          />
          <img
            src="/images/about/about2.jpg"
            alt="Mendy Studio Work 2"
            className="rounded-xl object-cover w-full h-[240px]"
          />
          <img
            src="/images/about/about3.jpg"
            alt="Mendy Studio Work 3"
            className="rounded-xl object-cover w-full h-[240px] col-span-2"
          />
        </motion.div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-[#F26722]">Our Mission & Vision</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-2 text-[#F26722]">Our Mission</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                To tell unforgettable visual stories through expertly captured moments and premium editing, creating memories that last a lifetime for both individuals and brands.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h4 className="text-xl font-semibold mb-2 text-[#F26722]">Our Vision</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                To become one of South Africa’s leading photography and videography brands, known for excellence, innovation, and creative impact.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Our Values Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-center text-[#F26722] mb-10">Our Values</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:ring-2 hover:ring-[#F26722] transition duration-300 text-center">
              <FaCameraRetro className="text-3xl text-[#F26722] mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2">Creativity</h4>
              <p className="text-gray-300 text-sm">
                We tell stories with originality and heart, capturing moments with artistic excellence.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:ring-2 hover:ring-[#F26722] transition duration-300 text-center">
              <FaHandshake className="text-3xl text-[#F26722] mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2">Professionalism</h4>
              <p className="text-gray-300 text-sm">
                Every shoot, edit, and interaction reflects our high standards and respect for our clients.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:ring-2 hover:ring-[#F26722] transition duration-300 text-center">
              <FaLightbulb className="text-3xl text-[#F26722] mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2">Innovation</h4>
              <p className="text-gray-300 text-sm">
                We embrace modern techniques, tools, and ideas to stay ahead in visual production.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:ring-2 hover:ring-[#F26722] transition duration-300 text-center">
              <FaStar className="text-3xl text-[#F26722] mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2">Excellence</h4>
              <p className="text-gray-300 text-sm">
                We deliver high-quality visuals with attention to detail in every frame.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:ring-2 hover:ring-[#F26722] transition duration-300 text-center">
              <FaHeart className="text-3xl text-[#F26722] mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2">Passion</h4>
              <p className="text-gray-300 text-sm">
                We love what we do — and it shows in every story we help tell visually.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
