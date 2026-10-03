import React, { useState } from 'react';
import {
  Layers,
  Truck,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  MessageCircle,
  Mail,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { WHOLESALE_BENEFITS } from '../data/products';

interface WholesaleSectionProps {
  prefilledProduct?: string;
}

export const WholesaleSection: React.FC<WholesaleSectionProps> = ({
  prefilledProduct = '',
}) => {
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cityCountry, setCityCountry] = useState('Lahore, Pakistan');
  const [productType, setProductType] = useState(
    prefilledProduct || '76×68 Export Cotton Fabric'
  );
  const [estimatedQuantity, setEstimatedQuantity] = useState('50 - 200 units');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppWholesaleUrl = () => {
    const text = encodeURIComponent(
      `*Wholesale B2B Inquiry - ASIM FABRICS*\n\n` +
        `Business Name: ${businessName || 'Business Client'}\n` +
        `Contact Person: ${contactName || 'Buyer'}\n` +
        `WhatsApp / Phone: ${phone || 'Not provided'}\n` +
        `Location: ${cityCountry}\n` +
        `Interested Product: ${productType}\n` +
        `Estimated Volume: ${estimatedQuantity}\n` +
        (notes ? `Requirements: ${notes}\n` : '') +
        `\nPlease share the official export wholesale price tiers and commercial terms.`
    );
    return `https://wa.me/923146148488?text=${text}`;
  };

  return (
    <section id="wholesale" className="py-16 sm:py-24 bg-[#EFE7DA]/40 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4B36A]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6B001A]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B001A] mb-3">
            <Sparkles className="w-4 h-4 text-[#D4B36A]" />
            <span>Commercial &amp; Bulk Supply</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A2A2A] tracking-tight leading-tight">
            Wholesale &amp; Institutional Supply
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#2A2A2A]/80 leading-relaxed">
            Supplying boutique hotels, furnishing retailers, garment manufacturers, and global importers with certified 76×68 combed cotton textiles directly from our looms.
          </p>
        </div>

        {/* 4 Pillars of B2B Service */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {WHOLESALE_BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-[#F8F5EF] p-6 rounded-xl border border-[#EFE7DA] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#6B001A]/10 text-[#6B001A] flex items-center justify-center mb-4">
                  {idx === 0 && <Building2 className="w-5 h-5" />}
                  {idx === 1 && <Layers className="w-5 h-5" />}
                  {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 3 && <Truck className="w-5 h-5" />}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2A2A2A] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs text-[#2A2A2A]/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Form & Direct Contact Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct WhatsApp & Value Proposition */}
          <div className="lg:col-span-5 bg-[#6B001A] text-[#F8F5EF] p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4B36A] font-semibold">
                Direct Mill Desk
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F5EF] mt-2 mb-4 leading-tight">
                Need Fast Pricing or Custom Fabric Weaving?
              </h3>
              <p className="text-xs sm:text-sm text-[#F8F5EF]/80 leading-relaxed mb-6">
                Our wholesale team responds within 1 business hour with sample swatches, export lab certifications (76×68 density), and volume pricing tiers.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4B36A]/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-[#D4B36A]" />
                  </div>
                  <div>
                    <span className="text-[#D4B36A] block text-[11px] font-medium">WhatsApp Commercial Desk:</span>
                    <a
                      href="https://wa.me/923146148488"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold hover:underline"
                    >
                      +92 314 6148488
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4B36A]/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#D4B36A]" />
                  </div>
                  <div>
                    <span className="text-[#D4B36A] block text-[11px] font-medium">Official RFQ Email:</span>
                    <a
                      href="mailto:asimfabrics690@gmail.com"
                      className="font-mono font-bold hover:underline"
                    >
                      asimfabrics690@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href={generateWhatsAppWholesaleUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20b859] text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat Instantly with Wholesale Manager</span>
              </a>
            </div>
          </div>

          {/* Right Column: Wholesale RFQ Form */}
          <div className="lg:col-span-7 bg-[#F8F5EF] p-8 sm:p-10 rounded-2xl border border-[#EFE7DA] shadow-sm">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#6B001A] mb-2">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#2A2A2A]/80 max-w-md mb-6 leading-relaxed">
                  Thank you, <strong>{contactName}</strong>. Our commercial textile specialist will review your request for <strong>{productType}</strong> and share our wholesale catalog within 2 hours.
                </p>
                <a
                  href={generateWhatsAppWholesaleUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3 px-6 bg-[#25D366] text-white font-semibold text-xs rounded-xl shadow-sm hover:bg-[#20b859] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Forward Details to WhatsApp Now</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-[#EFE7DA] pb-3 mb-4">
                  <h3 className="font-serif text-xl font-bold text-[#2A2A2A]">
                    Request Wholesale Quotation &amp; Catalog
                  </h3>
                  <p className="text-xs text-[#2A2A2A]/70 mt-1">
                    Fill out the specifications below or send directly via WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                      Business / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Living Furnishings"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 3XX XXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="buyer@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                      Product of Interest *
                    </label>
                    <select
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                    >
                      <option value="King Size Bedsheets">King Size Bedsheets (Bulk Sets)</option>
                      <option value="Double Bedsheets">Double Bedsheets (Bulk Sets)</option>
                      <option value="Single Bedsheets">Single Bedsheets (Hospitality / Hostels)</option>
                      <option value="76×68 Export Cotton Fabric">76×68 Grey &amp; Dyed Cotton Fabric (Rolls)</option>
                      <option value="Printed Cotton Fabric">Printed Fabric (Custom Patterns)</option>
                      <option value="Quilted Bedcovers & Articles">Home Textile Articles (Quilts &amp; Dohars)</option>
                      <option value="Custom Hotel Linen Solution">Custom Hospitality &amp; Export Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                      Estimated Volume *
                    </label>
                    <select
                      value={estimatedQuantity}
                      onChange={(e) => setEstimatedQuantity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                    >
                      <option value="20 - 50 sets / 100m">20 - 50 sets / 100m (Starter MOQ)</option>
                      <option value="50 - 200 sets / 500m">50 - 200 sets / 500m (Retailer Tier)</option>
                      <option value="200 - 1,000 sets / 2,000m">200 - 1,000 sets / 2,000m (Wholesaler)</option>
                      <option value="Container Load / 10,000m+">Container Load / 10,000m+ (Export Bulk)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                    Specific Requirements or Dimensions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details such as desired GSM, packaging requirements, custom brand tags, or delivery timeline..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-[#6B001A] hover:bg-[#500013] text-[#F8F5EF] font-semibold text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Wholesale Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={generateWhatsAppWholesaleUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 bg-[#25D366] hover:bg-[#20b859] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleSection;
