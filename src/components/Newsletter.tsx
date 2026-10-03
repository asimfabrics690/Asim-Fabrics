import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { AsimLogoMark } from './AsimLogo';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#6B001A] text-[#F8F5EF] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4B36A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-white/10 mb-4">
          <AsimLogoMark size={28} />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
          Join the ASIM Private Circle
        </h2>

        <p className="text-xs sm:text-sm text-[#F8F5EF]/80 max-w-lg mx-auto mb-8 leading-relaxed">
          Be first to receive seasonal bedsheet print drops, advance notice on limited 76×68 fabric rolls, and private wholesale pricing updates.
        </p>

        {subscribed ? (
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-[#D4B36A]/50 max-w-md mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm text-[#D4B36A] animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-[#D4B36A]" />
            <span>Thank you for subscribing to ASIM FABRICS!</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-white/10 border border-[#D4B36A]/40 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#D4B36A] backdrop-blur-xs"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-[#D4B36A] hover:bg-[#E7CF9B] text-[#2A2A2A] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="mt-4 text-[10px] text-white/50">
          We respect your privacy. No spam, only authentic textile releases. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
