import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Car, CheckCircle2, Send } from 'lucide-react';
import { BAKERY_INFO } from '../data/bakeryMenu';

export const BakeryHoursLocation: React.FC = () => {
  const [cateringSent, setCateringSent] = useState(false);
  const [cateringName, setCateringName] = useState('');
  const [cateringEmail, setCateringEmail] = useState('');
  const [cateringDetails, setCateringDetails] = useState('');

  const handleCateringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cateringName && cateringEmail) {
      setCateringSent(true);
      setTimeout(() => {
        setCateringName('');
        setCateringEmail('');
        setCateringDetails('');
      }, 500);
    }
  };

  return (
    <section id="hours-pickup" className="py-16 md:py-24 bg-[#F4EFE6]/60 border-b border-[#E7DDD0]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Hours & Location Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-[#8C7153] mb-2">
                Visit & Collect
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#271E15] tracking-tight">
                Bakery Hours & Hearthside Counter
              </h2>
              <p className="text-sm text-[#5F4833] mt-2">
                Located in the historic Northrup district. Fresh loaves hit the bread rack starting at 7:00 AM each morning.
              </p>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DAC9B4] space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C7153]">
                <Clock className="w-4 h-4 text-[#9A5223]" />
                <span>Oven & Counter Schedule</span>
              </div>

              <div className="divide-y divide-[#E7DDD0] text-xs">
                {BAKERY_INFO.hours.map((schedule) => (
                  <div key={schedule.days} className="py-2.5 flex justify-between items-center">
                    <span className="font-semibold text-[#271E15]">{schedule.days}</span>
                    <span className="text-[#6D563E] font-mono">{schedule.hours}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-[#8C7153]">
                <p>
                  * Pre-ordered loaves are guaranteed and held in climate-controlled bread drawers until 3:00 PM.
                </p>
              </div>
            </div>

            {/* Address & Parking */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#DAC9B4] space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#9A5223] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h3 className="font-bold text-sm text-[#271E15]">{BAKERY_INFO.name}</h3>
                  <p className="text-[#5F4833] mt-0.5">{BAKERY_INFO.address}</p>
                  <p className="text-[#6D563E] mt-1 font-mono">Phone: {BAKERY_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#E7DDD0]">
                <Car className="w-5 h-5 text-[#8C7153] shrink-0 mt-0.5" />
                <div className="text-xs text-[#5F4833]">
                  <p className="font-semibold text-[#271E15]">Dedicated 15-Minute Pickup Bays</p>
                  <p className="mt-0.5">Two reserved parking stalls directly in front of the bakery entrance for fast pre-order pickups.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Custom Celebration Breads & Event Inquiries */}
          <div className="lg:col-span-6 bg-[#FAF7F2] rounded-2xl border border-[#DAC9B4] p-7 sm:p-8 shadow-xs">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7153]">
              Special Orders & Wholesale
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#271E15] mt-1">
              Custom Bread Orders & Brunch Catering
            </h3>
            <p className="text-xs text-[#5F4833] mt-2 leading-relaxed">
              Planning a weekend wedding brunch, corporate gathering, or require standing weekly restaurant bread deliveries? Our hearth team crafts custom bread boards and pastry platters with 48 hours notice.
            </p>

            {cateringSent ? (
              <div className="mt-6 p-6 rounded-xl bg-[#E7DDD0]/80 border border-[#DAC9B4] text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#3E5142] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#271E15]">Inquiry Received</h4>
                <p className="text-xs text-[#5F4833]">
                  Our head baker will review your gathering details and reply via email within 24 business hours.
                </p>
                <button
                  onClick={() => setCateringSent(false)}
                  className="mt-3 text-xs text-[#9A5223] font-semibold hover:underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleCateringSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#271E15] block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cateringName}
                      onChange={(e) => setCateringName(e.target.value)}
                      placeholder="e.g. Elena Vance"
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DAC9B4] rounded-lg text-[#271E15] placeholder:text-[#8C7153] focus:outline-none focus:border-[#9A5223]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#271E15] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={cateringEmail}
                      onChange={(e) => setCateringEmail(e.target.value)}
                      placeholder="elena@example.com"
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DAC9B4] rounded-lg text-[#271E15] placeholder:text-[#8C7153] focus:outline-none focus:border-[#9A5223]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#271E15] block mb-1">
                    Event Date, Guest Count & Pastry / Bread Request
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={cateringDetails}
                    onChange={(e) => setCateringDetails(e.target.value)}
                    placeholder="e.g., Saturday gathering of 35 people. Requesting 30 mini croissants, 2 focaccia slabs, and 4 sliced country boules."
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DAC9B4] rounded-lg text-[#271E15] placeholder:text-[#8C7153] focus:outline-none focus:border-[#9A5223]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#271E15] hover:bg-[#423223] active:scale-[0.98] text-[#FAF7F2] text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Catering Inquiry</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
