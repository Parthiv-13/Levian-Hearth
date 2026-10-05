import React, { useState } from 'react';
import { X, Flame, Clock, Check, Plus, Minus, Wheat, ShieldAlert } from 'lucide-react';
import { BakeryItem } from '../types/bakery';
import { BakeryArtwork } from './BakeryArtwork';

interface ItemDetailModalProps {
  item: BakeryItem | null;
  onClose: () => void;
  onAddToCart: (
    item: BakeryItem,
    quantity: number,
    options: {
      slicing?: string;
      warming?: boolean;
      milk?: string;
      temperature?: string;
      notes?: string;
    }
  ) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSlicing, setSelectedSlicing] = useState<string>(
    item.customization?.slicingOptions ? item.customization.slicingOptions[0] : ''
  );
  const [selectedWarming, setSelectedWarming] = useState(false);
  const [selectedMilk, setSelectedMilk] = useState<string>(
    item.customization?.milkChoices ? item.customization.milkChoices[0] : ''
  );
  const [selectedTemp, setSelectedTemp] = useState<string>(
    item.customization?.temperatureChoices ? item.customization.temperatureChoices[0] : ''
  );
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate unit price with options (e.g., oat milk +$0.75)
  let unitPrice = item.price;
  if (selectedMilk?.includes('+$0.75')) unitPrice += 0.75;
  if (selectedMilk?.includes('+$0.50')) unitPrice += 0.50;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(item, quantity, {
      slicing: selectedSlicing || undefined,
      warming: selectedWarming || undefined,
      milk: selectedMilk || undefined,
      temperature: selectedTemp || undefined,
      notes: specialInstructions.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#18120C]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] w-full max-w-2xl rounded-2xl border border-[#DAC9B4] shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#FAF7F2]/80 hover:bg-[#E7DDD0] text-[#5F4833] hover:text-[#271E15] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Visual & Crumb Profile */}
          <div className="bg-[#F4EFE6] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E7DDD0]">
            <div>
              <div className="aspect-[4/3] rounded-xl bg-[#FAF7F2] border border-[#DAC9B4]/60 flex items-center justify-center p-4 overflow-hidden mb-4 shadow-xs">
                <BakeryArtwork type={item.artworkType} className="w-full h-full" />
              </div>

              {/* Technical Bread Spec Sheet */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C7153]">
                  <Wheat className="w-3.5 h-3.5" />
                  <span>Baker’s Spec & Heritage</span>
                </div>

                <div className="text-xs text-[#5F4833] space-y-1.5 font-mono">
                  {item.fermentationHours && (
                    <div className="flex justify-between py-1 border-b border-[#E7DDD0]">
                      <span className="text-[#8C7153]">Cold Fermentation:</span>
                      <span className="font-semibold text-[#271E15]">{item.fermentationHours} Hours</span>
                    </div>
                  )}
                  {item.hydrationPercent && (
                    <div className="flex justify-between py-1 border-b border-[#E7DDD0]">
                      <span className="text-[#8C7153]">Hydration Level:</span>
                      <span className="font-semibold text-[#271E15]">{item.hydrationPercent}% Water</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-[#E7DDD0]">
                    <span className="text-[#8C7153]">Flour Sourcing:</span>
                    <span className="font-semibold text-[#271E15] text-right line-clamp-1">{item.flourBlend.split(',')[0]}</span>
                  </div>
                </div>

                {/* Tasting notes */}
                <div className="pt-2">
                  <span className="text-xs font-semibold text-[#271E15]">Tasting Notes: </span>
                  <span className="text-xs text-[#5F4833]">{item.tastingNotes.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Allergens warning */}
            {item.allergens.length > 0 && (
              <div className="mt-4 pt-3 border-t border-[#E7DDD0] flex items-start gap-2 text-xs text-[#7E6145]">
                <ShieldAlert className="w-4 h-4 shrink-0 text-[#9A5223] mt-0.5" />
                <span>
                  <strong className="text-[#271E15]">Allergens:</strong> {item.allergens.join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Right: Customization & Purchase Action */}
          <div className="p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7153]">
                  {item.category}
                </span>
                <h3 id="modal-headline" className="font-serif text-2xl font-bold text-[#271E15] mt-0.5">
                  {item.name}
                </h3>
                {item.frenchName && (
                  <p className="text-xs italic text-[#6D563E] mt-0.5">{item.frenchName}</p>
                )}
                <p className="text-xs text-[#5F4833] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Slicing Selection if available */}
              {item.customization?.slicingOptions && (
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold text-[#271E15] block">
                    Slicing Preference:
                  </label>
                  <div className="space-y-1.5">
                    {item.customization.slicingOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedSlicing(opt)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors border cursor-pointer flex items-center justify-between ${
                          selectedSlicing === opt
                            ? 'bg-[#E7DDD0] border-[#9A5223] text-[#271E15] font-semibold'
                            : 'bg-[#FAF7F2] border-[#DAC9B4] text-[#5F4833] hover:border-[#8C7153]'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedSlicing === opt && <Check className="w-3.5 h-3.5 text-[#9A5223]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Warming Available */}
              {item.customization?.warmingAvailable && (
                <div className="pt-2">
                  <label className="flex items-center gap-2.5 p-3 rounded-lg border border-[#DAC9B4] bg-[#FAF7F2] cursor-pointer hover:bg-[#F4EFE6]/50">
                    <input
                      type="checkbox"
                      checked={selectedWarming}
                      onChange={(e) => setSelectedWarming(e.target.checked)}
                      className="rounded text-[#9A5223] focus:ring-[#9A5223] h-4 w-4"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-[#271E15]">Warm Before Packaging</span>
                      <p className="text-[#6D563E]">Gently warmed in our hearth oven right before your pickup.</p>
                    </div>
                  </label>
                </div>
              )}

              {/* Milk Choices (for coffee) */}
              {item.customization?.milkChoices && (
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold text-[#271E15] block">
                    Milk Option:
                  </label>
                  <select
                    value={selectedMilk}
                    onChange={(e) => setSelectedMilk(e.target.value)}
                    className="w-full text-xs bg-[#FAF7F2] border border-[#DAC9B4] rounded-lg px-3 py-2 text-[#271E15] focus:outline-none focus:ring-1 focus:ring-[#9A5223]"
                  >
                    {item.customization.milkChoices.map((milk) => (
                      <option key={milk} value={milk}>
                        {milk}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Temperature Choices (for coffee) */}
              {item.customization?.temperatureChoices && item.customization.temperatureChoices.length > 1 && (
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold text-[#271E15] block">
                    Preparation:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.customization.temperatureChoices.map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setSelectedTemp(temp)}
                        className={`text-center px-3 py-2 rounded-lg text-xs transition-colors border cursor-pointer ${
                          selectedTemp === temp
                            ? 'bg-[#271E15] border-[#271E15] text-[#FAF7F2] font-semibold'
                            : 'bg-[#FAF7F2] border-[#DAC9B4] text-[#5F4833] hover:border-[#8C7153]'
                        }`}
                      >
                        {temp}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-[#271E15] block mb-1">
                  Baker&rsquo;s Note / Allergy Request (Optional):
                </label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g., extra crispy crust, paper bag separate"
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#DAC9B4] rounded-lg text-[#271E15] placeholder:text-[#8C7153] focus:outline-none focus:border-[#9A5223]"
                  maxLength={100}
                />
              </div>

            </div>

            {/* Sticky/Stable Contiguous Bottom Module */}
            <div className="pt-4 border-t border-[#E7DDD0] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#5F4833]">Quantity:</span>
                
                {/* Stepper with tabular figures */}
                <div className="flex items-center gap-3 bg-[#E7DDD0]/70 rounded-lg p-1 border border-[#DAC9B4]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="p-1 rounded bg-[#FAF7F2] text-[#271E15] disabled:opacity-40 hover:bg-white cursor-pointer transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono tabular-nums text-sm font-bold text-[#271E15] min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="p-1 rounded bg-[#FAF7F2] text-[#271E15] hover:bg-white cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Contiguous Add to Cart CTA */}
              <button
                onClick={handleAdd}
                className="w-full py-3 px-4 rounded-xl bg-[#271E15] hover:bg-[#423223] active:scale-[0.98] text-[#FAF7F2] text-sm font-semibold transition-all shadow-sm flex items-center justify-between cursor-pointer"
              >
                <span>Add to Pickup Order</span>
                <span className="font-mono tabular-nums font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
