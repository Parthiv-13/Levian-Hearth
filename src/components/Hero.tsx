import React from 'react';
import { Flame, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { BakeryArtwork } from './BakeryArtwork';

interface HeroProps {
  onExploreMenu: () => void;
  onViewBoard: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onViewBoard }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 border-b border-[#E7DDD0]/80 bg-gradient-to-b from-[#FAF7F2] to-[#F4EFE6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Live Oven Bulletin Strip */}
        <div className="mb-6 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E7DDD0]/70 border border-[#DAC9B4]/80 text-xs text-[#5F4833]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9A5223] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9A5223]"></span>
          </span>
          <span className="font-medium text-[#271E15]">Live Hearth Status:</span>
          <span>Deck 2 just unloaded French Baguettes (8m ago)</span>
          <span aria-hidden="true" className="text-[#DAC9B4]">·</span>
          <button
            onClick={onViewBoard}
            className="font-semibold text-[#9A5223] hover:underline cursor-pointer"
          >
            Check Schedule →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest font-semibold text-[#8C7153]">
                Hand-Milled Heritage Grains · 72-Hour Fermentation
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#271E15] tracking-tight leading-[1.12] text-balance">
                Wild-fermented sourdoughs and hand-laminated morning pastries.
              </h1>
              <p className="text-base sm:text-lg text-[#5F4833] max-w-xl leading-relaxed">
                Baked in small hearth batches every morning from our 2018 wild levain culture, regional stoneground flours, and cultured Normandy butter. Pre-order online for same-day warm pickup.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#FAF7F2] bg-[#271E15] hover:bg-[#423223] active:scale-[0.98] rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Order for Pickup Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onViewBoard}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#271E15] bg-[#E7DDD0]/80 hover:bg-[#E7DDD0] border border-[#DAC9B4] active:scale-[0.98] rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <Flame className="w-4 h-4 text-[#9A5223]" />
                <span>Today’s Oven Schedule</span>
              </button>
            </div>

            {/* Proof & Transparency Markers (Claim-to-Proof Adjacency) */}
            <div className="pt-6 border-t border-[#E7DDD0] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#271E15] tabular-nums">100%</div>
                <div className="text-xs text-[#6D563E] mt-0.5">Naturally Leavened</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#271E15] tabular-nums">72h</div>
                <div className="text-xs text-[#6D563E] mt-0.5">Cold Fermentation</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#271E15] tabular-nums">84%</div>
                <div className="text-xs text-[#6D563E] mt-0.5">Isigny Butter Fat</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-[#DAC9B4]/80 bg-[#FAF7F2] p-5 shadow-lg shadow-[#271E15]/5 overflow-hidden">
              
              {/* Featured Boule Visual */}
              <div className="relative aspect-[4/3] rounded-xl bg-[#F4EFE6] border border-[#E7DDD0] flex items-center justify-center overflow-hidden">
                <BakeryArtwork type="boule" className="w-full h-full p-4 transform hover:scale-105 transition-transform duration-500" />
                
                {/* Quiet Status Callout */}
                <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#E7DDD0] px-3 py-1.5 rounded-lg text-xs font-medium text-[#271E15] shadow-xs flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#9A5223]" />
                  <span>Fresh Batch: 18m ago</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-[#271E15] text-[#FAF7F2] px-3 py-1.5 rounded-lg text-xs font-mono font-medium shadow-xs">
                  $9.50 · 82% Hydration
                </div>
              </div>

              {/* Card Meta Description */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#271E15]">Signature Country Boule</h3>
                  <p className="text-xs text-[#6D563E] mt-0.5">Whole Red Fife Wheat & 10% Dark Rye</p>
                </div>
                <button
                  onClick={onExploreMenu}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#FAF7F2] bg-[#9A5223] hover:bg-[#85451C] rounded-lg transition-colors cursor-pointer"
                >
                  Reserve Loaf
                </button>
              </div>

            </div>

            {/* Subtle floating badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#FAF7F2] border border-[#DAC9B4] px-4 py-2.5 rounded-xl shadow-md items-center gap-3 text-xs text-[#271E15]">
              <div className="w-8 h-8 rounded-lg bg-[#E7DDD0] flex items-center justify-center text-[#9A5223] font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold">Baking Schedule Active</p>
                <p className="text-[#6D563E]">Next release: Valrhona Escargot (10:15 AM)</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
