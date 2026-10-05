import React, { useState } from 'react';
import { BAKERY_INFO } from '../data/bakeryMenu';
import { Wheat, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterEmail(''), 500);
    }
  };

  return (
    <footer className="bg-[#18120C] text-[#E7DDD0] py-16 border-t border-[#423223]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2C2219]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-2xl font-serif font-bold text-[#FAF7F2]">
              {BAKERY_INFO.name}
            </h3>
            <p className="text-xs text-[#BC9F82] leading-relaxed max-w-sm">
              Artisanal stoneground sourdoughs, hand-laminated French viennoiserie, and daily hearth releases. Naturally leavened with wild starter cultures since 2018.
            </p>
            <div className="text-xs text-[#A18061] font-mono space-y-1">
              <p>{BAKERY_INFO.address}</p>
              <p>Phone: {BAKERY_INFO.phone}</p>
              <p>Email: {BAKERY_INFO.email}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DAC9B4]">
              Daily Offerings
            </h4>
            <ul className="text-xs space-y-2 text-[#BC9F82]">
              <li><a href="#hearth-board" className="hover:text-[#FAF7F2] transition-colors">Daily Oven Board</a></li>
              <li><a href="#menu-gallery" className="hover:text-[#FAF7F2] transition-colors">Artisanal Sourdough Boules</a></li>
              <li><a href="#menu-gallery" className="hover:text-[#FAF7F2] transition-colors">Viennoiserie & Croissants</a></li>
              <li><a href="#menu-gallery" className="hover:text-[#FAF7F2] transition-colors">Savory Focaccia Slabs</a></li>
              <li><a href="#craft-story" className="hover:text-[#FAF7F2] transition-colors">Flour & Grain Transparency</a></li>
            </ul>
          </div>

          {/* Weekly Baker's Dispatch Signup */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DAC9B4]">
              Baker’s Weekly Seasonal Drop
            </h4>
            <p className="text-xs text-[#BC9F82] leading-relaxed">
              Receive Thursday announcements of upcoming weekend specialty loaves (e.g. Olive Thyme Levain, Brioche Feuilletée).
            </p>

            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#271E15] border border-[#423223] text-xs text-[#FAF7F2]">
                <Check className="w-4 h-4 text-[#9A5223]" />
                <span>You’re subscribed to the weekly bake sheet.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 text-xs bg-[#271E15] border border-[#423223] rounded-lg text-[#FAF7F2] placeholder:text-[#7E6145] focus:outline-none focus:border-[#9A5223]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-[#FAF7F2] text-[#18120C] rounded-lg hover:bg-[#E7DDD0] transition-colors cursor-pointer shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E6145]">
          <p>
            © {new Date().getFullYear()} Levain & Hearth Bakery LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Organic Certified Grains</span>
            <span aria-hidden="true">·</span>
            <span>Food Allergy Notice: Facility handles wheat, dairy, eggs, and tree nuts.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
