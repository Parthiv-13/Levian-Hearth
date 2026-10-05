import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Sparkles, Check } from 'lucide-react';
import { BakeryItem, MenuCategory, DietaryTag } from '../types/bakery';
import { BakeryArtwork } from './BakeryArtwork';

interface MenuGalleryProps {
  items: BakeryItem[];
  onSelectItem: (item: BakeryItem) => void;
  onQuickAdd: (item: BakeryItem) => void;
}

export const MenuGallery: React.FC<MenuGalleryProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'All Daily Bakes' },
    { id: 'breads', label: 'Artisanal Breads' },
    { id: 'viennoiserie', label: 'Viennoiserie' },
    { id: 'pastries', label: 'Sweet Pastries' },
    { id: 'savory', label: 'Savory & Focaccia' },
    { id: 'drinks', label: 'Coffee & Drinks' },
  ];

  const dietaryFilters: { tag: DietaryTag; label: string }[] = [
    { tag: 'vegan', label: 'Vegan' },
    { tag: 'organic_grain', label: 'Organic Grains' },
    { tag: 'nut_free', label: 'Nut-Free' },
    { tag: 'dairy_free', label: 'Dairy-Free' },
  ];

  const toggleDietary = (tag: DietaryTag) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesFrench = item.frenchName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesFlour = item.flourBlend.toLowerCase().includes(query);
        if (!matchesName && !matchesFrench && !matchesDesc && !matchesFlour) {
          return false;
        }
      }
      // Dietary filter
      if (selectedDietary.length > 0) {
        const hasAllTags = selectedDietary.every((tag) => item.dietary.includes(tag));
        if (!hasAllTags) return false;
      }
      return true;
    });
  }, [items, selectedCategory, searchQuery, selectedDietary]);

  return (
    <section id="menu-gallery" className="py-16 md:py-24 bg-[#F4EFE6]/40 border-b border-[#E7DDD0]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#8C7153] mb-2">
            The Daily Counter Catalog
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#271E15] tracking-tight">
            Order for Hearthside Pickup
          </h2>
          <p className="text-sm text-[#5F4833] mt-2 leading-relaxed">
            Reserve your favorite loaves, flaky viennoiserie, and espresso for pickup. Custom slicing, bread warming, and plant-based milks available upon request.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Top Row: Category Tabs & Search Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Segmented Controls */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 lg:pb-0 p-1 bg-[#E7DDD0]/60 rounded-xl border border-[#DAC9B4]/60">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#271E15] text-[#FAF7F2] shadow-xs font-semibold'
                      : 'text-[#5F4833] hover:text-[#271E15] hover:bg-[#FAF7F2]/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7153]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sourdough, flour, notes..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#DAC9B4] rounded-xl text-[#271E15] placeholder:text-[#8C7153] focus:outline-none focus:ring-2 focus:ring-[#9A5223]/30 focus:border-[#9A5223] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7153] hover:text-[#271E15]"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* Dietary Filters Sub-row (unboxed clickable toggle filters) */}
          <div className="flex items-center flex-wrap gap-2 pt-1 text-xs text-[#5F4833]">
            <span className="font-medium text-[#271E15]">Dietary Preferences:</span>
            {dietaryFilters.map((filter) => {
              const active = selectedDietary.includes(filter.tag);
              return (
                <button
                  key={filter.tag}
                  onClick={() => toggleDietary(filter.tag)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer flex items-center gap-1.5 border ${
                    active
                      ? 'bg-[#271E15] text-[#FAF7F2] border-[#271E15]'
                      : 'bg-[#FAF7F2] text-[#5F4833] border-[#DAC9B4] hover:border-[#8C7153]'
                  }`}
                >
                  {active && <Check className="w-3 h-3" />}
                  <span>{filter.label}</span>
                </button>
              );
            })}
            {selectedDietary.length > 0 && (
              <button
                onClick={() => setSelectedDietary([])}
                className="text-xs text-[#9A5223] hover:underline ml-2 cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

        </div>

        {/* Product Cards Grid: 3-column desktop */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF7F2] rounded-2xl border border-[#DAC9B4]">
            <p className="font-serif text-lg text-[#271E15]">No bakes match your current criteria.</p>
            <p className="text-xs text-[#6D563E] mt-1">Try resetting the dietary filters or search term.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedDietary([]);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-[#271E15] text-[#FAF7F2] rounded-lg cursor-pointer hover:bg-[#423223]"
            >
              Show Full Daily Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#FAF7F2] rounded-2xl border border-[#DAC9B4]/80 p-5 hover:border-[#A18061] transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Lead with Imagery (65-75% height ratio container) */}
                  <div
                    onClick={() => onSelectItem(item)}
                    className="cursor-pointer relative aspect-[4/3] rounded-xl bg-[#F4EFE6] border border-[#E7DDD0] flex items-center justify-center overflow-hidden mb-4"
                  >
                    <BakeryArtwork
                      type={item.artworkType}
                      className="w-full h-full p-3 transform group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Subtle status tag (No badge spam - single clean tag) */}
                    {item.isDailySpecial ? (
                      <span className="absolute top-3 left-3 text-xs font-medium px-2 py-0.5 rounded bg-[#9A5223] text-[#FAF7F2]">
                        Daily Special
                      </span>
                    ) : item.fermentationHours ? (
                      <span className="absolute top-3 left-3 text-xs font-mono font-medium px-2 py-0.5 rounded bg-[#FAF7F2]/90 border border-[#DAC9B4] text-[#271E15]">
                        {item.fermentationHours}h Ferment
                      </span>
                    ) : null}

                    {item.hydrationPercent && (
                      <span className="absolute bottom-3 left-3 text-xs font-mono font-medium px-2 py-0.5 rounded bg-[#271E15]/80 text-[#FAF7F2]">
                        {item.hydrationPercent}% Hydration
                      </span>
                    )}
                  </div>

                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-[#8C7153] mb-1">
                    <span>{item.category.toUpperCase()}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.batchTimestamp}</span>
                  </div>

                  {/* Product Name in 16px SemiBold/Bold */}
                  <h3
                    onClick={() => onSelectItem(item)}
                    className="font-serif text-lg font-bold text-[#271E15] group-hover:text-[#9A5223] transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>
                  {item.frenchName && (
                    <p className="text-xs italic text-[#6D563E] mb-2">{item.frenchName}</p>
                  )}

                  <p className="text-xs text-[#5F4833] line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {/* Flour blend metadata */}
                  <p className="text-xs text-[#8C7153] border-t border-[#E7DDD0] pt-2 mb-2 line-clamp-1">
                    <span className="font-semibold text-[#5F4833]">Grains: </span>
                    {item.flourBlend}
                  </p>
                </div>

                {/* Purchase Bar: Price in 15px tabular numbers + Actions */}
                <div className="pt-3 border-t border-[#E7DDD0] flex items-center justify-between mt-2">
                  <div className="font-serif text-lg font-bold text-[#271E15] font-mono tabular-nums">
                    ${item.price.toFixed(2)}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="px-3 py-1.5 text-xs font-medium text-[#5F4833] hover:text-[#271E15] hover:bg-[#E7DDD0]/60 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Customize
                    </button>
                    <button
                      onClick={() => onQuickAdd(item)}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-[#FAF7F2] bg-[#271E15] hover:bg-[#423223] active:scale-[0.98] rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
