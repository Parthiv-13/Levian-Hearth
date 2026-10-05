import React from 'react';
import { Wheat, Clock, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { BAKERY_INFO } from '../data/bakeryMenu';

export const BakeryStory: React.FC = () => {
  return (
    <section id="craft-story" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#E7DDD0]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#8C7153] mb-2">
            The Philosophy of Pure Hearth Baking
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#271E15] tracking-tight text-balance">
            Fermentation is not an ingredient. It is a slow, respectful discipline.
          </h2>
          <p className="text-base text-[#5F4833] mt-4 leading-relaxed">
            {BAKERY_INFO.bakerPhilosophy}
          </p>
        </div>

        {/* 3 Pillars of Craft */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-[#F4EFE6] p-7 rounded-2xl border border-[#DAC9B4]/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E7DDD0] flex items-center justify-center text-[#9A5223]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#271E15]">
              72-Hour Wild Starter
            </h3>
            <p className="text-xs text-[#5F4833] leading-relaxed">
              Our wild sourdough mother culture, &ldquo;Levain 2018,&rdquo; is fed twice daily with organic dark rye and spring water. Long cold fermentation breaks down complex gluten structures for natural digestibility and lactic sweetness.
            </p>
          </div>

          <div className="bg-[#F4EFE6] p-7 rounded-2xl border border-[#DAC9B4]/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E7DDD0] flex items-center justify-center text-[#9A5223]">
              <Wheat className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#271E15]">
              Stoneground Heritage Grains
            </h3>
            <p className="text-xs text-[#5F4833] leading-relaxed">
              We reject roller-milled, chemically stripped white flour. We partner exclusively with regional family mills using granite millstones to preserve wheat germ, natural grain oils, carotenoids, and vital fiber.
            </p>
          </div>

          <div className="bg-[#F4EFE6] p-7 rounded-2xl border border-[#DAC9B4]/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E7DDD0] flex items-center justify-center text-[#9A5223]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#271E15]">
              84% Isigny Butter Lamination
            </h3>
            <p className="text-xs text-[#5F4833] leading-relaxed">
              Every croissant and morning bun is hand-laminated over 72 hours with cultured sweet cream butter imported from Normandy. The result is 27 distinct crispy layers with zero greasy residue.
            </p>
          </div>

        </div>

        {/* Grain Transparency Table (Adjacency Proof) */}
        <div className="bg-[#FAF7F2] border border-[#DAC9B4] rounded-2xl p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="font-serif text-xl font-bold text-[#271E15]">
              Flour & Dairy Transparency Ledger
            </h3>
            <p className="text-xs text-[#6D563E] mt-1">
              Every crop and batch can be traced directly to regional farm partners.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#DAC9B4] text-[#8C7153] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 pr-4">Grain / Ingr.</th>
                  <th className="py-2.5 pr-4">Farm & Mill Partner</th>
                  <th className="py-2.5 pr-4">Milling Style</th>
                  <th className="py-2.5 text-right">Extraction Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DDD0] text-[#271E15] font-mono">
                <tr>
                  <td className="py-3 pr-4 font-semibold">Red Fife Whole Wheat</td>
                  <td className="py-3 pr-4 font-sans text-[#5F4833]">Camas Country Mill (Eugene, OR)</td>
                  <td className="py-3 pr-4 font-sans text-[#5F4833]">Granite Stoneground</td>
                  <td className="py-3 text-right tabular-nums">100% Whole</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold">Dark Winter Rye</td>
                  <td className="py-3 pr-4 font-sans text-[#5F4833]">Bluebird Grain Farms (Winthrop, WA)</td>
                  <td className="py-3 pr-4 font-sans text-[#5F4833]">Stoneground Whole</td>
                  <td className="py-3 text-right tabular-nums">100% Whole</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold">French T65 Tradition</td>
                  <td className="py-3 pr-4 font-sans text-[#5F4833]">Moulins Viron (Chartres, France)</td>
                  <td className="py-3 pr-4 font-sans text-[#5F4833]">Label Rouge Standard</td>
                  <td className="py-3 text-right tabular-nums">65% Traditional</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold">Cultured Butter 84%</td>
                  <td className="py-3 pr-4 font-sans text-[#5F4833]">Coopérative Isigny Sainte-Mère (Normandy)</td>
                  <td className="py-3 pr-4 font-sans text-[#5F4833]">Traditional Churn AOP</td>
                  <td className="py-3 text-right tabular-nums">84% Butterfat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
