import React, { useState } from 'react';
import { Flame, Clock, Sparkles, Check, ChevronRight } from 'lucide-react';
import { BakeryItem } from '../types/bakery';
import { BakeryArtwork } from './BakeryArtwork';

interface DailyHearthBoardProps {
  items: BakeryItem[];
  onSelectItem: (item: BakeryItem) => void;
  onQuickAdd: (item: BakeryItem) => void;
}

export const DailyHearthBoard: React.FC<DailyHearthBoardProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'fresh' | 'upcoming'>('all');

  const filteredItems = items.filter((item) => {
    if (activeTab === 'fresh') return item.batchStatus === 'fresh_out_of_oven';
    if (activeTab === 'upcoming') return item.batchStatus === 'baking_next';
    return item.batchStatus === 'fresh_out_of_oven' || item.batchStatus === 'baking_next' || item.isDailySpecial;
  });

  return (
    <section id="hearth-board" className="py-16 bg-[#FAF7F2] border-b border-[#E7DDD0]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9A5223] mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Live Hearth Schedule · Daily Oven Board</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#271E15] tracking-tight">
              Fresh Out of the Oven
            </h2>
            <p className="text-sm text-[#6D563E] mt-1 max-w-xl">
              Track live morning bake batches. Items labeled &ldquo;Fresh&rdquo; were pulled from stone hearth decks within the hour.
            </p>
          </div>

          {/* Interactive Filter Controls (Segmented buttons) */}
          <div className="flex items-center gap-1 p-1 bg-[#E7DDD0]/70 rounded-xl self-start md:self-auto border border-[#DAC9B4]/60">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#FAF7F2] text-[#271E15] shadow-xs font-semibold'
                  : 'text-[#6D563E] hover:text-[#271E15]'
              }`}
            >
              All Oven Batches
            </button>
            <button
              onClick={() => setActiveTab('fresh')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'fresh'
                  ? 'bg-[#FAF7F2] text-[#271E15] shadow-xs font-semibold'
                  : 'text-[#6D563E] hover:text-[#271E15]'
              }`}
            >
              Fresh Out Now
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'upcoming'
                  ? 'bg-[#FAF7F2] text-[#271E15] shadow-xs font-semibold'
                  : 'text-[#6D563E] hover:text-[#271E15]'
              }`}
            >
              Next in Oven
            </button>
          </div>
        </div>

        {/* Baker's Morning Bulletin Card */}
        <div className="mb-10 bg-[#F4EFE6] border border-[#DAC9B4] rounded-2xl p-6 sm:p-7 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7153]">
                Head Baker&rsquo;s Morning Journal · Tuesday, 6:15 AM
              </span>
              <p className="text-sm sm:text-base font-serif italic text-[#271E15] leading-relaxed">
                &ldquo;Room humidity was 58% overnight. Today&rsquo;s country loaves had an extraordinary 36-hour slow rise with deeper blistered caramelization on the ears. Baguettes are singing as they cool.&rdquo;
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3 text-xs text-[#6D563E] font-mono">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#4D6452]" title="Oven operational"></span>
              <span>Hearth Decks 1–4: 480°F Stone Deck</span>
            </div>
          </div>
        </div>

        {/* Live Batch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isFresh = item.batchStatus === 'fresh_out_of_oven';
            const isUpcoming = item.batchStatus === 'baking_next';

            return (
              <div
                key={item.id}
                className="group bg-[#FAF7F2] rounded-2xl border border-[#DAC9B4]/80 p-5 hover:border-[#A18061] transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Card Media Header */}
                  <div className="relative aspect-[16/10] rounded-xl bg-[#F4EFE6] border border-[#E7DDD0] flex items-center justify-center overflow-hidden mb-4">
                    <BakeryArtwork
                      type={item.artworkType}
                      className="w-full h-full p-2 transform group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium backdrop-blur-md bg-[#FAF7F2]/90 border border-[#E7DDD0] text-[#271E15]">
                      {isFresh && <Flame className="w-3.5 h-3.5 text-[#9A5223]" />}
                      {isUpcoming && <Clock className="w-3.5 h-3.5 text-[#5F4833]" />}
                      <span>{item.batchTimestamp}</span>
                    </div>

                    {item.remainingCount && (
                      <div className="absolute bottom-3 right-3 text-xs font-mono font-medium px-2 py-0.5 rounded bg-[#271E15]/85 text-[#FAF7F2] backdrop-blur-xs">
                        Only {item.remainingCount} left
                      </div>
                    )}
                  </div>

                  {/* Clean unboxed metadata with typographic separator */}
                  <div className="flex items-center gap-2 text-xs text-[#8C7153] mb-1">
                    <span>{item.category.toUpperCase()}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.flourBlend.split(',')[0]}</span>
                  </div>

                  {/* Title & French Subtitle */}
                  <h3 className="font-serif text-lg font-bold text-[#271E15] group-hover:text-[#9A5223] transition-colors">
                    {item.name}
                  </h3>
                  {item.frenchName && (
                    <p className="text-xs italic text-[#6D563E] mb-2">{item.frenchName}</p>
                  )}

                  <p className="text-xs text-[#5F4833] line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {/* Tasting notes as unboxed typographic line */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6D563E] py-2 border-t border-[#E7DDD0]">
                    <span className="font-medium text-[#271E15]">Profile:</span>
                    {item.tastingNotes.map((note, idx) => (
                      <span key={note} className="inline-flex items-center gap-1">
                        {idx > 0 && <span aria-hidden="true" className="text-[#DAC9B4]">/</span>}
                        <span>{note}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer with Price and Action */}
                <div className="mt-4 pt-3 border-t border-[#E7DDD0] flex items-center justify-between">
                  <div className="font-serif text-lg font-bold text-[#271E15] font-mono tabular-nums">
                    ${item.price.toFixed(2)}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="px-3 py-1.5 text-xs font-medium text-[#5F4833] hover:text-[#271E15] hover:bg-[#E7DDD0]/60 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Details & Slicing
                    </button>
                    <button
                      onClick={() => onQuickAdd(item)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-[#FAF7F2] bg-[#271E15] hover:bg-[#423223] active:scale-[0.98] rounded-lg transition-all cursor-pointer whitespace-nowrap"
                    >
                      {isUpcoming ? 'Pre-Order' : 'Add to Bag'}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
