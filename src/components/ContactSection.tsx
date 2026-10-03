import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Video,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { AsimLogoMark } from './AsimLogo';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order & Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppContactUrl = () => {
    const text = encodeURIComponent(
      `Hello ASIM FABRICS!\n\nName: ${name || 'Customer'}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\nMessage: ${message || 'I would like to inquire about your cotton bedsheets & fabric range.'}`
    );
    return `https://wa.me/923146148488?text=${text}`;
  };

  return (
    <div className="py-12 sm:py-20 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#6B001A] mb-2">
            <AsimLogoMark size={20} />
            <span>Direct Concierge &amp; Mill Support</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A2A2A] tracking-tight leading-tight">
            Connect with ASIM FABRICS
          </h1>
          <p className="mt-4 text-xs sm:text-base text-[#2A2A2A]/80 leading-relaxed">
            Have questions regarding sizes, 76×68 cotton specifications, retail dispatch, or custom wholesale volume? We are here to assist you promptly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#6B001A] text-[#F8F5EF] p-8 rounded-2xl shadow-lg space-y-6">
              <h2 className="font-serif text-2xl font-bold text-white mb-2">
                Official Contact Channels
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <span className="text-[#D4B36A] text-[11px] font-semibold uppercase tracking-wider block">
                      WhatsApp Hotline
                    </span>
                    <a
                      href="https://wa.me/923146148488"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold text-white hover:text-[#D4B36A] text-base"
                    >
                      +92 314 6148488
                    </a>
                    <span className="text-[11px] text-[#F8F5EF]/70 block mt-0.5">
                      Fastest response for instant orders &amp; photos
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#D4B36A]" />
                  </div>
                  <div>
                    <span className="text-[#D4B36A] text-[11px] font-semibold uppercase tracking-wider block">
                      Official Email
                    </span>
                    <a
                      href="mailto:asimfabrics690@gmail.com"
                      className="font-mono text-white hover:text-[#D4B36A] text-sm break-all"
                    >
                      asimfabrics690@gmail.com
                    </a>
                    <span className="text-[11px] text-[#F8F5EF]/70 block mt-0.5">
                      For corporate &amp; formal wholesale RFQs
                    </span>
                  </div>
                </div>

                {/* Dispatch & Operations */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#D4B36A]" />
                  </div>
                  <div>
                    <span className="text-[#D4B36A] text-[11px] font-semibold uppercase tracking-wider block">
                      Operations &amp; Dispatch
                    </span>
                    <p className="text-white text-xs leading-relaxed">
                      Textile City Mills &amp; Warehouse Dispatch Center, Punjab, Pakistan.
                    </p>
                    <span className="text-[11px] text-[#F8F5EF]/70 block mt-0.5">
                      Nationwide doorstep shipping via TCS &amp; Leopards
                    </span>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#D4B36A]" />
                  </div>
                  <div>
                    <span className="text-[#D4B36A] text-[11px] font-semibold uppercase tracking-wider block">
                      Operational Hours
                    </span>
                    <p className="text-white text-xs">
                      Monday – Saturday: 9:00 AM – 9:00 PM (PKT)
                    </p>
                    <p className="text-[11px] text-[#F8F5EF]/70">
                      WhatsApp inquiries answered 7 days a week
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="https://wa.me/923146148488?text=Hello%20ASIM%20FABRICS,%20I%20have%20an%20inquiry%20regarding%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20b859] text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Start WhatsApp Chat Now</span>
                </a>
              </div>
            </div>

            {/* Social Links Box */}
            <div className="bg-white p-6 rounded-2xl border border-[#EFE7DA] shadow-xs">
              <h3 className="font-serif text-base font-bold text-[#2A2A2A] mb-3">
                Official Social Profiles
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://www.instagram.com/asimfabrics640"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8F5EF] text-[#2A2A2A] transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Instagram className="w-4 h-4 text-[#6B001A]" />
                    @asimfabrics640
                  </span>
                  <span className="text-[#D4B36A] font-semibold">Instagram →</span>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61588468446149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8F5EF] text-[#2A2A2A] transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Facebook className="w-4 h-4 text-[#6B001A]" />
                    ASIM FABRICS Official
                  </span>
                  <span className="text-[#D4B36A] font-semibold">Facebook →</span>
                </a>

                <a
                  href="https://www.tiktok.com/@asim.fabrics2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8F5EF] text-[#2A2A2A] transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Video className="w-4 h-4 text-[#6B001A]" />
                    @asim.fabrics2
                  </span>
                  <span className="text-[#D4B36A] font-semibold">TikTok →</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#EFE7DA] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#6B001A] mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#2A2A2A]/80 max-w-md mb-6 leading-relaxed">
                  Thank you, <strong>{name}</strong>. Our customer concierge team has received your message and will respond via phone or email shortly.
                </p>
                <a
                  href={generateWhatsAppContactUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-[#25D366] text-white font-semibold text-xs rounded-xl shadow-xs hover:bg-[#20b859] transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Direct WhatsApp Copy</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2A2A2A]">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-[#2A2A2A]/70 mt-1">
                    Fill out the form below or chat with us directly on WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Ali"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03XX XXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                    >
                      <option value="Order & Product Inquiry">Order &amp; Product Inquiry</option>
                      <option value="76x68 Cotton Specifications">76×68 Cotton Fabric Details</option>
                      <option value="Wholesale Bulk Quote">Wholesale / B2B Commercial Inquiry</option>
                      <option value="Custom Size / Hotel Order">Custom Size / Hotel Suite Project</option>
                      <option value="Delivery Status">Track Existing Delivery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the bedsheet sizes or fabric meterage you require..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                  />
                </div>

                <div className="pt-3 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-[#6B001A] hover:bg-[#500013] text-[#F8F5EF] font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>

                  <a
                    href={generateWhatsAppContactUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 bg-[#25D366] hover:bg-[#20b859] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
